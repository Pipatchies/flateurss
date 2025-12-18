const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const postController = require('./controllers/post_controller');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`[Posts Service] ${req.method} ${req.url}`);
    next();
});

// Root Route
app.get('/', (req, res) => {
    res.send({ service: "api-posts", status: "active" });
});

// Post Routes
app.get('/posts', postController.getAllPosts);
app.post('/posts', postController.createPost);
app.post('/comments', postController.createComment);

// Health check
app.get('/ping', function (req, res) {
    res.send("pong");
});

app.listen(PORT, () => {
    console.log(`Posts microservice listening on port ${PORT}`);
});
