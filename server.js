const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const usersFile = path.join(__dirname, "server", "users.json");
const boardsFile = path.join(__dirname, "server", "boards.json");

// Ensure JSON files exist
if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, JSON.stringify([]));
if (!fs.existsSync(boardsFile)) fs.writeFileSync(boardsFile, JSON.stringify({
    videos: [], awareness: [], holiday: [], funny: [], crazy: [], memes: []
}));

app.get("/join", (req, res) => {
    const username = req.query.username;
    const users = JSON.parse(fs.readFileSync(usersFile));

    if (users.includes(username)) {
        res.json({ success: false });
    } else {
        users.push(username);
        fs.writeFileSync(usersFile, JSON.stringify(users));
        res.json({ success: true });
    }
});

app.get("/posts", (req, res) => {
    const board = req.query.board;
    const boards = JSON.parse(fs.readFileSync(boardsFile));
    res.json({ posts: boards[board] || [] });
});

app.post("/post", (req, res) => {
    const { content } = req.body;
    const board = req.query.board || "videos"; // Default board
    const boards = JSON.parse(fs.readFileSync(boardsFile));

    if (boards[board]) {
        boards[board].push(content);
        fs.writeFileSync(boardsFile, JSON.stringify(boards));
    }
    res.status(200).end();
});

app.listen(3000, () => console.log("Feniang server running on http://localhost:3000"));
