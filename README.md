# Flateurss - Legacy Monolith

Welcome to Flateurss, the premier platform for truth-seekers around the globe (which is flat).

## Setup
1. Install nodejs (v14 or whatever works).
2. Run `npm install`.

## Running
`npm start` or just `node server.js`.
Server runs on port 3002 by default.

## API Endpoints
- `GET /` - Homepage
- `GET /users` - List all users
- `POST /users` - Create user
- `GET /users/:id` - Get user
- `POST /users/:id/profile` - Update profile
- `GET /posts` - Get proofs
- `POST /posts` - Add a proof
- `GET /matchmake/:userId` - Find flat-soulmates

## Example Usage
```bash
# Create user
curl -X POST -H "Content-Type: application/json" -d '{"username": "truth_seeker_99", "email": "bob@flat.earth"}' http://localhost:3000/users

# List posts
curl http://localhost:3002/posts
```

## Known Technical Debt (DO NOT TOUCH UNLESS REQUESTED)
- **Permissions**: Anyone can do anything. Auth is "coming soon".
- **Performance**: It gets slow when the database file grows. We don't know why (probably the sync IO).
- **Code Style**: Written by 5 different interns. Some files use `var`, some `const`. Variable naming is a mess.
- **Database**: It's just a JSON file. If two people write at the same time, we might lose data.
- **Error Handling**: Sometimes it crashes, sometimes it returns 200 OK with an error message.
