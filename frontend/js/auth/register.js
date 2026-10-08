import { api } from "/frontend/js/config/api.js";

async function register(event) {
    event.preventDefault();

    const error = document.getElementById("errorMessage");

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        error.textContent = "As senhas precisam ser iguais.";
        return;
    }

    const body = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: password, 
    };

    let result = await api.post("/participants", body);

    if (!result.success) {
        error.textContent = result.message;
    } else {
        alert(result.message);
        error.textContent = "";

        window.location.href = "/frontend/html/auth/login.html";
    }
}

document.getElementById("form").addEventListener("submit", register);