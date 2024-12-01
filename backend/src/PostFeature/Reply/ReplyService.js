const db = require("../../database/db");
const Reply = require('../model/Reply');
const { format } = require('date-fns');

exports.createReplyRecord = async (postId, replyData) => {
    const {
        teacherId,
        studentId,
        content
    } = replyData;

    const reply = new Reply(
        replyId = null,
        postId,
        teacherId,
        studentId,
        content
    );

    reply.createdAt = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    reply.updatedAt = reply.createdAt;

    try {
        const [result] = await db.query(
            `INSERT INTO replies (post_id, teacher_id, student_id, content, created_at, updated_at) VALUES (?,?,?,?,?,?)`,
            [
                reply.postId,
                reply.teacherId,
                reply.studentId,
                reply.content,
                reply.createdAt,
                reply.updatedAt
            ]
        )


        if (result.affectedRows) {
            return {
                status: 201,
                message: "Reply created successfully."
            }
        }
    } catch (err) {
        console.log(err)
        return {
            status: 500,
            message: "An unexpected error occurred. Please try again later."
        }
    }
}