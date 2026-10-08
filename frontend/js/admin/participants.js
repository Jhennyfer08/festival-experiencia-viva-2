import { api } from "/frontend/js/config/api.js";

async function loadAll() {
    const composition = await api.get("/participants");

    const container = document.getElementById("tbody");
    let html = "";

    composition.content.forEach((element) => {
        html += `
            <tr>
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td>
                    <button type="button" class="edit-button" data-id="${element.id}">Editar</button>
                </td>
                <td>
                    <button type="button" class="delete-button" data-id="${element.id}">Excluir</button>
                </td>
            </tr>
        `;
    });

    container.innerHTML = html;
}
loadAll();

async function save(event) {
    event.preventDefault();

    const body = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    let result = "";
    const button = document.getElementById("submitButton");

    if (button.textContent === "Alterar") {
        body.id = button.dataset.id;
        result = await api.put("/participants", body);
        button.textContent = "Cadastrar";
    } else {
        result = await api.post("/participants", body);
    }
    
    const error = document.getElementById("errorMessage");
    if (!result.success) {
        error.textContent = result.message;
    } else {
        error.textContent = "";
        alert(result.message);
    }

    event.target.reset();
    await loadAll();
}

async function edit(id) {
    const button = document.getElementById("submitButton");

    const composition = await api.get(`/participants/${id}`);

    document.getElementById("name").value = composition.content.name;
    document.getElementById("email").value = composition.content.email;
    document.getElementById("password").value = composition.content.password;

    button.textContent = "Alterar";
    button.dataset.id = id;
}

async function remove(id) {
    const result = await api.delete(`/participants/${id}`);
    await loadAll();
    alert(result.message);
}

document.getElementById("form").addEventListener("submit", save);

document.getElementById("tbody").addEventListener("click", async (event) => {
    if (event.target.classList.contains("edit-button")) {
        edit(event.target.dataset.id);
    }

    if (event.target.classList.contains("delete-button")) {
        remove(event.target.dataset.id);
    }
});