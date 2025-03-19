<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的網頁</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="login-container">
        <button id="loginBtn">登入</button>
        <div class="login-popup" id="loginPopup">
            <input type="text" id="username" placeholder="請輸入帳號">
            <input type="password" id="password" placeholder="請輸入密碼">
            <button onclick="login()">登入</button>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
