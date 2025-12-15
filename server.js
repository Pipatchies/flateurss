const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Imports - Messy structure
const userController = require('./app/controllers/user_controller');
const postService = require('./app/Services/PostService');
const matchmaker = require('./src/matchmaker');

// Logging middleware
app.use((req, res, next) => {
    console.log(req.method + " " + req.url);
    next();
});

// Root Route
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>Flateurss</title></head>
            <body>
                <h1>Flateurss Legacy Monolith</h1>
                <p>Welcome to the edge of the world.</p>
                <ul>
                    <li><a href="/users">List Users</a></li>
                    <li><a href="/posts">List Proofs</a></li>
                </ul>
                <p><i>API Status: Unstable</i></p>
            </body>
        </html>
    `);
});

// User Routes
app.get('/users', userController.getAllUsers);
app.post('/users', userController.createUser);
app.get('/users/:id', userController.getUser);
app.post('/users/:id/profile', userController.updateProfile);

// Post Routes - accessing Service directly
app.get('/posts', postService.get_all_proofs);
app.post('/posts', postService.add_proof);
// Comment route defined inline for some reason
app.post('/comments', (req, res) => {
    // just delegate
    postService.add_comment(req, res);
});

// Matchmaker
app.get('/matchmake/:uid', matchmaker);

// Health check with mixed response type
app.get('/ping', function (req, res) {
    if (Math.random() > 0.9) {
        // Random failure simulation
        res.status(500).end();
    } else {
        res.send("pong");
    }
});

// Global error handler (barely works)
app.use((err, req, res, next) => {
    console.error("Something broke!", err);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Flateurss app listening on port ${PORT}`);
    // Check if data dir exists
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }
});
