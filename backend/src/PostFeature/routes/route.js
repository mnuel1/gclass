const express = require("express");
const router = express.Router();

// Dependencies
const { createPost, getAllPost } = require('../Post/PostController');
const { createAttachment, getOneAttachment, getAllAttachmentFromPost, getAllAttachmentFromReplies } = require('../Attachment/AttachmentController')
const { createReactionToPost, createReactionToReply, deleteReaction } = require('../Reaction/ReactionController');
const { createReply } = require('../Reply/ReplyController')

// POST ROUTES
router.post('/:classId/posts', createPost);
router.get('/:classId/posts', getAllPost);

// ATTACHMENT ROUTES
router.post('/posts/attachments', createAttachment);
router.get('/posts/attachments/:attachmentId', getOneAttachment);
router.get('/posts/:postId/attachments', getAllAttachmentFromPost);
router.get('/posts/reply/:replyId/attachments', getAllAttachmentFromReplies);

// REACTION ROUTES
// Post Reactions
router.post('/posts/:postId/reactions', createReactionToPost);
// Reply Reactions
router.post('/posts/:postId/replies/:replyId/reactions', createReactionToReply);
// Delete specific reaction by its ID
router.delete('/reactions/:reactionId', deleteReaction);

// REPLY ROUTES
router.post('/posts/:postId/replies', createReply);

module.exports = router;