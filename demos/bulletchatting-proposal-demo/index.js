document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('bullet-chatting-list');
    const video = document.querySelector('video');
    const textInput = document.querySelector('.bulletchatting-text');
    const charCount = document.getElementById('charCount');
    const staticAlphaSl = document.getElementById('staticAlpha');
    const enableBullets = document.getElementById('enableBullets');
    const MAX_CHARS = 55;

    // BANNED WORD LIST (case‐insensitive)
    const bannedWords = ['geronimo'];

    // CHAR COUNTDOWN
    charCount.textContent = MAX_CHARS - textInput.value.length;
    textInput.addEventListener('input', () => {
        const rem = MAX_CHARS - textInput.value.length;
        charCount.textContent = rem >= 0 ? rem : 0;
    });

    // INITIAL CONFIG
    list.bulletchattingplaystate = 'running';
    list.allowOverlap = false;
    list.area = 80;
    list.bulletchattingduration = 6000;

    // COLOR SWATCHES
    const swatches = document.querySelectorAll('.color-swatch');
    let selectedColor = '#ffffff';
    swatches.forEach(s => {
        s.addEventListener('click', () => {
            swatches.forEach(x => x.classList.remove('selected'));
            s.classList.add('selected');
            selectedColor = s.dataset.color;
        });
    });

    // STATIC ALPHA
    let staticAlpha = parseFloat(staticAlphaSl.value);
    staticAlphaSl.addEventListener('input', () => {
        staticAlpha = parseFloat(staticAlphaSl.value);
        document.querySelectorAll('bullet-chatting[data-static]').forEach(b => {
            b.style.opacity = staticAlpha;
        });
    });

    // ADD BULLET FUNCTION
    // isStatic=true for static scheduled bullets, false for user-sent
    window.addbulletchatting = (
        text,
        mode = 'scroll',
        fontSize,
        duration,
        delay,
        color = selectedColor,
        isStatic = false
    ) => {
        // only block static bullets if disabled
        if (isStatic && !enableBullets.checked) return;

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

    // RANDOM STATIC SPAWNS
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

    // CUSTOM SCHEDULED CHATS
    const customChats = [
        {
            time: 6 * 60 + 10,          // 6m10s
            text: 'High Energy Ahead!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 8,           // 8m05s
            text: '前方高能!!!!!',
            mode: 'top',
            fontSize: 30,
            duration: 5000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 6,           // 8m05s
            text: 'EPICCCC section Ahead!!!!!',
            mode: 'scroll',
            fontSize: 30,
            duration: 5000,
            delay: 0,
            color: '#00ff00',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 9,           // 8m05s
            text: 'Most Epic Moments Ahead!!!!!',
            mode: 'top',
            fontSize: 30,
            duration: 5000,
            delay: 0,
            color: '#00ff00',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 11,          // 6m10s
            text: '前方高能!',
            mode: 'top',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 12,          // 6m10s
            text: '前方高能!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ffff00',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 12,          // 6m10s
            text: '前方高能!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ffff00',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 12,          // 6m10s
            text: '前方高能!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ffff00',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 12,          // 6m10s
            text: '前方高能!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 12,          // 6m10s
            text: '前方高能!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 12,          // 6m10s
            text: '前方高能!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 13,          // 6m10s
            text: 'EPICCCCCCCC!!!!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 14,          // 6m10s
            text: 'String section going crazy!!!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 14,          // 6m10s
            text: 'WOW epic sting section!!!',
            mode: 'top',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 15,          // 6m10s
            text: 'I can literally see the sword fight!!!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 15,          // 6m10s
            text: 'I can literally see the sword fight!!!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 15,          // 6m10s
            text: 'Team Capulet show me your hands!!!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 17,          // 6m10s
            text: 'Team Montague show me your hands!!!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#0000ff',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 18,          // 6m10s
            text: 'Team Montague!!!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#0000ff',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 18,          // 6m10s
            text: 'Team Montague All the WAYYY!!!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#0000ff',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 19,          // 6m10s
            text: 'Team Montague!!!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#0000ff',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 20,          // 6m10s
            text: 'Team Capulet!!!',
            mode: 'top',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 21,          // 6m10s
            text: 'Team Capulet here!!!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 20,          // 6m10s
            text: 'Team Capulet Forever!!!',
            mode: 'top',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 24,          // 6m10s
            text: 'Am I the only one who love Mercutio?',
            mode: 'scroll',
            fontSize: 40,
            duration: 4000,
            delay: 0,
            color: '#ff00ff',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 26,          // 6m10s
            text: 'OMG Team Mercutio here!!!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff00ff',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 26,          // 6m10s
            text: 'Me too Mercutio!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff00ff',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 27,          // 6m10s
            text: 'I love Mercutio!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff00ff',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 28,          // 6m10s
            text: 'Mercutio is mine!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff00ff',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 25,          // 6m10s
            text: 'Laurence is lovely!',
            mode: 'scroll',
            fontSize: 30,
            duration: 4000,
            delay: 0,
            color: '#ffffff',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 27,          // 6m10s
            text: 'Laurence? SRSLY???',
            mode: 'scroll',
            fontSize: 30,
            duration: 4000,
            delay: 0,
            color: '#ffffff',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 15,          // 6m10s
            text: 'Lol string players doing cardio rn!!!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 19,          // 6m10s
            text: 'Team Cymbal For the Win',
            mode: 'top',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 20,          // 6m10s
            text: 'Dream moments for any precussionist',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 21,          // 6m10s
            text: 'Team Precussion FOREVER!!!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        {
            time: 6 * 60 + 22,          // 6m10s
            text: 'Go Precussion go go GO go!!!',
            mode: 'scroll',
            fontSize: 35,
            duration: 4000,
            delay: 0,
            color: '#ff0000',
            isStatic: true,
            shown: false
        },
        // …add as many as you like…
    ];
    video.addEventListener('timeupdate', () => {
        const now = video.currentTime;
        customChats.forEach(chat => {
            if (!chat.shown && now >= chat.time) {
                addbulletchatting(
                    chat.text,
                    chat.mode,
                    chat.fontSize,
                    chat.duration,
                    chat.delay,
                    chat.color,
                    chat.isStatic
                );
                chat.shown = true;
            }
        });
    });

    // PAUSE ON TYPING
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

    // SEND BUTTON WITH BANNED-WORD CHECK
    document.getElementById('sendBtn').addEventListener('click', e => {
        e.preventDefault();
        const text = textInput.value.trim();
        const lower = text.toLowerCase();
        if (bannedWords.some(w => lower.includes(w))) {
            alert('Please adjust your bullet chat — that word is not allowed.');
            return;
        }
        const mode = document.querySelector('.bulletchatting-mode').value;
        const fontSize = document.querySelector('.bulletchatting-fontsize').value;
        const duration = document.querySelector('.bulletchatting-duration').value;
        const delay = document.querySelector('.bulletchatting-delay').value;
        addbulletchatting(text, mode, fontSize, duration, delay, selectedColor, false);
        video.play();
        list.bulletchattingplaystate = 'running';
    });
});
