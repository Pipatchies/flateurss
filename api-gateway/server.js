const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8600;

// Middleware
app.use(cors());

// Logging middleware
app.use((req, res, next) => {
    console.log(`[Gateway] ${req.method} ${req.url}`);
    next();
});

// Service User URL
const USERS_SERVICE_URL = process.env.USERS_SERVICE_URL || 'http://api-users:3001';
const POSTS_SERVICE_URL = process.env.POSTS_SERVICE_URL || 'http://api-posts:3002';
const MATCHMAKER_SERVICE_URL = process.env.MATCHMAKER_SERVICE_URL || 'http://api-matchmaker:3003';

// Health check
app.get('/ping', (req, res) => {
    res.send("pong from gateway");
});

// Proxy Rules
app.use('/users', createProxyMiddleware({
    target: USERS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/users': '/users', // Keeps /users path
    },
}));

app.use('/posts', createProxyMiddleware({
    target: POSTS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/posts': '/posts',
    },
}));

app.use('/comments', createProxyMiddleware({
    target: POSTS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/comments': '/comments',
    },
}));

app.use('/matchmake', createProxyMiddleware({
    target: MATCHMAKER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/matchmake': '/matchmake',
    },
}));

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
