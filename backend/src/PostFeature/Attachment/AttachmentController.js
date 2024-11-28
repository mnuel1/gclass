const { createAttachmentRecord, getOneAttachmentRecord, getAllAttachmentRecordsFromPost, getAllAttachmentRecordsFromReplies } = require('../Attachment/AttachmentService');


exports.createAttachment = async (req, res) => {
    const attachment = req.body;
    const response = await createAttachmentRecord(attachment);
    res.status(response.status).json({ message: response.message });
}

exports.getOneAttachment = async (req, res) => {
    const attachmentId = req.params.attachmentId;
    const response = await getOneAttachmentRecord(attachmentId);
    res.status(response.status).json({ message: response.message, data: response.data })
}

exports.getAllAttachmentFromPost = async (req, res) => {
    const postId = req.params.postId;
    const response = await getAllAttachmentRecordsFromPost(postId);
    res.status(response.status).json({ message: response.message, data: response.data });
};

exports.getAllAttachmentFromReplies = async (req, res) => {
    const replyId = req.params.replyId;
    const response = await getAllAttachmentRecordsFromReplies(replyId);
    res.status(response.status).json({ message: response.message, data: response.data });
};