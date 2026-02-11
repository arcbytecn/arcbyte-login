// =============================
// ArcByte Login System
// =============================

// ===== 模拟账户数据库 =====
const accounts = [
    {
        username: "charles.li@arcbytecn.com",
        password: "Lwj110719",
        redirect: "./results/client_id=accountodactyl-prod&method=arcbyte_identity&platform=web/redirect_uri=https%253A%252F%252Fauth.arcbytecn.com%252Fauthorize%253Facr_values%253Durn%25253Aarcbytecn%25253Agold%2526cl.html"
    },
];

// ===== 获取元素 =====
const username = document.getElementById("username");
const password = document.getElementById("password");
const passwordArea = document.getElementById("passwordArea");
const errorText = document.getElementById("errorText");
const signinBtn = document.getElementById("signinBtn");

let expanded = false;

// ===== 展开密码框 =====
function expandPassword() {
    if (expanded) return;
    passwordArea.classList.add("show");
    expanded = true;
}

function collapsePassword() {
    passwordArea.classList.remove("show");
    expanded = false;
    password.value = "";
    errorText.style.display = "none";
}

// ===== 用户名输入监听 =====
username.addEventListener("input", () => {
    username.value ? expandPassword() : collapsePassword();
});

username.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && username.value.length > 0) {
        expandPassword();
        password.focus();
    }
});

password.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        signinBtn.click();
    }
});

// ===== 登录逻辑 =====
signinBtn.addEventListener("click", () => {

    if (!expanded) return;

    const user = username.value.trim();
    const pass = password.value;

    const matchedAccount = accounts.find(acc =>
        acc.username === user && acc.password === pass
    );

    if (matchedAccount) {
        window.location.href = matchedAccount.redirect;
        return;
    }

    // 错误显示
    password.classList.add("error");
    username.classList.add("error");
    errorText.style.display = "block";
});

password.addEventListener("input", () => {
    password.classList.remove("error");
    username.classList.remove("error");
    errorText.style.display = "none";
});
