// script.js
function countdown(targetDate) {
    const target = new Date(targetDate).getTime();
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = target - now;

        if (distance <= 0) {
            clearInterval(interval);
            document.querySelector(".countdown").innerHTML = "<p>We're Live!</p>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Set the target launch date here
countdown("2024-12-31T00:00:00");
