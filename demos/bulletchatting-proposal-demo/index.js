document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('bullet-chatting-list');
    const video = document.querySelector('video');

    list.bulletchattingplaystate = 'paused';
    list.allowOverlap = true;
    list.area = 80;
    list.bulletchattingduration = 6000;

    window.addbulletchatting = (text, mode = 'scroll', fontSize, duration, delay) => {
        const bullet = document.createElement('bullet-chatting');
        bullet.innerHTML = text;
        bullet.mode = mode;
        if (fontSize) bullet.style.fontSize = fontSize + 'px';
        if (duration) bullet.bulletchattingduration = parseInt(duration, 10);
        if (delay) bullet.bulletchattingdelay = parseInt(delay, 10);
        list.appendChild(bullet);
    };

    const inputs = document.querySelectorAll(
        '.bulletchatting-text, .bulletchatting-mode, .bulletchatting-fontsize, .bulletchatting-duration, .bulletchatting-delay'
    );
    inputs.forEach(el => el.addEventListener('focus', () => {
        video.pause();
        list.bulletchattingplaystate = 'paused';
    }));

    document.getElementById('sendBtn').addEventListener('click', e => {
        e.preventDefault();
        const text = document.querySelector('.bulletchatting-text').value;
        const mode = document.querySelector('.bulletchatting-mode').value;
        const fontSize = document.querySelector('.bulletchatting-fontsize').value;
        const duration = document.querySelector('.bulletchatting-duration').value;
        const delay = document.querySelector('.bulletchatting-delay').value;
        addbulletchatting(text, mode, fontSize, duration, delay);
        video.play();
        list.bulletchattingplaystate = 'running';
    });

    const texts = [
        'This alpaca is so cute 😋',
        'Perfect in workmanship 🥳',
        'High-energy alarm 😱',
        "What's this alpaca's name?",
        'Short legs',
        'Is alpaca delicious?',
        'The alpaca is eating grass',
        'LOOOOOL',
        'Has anyone noticed his eyes?',
        'I love his smile',
        'He find the treasure',
        'Does alpaca like to eat berries? 🍇'
    ];

    const durationSec = 146;
    const bulletchattings = [];
    const TOTAL = 50;
    for (let i = 0; i < TOTAL; i++) {
        bulletchattings.push({
            text: texts[Math.floor(Math.random() * texts.length)],
            time: Math.random() * durationSec,
            mode: ['scroll', 'top', 'bottom'][Math.floor(Math.random() * 3)]
        });
    }
    bulletchattings.sort((a, b) => a.time - b.time);

    bulletchattings.slice(0, 5).forEach(c =>
        addbulletchatting(c.text, c.mode)
    );

    let index = 5;
    function nextFrame() {
        const now = video.currentTime;
        while (bulletchattings[index] && bulletchattings[index].time <= now) {
            addbulletchatting(bulletchattings[index].text, bulletchattings[index].mode);
            index++;
        }
        if (!video.paused) requestAnimationFrame(nextFrame);
    }

    video.addEventListener('play', () => {
        list.bulletchattingplaystate = 'running';
        requestAnimationFrame(nextFrame);
    });
    video.addEventListener('pause', () => {
        list.bulletchattingplaystate = 'paused';
    });
    video.addEventListener('seeking', () => {
        list.innerHTML = '';
        bulletchattings.slice(0, 5).forEach(c =>
            addbulletchatting(c.text, c.mode)
        );
        index = bulletchattings.findIndex(c => c.time > video.currentTime);
        if (index < 0) index = bulletchattings.length;
    });
});
