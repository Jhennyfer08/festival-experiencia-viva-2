async function loadComponents(filePath, id) {
    const container = document.getElementById(id);

    const url = new URL(filePath, document.baseURI);
    const response = await fetch(url);

    const html = await response.text();
    container.innerHTML = html;
}

await loadComponents("/frontend/html/components/header.html", "header");
await loadComponents("/frontend/html/components/nav.html", "nav");
await loadComponents("/frontend/html/components/footer.html", "footer");
