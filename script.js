document.addEventListener('DOMContentLoaded', () => {
    const forgiveBtn = document.getElementById('forgiveBtn');
    const responseMsg = document.getElementById('response-msg');

    forgiveBtn.addEventListener('click', () => {
        // Confetti explosion
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffb6c1', '#e6e6fa', '#add8e6', '#ff0000']
        });

        // Heart rain
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // heart shape confetti
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                shapes: ['circle'],
                colors: ['#ffebf0', '#ff6b81']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                shapes: ['circle'],
                colors: ['#a2d2ff', '#e6e6fa']
            });
        }, 250);

        // Change button text and show message
        forgiveBtn.innerHTML = "<span>THANKS BESTIE! 🎉</span>";
        forgiveBtn.disabled = true;
        forgiveBtn.style.background = "#90ee90"; // Light green

        setTimeout(() => {
            responseMsg.classList.remove('hidden');
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, 500);
    });

    // Make checklist items toggleable for fun (even though they are visual)
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(:disabled)');
    checkboxes.forEach(box => {
        box.addEventListener('change', (e) => {
            if (e.target.checked) {
                confetti({
                    particleCount: 30,
                    spread: 40,
                    origin: { y: 0.8 }, // Bottom
                    scalar: 0.5
                });
            }
        });
    });

    // Meme Modal Logic
    const moodBtn = document.getElementById('moodBtn');
    const memeModal = document.getElementById('memeModal');
    const closeModal = document.getElementById('closeModal');
    const memeDisplay = document.getElementById('memeDisplay');
    const memeCaption = document.getElementById('memeCaption');

    // Mime Objects - Replace URL and CAption!
    const memes = [
        {
            url: "https://placehold.co/300x300/ffc0cb/ffffff?text=Really+Sad+Vibes",
            caption: "Me attempting to recount what happened..."
        },
        {
            url: "https://placehold.co/300x300/add8e6/ffffff?text=Plz+Forgive+Me",
            caption: "How I feel waiting for your text back 🥺"
        },
        {
            url: "https://placehold.co/300x300/e6e6fa/ffffff?text=I+Promise+I'm+Good",
            caption: "I promise I'll be good!! (Maybe)"
        },
        {
            url: "https://placehold.co/300x300/ffe4e1/ffffff?text=Love+U+Bestie",
            caption: "But seriously, I love you! 💕"
        }
    ];
    let currentMemeIndex = 0;

    function updateMeme() {
        const current = memes[currentMemeIndex];
        memeDisplay.src = current.url;
        memeCaption.textContent = current.caption;
    }

    if (moodBtn) {
        moodBtn.addEventListener('click', () => {
            memeModal.classList.remove('hidden');
            currentMemeIndex = 0;
            updateMeme();
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            memeModal.classList.add('hidden');
        });
    }

    // Close on background click
    window.addEventListener('click', (e) => {
        if (e.target === memeModal) {
            memeModal.classList.add('hidden');
        }
    });

    if (memeDisplay) {
        memeDisplay.addEventListener('click', () => {
            currentMemeIndex = (currentMemeIndex + 1) % memes.length;
            updateMeme();

            // Little pop effect
            memeDisplay.style.transform = "scale(0.95)";
            setTimeout(() => {
                memeDisplay.style.transform = "scale(1)";
            }, 100);
        });
    }

    // Punch Bag Logic
    const punchBtn = document.getElementById('punchBtn');
    const rageFill = document.getElementById('rageFill');
    const stickerGrid = document.getElementById('stickerGrid');
    let punchCount = 0;
    const maxPunches = 50; // Clicks to full rage

    if (punchBtn) {
        // Collect all sticker images
        const stickers = stickerGrid.querySelectorAll('.sticker');

        punchBtn.addEventListener('click', () => {
            punchCount++;

            // 1. Update Rage Meter
            const ragePercentage = Math.min((punchCount / maxPunches) * 100, 100);
            rageFill.style.width = `${ragePercentage}%`;

            // 2. Shake Button Effect
            punchBtn.style.transform = `rotate(${Math.random() * 10 - 5}deg) scale(0.95)`;
            setTimeout(() => {
                punchBtn.style.transform = "rotate(0deg) scale(1)";
            }, 50);

            // 3. Show/Cycle Stickers
            // Show one new sticker every few clicks, or cycle them if full
            const stickerIndex = (punchCount - 1) % stickers.length;

            // If we are in the first cycle, remove hidden class
            if (punchCount <= stickers.length) {
                stickers[stickerIndex].classList.remove('hidden');
            } else {
                // Flash the sticker
                const sticker = stickers[stickerIndex];
                sticker.style.transform = "scale(1.5) rotate(15deg)";
                setTimeout(() => sticker.style.transform = "scale(1)", 150);
            }

            // Confetti burst on heavy rage
            if (punchCount % 5 === 0) {
                confetti({
                    particleCount: 20,
                    spread: 50,
                    origin: { y: 0.5 },
                    colors: ['#ff0000', '#000000']
                });
            }
        });
    }
});
