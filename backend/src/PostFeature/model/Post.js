class Post {
    constructor(
        postId,
        studentId,
        teacherId,
        classId,
        subject,
        content,
        postType,
        createdAt,
        updatedAt
    ) {
        this.postId = postId;
        this.studentId = studentId;
        this.teacherId = teacherId;
        this.classId = classId;
        this.subject = subject;
        this.content = content;
        this.postType = postType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    };
}

module.exports = Post;