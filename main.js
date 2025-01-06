document.getElementById("join").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    if (username) {
        fetch(`/join?username=${username}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    document.getElementById("login").style.display = "none";
                    document.getElementById("boards").style.display = "block";
                    alert("Welcome to Feniang, " + username + "!");
                } else {
                    document.getElementById("login-message").innerText = "Username is taken.";
                }
            });
    }
});

document.querySelectorAll("#boards li").forEach(li => {
    li.addEventListener("click", () => {
        const board = li.dataset.board;
        fetch(`/posts?board=${board}`)
            .then(res => res.json())
            .then(data => {
                const postsDiv = document.getElementById("posts");
                postsDiv.innerHTML = `<h3>${board.charAt(0).toUpperCase() + board.slice(1)} Board</h3>`;
                data.posts.forEach(post => {
                    postsDiv.innerHTML += `<p>${post}</p>`;
                });
            });
    });
});

document.getElementById("post").addEventListener("click", () => {
    const content = document.getElementById("post-content").value.trim();
    if (content) {
        fetch(`/post`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content })
        }).then(() => alert("Post submitted!"));
    }
});
