const db = require('../util/database');

module.exports = function matchmaker(req, res) {
    // Naive matching: returns random users that are not me
    const m_id = req.params.uid; // "uid" vs "userId" vs "id"

    console.log("Matchmaking for " + m_id);

    const all = db.get('users');
    const matches = all.filter(u => u.id != m_id).slice(0, 5);

    // Return lightweight objects
    const ret = matches.map(m => {
        return {
            name: m.username,
            match_score: Math.floor(Math.random() * 100) + "% flat"
        }
    });

    res.json({
        candidate: m_id,
        matches: ret
    });
}
