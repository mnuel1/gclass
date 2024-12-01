const fs = require('fs');
const express = require("express");
const path = require('path');
const router = express.Router();



// Dependencies
const { createPost, getAllPost, getOnePost, deletePost } = require('../Post/PostController');
const { createAttachmentForPost, createAttachmentForReply, getOneAttachmentFromPost, getAllAttachmentFromPost, getAllAttachmentFromReplies } = require('../Attachment/AttachmentController')
const { createReactionToPost, createReactionToReply, deleteReaction } = require('../Reaction/ReactionController');
const { createReply } = require('../Reply/ReplyController')

const upload = require('../middlewares/FileUploadMiddleware');
const { uploadFiles } = require('../FileUpload/FileUploadController');


// FILE SYSTEM ROUTER
router.post('/upload', upload.array('files', 10), uploadFiles);
router.get('/display/uploads/*', (req, res) => {
    try {
        // Construct absolute file path to the uploads directory
        const filePath = path.join(__dirname, '../../../uploads', req.params[0]);

        // Log detailed path information for debugging
        console.log('Constructed file path:', filePath);
        console.log('Path exists:', fs.existsSync(filePath));

        // Check file existence with more detailed error handling
        if (!fs.existsSync(filePath)) {
            console.error('File does not exist:', filePath);

            return res.status(404).json({
                message: 'File not found',
                details: {
                    requestedPath: req.params[0],
                    constructedPath: filePath
                }
            });
        }

        // Serve the file
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error serving file:', err);
                res.status(500).json({
                    message: 'Error serving file',
                    error: err.message
                });
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
});

router.get('/download/uploads/*', (req, res) => {
    try {
        // Construct absolute file path to the uploads directory
        const filePath = path.join(__dirname, '../../../uploads', req.params[0]);

        // Log detailed path information for debugging
        console.log('Download file path:', filePath);
        console.log('Path exists:', fs.existsSync(filePath));

        // Check file existence with more detailed error handling
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                message: 'File not found',
                details: {
                    requestedPath: req.params[0],
                    constructedPath: filePath
                }
            });
        }

        // Download the file with the original filename
        res.download(filePath, path.basename(filePath), (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).json({
                    message: 'Error downloading file',
                    error: err.message
                });
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
});

// POST ROUTES
router.post('/:classId/posts', createPost);
router.get('/:classId/posts', getAllPost);
router.get('/:classId/posts/:postId', getOnePost);  // keep classId in the route
router.delete('/:classId/posts/:postId', deletePost);  // keep classId in the route

// ATTACHMENT ROUTES
router.post('/posts/:postId/attachments', createAttachmentForPost);
router.post('/posts/replies/:replyId/attachments', createAttachmentForReply);
router.get('/posts/:postId/attachments/:attachmentId', getOneAttachmentFromPost);
router.get('/posts/:postId/attachments', getAllAttachmentFromPost);
router.get('/posts/:postId/reply/:replyId/attachments', getAllAttachmentFromReplies);

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