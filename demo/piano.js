
// getting key elements
const keyEls = {};
for (let i = 1; i <= 11; i++) {
    keyEls['k' + i] = document.querySelector('#k' + i);
}

// Web Audio synth — nuk ka nevojë për file-e audio
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let ctx = null;
function audio() {
    if (!ctx) ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
}
// Frekuencat: C4 C#4 D4 D#4 E4 F4 F#4 G4 G#4 A4 A#4
const freqs = { k1: 261.63, k2: 277.18, k3: 293.66, k4: 311.13, k5: 329.63,
                k6: 349.23, k7: 369.99, k8: 392.00, k9: 415.30, k10: 440.00, k11: 466.16 };
function playTone(f) {
    const ac = audio();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'triangle';
    osc.frequency.value = f;
    const t = ac.currentTime;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.5, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
    osc.connect(gain).connect(ac.destination);
    osc.start(t);
    osc.stop(t + 1.3);
}

Object.keys(freqs).forEach(id => {
    const el = keyEls[id];
    if (!el) return;
    const white = !el.classList.contains('keyBlack');
    el.addEventListener('mousedown', () => {
        playTone(freqs[id]);
        el.style.backgroundColor = white ? 'lightgray' : 'gray';
    });
    el.addEventListener('mouseup', () => {
        el.style.backgroundColor = white ? 'white' : 'black';
    });
    el.addEventListener('touchstart', e => {
        e.preventDefault();
        playTone(freqs[id]);
        el.style.backgroundColor = white ? 'lightgray' : 'gray';
    }, { passive: false });
    el.addEventListener('touchend', () => {
        el.style.backgroundColor = white ? 'white' : 'black';
    });
});
