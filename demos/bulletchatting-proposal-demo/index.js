const list = document.querySelector('bullet-chatting-list');
const video = document.querySelector('video');
console.log('Initial setup - List element:', list);
console.log('Initial setup - Video element:', video);

list.bulletchattingplaystate = 'running';
list.area = 40;
list.bulletchattingduration = 6000;

// Add click handler to the button directly
document.querySelector('button').addEventListener('click', function () {
    console.log('Button clicked!');
    const text = document.querySelector('.bulletchatting-text').value;
    const mode = document.querySelector('.bulletchatting-mode').value;
    const fontSize = document.querySelector('.bulletchatting-fontsize').value;
    const duration = document.querySelector('.bulletchatting-duration').value;
    const delay = document.querySelector('.bulletchatting-delay').value;

    console.log('Attempting to add bullet chat with:', { text, mode, fontSize, duration, delay });
    window.addbulletchatting(text, mode, fontSize, duration, delay);
});

window.addbulletchatting = (text, mode, fontSize, duration, delay) => {
    console.log('addbulletchatting called with:', { text, mode, fontSize, duration, delay });
    const bulletchatting = document.createElement('bullet-chatting');
    console.log('Created bullet-chatting element:', bulletchatting);

    bulletchatting.innerHTML = text;
    bulletchatting.mode = mode;
    if (duration) {
        bulletchatting.bulletchattingduration = parseInt(duration);
    }
    if (delay) {
        bulletchatting.bulletchattingdelay = parseInt(delay);
    }
    if (fontSize) {
        bulletchatting.style.fontSize = fontSize + 'px';
    }

    console.log('About to append bullet chat to list');
    list.appendChild(bulletchatting);
    console.log('Bullet chat appended to list');
}

let index = 0;
function nextFrame() {
    const nowTime = video.currentTime;
    while (bulletchattings[index] && bulletchattings[index].time <= nowTime) {
        window.addbulletchatting(bulletchattings[index].text, bulletchattings[index].mode);
        index++;
    }

    if (video.paused) {
        return;
    } else {
        window.requestAnimationFrame(() => {
            nextFrame();
        });
    }
}

video.addEventListener('play', () => {
    list.bulletchattingplaystate = 'running';
    window.requestAnimationFrame(() => {
        nextFrame();
    });
});
video.addEventListener('pause', () => {
    list.bulletchattingplaystate = 'paused';
});
video.addEventListener('seeking', () => {
    list.innerHTML = '';
    for (let i = 0; i < bulletchattings.length; i++) {
        if (bulletchattings[i].time > video.currentTime) {
            index = i;
            break;
        }
    }
});

// generate bulletchattings
const duration = 146;
const bulletchattings = [];
for (let i = 0; i < duration * 7; i++) {
    bulletchattings.push({
        text: texts[parseInt(Math.random() * texts.length)],
        time: Math.random() * duration,
        mode: 'scroll',
    });
}
for (let i = 0; i < duration * 0.5; i++) {
    bulletchattings.push({
        text: texts[parseInt(Math.random() * texts.length)],
        time: Math.random() * duration,
        mode: 'top',
    });
}
for (let i = 0; i < duration * 0.5; i++) {
    bulletchattings.push({
        text: texts[parseInt(Math.random() * texts.length)],
        time: Math.random() * duration,
        mode: 'bottom',
    });
}
bulletchattings.sort((a, b) => a.time - b.time);