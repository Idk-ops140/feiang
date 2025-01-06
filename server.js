const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
let posts = JSON.parse(fs.readFileSync("posts.json", "utf-8"));

app.get("/api/join", (req, res) => {
  const { username } = req.query;
  if (users.includes(username)) {
    return res.json({ success: false, message: "Username is taken." });
  }
  users.push(username);
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
  res.json({ success: true });
});

app.post("/api/post", (req, res) => {
  const { username, board, content } = req.body;
  posts.push({ username, board, content });
  fs.writeFileSync("posts.json", JSON.stringify(posts, null, 2));
  res.json({ success: true });
});

app.get("/api/feed", (req, res) => {
  const { board } = req.query;
  const filteredPosts = posts.filter(post => post.board === board);
  res.json({ posts: filteredPosts });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
