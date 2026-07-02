document.addEventListener("DOMContentLoaded", () => {
    startSessionTimer();
});

function startSessionTimer() {
    // Store session start time (only once per login)
    if (!localStorage.getItem("sessionStart")) {
        localStorage.setItem("sessionStart", Date.now());
    }

    const timerDisplay = document.getElementById("session-timer");

    setInterval(() => {
        const startTime = parseInt(localStorage.getItem("sessionStart"));
        const currentTime = Date.now();

        let diff = Math.floor((currentTime - startTime) / 1000); // seconds

        let hours = Math.floor(diff / 3600);
        let minutes = Math.floor((diff % 3600) / 60);
        let seconds = diff % 60;

        // Format to 2 digits
        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        timerDisplay.textContent = `Session Time: ${hours}:${minutes}:${seconds}`;
    }, 1000);
}

function logout() {
    localStorage.removeItem("sessionStart");
    // redirect or other logout logic
    window.location.href = "teecha-login.html";
}

document.getElementById("itm-logout").addEventListener("click", function(){

    logout();
});

    