const db = require("../../database/db");
const Reaction = require('../model/Reaction');
const { format } = require('date-fns');


exports.createReactionRecordToPost = async (postId, reactionData) => {
    const {
        teacherId,
        studentId,
        type
    } = reactionData;

    const reaction = new Reaction(
        reactionId = null,
        teacherId,
        studentId,
        postId,
        replyId = null,
        type,
    );

    reaction.createdAt = format(new Date(), 'yyyy-MM-dd HH:mm:ss')

    try {
        const [result] = await db.query(
            `INSERT INTO reactions (teacher_id, student_id, post_id, reply_id, type, created_at) VALUES (?, ?, ?, ? ,? ,?)`,
            [
                reaction.teacherId,
                reaction.studentId,
                reaction.postId,
                reaction.replyId,
                reaction.type,
                reaction.createdAt
            ]
        )

        if (result.affectedRows) {
            return {
                status: 201,
                message: "Successful reacted."
            }
        }


    } catch (err) {
        console.log(err)

        if (err.errno == 1452) {
            return {
                status: 404,
                message: "The post you are trying to react to does not exist."
            }
        }
        return {
            status: 500, // Internal Server Error
            message: "An unexpected error occurred. Please try again later."
        };
    }
}


exports.createReactionRecordToReply = async (replyId, reactionData) => {
    const {
        teacherId,
        studentId,
        type
    } = reactionData;

    const reaction = new Reaction(
        reactionId = null,
        teacherId,
        studentId,
        postId = null, // Set postId to null since this is a reply reaction
        replyId,
        type,
    );

    reaction.createdAt = format(new Date(), 'yyyy-MM-dd HH:mm:ss')

    try {
        const [result] = await db.query(
            `INSERT INTO reactions (teacher_id, student_id, post_id, reply_id, type, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                reaction.teacherId,
                reaction.studentId,
                reaction.postId,
                reaction.replyId,
                reaction.type,
                reaction.createdAt
            ]
        )

        if (result.affectedRows) {
            return {
                status: 201,
                message: "Successfully reacted to reply."
            }
        }
    } catch (err) {
        console.log(err)
        if (err.errno == 1452) {
            return {
                status: 404,
                message: "The reply you are trying to react to does not exist."
            }
        }
        return {
            status: 500, // Internal Server Error
            message: "An unexpected error occurred. Please try again later."
        };
    }
}


exports.deleteReactionRecord = async (reactionId) => {
    try {
        const [result] = await db.query(
            `DELETE FROM reactions WHERE reaction_id = ?`,
            [reactionId]
        );

        if (result.affectedRows) {
            return {
                status: 200,
                message: "Reaction removed successfully.",
                deleted: true
            };
        } else {
            return {
                status: 404,
                message: "No reaction found to remove.",
                deleted: false
            };
        }
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            message: "An unexpected error occurred while removing the reaction.",
            deleted: false
        };
    }
};