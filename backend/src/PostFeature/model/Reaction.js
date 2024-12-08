class Reaction {
    constructor(
        reactionId,
        teacherId,
        studentId,
        postId,
        replyId,
        type,
        createdAt
    ) {
        this.reactionId = reactionId;
        this.teacherId = teacherId;
        this.studentId = studentId;
        this.postId = postId;
        this.replyId = replyId;
        this.type = type;
        this.createdAt = createdAt;
    }
}

module.exports = Reaction;