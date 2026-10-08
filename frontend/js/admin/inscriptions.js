import { api } from "/frontend/js/config/api.js";

async function loadAll() {
    const composition = await api.get("/inscriptions");

    const container = document.getElementById("tbody");
    let html = "";

    composition.content.forEach((element) => {
        html += `
            <tr>
                <td>${element.activity}</td>
                <td>${element.participant}</td>
                <td>
                    <button type="button" class="delete-button" data-id="${element.id}">Excluir</button>
                </td>
            </tr>
        `;
    });

    container.innerHTML = html;
}

async function enableOptions(url, elementId) {
    const composition = await api.get(url);

    const container = document.getElementById(elementId);
    let html = "";

    composition.content.forEach((element) => {
        html += ` <option value="${element.id}">${element.name}</option>`;
    });
    container.innerHTML += html;
}

async function save(event) {
    event.preventDefault();

    const body = {
        id_activity: document.getElementById("id_activity").value,
        id_participant: document.getElementById("id_participant").value,
    };

    let result = await api.post("/inscriptions", body);

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

async function remove(id) {
    const result = await api.delete(`/inscriptions/${id}`);
    await loadAll();
    alert(result.message);
}

document.getElementById("form").addEventListener("submit", save);

document.getElementById("tbody").addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-button")) {
        remove(event.target.dataset.id);
    }
});

enableOptions("/activities", "id_activity");
enableOptions("/participants", "id_participant");
loadAll();
