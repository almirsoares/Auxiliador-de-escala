document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    console.log("Formulário enviado!"); // Debug
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const response = await fetch("https://almirsoares.free.nf/login.php", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    
    if (result.success) {
        sessionStorage.setItem("user", JSON.stringify(result.user));
        window.location.href = "success.html";
    } else {
        document.getElementById("error-message").textContent = "Credenciais inválidas";
    }
});