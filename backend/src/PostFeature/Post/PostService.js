const db = require("../../database/db");
const Post = require('../model/Post');
const { format } = require('date-fns');
const { getAllAttachmentRecordsFromPost } = require('../Attachment/AttachmentService')

exports.createPostRecord = async (classId, postData) => {
  const {
    studentId,
    teacherId,
    subject,
    content,
    postType,
  } = postData;

  const post = new Post(
    postId = null,
    studentId,
    teacherId,
    classId,
    subject,
    content,
    postType
  );

  post.createdAt = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  post.updatedAt = post.createdAt;

  try {
    const [results] = await db.query(
      `INSERT INTO posts (student_id, teacher_id, class_id, subject, content, post_type, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        post.studentId,
        post.teacherId,
        post.classId,
        post.subject,
        post.content,
        post.postType,
        post.createdAt,
        post.updatedAt
      ]
    );

    if (results.affectedRows) {
      return {
        status: 201,
        message: "Post created."
      }
    }
  } catch (err) {
    if (err.errno === 1048) {
      return {
        status: 400,
        message: "Required fields cannot be empty."
      }
    } else {
      console.log(err)
      return {
        status: 500, // Internal Server Error
        message: "An unexpected error occurred. Please try again later."
      };
    }
  }
}

exports.getAllPostRecordsFromClass = async (classId) => {
  try {
    // Step 1: Fetch all posts
    const [postResults] = await db.query(`SELECT * FROM posts WHERE class_id = ?`,
      [classId]
    );

    // Step 2: Prepare post IDs for fetching attachments, replies, and reactions
    const postIds = postResults.map((post) => post.post_id);

    // Fetch attachments for each post
    const attachmentsResults = await Promise.all(
      postIds.map(postId => getAllAttachmentRecordsFromPost(postId))
    );

    // Fetch replies for each post
    const repliesResults = await Promise.all(
      postIds.map(async (postId) => {
        const [replies] = await db.query('SELECT * FROM replies WHERE post_id = ?', [postId]);
        return replies;
      })
    );

    // Fetch reactions for each post
    const reactionsResults = await Promise.all(
      postIds.map(async (postId) => {
        const [reactions] = await db.query('SELECT * FROM reactions WHERE post_id = ?', [postId]);
        return reactions;
      })
    );

    // Step 3: Map and format the data
    const formattedPosts = await Promise.all(postResults.map(async (post, index) => {
      let student = null;
      let teacher = null;

      // Fetch student data if student_id is not null
      if (post.student_id) {
        student = await getStudentData(post.student_id);
        if (student) delete student.password; // Exclude password field
      }

      // Fetch teacher data if teacher_id is not null
      if (post.teacher_id) {
        teacher = await getTeacherData(post.teacher_id);
        if (teacher) delete teacher.password; // Exclude password field
      }

      // Get attachments for the current post
      const attachments = attachmentsResults[index]?.data || [];

      // Get replies for the current post
      const replies = await Promise.all(
        repliesResults[index]?.map(async (reply) => {
          const replyStudent = reply.student_id ? await getStudentData(reply.student_id) : null;
          const replyTeacher = reply.teacher_id ? await getTeacherData(reply.teacher_id) : null;

          // Fetch reactions for this specific reply
          const [replyReactions] = await db.query('SELECT * FROM reactions WHERE reply_id = ?', [reply.reply_id]);

          // Process reply reactions similar to post reactions
          const processedReplyReactions = await Promise.all(
            replyReactions.map(async (reaction) => {
              const reactionStudent = reaction.student_id ? await getStudentData(reaction.student_id) : null;
              const reactionTeacher = reaction.teacher_id ? await getTeacherData(reaction.teacher_id) : null;

              return {
                reactionId: reaction.reaction_id,
                replyId: reaction.reply_id,
                type: reaction.type,
                createdAt: format(new Date(reaction.created_at), 'yyyy-MM-dd HH:mm:ss'),
                teacher: reactionTeacher ? { ...reactionTeacher, password: undefined } : undefined,
                student: reactionStudent ? { ...reactionStudent, password: undefined } : undefined,
              };
            })
          );

          return {
            postId: reply.post_id,
            replyId: reply.reply_id, // Add reply_id to the response
            teacher: replyTeacher ? { ...replyTeacher, password: undefined } : undefined,
            student: replyStudent ? { ...replyStudent, password: undefined } : undefined,
            content: reply.content,
            createdAt: format(new Date(reply.created_at), 'yyyy-MM-dd HH:mm:ss'),
            updatedAt: format(new Date(reply.updated_at), 'yyyy-MM-dd HH:mm:ss'),
            reactions: processedReplyReactions, // Add reactions to the reply
          };
        }) || []
      );

      // Get reactions for the current post
      const reactions = await Promise.all(
        reactionsResults[index]?.map(async (reaction) => {
          const reactionStudent = reaction.student_id ? await getStudentData(reaction.student_id) : null;
          const reactionTeacher = reaction.teacher_id ? await getTeacherData(reaction.teacher_id) : null;

          return {
            reactionId: reaction.reaction_id,
            postId: reaction.post_id,
            type: reaction.type,
            createdAt: format(new Date(reaction.created_at), 'yyyy-MM-dd HH:mm:ss'),
            teacher: reactionTeacher ? { ...reactionTeacher, password: undefined } : undefined,
            student: reactionStudent ? { ...reactionStudent, password: undefined } : undefined,
          };
        }) || []
      );
      

      // Format the dates using date-fns
      const formattedCreatedAt = format(new Date(post.created_at), 'yyyy-MM-dd HH:mm:ss');
      const formattedUpdatedAt = format(new Date(post.updated_at), 'yyyy-MM-dd HH:mm:ss');

      // Prepare the response object
      const postResponse = {
        postId: post.post_id,
        classId: post.class_id || 0,
        subject: post.subject || "",
        content: post.content || "",
        postType: post.post_type,
        attachments: attachments.map((attachment) => ({
          attachmentId: attachment.attachment_id,
          postId: attachment.post_id,
          replyId: attachment.reply_id, // Make sure to reference the correct `reply_id`
          fileName: attachment.file_name,
          filePath: attachment.file_path,
          type: attachment.type,
          uploadedAt: format(new Date(attachment.uploaded_at), 'yyyy-MM-dd HH:mm:ss') // Format uploadedAt
        })),
        replies,
        reactions,
        createdAt: formattedCreatedAt,
        updatedAt: formattedUpdatedAt,
      };

      // Conditionally add student and teacher if they are not null
      if (student) {
        postResponse.student = student;
      }

      if (teacher) {
        postResponse.teacher = teacher;
      }

      return postResponse;
    }));

    if (formattedPosts.length !== 0) {
      return {
        status: 200,
        message: "Posts retrieved successfully.",
        posts: formattedPosts,
      };
    } else {
      return {
        status: 404,
        message: "There are no current post/s in this class.",
        posts: formattedPosts,
      };
    }

    // Step 4: Return the response

  } catch (err) {
    console.log(err);
    return {
      status: 500, // Internal Server Error
      message: "An error occurred while retrieving the post records. Please try again later.",
    };
  }
};


// Helper function to fetch student data by student_id
const getStudentData = async (studentId) => {
  try {
    const [studentResult] = await db.query('SELECT * FROM students WHERE student_id = ?', [studentId]);
    if (studentResult.length > 0) {
      const formattedStudent = {
        studentId: studentResult[0].student_id,
        studentStringId: studentResult[0].student_string_id, // Using the student_string_id as studentId
        firstName: studentResult[0].first_name,
        middleName: studentResult[0].middle_name,
        lastName: studentResult[0].last_name,
        email: studentResult[0].email_address,
        createdTime: studentResult[0].created_time
          ? format(new Date(studentResult[0].created_time), 'yyyy-MM-dd HH:mm:ss')
          : null,
        modifiedTime: studentResult[0].modified_time
          ? format(new Date(studentResult[0].modified_time), 'yyyy-MM-dd HH:mm:ss')
          : null,
      };
      return formattedStudent; // Returning structured student data
    }
    return null;
  } catch (err) {
    console.log("Error fetching student data:", err);
    return null;
  }
};


// Helper function to fetch teacher data by teacher_id
const getTeacherData = async (teacherId) => {
  try {
    const [teacherResult] = await db.query('SELECT * FROM teachers WHERE teacher_id = ?', [teacherId]);
    if (teacherResult.length > 0) {
      const formattedTeacher = {
        teacherId: teacherResult[0].teacher_id,
        teacherStringId: teacherResult[0].teacher_string_id, // Using the teacher_string_id as teacherId
        firstName: teacherResult[0].first_name,
        middleName: teacherResult[0].middle_name,
        lastName: teacherResult[0].last_name,
        email: teacherResult[0].email_address,
        status: teacherResult[0].status, // Teacher status (e.g., "Approved")
        createdTime: teacherResult[0].created_time
          ? format(new Date(teacherResult[0].created_time), 'yyyy-MM-dd HH:mm:ss')
          : null,
        modifiedTime: teacherResult[0].modified_time
          ? format(new Date(teacherResult[0].modified_time), 'yyyy-MM-dd HH:mm:ss')
          : null,
      };
      return formattedTeacher; // Returning structured teacher data
    }
    return null;
  } catch (err) {
    console.log("Error fetching teacher data:", err);
    return null;
  }
};
