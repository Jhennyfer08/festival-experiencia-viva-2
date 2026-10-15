async function loadComponents(filePath, id) {
    const container = document.getElementById(id);

    const url = new URL(filePath, document.baseURI);
    const response = await fetch(url);

    const html = await response.text();
    container.innerHTML = html;
}

async function loadNavbar() {
    let access = JSON.parse(localStorage.getItem("access")) ?? {};

    let html = "";

    if (access.role === "admin") {
        html = `
        <ul>
            <li><a href="/frontend/html/admin/dashboard.html">Métricas</a></li>
            <li><a href="/frontend/html/admin/participants.html">Participantes</a></li>
            <li><a href="/frontend/html/admin/actvities.html">Atividades</a></li>
            <li><a href="/frontend/html/admin/inscriptions.html">Inscrições</a></li>
            <li><a href="#" id="logout">Sair</a></li>
        </ul>
        `
    } else if (access.role === "user") {
        hmtl = `
        <ul>
            <li><a href="/frontend/html/home.html">Início</a></li>
            <li><a href="/frontend/html/home.html#footer">Sobre</a></li>
            <li><a href="#" id="logout">Sair</a></li>
        </ul>
        `
    } else {
        html = `
            <ul>
                <li><a href="/frontend/html/auth/login.html">Entrar</a></li>
                <li><a href="/frontend/html/auth/register.html">Cadastrar</a></li>
            </ul>
           `
    }
    document.getElementById("nav").innerHTML = html;

    const element = document.getElementById("logout");
    if (element) {
        element.addEventListener("click", () => {
            localStorage.removeItem("access");
            window.location.href = "/frontend/html/auth/login.html";
        });
    }
}

await loadComponents("/frontend/html/components/header.html", "header");
await loadComponents("/frontend/html/components/footer.html", "footer");
await loadNavbar();
