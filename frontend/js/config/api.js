class Api {
    constructor(uri = "http://localhost:3000") {
        this.uri = uri || "http://localhost:3000";
    }

    async request(url, options = {}) {
        const response = await fetch(this.uri + url, {
            headers: { "Content-Type": "application/json" },
            ...options,
        });

        const data = await response.json();
        return data;
    }

    get(url) {
        return this.request(url);
    }

    post(url, body) {
        return this.request(url, {
            method: "POST",
            body: JSON.stringify(body),
        });
    }

    put(url, body) {
        return this.request(url, {
            method: "PUT",
            body: JSON.stringify(body),
        });
    }

    delete(url) {
        return this.request(url, {
            method: "DELETE",
        });
    }
}

export const api = new Api();