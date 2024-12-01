const { createAttachmentRecordForPost, createAttachmentRecordForReply, getOneAttachmentRecordFromPost, getAllAttachmentRecordsFromPost, getAllAttachmentRecordsFromReplies } = require('../Attachment/AttachmentService');


exports.createAttachmentForPost = async (req, res) => {
    const postId = req.params.postId;
    const attachment = req.body;
    const response = await createAttachmentRecordForPost(postId, attachment);
    res.status(response.status).json({ message: response.message });
}

exports.createAttachmentForReply = async (req, res) => {
    const replyId = req.params.replyId;
    const attachment = req.body;
    const response = await createAttachmentRecordForReply(replyId, attachment);
    res.status(response.status).json({ message: response.message });
};

exports.getOneAttachmentFromPost = async (req, res) => {
    const postId = req.params.postId;
    const attachmentId = req.params.attachmentId;
    const response = await getOneAttachmentRecordFromPost(postId, attachmentId);
    res.status(response.status).json({ message: response.message, data: response.data })
}

exports.getAllAttachmentFromPost = async (req, res) => {
    const postId = req.params.postId;
    const response = await getAllAttachmentRecordsFromPost(postId);
    res.status(response.status).json({ message: response.message, data: response.data });
};

exports.getAllAttachmentFromReplies = async (req, res) => {
    const postId = req.params.postId;
    const replyId = req.params.replyId;
    const response = await getAllAttachmentRecordsFromReplies(postId, replyId);
    res.status(response.status).json({ message: response.message, data: response.data });
};