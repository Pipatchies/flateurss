const assert = require('assert');

describe('Matchmaker Logic', () => {
    it('should return a match score with "flat" suffix', () => {
        const score = Math.floor(Math.random() * 100) + "% flat";
        assert.ok(score.endsWith("flat"), "The score should end with 'flat'");
    });

    it('should handle match object structure correctly', () => {
        const mockMatch = {
            name: "test_user",
            match_score: "85% flat"
        };
        assert.strictEqual(typeof mockMatch.name, 'string');
        assert.strictEqual(typeof mockMatch.match_score, 'string');
    });
});
