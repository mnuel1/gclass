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

// Get One Post Record by Post ID
exports.getOnePostRecord = async (classId, postId) => {
  try {
    // Fetch the post record
    const [postResults] = await db.query(`SELECT * FROM posts WHERE post_id = ? AND class_id = ?`, [postId, classId]);

    if (postResults.length === 0) {
      return {
        status: 404,
        message: "Post not found.",
      };
    }

    const post = postResults[0];

    // Fetch attachments for the post
    const [attachments] = await db.query(`SELECT * FROM attachments WHERE post_id = ?`, [postId]);

    // Fetch replies and their details
    const [replies] = await db.query(`SELECT * FROM replies WHERE post_id = ?`, [postId]);
    const formattedReplies = await Promise.all(
      replies.map(async (reply) => {
        const replyStudent = reply.student_id ? await getStudentData(reply.student_id) : null;
        const replyTeacher = reply.teacher_id ? await getTeacherData(reply.teacher_id) : null;

        // Fetch reactions for the reply
        const [replyReactions] = await db.query(`SELECT * FROM reactions WHERE reply_id = ?`, [reply.reply_id]);
        const formattedReplyReactions = await Promise.all(
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

        // Fetch attachments for the reply
        const [replyAttachments] = await db.query(`SELECT * FROM attachments WHERE reply_id = ?`, [reply.reply_id]);

        return {
          replyId: reply.reply_id,
          postId: reply.post_id,
          content: reply.content,
          teacher: replyTeacher ? { ...replyTeacher, password: undefined } : undefined,
          student: replyStudent ? { ...replyStudent, password: undefined } : undefined,
          reactions: formattedReplyReactions,
          attachments: replyAttachments.map((attachment) => ({
            attachmentId: attachment.attachment_id,
            replyId: attachment.reply_id,
            fileName: attachment.file_name,
            filePath: attachment.file_path,
            type: attachment.type,
            uploadedAt: format(new Date(attachment.uploaded_at), 'yyyy-MM-dd HH:mm:ss'),
          })),
          createdAt: format(new Date(reply.created_at), 'yyyy-MM-dd HH:mm:ss'),
          updatedAt: format(new Date(reply.updated_at), 'yyyy-MM-dd HH:mm:ss'),
        };
      })
    );

    // Fetch reactions for the post
    const [reactions] = await db.query(`SELECT * FROM reactions WHERE post_id = ?`, [postId]);
    const formattedReactions = await Promise.all(
      reactions.map(async (reaction) => {
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
      })
    );

    // Fetch teacher data
    const teacher = post.teacher_id ? await getTeacherData(post.teacher_id) : null;

    // Format the post record
    const formattedPost = {
      postId: post.post_id,
      classId: post.class_id,
      subject: post.subject || "",
      content: post.content || "",
      postType: post.post_type,
      attachments: attachments.map((attachment) => ({
        attachmentId: attachment.attachment_id,
        postId: attachment.post_id,
        fileName: attachment.file_name,
        filePath: attachment.file_path,
        type: attachment.type,
        uploadedAt: format(new Date(attachment.uploaded_at), 'yyyy-MM-dd HH:mm:ss'),
      })),
      replies: formattedReplies,
      reactions: formattedReactions,
      createdAt: format(new Date(post.created_at), 'yyyy-MM-dd HH:mm:ss'),
      updatedAt: format(new Date(post.updated_at), 'yyyy-MM-dd HH:mm:ss'),
      teacher: teacher ? { ...teacher, password: undefined } : undefined,
    };

    return {
      status: 200,
      message: "Post retrieved successfully.",
      post: formattedPost,
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      message: "An error occurred while retrieving the post.",
    };
  }
};


exports.getAllPostRecordsFromClass = async (classId) => {
  try {
    const [postResults] = await db.query(`SELECT * FROM posts WHERE class_id = ?`, [classId]);

    const postIds = postResults.map((post) => post.post_id);

    const attachmentsResults = await Promise.all(
      postIds.map((postId) => getAllAttachmentRecordsFromPost(postId))
    );

    const repliesResults = await Promise.all(
      postIds.map(async (postId) => {
        const [replies] = await db.query('SELECT * FROM replies WHERE post_id = ?', [postId]);
        return replies;
      })
    );

    const reactionsResults = await Promise.all(
      postIds.map(async (postId) => {
        const [reactions] = await db.query('SELECT * FROM reactions WHERE post_id = ?', [postId]);
        return reactions;
      })
    );

    const formattedPosts = await Promise.all(postResults.map(async (post, index) => {
      let student = null;
      let teacher = null;

      if (post.student_id) {
        student = await getStudentData(post.student_id);
        if (student) delete student.password;
      }

      if (post.teacher_id) {
        teacher = await getTeacherData(post.teacher_id);
        if (teacher) delete teacher.password;
      }

      const attachments = attachmentsResults[index]?.data || [];

      const replies = await Promise.all(
        repliesResults[index]?.map(async (reply) => {
          const replyStudent = reply.student_id ? await getStudentData(reply.student_id) : null;
          const replyTeacher = reply.teacher_id ? await getTeacherData(reply.teacher_id) : null;

          const [replyReactions] = await db.query('SELECT * FROM reactions WHERE reply_id = ?', [reply.reply_id]);

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

          // Fetch attachments for the reply
          const replyAttachments = await db.query(
            'SELECT * FROM attachments WHERE reply_id = ?',
            [reply.reply_id]
          );

          return {
            replyId: reply.reply_id,
            postId: reply.post_id,
            teacher: replyTeacher ? { ...replyTeacher, password: undefined } : undefined,
            student: replyStudent ? { ...replyStudent, password: undefined } : undefined,
            content: reply.content,
            reactions: processedReplyReactions,
            attachments: replyAttachments[0].map((attachment) => ({
              attachmentId: attachment.attachment_id,
              replyId: attachment.reply_id,
              fileName: attachment.file_name,
              filePath: attachment.file_path,
              type: attachment.type,
              uploadedAt: format(new Date(attachment.uploaded_at), 'yyyy-MM-dd HH:mm:ss'),
            })),
            createdAt: format(new Date(reply.created_at), 'yyyy-MM-dd HH:mm:ss'),
            updatedAt: format(new Date(reply.updated_at), 'yyyy-MM-dd HH:mm:ss'),

          };
        }) || []
      );

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

      const formattedCreatedAt = format(new Date(post.created_at), 'yyyy-MM-dd HH:mm:ss');
      const formattedUpdatedAt = format(new Date(post.updated_at), 'yyyy-MM-dd HH:mm:ss');

      const postResponse = {
        postId: post.post_id,
        classId: post.class_id || 0,
        subject: post.subject || "",
        content: post.content || "",
        postType: post.post_type,
        attachments: attachments.map((attachment) => ({
          attachmentId: attachment.attachment_id,
          postId: attachment.post_id,
          fileName: attachment.file_name,
          filePath: attachment.file_path,
          type: attachment.type,
          uploadedAt: format(new Date(attachment.uploaded_at), 'yyyy-MM-dd HH:mm:ss'),
        })),
        replies,
        reactions,
        createdAt: formattedCreatedAt,
        updatedAt: formattedUpdatedAt,
      };

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
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: "An error occurred while retrieving the post records. Please try again later.",
    };
  }
};

// Delete Post Record by Post ID
exports.deletePostRecord = async (classId, postId) => {
  try {
    // Delete attachments associated with the post
    await db.query('DELETE FROM attachments WHERE post_id = ?', [postId]);

    // Delete replies associated with the post
    await db.query('DELETE FROM replies WHERE post_id = ?', [postId]);

    // Delete reactions associated with the post
    await db.query('DELETE FROM reactions WHERE post_id = ?', [postId]);

    // Finally, delete the post itself
    const [deleteResult] = await db.query('DELETE FROM posts WHERE post_id = ? AND class_id = ?', [postId, classId]);

    if (deleteResult.affectedRows === 0) {
      return {
        status: 404,
        message: "Post not found, deletion failed.",
      };
    }

    return {
      status: 200,
      message: "Post deleted successfully.",
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: "An error occurred while deleting the post.",
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

// Helper function to fetch replies for a post
const getRepliesForPost = async (postId) => {
  const [replies] = await db.query('SELECT * FROM replies WHERE post_id = ?', [postId]);
  return replies.map(reply => ({
    replyId: reply.reply_id,
    content: reply.content,
    createdAt: format(new Date(reply.created_at), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(new Date(reply.updated_at), 'yyyy-MM-dd HH:mm:ss'),
  }));
};

// Helper function to fetch reactions for a post
const getReactionsForPost = async (postId) => {
  const [reactions] = await db.query('SELECT * FROM reactions WHERE post_id = ?', [postId]);
  return reactions.map(reaction => ({
    reactionId: reaction.reaction_id,
    type: reaction.type,
    createdAt: format(new Date(reaction.created_at), 'yyyy-MM-dd HH:mm:ss'),
  }));
};

