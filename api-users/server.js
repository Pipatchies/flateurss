const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./controllers/user_controller');

const app = express();
const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => {
    console.log(`Users microservice listening on port ${PORT}`);
});
