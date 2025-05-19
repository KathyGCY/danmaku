document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('bullet-chatting-list');
    const video = document.querySelector('video');
    const textInput = document.querySelector('.bulletchatting-text');
    const charCount = document.getElementById('charCount');
    const staticAlphaSl = document.getElementById('staticAlpha');
    const enableBullets = document.getElementById('enableBullets');
    const MAX_CHARS = 55;

    // live char countdown
    charCount.textContent = MAX_CHARS - textInput.value.length;
    textInput.addEventListener('input', () => {
        const rem = MAX_CHARS - textInput.value.length;
        charCount.textContent = rem >= 0 ? rem : 0;
    });

    // initial config
    list.bulletchattingplaystate = 'running';
    list.allowOverlap = true;
    list.area = 80;
    list.bulletchattingduration = 6000;

    // color swatches
    const swatches = document.querySelectorAll('.color-swatch');
    let selectedColor = '#ffffff';
    swatches.forEach(s => {
        s.addEventListener('click', () => {
            swatches.forEach(x => x.classList.remove('selected'));
            s.classList.add('selected');
            selectedColor = s.dataset.color;
        });
    });

    // static alpha
    let staticAlpha = parseFloat(staticAlphaSl.value);
    staticAlphaSl.addEventListener('input', () => {
        staticAlpha = parseFloat(staticAlphaSl.value);
        document.querySelectorAll('bullet-chatting[data-static]').forEach(b => {
            b.style.opacity = staticAlpha;
        });
    });

    // spawn/add bullet
    window.addbulletchatting = (
        text, mode = 'scroll', fontSize, duration, delay, color = selectedColor, isStatic = false
    ) => {
        if (!enableBullets.checked) return;
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

    // random static spawns
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
        if (enableBullets.checked) spawnRandomBullet();
        setTimeout(scheduleSpawn, rand(1000, 5000));
    })();

    // pause on typing
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

    // send button
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
