/* ================= AUDIO ================= */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let masterGain = audioCtx.createGain();
masterGain.gain.value = 0.8;
masterGain.connect(audioCtx.destination);
const activeNotes = {}; // for piano key tracking

let masterVolume = 0.8;

/* ================= Instruments ================= */
//region Instrument functions - each creates a sound using Web Audio API
let pianoTone = "piano";

    document.getElementById("pianoTone").onchange = (e) => {
        pianoTone = e.target.value;
    };


let pianoVolume = 0.8;

const pianoVolumeSlider =
    document.getElementById("pianoVolume");

const pianoVolumeLabel =
    document.getElementById("pianoVolumeLabel");

pianoVolumeSlider.oninput = () => {

    pianoVolume =
        Number(pianoVolumeSlider.value);

    pianoVolumeLabel.innerText =
        Math.round(pianoVolume * 100) + "%";
};
    
function playKick(pitch = 1) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const baseFreq = 100;
    const frequency = baseFreq * Math.pow(2, pitch / 12);


    

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency, audioCtx.currentTime + 0.15);

    gain.gain.setValueAtTime(1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
}

function playSnare(pitch = 1) {
    const noiseBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.2, audioCtx.sampleRate);
    const data = noiseBuffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;

    // 🎯 filter = key difference
    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1800;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.6, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    noise.start();
}

function playHihat(pitch = 1) {
    const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.05, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 7000; // key difference

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    noise.start();
}

function playClap(pitch = 1) {
    const times = [0, 0.01, 0.02]; // layered human claps

    times.forEach(t => {
        const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.1, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < data.length; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;

        const filter = audioCtx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 3000;

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.5, audioCtx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + t + 0.15);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        noise.start(audioCtx.currentTime + t);
    });
}
function playTom(pitch = 1) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    const baseFreq = 180 * Math.pow(2, pitch / 12);

    osc.type = "sine";

    osc.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.9, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
}
function playZap(pitch = 1) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    const baseFreq = 600 * Math.pow(2, pitch / 12);

    osc.type = "square";

    osc.frequency.setValueAtTime(baseFreq * 2, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq, audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}
function playSynth(pitch = 1) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    const baseFreq = 220 * Math.pow(2, pitch / 12);

    osc.type = "square";

    osc.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
}
function playPluck(pitch = 1) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    const freq = 220 * Math.pow(2, pitch / 12);

    osc.type = "triangle";

    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2000, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
}
function playClick() {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "square";
    osc.frequency.value = 2000;

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.02);
}
function playBass(pitch = 1) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    const freq = 80 * Math.pow(2, pitch / 12);

    osc.type = "sawtooth";

    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.25);
}

//Piano


function startNote(freq) {
    const originalFreq = freq;

    freq *= Math.pow(2, pianoPitch / 12);
    if (activeNotes[originalFreq]) return;

    const now = audioCtx.currentTime;

    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    // --- harmonic stack (this is the key difference) ---
    const osc1 = audioCtx.createOscillator(); // fundamental
    const osc2 = audioCtx.createOscillator(); // octave
    const osc3 = audioCtx.createOscillator(); // 5th

    switch (pianoTone) {

        case "piano":
            osc1.type = "triangle";
            osc2.type = "sine";
            osc3.type = "sine";
            break;

        case "synth":
            osc1.type = "sawtooth";
            osc2.type = "sawtooth";
            osc3.type = "square";
            break;

        case "strings":
            osc1.type = "sawtooth";
            osc2.type = "triangle";
            osc3.type = "triangle";
            break;

        case "organ":
            osc1.type = "square";
            osc2.type = "square";
            osc3.type = "sine";
            break;
    }

    osc1.frequency.value = freq;
    osc2.frequency.value = freq * 2;
    osc3.frequency.value = freq * 3;

    // --- filter = “hammer brightness” ---
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(5000, now);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 0.3);

    // --- amplitude envelope (important) ---
    gain.gain.setValueAtTime(0, pianoVolume,now);
    gain.gain.linearRampToValueAtTime(0.6 * pianoVolume,now + 0.005); // attack
    gain.gain.exponentialRampToValueAtTime(0.25, pianoVolume,now + 0.08); // decay

    if (pianoTone === "strings") {
    gain.gain.exponentialRampToValueAtTime(0.001, pianoVolume,now + 5);
    } else {
        gain.gain.exponentialRampToValueAtTime(0.001, pianoVolume,now + 2.5); // release tail
    }
    // connect
    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    activeNotes[originalFreq] = {osc1, osc2, osc3, gain, filter};
}
function stopNote(freq) {
    const note = activeNotes[freq];
    if (!note) return;

    const now = audioCtx.currentTime;

    note.gain.gain.cancelScheduledValues(now);
    note.gain.gain.setTargetAtTime(0.0001, now, 0.05);

    note.osc1.stop(now + 2);
    note.osc2.stop(now + 2);
    note.osc3.stop(now + 2);

    delete activeNotes[freq];
}

function createKey(freq) {
    const key = document.createElement("div");
    key.className = "piano-key";

    key.onmousedown = () => startNote(freq);
    key.onmouseup = () => stopNote(freq);
    key.onmouseleave = () => stopNote(freq);

    return key;
}

//endregion Instrument functions
/* ================= TRACKS ================= */
const tracks = [
    "Kick", "Snare", "Hihat", "Clap",
    "Tom", "Zap", "Synth", "Pluck", "Click",
    "Bass"
];

const steps = 16;
let trackVolumes = Array(tracks.length).fill(1);
let trackPitches = Array(tracks.length).fill(1);

/* ================= GRID ================= */
const sequencer = document.getElementById("sequencer");
sequencer.appendChild(document.createElement("div")); // top-left empty




for (let i = 0; i < steps; i++) {
    const stepLabel = document.createElement("div");
    stepLabel.innerText = i + 1;
    sequencer.appendChild(stepLabel);
}

const volHeader = document.createElement("div");
volHeader.innerText = "Volume";
sequencer.appendChild(volHeader);

const pitchHeader = document.createElement("div");
pitchHeader.innerText = "Pitch";
sequencer.appendChild(pitchHeader);

tracks.forEach((track, row) => {

    const label = document.createElement("select");

["Kick", "Snare", "Hihat", "Clap", "Tom", "Zap", "Synth", "Pluck", "Click", "Bass" ].forEach(inst => {
    const opt = document.createElement("option");
    opt.value = inst;
    opt.innerText = inst;
    label.appendChild(opt);
});

label.value = track;

label.onchange = () => {
    tracks[row] = label.value;
};


    sequencer.appendChild(label);

    for (let i = 0; i < steps; i++) {
        const btn = document.createElement("button");
        btn.className = "step";
        btn.dataset.row = row;
        btn.dataset.step = i;

        btn.onclick = () => btn.classList.toggle("active");

        sequencer.appendChild(btn);
    }

    // volume slider
    const sliderWrap = document.createElement("div");
sliderWrap.className = "slider-wrap";
const slider = document.createElement("input");
slider.type = "range";
slider.min = 0;
slider.max = 1;
slider.step = 0.01;
slider.value = 1;
slider.className = "slider";

const sliderLabel = document.createElement("span");
sliderLabel.innerText = "100%";

slider.oninput = () => {
    trackVolumes[row] = slider.value;
    sliderLabel.innerText = Math.round(Number(slider.value) * 100) + "%";
};

sliderWrap.appendChild(slider);
sliderWrap.appendChild(sliderLabel);

sequencer.appendChild(sliderWrap);


// pitch slider
const pitchWrap = document.createElement("div");
pitchWrap.className = "slider-wrap";
const pitchSlider = document.createElement("input");
pitchSlider.type = "range";
pitchSlider.min = -15;
pitchSlider.max = 15;
pitchSlider.step = 1;
pitchSlider.value = 0;
pitchSlider.className = "slider";

const pitchLabel = document.createElement("span");
pitchLabel.innerText = "0";

pitchSlider.oninput = () => {
    trackPitches[row] = pitchSlider.value;
    pitchLabel.innerText = pitchSlider.value;
};

pitchWrap.appendChild(pitchSlider);
pitchWrap.appendChild(pitchLabel);

sequencer.appendChild(pitchWrap);
});




/* ================= PLAYBACK ================= */
let currentStep = 0;
let isPlaying = false;
let bpm = 110;
let interval;

function playStep() {
    
    document.querySelectorAll(".step").forEach(s => s.classList.remove("current"));

    tracks.forEach((track, row) => {
        const btn = document.querySelector(
            `.step[data-row="${row}"][data-step="${currentStep}"]`
        );

        btn.classList.add("current");

        if (btn.classList.contains("active")) {
            masterGain.gain.value = masterVolume * trackVolumes[row];

            const pitch = trackPitches[row];

            if (track === "Kick") playKick(pitch);
            if (track === "Snare") playSnare(pitch);
            if (track === "Hihat") playHihat(pitch);
            if (track === "Clap") playClap(pitch);
            if (track === "Tom") playTom(pitch);
            if (track === "Zap") playZap(pitch);
            if (track === "Synth") playSynth(pitch);
            if (track === "Pluck") playPluck(pitch);
            if (track === "Click") playClick(pitch);
            if (track === "Bass") playBass(pitch);    
        }
    });

    currentStep = (currentStep + 1) % steps;
    console.log("Pitch row", row, trackPitches[row]);
}

function startLoop() {
    const intervalTime = (60 / bpm) * 1000 / 4;
    interval = setInterval(playStep, intervalTime);
}

/* ================= CONTROLS ================= */
const playButton = document.getElementById("playButton");
const bpmSlider = document.getElementById("bpmSlider");
const bpmValue = document.getElementById("bpmValue");
const masterSlider = document.getElementById("masterVolume");

playButton.onclick = async () => {

    if (audioCtx.state === "suspended") {
        await audioCtx.resume();
    }

    if (!isPlaying) {
        startLoop();
        isPlaying = true;
        playButton.innerText = "⏹ Stop";
    } else {
        clearInterval(interval);
        isPlaying = false;
        playButton.innerText = "▶ Play";
    }
};
const bpmLabel = document.createElement("span");
bpmLabel.innerText = bpm ;

bpmSlider.oninput = () => {
    bpm = bpmSlider.value;
    bpmValue.innerText = bpm;
    bpmLabel.innerText = bpm;

    if (isPlaying) {
        clearInterval(interval);
        startLoop();
    }
};
const masterLabel = document.createElement("span");
masterLabel.innerText = masterSlider.value;
document.getElementById("masterVolume").appendChild(masterLabel);

masterSlider.oninput = () => {
    masterVolume = Number(masterSlider.value);
    masterLabel.innerText = masterSlider.value;
};







    const piano = document.getElementById("piano");

  

const whiteKeyWidth = 40;
const blackKeyWidth = 30;

const layout = [
    { note: "a",  freq: 261.63, black: false, key: "a" },   // C4
    { note: "w", freq: 277.18, black: true, key: "w" },     // C#4
    { note: "s",  freq: 293.66, black: false, key: "s" },   // D4
    { note: "e", freq: 311.13, black: true, key: "e" },     // D#4
    { note: "d",  freq: 329.63, black: false, key: "d" },   // E4
    { note: "f",  freq: 349.23, black: false, key: "f" },   // F4
    { note: "t", freq: 369.99, black: true, key: "t" },     // F#4
    { note: "g",  freq: 392.00, black: false, key: "g" },   // G4
    { note: "z", freq: 415.30, black: true, key: "z" },     // G#4 (using 'z' for better hand position)
    { note: "h",  freq: 440.00, black: false, key: "h" },   // A4
    { note: "u", freq: 466.16, black: true, key: "u" },     // A#4 (using 'u' for better hand position)
    { note: "j",  freq: 493.88, black: false, key: "j" },   // B4
    { note: "k",  freq: 523.25, black: false, key: "k" },   // C5
];


const keyMap = {};
layout.forEach(n => {
    if (n.key) keyMap[n.key] = n;
});


let whiteIndex = 0;
const whitePositions = [];

layout.forEach(n => {
    const key = document.createElement("div");
    key.classList.add("piano-key");

    key.innerText = n.note;
    

    

    key.onmousedown = (e) => {
        e.preventDefault();
        mouseDown = true;
        startNote(n.freq);
    };

    key.onmouseup = () => {
        mouseDown = false;
        stopNote(n.freq);
    };

    key.onmouseleave = () => {
        // only stop if mouse is NOT still held
        if (!mouseDown) stopNote(n.freq);
    };
    n.element = key;

    if (!n.black) {
        key.classList.add("white");

        const x = whiteIndex * whiteKeyWidth;
        key.style.left = `${x}px`;
        key.style.zIndex = 1;

        whitePositions.push(x);
        whiteIndex++;

    } else {
        key.classList.add("black");

        // place black key between surrounding whites
        const x = whitePositions[whiteIndex - 1] + whiteKeyWidth * 1;
        key.style.left = `${x}px`;
        key.style.zIndex = 2;
    }

    piano.appendChild(key);
});


const heldKeys = new Set();

document.addEventListener("keydown", (e) => {
    const data = keyMap[e.key];
    if (!data) return;

    if (heldKeys.has(e.key)) return;
    heldKeys.add(e.key);

    startNote(data.freq);

    data.element?.classList.add("active");
});

document.addEventListener("keyup", (e) => {
    const data = keyMap[e.key];
    if (!data) return;

    heldKeys.delete(e.key);

    stopNote(data.freq);

    data.element?.classList.remove("active");
});

let pianoPitch = 0;

const pianoPitchSlider = document.getElementById("pianoPitch");
const pianoPitchLabel = document.getElementById("pianoPitchLabel");

pianoPitchSlider.oninput = () => {
    pianoPitch = Number(pianoPitchSlider.value);
    pianoPitchLabel.innerText = pianoPitch;
};