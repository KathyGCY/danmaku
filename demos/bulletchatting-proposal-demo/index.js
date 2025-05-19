document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('bullet-chatting-list');
    const video = document.querySelector('video');
    const textInput = document.querySelector('.bulletchatting-text');
    const charCount = document.getElementById('charCount');
    const staticAlphaSlider = document.getElementById('staticAlpha');
    const MAX_CHARS = 55;

    // Live character countdown
    charCount.textContent = MAX_CHARS - textInput.value.length;
    textInput.addEventListener('input', () => {
        const rem = MAX_CHARS - textInput.value.length;
        charCount.textContent = rem >= 0 ? rem : 0;
    });

    // Initial list config
    list.bulletchattingplaystate = 'running';
    list.allowOverlap = true;
    list.area = 80;
    list.bulletchattingduration = 6000;

    // Color picker setup
    const swatches = document.querySelectorAll('.color-swatch');
    let selectedColor = '#ffffff';
    swatches.forEach(s => {
        s.addEventListener('click', () => {
            swatches.forEach(x => x.classList.remove('selected'));
            s.classList.add('selected');
            selectedColor = s.dataset.color;
        });
    });

    // Static alpha state
    let staticAlpha = parseFloat(staticAlphaSlider.value);
    staticAlphaSlider.addEventListener('input', () => {
        staticAlpha = parseFloat(staticAlphaSlider.value);
        document
            .querySelectorAll('bullet-chatting[data-static]')
            .forEach(b => b.style.opacity = staticAlpha);
    });

    // Add + auto-remove bullets, marking static with data-static
    window.addbulletchatting = (
        text, mode = 'scroll', fontSize, duration, delay, color = selectedColor, isStatic = false
    ) => {
        const bullet = document.createElement('bullet-chatting');
        bullet.innerHTML = text;
        bullet.mode = mode;
        if (fontSize) bullet.style.fontSize = fontSize + 'px';
        if (duration) bullet.bulletchattingduration = parseInt(duration, 10);
        if (delay) bullet.bulletchattingdelay = parseInt(delay, 10);
        bullet.style.color = color;
        if (isStatic) {
            bullet.dataset.static = 'true';
            bullet.style.opacity = staticAlpha;
        }
        list.appendChild(bullet);
        bullet.addEventListener('bulletchattingend', () => bullet.remove());
    };

    // Random static spawns (1–5s), each with own color
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
    function spawnRandomBullet() {
        const txt = texts[Math.floor(Math.random() * texts.length)];
        const md = ['scroll', 'top', 'bottom'][Math.floor(Math.random() * 3)];
        const fz = rand(18, 30).toFixed(0);
        const dur = rand(3000, 8000).toFixed(0);
        const col = swatches[Math.floor(Math.random() * swatches.length)].dataset.color;
        addbulletchatting(txt, md, fz, dur, 0, col, true);
    }
    (function scheduleSpawn() {
        spawnRandomBullet();
        setTimeout(scheduleSpawn, rand(1000, 5000));
    })();

    // Pause on typing if enabled
    const pauseOnTyping = document.getElementById('pauseOnTyping');
    document.querySelectorAll(
        '.bulletchatting-text, .bulletchatting-mode, .bulletchatting-fontsize, .bulletchatting-duration, .bulletchatting-delay'
    ).forEach(el =>
        el.addEventListener('focus', () => {
            if (pauseOnTyping.checked) {
                video.pause();
                list.bulletchattingplaystate = 'paused';
            }
        })
    );

    // Send button: user bullets always full opacity
    document.getElementById('sendBtn').addEventListener('click', e => {
        e.preventDefault();
        const text = textInput.value;
        const mode = document.querySelector('.bulletchatting-mode').value;
        const fontSize = document.querySelector('.bulletchatting-fontsize').value;
        const duration = document.querySelector('.bulletchatting-duration').value;
        const delay = document.querySelector('.bulletchatting-delay').value;
        addbulletchatting(text, mode, fontSize, duration, delay, selectedColor, false);
        video.play();
        list.bulletchattingplaystate = 'running';
    });
});
