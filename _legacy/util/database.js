const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/store.json');

// Helper to ensure db file exists
try {
    if (!fs.existsSync(dbPath)) {
        if (!fs.existsSync(path.dirname(dbPath))) {
            fs.mkdirSync(path.dirname(dbPath));
        }
        fs.writeFileSync(dbPath, JSON.stringify({ users: [], posts: [], comments: [] }));
        console.log("Initialized new DB");
    }
} catch(e) { console.log(e); }

function readDb() {
    // INTENTIONAL: Synchronous IO blocking the event loop
    console.log("Read DB...");
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
}

function writeDb(data) {
    // INTENTIONAL: Synchronous IO
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
    update: function() {
        // TODO: implement generic update
    },
    // Leaking raw access
    _raw: function() {
        return readDb();
    },
    _saveRaw: function(data) {
        writeDb(data);
    }
};
