async function loadComponents(filePath, id) {
    const container = document.getElementById(id);

    const url = new URL(filePath, document.baseURI);
    const response = await fetch(url);

    const html = await response.text();
    container.innerHTML = html;
}

async function loadNavbar() {
    let access = JSON.parse(localStorage.getItem("access")) || "none";

    if (access.role === "admin") {
        await loadComponents("/frontend/html/components/navAdmin.html", "nav");
    } else if (access.role === "user") {
        await loadComponents("/frontend/html/components/navUser.html", "nav");
    } else {
        await loadComponents("/frontend/html/components/nav.html", "nav");
    }

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
