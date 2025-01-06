const usernameInput = document.getElementById("username");
const joinBtn = document.getElementById("join-btn");
const usernameError = document.getElementById("username-error");
const boardsSection = document.getElementById("boards-section");
const boardsList = document.getElementById("boards-list");
const postSection = document.getElementById("post-section");
const currentBoard = document.getElementById("current-board");
const postContent = document.getElementById("post-content");
const postBtn = document.getElementById("post-btn");
const feedSection = document.getElementById("feed-section");
const feed = document.getElementById("feed");

let username = "";
let selectedBoard = "";

joinBtn.addEventListener("click", () => {
  const enteredUsername = usernameInput.value.trim();
  if (!enteredUsername) {
    usernameError.textContent = "Username cannot be empty.";
    return;
  }

  fetch(`/api/join?username=${enteredUsername}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        username = enteredUsername;
        usernameError.textContent = "";
        usernameInput.value = "";
        document.getElementById("username-section").style.display = "none";
        boardsSection.style.display = "block";
      } else {
        usernameError.textContent = data.message;
      }
    });
});

boardsList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    selectedBoard = e.target.textContent;
    currentBoard.textContent = selectedBoard;
    postSection.style.display = "block";
    feedSection.style.display = "block";
    fetchFeed();
  }
});

postBtn.addEventListener("click", () => {
  const content = postContent.value.trim();
  if (!content) return;

  fetch(`/api/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, board: selectedBoard, content }),
  }).then(fetchFeed);

  postContent.value = "";
});

function fetchFeed() {
  fetch(`/api/feed?board=${selectedBoard}`)
    .then(response => response.json())
    .then(data => {
      feed.innerHTML = data.posts.map(post => `
        <div class="post">
          <strong>${post.username}:</strong> ${post.content}
        </div>
      `).join("");
    });
}
