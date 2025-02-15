document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email === "almir@email.com" && password === "senha") {
        window.location.href = "success.html";
    } else {
        document.getElementById("error-message").textContent = "Credenciais inválidas";
    }
});
