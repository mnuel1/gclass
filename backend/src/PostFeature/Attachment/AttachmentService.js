const db = require("../../database/db");
const Attachment = require('../model/Attachment');
const { format } = require('date-fns');

exports.createAttachmentRecordForPost = async (postId, attachmentData) => {
    const {
        fileName,
        filePath,
        type,
    } = attachmentData;
        
    // const fileName = filePath.replace(/.*\d+-/, '');

    const attachment = new Attachment(
        attachmentId = null,
        postId,
        replyId = null,
        fileName,
        filePath,
        type
    );

    attachment.uploadedAt = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    try {
        const [attachmentQueryResult] = await db.query(
            `INSERT INTO attachments (post_id, reply_id, file_name, file_path, type, uploaded_at) VALUES (?, ?, ? ,? ,? ,?)`,
            [
                attachment.postId,
                attachment.replyId,
                attachment.fileName,
                attachment.filePath,
                attachment.type,
                attachment.uploadedAt
            ]
        );

        if (attachmentQueryResult.affectedRows) {
            return {
                status: 201,
                message: "Attachment created."
            }
        }

    } catch (err) {
        console.log(err)
        if (err.errno === 1048) {
            return {
                status: 400,
                message: "Required fields cannot be empty."
            }
        } else {
            console.log(err)
            return {
                status: 500, // Internal Server Error
                message: "An unexpected error occurred. Please try again later."
            };
        }
    }
}

exports.createAttachmentRecordForReply = async (replyId, attachmentData) => {
    const {
        filePath,
        type,
    } = attachmentData;

    const fileName = filePath.replace(/.*\d+-/, '');

    const attachment = new Attachment(
        attachmentId = null,
        postId = null,
        replyId,
        fileName,
        filePath,
        type
    );

    attachment.uploadedAt = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    try {
        const [attachmentQueryResult] = await db.query(
            `INSERT INTO attachments (post_id, reply_id, file_name, file_path, type, uploaded_at) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                attachment.postId,
                attachment.replyId,
                attachment.fileName,
                attachment.filePath,
                attachment.type,
                attachment.uploadedAt
            ]
        );

        if (attachmentQueryResult.affectedRows) {
            return {
                status: 201,
                message: "Attachment created for reply.",
            };
        } else {
            return {
                status: 500, // Internal Server Error
                message: "Failed to create the attachment.",
            };
        }
    } catch (err) {
        console.error(err);
        if (err.errno === 1048) {
            return {
                status: 400,
                message: "Required fields cannot be empty.",
            };
        } else {
            return {
                status: 500, // Internal Server Error
                message: "An unexpected error occurred. Please try again later.",
            };
        }
    }
};


exports.getOneAttachmentRecordFromPost = async (postId, attachmentId) => {
    try {
        const [attachmentQueryResult] = await db.query(
            `SELECT * FROM attachments WHERE post_id = ? AND attachment_id = ?`,
            [postId, attachmentId]
        );

        if (attachmentQueryResult.length > 0) {
            const attachment = attachmentQueryResult[0];

            // Convert `uploaded_at` to local time zone
            if (attachment.uploaded_at) {
                const localUploadedAt = new Date(attachment.uploaded_at);
                attachment.uploaded_at = format(localUploadedAt, "yyyy-MM-dd HH:mm:ss");
            }

            const formattedAttachment = {
                attachmentId: attachment.attachment_id,
                postId: attachment.post_id,
                fileName: attachment.file_name,
                filePath: attachment.file_path,
                type: attachment.type,
                uploadedAt: attachment.uploaded_at
            }

            return {
                status: 200,
                message: "Attachment retrieved successfully.",
                data: formattedAttachment,
            };
        } else {
            return {
                status: 404,
                message: "Attachment not found.",
            };
        }
    } catch (err) {
        return {
            status: 500, // Internal Server Error
            message: "An unexpected error occurred. Please try again later.",
        };
    }
};

exports.getAllAttachmentRecordsFromPost = async (postId) => {
    try {
        // Query to get all attachments associated with a specific postId
        const [attachmentsQueryResult] = await db.query(
            `SELECT * FROM attachments WHERE post_id = ?`,
            [postId]
        );

        if (attachmentsQueryResult.length > 0) {
            // Format uploaded_at and return the attachments
            const formattedAttachments = attachmentsQueryResult.map((attachment) => {
                if (attachment.uploaded_at) {
                    const localUploadedAt = new Date(attachment.uploaded_at);
                    attachment.uploaded_at = format(localUploadedAt, "yyyy-MM-dd HH:mm:ss");
                }
                return attachment;
            });

            return {
                status: 200,
                message: "Attachments retrieved successfully.",
                data: formattedAttachments,
            };
        } else {
            return {
                status: 404,
                message: "No attachments found for the specified post.",
            };
        }
    } catch (err) {
        console.error(err);
        return {
            status: 500, // Internal Server Error
            message: "An unexpected error occurred. Please try again later.",
        };
    }
};

exports.getAllAttachmentRecordsFromReplies = async (postId, replyId) => {
    try {
        // Query to get all attachments associated with a specific replyId
        const [attachmentsQueryResult] = await db.query(
            `SELECT * FROM attachments WHERE post_id = ? AND reply_id = ?`,
            [postId, replyId]
        );

        if (attachmentsQueryResult.length > 0) {
            // Format uploaded_at and return the attachments
            const formattedAttachments = attachmentsQueryResult.map((attachment) => {
                if (attachment.uploaded_at) {
                    const localUploadedAt = new Date(attachment.uploaded_at);
                    attachment.uploaded_at = format(localUploadedAt, "yyyy-MM-dd HH:mm:ss");
                }
                return attachment;
            });

            return {
                status: 200,
                message: "Attachments retrieved successfully.",
                data: formattedAttachments,
            };
        } else {
            return {
                status: 404,
                message: "No attachments found for the specified reply.",
            };
        }
    } catch (err) {
        console.error(err);
        return {
            status: 500, // Internal Server Error
            message: "An unexpected error occurred. Please try again later.",
        };
    }
};
