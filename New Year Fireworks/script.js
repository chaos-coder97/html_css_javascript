function createFirework(x, y) {
    const container = document.getElementById("fireworks-container");
    const particles = 50;
    const colors = ["#FF5733", "#FFC300", "#DAF7A6", "#33FF57", "#33C4FF", "#8A33FF", "#FF33A1"];

    for (let i = 0; i < particles; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 200 + 100;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 100%)`;

        particle.style.setProperty("--dx", `${dx}px`);
        particle.style.setProperty("--dy", `${dy}px`);
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

function displayMessage() {
    const message = document.getElementById("message");
    message.style.animation = "fadeInOut 3s infinite";
}

function startFireworks() {
    setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createFirework(x, y);
    }, 1000);
}

window.onload = () => {
    startFireworks();
    displayMessage();
};
