class Attachment {
    constructor(
        attachmentId,
        postId,
        replyId,
        fileName,
        filePath,
        type,
        uploadedAt
    ) {
        this.attachmentId = attachmentId;
        this.postId = postId;
        this.replyId = replyId;
        this.fileName = fileName;
        this.filePath = filePath;
        this.type = type;
        this.uploadedAt = uploadedAt;
    }
}

module.exports = Attachment;