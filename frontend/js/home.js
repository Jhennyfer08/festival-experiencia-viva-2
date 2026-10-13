import { api } from "/frontend/js/config/api.js";

async function createButton(activityId, participantId) {
    const result = await api.get(
        `/inscriptions/${activityId}/${participantId}`,
    );

    if (!result.success) {
        return `<button type="button" class="inscript-button" data-activity="${activityId}">Se Inscrever</button>`;
    } else {
        return `<button type="button" class="inscript-button inscripted" data-activity="${activityId}" data-inscription="${result.content.id}">Cancelar Inscrição</button>`;
    }
}

async function loadAll() {
    let access = JSON.parse(localStorage.getItem("access"));

    const activities = await api.get("/activities");
    const container = document.getElementById("main");

    let html = "";

    for (const element of activities.content) {
        html += `
            <section class="activity-container">
                <div class="img-container">
                    <img src="${element.image}" alt="${element.name}">
                </div>

                <div class="activity-info">
                    <h2>${element.name}</h2>
                    <p>${element.description}</p>

                    <div class="place">
                        <address>${element.position}</address>
                        <time datetime="${element.time}"> ${element.date} às ${element.time}</time>
                    </div>

                    ${await createButton(element.id, access.id)}
                </div>
            </section>
        `;
    }
    container.innerHTML = html;

    document.querySelectorAll(".inscript-button").forEach((button) => {
        if (button.classList.contains("inscripted")) {
            button.addEventListener(
                "click",
                async (event) => await unsubscript(event),
            );
        } else {
            button.addEventListener(
                "click",
                async (event) => await inscript(event),
            );
        }
    });
}

async function inscript(event) {
    const button = event.currentTarget;
    let access = JSON.parse(localStorage.getItem("access"));

    const body = {
        id_activity: Number(button.dataset.activity),
        id_participant: access.id,
    };

    const response = await api.post("/inscriptions", body);

    if (response.success) {
        button.dataset.inscription = response.id;
        window.location.reload();
    }
}

async function unsubscript(event) {
    const button = event.currentTarget;
    const id = button.dataset.inscription;

    const response = await api.delete(`/inscriptions/${id}`);

    if (response.success) {
        delete button.dataset.inscription;
        window.location.reload();
    }
}

loadAll();
