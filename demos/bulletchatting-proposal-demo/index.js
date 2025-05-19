document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('bullet-chatting-list');
    const video = document.querySelector('video');
    const textInput = document.querySelector('.bulletchatting-text');
    const charCount = document.getElementById('charCount');
    const MAX_CHARS = 55;

    // 1) Character-count setup
    charCount.textContent = MAX_CHARS - textInput.value.length;
    textInput.addEventListener('input', () => {
        const remaining = MAX_CHARS - textInput.value.length;
        charCount.textContent = remaining >= 0 ? remaining : 0;
    });

    // 2) initial config
    list.bulletchattingplaystate = 'running';
    list.allowOverlap = true;
    list.area = 80;
    list.bulletchattingduration = 6000;

    // 3) add + auto-remove bullets
    window.addbulletchatting = (text, mode = 'scroll', fontSize, duration, delay) => {
        const bullet = document.createElement('bullet-chatting');
        bullet.innerHTML = text;
        bullet.mode = mode;
        if (fontSize) bullet.style.fontSize = fontSize + 'px';
        if (duration) bullet.bulletchattingduration = parseInt(duration, 10);
        if (delay) bullet.bulletchattingdelay = parseInt(delay, 10);
        list.appendChild(bullet);
        bullet.addEventListener('bulletchattingend', () => bullet.remove());
    };

    // 4) seed texts + random helper
    const texts = [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
        "Sed do eiusmod tempor incididunt",
        "Ut labore et dolore magna aliqua",
        "Ut enim ad minim veniam",
        "Quis nostrud exercitation ullamco",
        "Laboris nisi ut aliquip ex ea commodo consequat"
    ];
    const rand = (min, max) => Math.random() * (max - min) + min;

    // 5) spawn one random static bullet
    function spawnRandomBullet() {
        const text = texts[Math.floor(Math.random() * texts.length)];
        const mode = ['scroll', 'top', 'bottom'][Math.floor(Math.random() * 3)];
        const fontSize = rand(18, 30).toFixed(0);
        const duration = rand(3000, 8000).toFixed(0);
        addbulletchatting(text, mode, fontSize, duration, 0);
    }

    // 6) schedule random spawns indefinitely (every 1–5s)
    (function scheduleSpawn() {
        spawnRandomBullet();
        setTimeout(scheduleSpawn, rand(1000, 5000));
    })();

    // 7) pause on typing if enabled
    const pauseOnTyping = document.getElementById('pauseOnTyping');
    document.querySelectorAll(
        '.bulletchatting-text, .bulletchatting-mode, .bulletchatting-fontsize, .bulletchatting-duration, .bulletchatting-delay'
    ).forEach(el =>
        el.addEventListener('focus', () => {
            if (!pauseOnTyping || pauseOnTyping.checked) {
                video.pause();
                list.bulletchattingplaystate = 'paused';
            }
        })
    );

    // 8) Send button: add user bullet then resume
    document.getElementById('sendBtn').addEventListener('click', e => {
        e.preventDefault();
        const text = textInput.value;
        const mode = document.querySelector('.bulletchatting-mode').value;
        const fontSize = document.querySelector('.bulletchatting-fontsize').value;
        const duration = document.querySelector('.bulletchatting-duration').value;
        const delay = document.querySelector('.bulletchatting-delay').value;
        addbulletchatting(text, mode, fontSize, duration, delay);
        video.play();
        list.bulletchattingplaystate = 'running';
    });
});
