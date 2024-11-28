const { createReactionRecordToPost, createReactionRecordToReply, deleteReactionRecord } = require('../Reaction/ReactionService')

exports.createReactionToPost = async (req, res) => {
    const reactionId = req.params.postId;
    const reaction = req.body;
    const response = await createReactionRecordToPost(reactionId, reaction);
    res.status(response.status).json({ message: response.message });
}

exports.createReactionToReply = async (req, res) => {
    const replyId = req.params.replyId;
    const reaction = req.body;
    const response = await createReactionRecordToReply(replyId, reaction);
    res.status(response.status).json({ message: response.message });
}

exports.deleteReaction = async (req, res) => {
    const { reactionId } = req.params;
    const response = await deleteReactionRecord(reactionId);
    res.status(response.status).json({
        message: response.message,
        deleted: response.deleted
    });
};