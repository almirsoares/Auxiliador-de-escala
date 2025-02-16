document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    console.log("Formulário enviado!"); // Debug

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Tentando login com:", email, password); // Debug

    try {
        const response = await fetch("login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }

        const result = await response.json();
        console.log("Resposta do servidor:", result); // Debug

        if (result.success) {
            sessionStorage.setItem("user", JSON.stringify(result.user));
            window.location.href = "success.html";
        } else {
            document.getElementById("error-message").textContent = "Credenciais inválidas";
        }
    } catch (error) {
        console.error("Erro:", error);
        document.getElementById("error-message").textContent = "Erro ao conectar com o servidor.";
    }
});


// Proteção na página success.html
if (!sessionStorage.getItem("user")) {
    window.location.href = "index.html";
} else {
    document.addEventListener("DOMContentLoaded", () => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        document.getElementById("user-name").textContent = user.nome;
        document.getElementById("user-role").textContent = user.nivel_acesso;
    });
}
