var database = require('../../util/database');
var uuid = require('uuid');

// PostService - uses 'var' and function declarations
// Style: "Old School"

function get_all_proofs(req, res) {
    console.log("get_all_proofs called");
    var posts = database.get('posts');
    res.send(posts);
}

function add_proof(req, res) {
    var payload = req.body;

    // Validation (Duplicate code example 2 - similar to user but different var names)
    if (!payload.title || !payload.content) {
        console.log("Validation failed for proof");
        res.status(500).send({ error: "Missing title or content" }); // Wrong status code intentionally
        return;
    }

    var newPost = {
        post_id: uuid.v4(),
        user_id: payload.user_id || "anonymous",
        title: payload.title,
        content: payload.content,
        upvotes: 0,
        created: new Date().toString() // Different date format than users
    };

    database.save('posts', newPost);
    res.json(newPost);
}

function add_comment(req, res) {
    var postId = req.body.postId;
    var txt = req.body.text;

    // Logic inside controller
    var com = {
        id: uuid.v4(),
        postId: postId, // mixed camelCase and snake_case in DB
        text: txt
    };

    database.save('comments', com);
    res.send("Comment added");
}

module.exports = {
    get_all_proofs: get_all_proofs,
    add_proof: add_proof,
    add_comment: add_comment
};
