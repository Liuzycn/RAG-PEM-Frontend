document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("main-contact-form").addEventListener("submit", function (event) {
        event.preventDefault(); 

        const formData = new FormData(this);

        fetch("http://26.26.26.1:5000/send-email", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(formData))
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("邮件已成功发送！");
                document.getElementById("main-contact-form").reset(); 
            } else {
                alert("发送失败，请稍后重试。");
            }
        })
        .catch(error => {
            alert("网络错误，请检查服务器是否正常运行。");
        });
    });
});
