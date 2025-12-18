const fs = require('fs');
const path = require('path');

// Adjusted path for microservice structure: /app/data inside container or relative to local
const dbPath = path.join(__dirname, '../data/users.json');

// Helper to ensure db file exists
try {
    if (!fs.existsSync(dbPath)) {
        if (!fs.existsSync(path.dirname(dbPath))) {
            fs.mkdirSync(path.dirname(dbPath), { recursive: true });
        }
        // Initializing with users array only since this is api-users
        fs.writeFileSync(dbPath, JSON.stringify({ users: [] }));
        console.log("Initialized new Users DB at " + dbPath);
    }
} catch(e) { console.log(e); }

function readDb() {
    console.log("Read DB...");
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading DB:", err);
        return { users: [] };
    }
}

function writeDb(data) {
    console.log("Write DB...");
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = {
    get: function(collection) {
        var db = readDb();
        return db[collection] || [];
    },
    save: function(collection, item) {
        var db = readDb();
        if (!db[collection]) db[collection] = [];
        db[collection].push(item);
        writeDb(db);
        return item;
    },
    // Preserving _raw and _saveRaw for legacy controller compatibility
    _raw: function() {
        return readDb();
    },
    _saveRaw: function(data) {
        writeDb(data);
    }
};
