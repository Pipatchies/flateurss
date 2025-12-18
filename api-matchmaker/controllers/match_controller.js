const axios = require('axios');

// Environment variable for User Service URL
const USERS_SERVICE_URL = process.env.USERS_SERVICE_URL || 'http://localhost:3001/users';

exports.getMatch = async (req, res) => {
    // Naive matching: returns random users that are not me
    const m_id = req.params.uid; 

    console.log(`[Matchmaker] Request for ${m_id}`);

    try {
        // Inter-service communication
        console.log(`[Matchmaker] Fetching users from ${USERS_SERVICE_URL}`);
        const response = await axios.get(USERS_SERVICE_URL);
        const all = response.data;

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
    } catch (error) {
        console.error("[Matchmaker] Error fetching users:", error.message);
        res.status(500).json({ error: "Failed to fetch candidates from User Service" });
    }
};
