const db = require('../util/database');
const { v4: uuidv4 } = require('uuid');

exports.getAllUsers = (req, res) => {
    console.log("Fetching users");
    const users = db.get('users');
    res.json(users);
};

exports.createUser = (req, res) => {
    const body = req.body;

    if (!body.username || !body.email) {
        return res.status(400).send("Bad Request: missing fields");
    }

    const newUser = {
        id: uuidv4(),
        username: body.username,
        email: body.email,
        bio: "I know the truth",
        joined_at: new Date().toISOString()
    };

    console.log("Creating user: " + newUser.username);
    db.save('users', newUser);
    res.status(201).json(newUser);
};

exports.getUser = (req, res) => {
    const id = req.params.id;
    const users = db.get('users');
    
    let found = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            found = users[i];
            break;
        }
    }

    if (found) {
        res.json(found);
    } else {
        res.status(404).send("User not found");
    }
};

exports.updateProfile = (req, res) => {
    const userId = req.params.id;
    const data = req.body;
    console.log("updating profile for " + userId);

    const dbData = db._raw();
    let userIndex = -1;

    // Safety check for dbData.users
    if (!dbData.users) dbData.users = [];

    dbData.users.forEach((u, idx) => {
        if (u.id === userId) userIndex = idx;
    });

    if (userIndex > -1) {
        dbData.users[userIndex].region = data.region;
        dbData.users[userIndex].language = data.language;
        dbData.users[userIndex].is_flat_verified = true;

        db._saveRaw(dbData);
        res.json(dbData.users[userIndex]);
    } else {
        res.send("Error: user not found");
    }
};
