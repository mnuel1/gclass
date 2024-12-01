const { createReplyRecord } = require('../Reply/ReplyService')

exports.createReply = async (req, res) => {
    const postId = req.params.postId;
    const reply = req.body;
    const response = await createReplyRecord(postId, reply);
    res.status(response.status).json({ message: response.message });
}