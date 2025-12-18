const fs = require('fs');
const path = require('path');

// Adjusted path for microservice structure
const dbPath = path.join(__dirname, '../data/posts.json');

// Helper to ensure db file exists
try {
    if (!fs.existsSync(dbPath)) {
        if (!fs.existsSync(path.dirname(dbPath))) {
            fs.mkdirSync(path.dirname(dbPath), { recursive: true });
        }
        // Initialize with empty arrays for posts and comments
        fs.writeFileSync(dbPath, JSON.stringify({ posts: [], comments: [] }));
        console.log("Initialized new Posts DB at " + dbPath);
    }
} catch(e) { console.log(e); }

function readDb() {
    console.log("Read DB...");
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading DB:", err);
        return { posts: [], comments: [] };
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
    _raw: function() {
        return readDb();
    },
    _saveRaw: function(data) {
        writeDb(data);
    }
};
