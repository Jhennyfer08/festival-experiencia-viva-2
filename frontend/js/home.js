import { api } from "/frontend/js/config/api.js";

function createButton(inscripted, id) {
    if (inscripted.includes(id)) {
        return `<p>Botão Desinscrever ${id}</p>`;
    } else {
        return `<p>Botão Inscrever ${id}</p>`;
    }
}

async function loadAll() {
    const activities = await api.get("/activities");
    const participants = await api.get("/participants/1");

    const container = document.getElementById("main");

    let html = "";

    activities.content.forEach((element) => {
        html += `
            <section class="activity-container">
                <div class="img-container">
                    <img src="${element.image}" alt="${element.name}">
                </div>
                <div class="activity-info">
                    <h2>${element.name}</h2>
                    <p>${element.description}</p>
                    <address>${element.position}</address>
                    <time datetime="${element.time}"> ${element.date} às ${element.time}</time>
                    ${createButton(participants.content.inscripted, element.id)}
                </div>
            </section>
        `;
    });

    container.innerHTML = html;
}

loadAll();
