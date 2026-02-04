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
            url: "images/1.jpeg",
            caption: "me before drinking: “I’m literally fine.”"
        },
        {
            url: "images/2.jpeg",
            caption: "alcohol entering my system like it pays rent"
        },
        {
            url: "images/3.jpeg",
            caption: "confidence increasing, sense decreasing"
        },
        {
            url: "images/4.jpeg",
            caption: "when your brain leaves the chat"
        },
        {
            url: "images/5.jpeg",
            caption: "me staring into nothing thinking “maybe I should stop”"
        },
        {
            url: "images/6.jpeg",
            caption: "but also me: does not stop"
        },
        {
            url: "images/7.jpeg",
            caption: "the sink seeing me walk towards it like this"
        },
        {
            url: "images/8.jpeg",
            caption: "me after ruining its entire life"
        },
        {
            url: "images/9.jpeg",
            caption: "still thinking I can fix this somehow"
        },
        {
            url: "images/10.jpeg",
            caption: "shrek voice in my head: “you messed up”"
        },
        {
            url: "images/11.jpeg",
            caption: "trying to look cute so you don’t get mad"
        },
        {
            url: "images/12.jpeg",
            caption: "acting like this kind of thing happens to me daily"
        },
        {
            url: "images/13.jpeg",
            caption: "my inner child watching me embarrass myself"
        },
        {
            url: "images/14.jpeg",
            caption: "stretching logic, patience, and your tolerance"
        },
        {
            url: "images/15.jpeg",
            caption: "me pulling up like “let’s talk calmly”"
        },
        {
            url: "images/16.jpeg",
            caption: "sorry for being annoying (I will be again)"
        },
        {
            url: "images/17.jpeg",
            caption: "me apologising with zero self-respect"
        },
        {
            url: "images/18.jpeg",
            caption: "me begging in HD"
        },
        {
            url: "images/19.jpeg",
            caption: "this is me asking for forgiveness before you block me"
        },
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

            // Max Rage Check
            if (punchCount >= maxPunches) {
                const overlay = document.getElementById('maxRageOverlay');
                overlay.classList.remove('hidden');

                // Hide after 5 seconds and reset
                setTimeout(() => {
                    overlay.classList.add('hidden');
                    punchCount = 0; // Reset count
                    rageFill.style.width = '0%'; // Reset bar
                }, 5000);

                return;
            }

            // 2. Shake Button Effect
            punchBtn.style.transform = `rotate(${Math.random() * 20 - 10}deg) scale(0.9)`;
            setTimeout(() => {
                punchBtn.style.transform = "rotate(0deg) scale(1)";
            }, 100);

            // 3. Show/Cycle Stickers with BIG BOUNCE
            const stickerIndex = (punchCount - 1) % stickers.length;
            const sticker = stickers[stickerIndex];

            // Reset state first to allow replay
            sticker.classList.add('hidden');
            sticker.classList.remove('big-bounce');

            // Force reflow
            void sticker.offsetWidth;

            // Show and Animate
            sticker.classList.remove('hidden');
            sticker.classList.add('big-bounce');

            // Hide after animation (0.8s matches CSS)
            setTimeout(() => {
                sticker.classList.add('hidden');
                sticker.classList.remove('big-bounce');
            }, 800);


            // Confetti burst on heavy rage
            if (punchCount % 5 === 0) {
                confetti({
                    particleCount: 30,
                    spread: 80,
                    origin: { y: 0.5 },
                    colors: ['#ff0000', '#000000']
                });
            }
        });
    }

    // Special Sad Emoji for "Never Drink at your Place"
    const p3 = document.getElementById('p3');
    if (p3) {
        p3.addEventListener('change', (e) => {
            if (e.target.checked) {
                const emoji = document.createElement('div');
                emoji.textContent = '😭';
                emoji.classList.add('sad-emoji-drop');
                e.target.parentElement.appendChild(emoji);
            } else {
                const existing = e.target.parentElement.querySelector('.sad-emoji-drop');
                if (existing) existing.remove();
            }
        });
    }
});
