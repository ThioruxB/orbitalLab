document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas-features');
    if (!canvas) {
        console.error('Features canvas element not found');
        return;
    }
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 50; // Fewer particles for a subtler effect
    const maxDistance = 120;

    // Set canvas size
    function setCanvasSize() {
        const featuresSection = document.querySelector('.features');
        canvas.width = featuresSection.offsetWidth;
        canvas.height = featuresSection.offsetHeight;
    }

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.radius = 1.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 123, 255, 0.4)'; // Particle color (blue)
            ctx.fill();
        }
    }

    function init() {
        setCanvasSize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connect() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 123, 255, ${1 - distance / maxDistance * 0.5})`;
                    ctx.lineWidth = 0.3;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connect();

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', init);

    init();
    animate();
});