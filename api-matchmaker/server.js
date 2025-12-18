const express = require('express');
const cors = require('cors');
const matchController = require('./controllers/match_controller');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());

// Logging middleware
app.use((req, res, next) => {
    console.log(`[Matchmaker Service] ${req.method} ${req.url}`);
    next();
});

// Root Route
app.get('/', (req, res) => {
    res.send({ service: "api-matchmaker", status: "active", owner: "Scientific Team" });
});

// Matchmaker Route
app.get('/matchmake/:uid', matchController.getMatch);


// Health check
app.get('/ping', function (req, res) {
    res.send("pong");
});

app.listen(PORT, () => {
    console.log(`Matchmaker microservice listening on port ${PORT}`);
});
