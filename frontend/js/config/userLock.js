function userLock() {
    let access = localStorage.getItem("access");

    if (!access) {
        window.location.href = "/frontend/html/auth/login.html";
        return;
    }

    access = JSON.parse(access);

    if (access.role !== "user") {
        window.location.href = "/frontend/html/auth/login.html";
        return;
    }
}

userLock();
