const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const promClient = require('prom-client');
const userController = require('./controllers/user_controller');

const app = express();
const PORT = process.env.PORT || 3001;

// Metrics collection
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`[Users Service] ${req.method} ${req.url}`);
    next();
});

// Root Route
app.get('/', (req, res) => {
    res.send({ service: "api-users", status: "active" });
});

// User Routes
app.get('/users', userController.getAllUsers);
app.post('/users', userController.createUser);
app.get('/users/:id', userController.getUser);
app.post('/users/:id/profile', userController.updateProfile);

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
    console.log(`Users microservice listening on port ${PORT}`);
});
