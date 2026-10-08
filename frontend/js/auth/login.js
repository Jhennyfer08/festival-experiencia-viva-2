import { api } from "/frontend/js/config/api.js";

async function login(event) {
    event.preventDefault();

    const body = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    let result = await api.post("/participants/login", body);
    const error = document.getElementById("errorMessage");

    if (!result.success) {
        error.textContent = result.message;
    } else {
        localStorage.setItem("access", JSON.stringify(result));
        error.textContent = "";

        window.location.href = "/frontend/html/home.html";
    }
}

document.getElementById("form").addEventListener("submit", login);
