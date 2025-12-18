const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const promClient = require('prom-client');
const postController = require('./controllers/post_controller');

const app = express();
const PORT = process.env.PORT || 3002;

// Metrics collection
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

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

// Metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

app.listen(PORT, () => {
    console.log(`Posts microservice listening on port ${PORT}`);
});
