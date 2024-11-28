const { createPostRecord, getAllPostRecordsFromClass } = require('./PostService');

exports.createPost = async (req, res) => {
    const classId = req.params.classId;
    const post = req.body;
    const response = await createPostRecord(classId, post);
    res.status(response.status).json({ message: response.message });
}

exports.getAllPost = async (req, res) => {
    const classId = req.params.classId;
    const response = await getAllPostRecordsFromClass(classId);
    res.status(response.status).json({ message: response.message, posts: response.posts })
}