function adminLock() {
    let access = localStorage.getItem("access");

    if (!access) {
        window.location.href = "/frontend/html/auth/login.html";
        return;
    }

    access = JSON.parse(access);

    if (access.role !== "admin") {
        window.location.href = "/frontend/html/auth/login.html";
        return;
    }
}

adminLock();
