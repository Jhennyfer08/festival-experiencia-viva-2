import { api } from "/frontend/js/config/api.js";

function createParticipants(participants) {
    let html = "";

    if (participants) {
        for (const participant of participants) {
            html += `<li>${participant}</li>`
        }
    }

    return html;
}

async function loadAll() {
    const activities = await api.get("/activities");
    const container = document.getElementById("dashboard");

    let html = "";

    for (const element of activities.content) {
        console.log(element.participants);
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

                    <div class="participants">
                        <h2>Participants - ${element.quantity}/${element.capacity}</h2>

                        <ul>
                            ${createParticipants(element.participants)}
                        </ul>
                    </div>
                </div>
            </section>
        `;
    }
    container.innerHTML = html;
}

loadAll();
