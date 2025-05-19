document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('bullet-chatting-list');
    const video = document.querySelector('video');
    const textInput = document.querySelector('.bulletchatting-text');
    const charCount = document.getElementById('charCount');
    const MAX_CHARS = 55;

    // 1) Live character countdown
    charCount.textContent = MAX_CHARS - textInput.value.length;
    textInput.addEventListener('input', () => {
        const rem = MAX_CHARS - textInput.value.length;
        charCount.textContent = rem >= 0 ? rem : 0;
    });

    // 2) Initial bullet-chat config
    list.bulletchattingplaystate = 'running';
    list.allowOverlap = true;
    list.area = 80;
    list.bulletchattingduration = 6000;

    // 3) Color palette
    const palette = [
        '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00',
        '#ff9900', '#9900ff', '#00ffff', '#ff00ff', '#000000'
    ];
    let selectedColor = '#ffffff';

    // 4) Wire up color‐swatch clicks
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(s => {
        s.addEventListener('click', () => {
            swatches.forEach(x => x.classList.remove('selected'));
            s.classList.add('selected');
            selectedColor = s.dataset.color;
        });
    });

    // 5) add + auto-remove bullets, now accepts optional color
    window.addbulletchatting = (
        text,
        mode = 'scroll',
        fontSize,
        duration,
        delay,
        color = selectedColor  // default to current user choice
    ) => {
        const bullet = document.createElement('bullet-chatting');
        bullet.innerHTML = text;
        bullet.mode = mode;
        if (fontSize) bullet.style.fontSize = fontSize + 'px';
        if (duration) bullet.bulletchattingduration = parseInt(duration, 10);
        if (delay) bullet.bulletchattingdelay = parseInt(delay, 10);
        bullet.style.color = color;
        list.appendChild(bullet);
        bullet.addEventListener('bulletchattingend', () => bullet.remove());
    };

    // 6) Random static spawns (1–5s), each with its own random color
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
        const col = palette[Math.floor(Math.random() * palette.length)];
        addbulletchatting(txt, md, fz, dur, 0, col);
    }
    (function scheduleSpawn() {
        spawnRandomBullet();
        setTimeout(scheduleSpawn, rand(1000, 5000));
    })();

    // 7) Pause on typing if checkbox checked
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

    // 8) Send button
    document.getElementById('sendBtn').addEventListener('click', e => {
        e.preventDefault();
        const text = textInput.value;
        const mode = document.querySelector('.bulletchatting-mode').value;
        const fontSize = document.querySelector('.bulletchatting-fontsize').value;
        const duration = document.querySelector('.bulletchatting-duration').value;
        const delay = document.querySelector('.bulletchatting-delay').value;
        // pass selectedColor explicitly for user bullet
        addbulletchatting(text, mode, fontSize, duration, delay, selectedColor);
        video.play();
        list.bulletchattingplaystate = 'running';
    });
});
