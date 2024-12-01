const { createPostRecord, getAllPostRecordsFromClass, getOnePostRecord, deletePostRecord } = require('./PostService');

exports.createPost = async (req, res) => {
    const classId = req.params.classId;
    const post = req.body;
    const response = await createPostRecord(classId, post);
    res.status(response.status).json({ message: response.message });
}

// Get One Post by ID
exports.getOnePost = async (req, res) => {
    const classId = req.params.classId; // keep classId
    const postId = req.params.postId;
    const response = await getOnePostRecord(classId, postId); // pass classId to service
    res.status(response.status).json({ message: response.message, post: response.post });
}

exports.getAllPost = async (req, res) => {
    const classId = req.params.classId;
    const response = await getAllPostRecordsFromClass(classId);
    res.status(response.status).json({ message: response.message, posts: response.posts })
}

// Delete Post by ID
exports.deletePost = async (req, res) => {
    const classId = req.params.classId; // keep classId
    const postId = req.params.postId;
    const response = await deletePostRecord(classId, postId); // pass classId to service
    res.status(response.status).json({ message: response.message });
}