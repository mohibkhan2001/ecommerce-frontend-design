// Sidebar Toggle
    const menuBtn = document.getElementById("menu-btn");
    const sidebar = document.getElementById("sidebar");
    const closeMenu = document.getElementById("close-menu");

    menuBtn.addEventListener("click", () => {
        sidebar.classList.remove("-translate-x-full");
    });

    closeMenu.addEventListener("click", () => {
        sidebar.classList.add("-translate-x-full");
    });

    // Countdown
    function startCountdown(durationInSeconds) {
        let timer = durationInSeconds;
        const daysElem = document.getElementById("days");
        const hoursElem = document.getElementById("hours");
        const minutesElem = document.getElementById("minutes");
        const secondsElem = document.getElementById("seconds");

        function updateCountdown() {
            const days = Math.floor(timer / (60 * 60 * 24));
            const hours = Math.floor((timer % (60 * 60 * 24)) / (60 * 60));
            const minutes = Math.floor((timer % (60 * 60)) / 60);
            const seconds = timer % 60;

            daysElem.textContent = String(days).padStart(2, '0');
            hoursElem.textContent = String(hours).padStart(2, '0');
            minutesElem.textContent = String(minutes).padStart(2, '0');
            secondsElem.textContent = String(seconds).padStart(2, '0');

            if (timer > 0) {
                timer--;
            }
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    startCountdown(5 * 24 * 60 * 60); // Set countdown for 5 days



    // Js code for toggle functionality of categories buttons




