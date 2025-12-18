const db = require('../util/database');
const { v4: uuidv4 } = require('uuid');

exports.getAllPosts = (req, res) => {
    console.log("Fetching all posts");
    const posts = db.get('posts');
    res.json(posts);
};

exports.createPost = (req, res) => {
    const { title, content, user_id } = req.body;

    // Validation
    if (!title || !content) {
        console.log("Validation failed for post");
        return res.status(400).json({ error: "Missing title or content" });
    }

    const newPost = {
        post_id: uuidv4(),
        user_id: user_id || "anonymous",
        title,
        content,
        upvotes: 0,
        created: new Date().toISOString()
    };

    db.save('posts', newPost);
    res.status(201).json(newPost);
};

exports.createComment = (req, res) => {
    const { postId, text } = req.body;

    if (!postId || !text) {
        return res.status(400).json({ error: "Missing postId or text" });
    }

    const newComment = {
        id: uuidv4(),
        postId,
        text
    };

    db.save('comments', newComment);
    res.status(201).send("Comment added");
};
