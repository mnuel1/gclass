class Reply {
    constructor(
        replyId,
        postId,
        teacherId,
        studentId,
        content,
        createdAt,
        updatedAt
    ) {
        this.replyId = replyId;
        this.postId = postId;
        this.teacherId = teacherId;
        this.studentId = studentId;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = Reply;