async function analyze() {
    let query = document.getElementById("query").value.trim();
    let model = document.querySelector("select").value;
    const picture = model.split("-")[0]

    if (!query) {
        alert("请输入内容");
        return;
    }

    const chatBox = document.getElementById("chat-box");

    // 添加用户消息
    const userBubble = document.createElement("div");
    userBubble.classList.add("message", "user");
    userBubble.innerHTML = `
        <img src="images/user.jpg" alt="User">
        <div class="bubble">${query}</div>
    `;
    chatBox.appendChild(userBubble);
    document.getElementById("query").value = ""; 
    chatBox.scrollTop = chatBox.scrollHeight;

    // 添加 AI 加载动画
    const aiBubble = document.createElement("div");
    aiBubble.classList.add("message", "ai");
    aiBubble.innerHTML = `
        <img src="images/${picture}.jpg" alt="AI">
        <div class="bubble">
            <span class="loading"></span>
            <span class="loading"></span>
            <span class="loading"></span>
        </div>
    `;
    chatBox.appendChild(aiBubble);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        let response = await fetch("http://26.26.26.1:5000/analyze", {//http:///analyze
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: query, model:model })
        });

        if (!response.ok) {
            throw new Error(`服务器错误: ${response.status}`);
        }

        let data = await response.json();

        // 替换 AI 的加载动画为实际回答
        aiBubble.querySelector(".bubble").innerText = data.result;
    } catch (error) {
        aiBubble.querySelector(".bubble").innerText = "请求失败，请检查网络连接或服务器状态！";
        console.error("错误详情:", error);
    }
}
