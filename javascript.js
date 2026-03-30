'use strict';

// 1. CALCOLO PASQUA E NATALE (Semplificato)
function aggiornaCountdowns() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const getDays = (target) => Math.ceil((target - today) / (1000 * 60 * 60 * 24));

    // Natale
    let natale = new Date(today.getFullYear(), 11, 25);
    if (today > natale) natale = new Date(today.getFullYear() + 1, 11, 25);
    document.getElementById('Natale').textContent = `( ${getDays(natale)} )`;

    // Pasqua (Algoritmo rapido)
    const f = Math.floor, y = today.getFullYear(), a = y % 19, b = f(y / 100), c = y % 100,
        d = f(b / 4), e = b % 4, g = f((8 * b + 13) / 25), h = (19 * a + b - d - g + 15) % 30,
        i = f(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7,
        m = f((a + 11 * h + 22 * l) / 451), month = f((h + l - 7 * m + 114) / 31),
        day = ((h + l - 7 * m + 114) % 31) + 1;
    let pasqua = new Date(y, month - 1, day);
    if (today > pasqua) /* ricalcolo opzionale per anno dopo */ pasqua = new Date(y + 1, month - 1, day);
    document.getElementById('Pasqua').textContent = `( ${getDays(pasqua)} )`;
}

// 2. GESTIONE NOTE (Logica a 3 righe via JS)
const noteBox = document.getElementById('note-input');
const oggi = new Date().toISOString().split('T')[0];
const chiave = `3DWarrior_Nota_${oggi}`;
const LIMITE = 180; // Numero di caratteri che circa riempiono 3 righe

// Carica
window.addEventListener('DOMContentLoaded', () => {
    aggiornaCountdowns();
    const salvata = localStorage.getItem(chiave);
    if (salvata) {
        // Se è lunga, mostra l'anteprima troncata
        noteBox.innerText = salvata.length > LIMITE ? salvata.substring(0, LIMITE) + "..." : salvata;
    }
});

// Quando clicchi (Focus): mostra tutto per editare
noteBox.addEventListener('focus', () => {
    const integrale = localStorage.getItem(chiave) || "";
    noteBox.innerText = integrale;
});

// Quando esci (Blur): salva tutto e tronca l'anteprima
noteBox.addEventListener('blur', () => {
    const testo = noteBox.innerText;
    localStorage.setItem(chiave, testo); // Salva il testo vero

    if (testo.length > LIMITE) {
        noteBox.innerText = testo.substring(0, LIMITE) + "...";
    }
});

// 3. ARCHIVIO
function mostraArchivio() {
    const diario = document.getElementById('archivio-diario');
    const overlay = document.getElementById('archivio-overlay');
    diario.innerHTML = '<h2>I tuoi frammenti</h2>';

    let note = [];
    for (let i = 0; i < localStorage.length; i++) {
        let k = localStorage.key(i);
        if (k.startsWith("3DWarrior_Nota_")) {
            note.push({ d: k.replace("3DWarrior_Nota_", ""), t: localStorage.getItem(k) });
        }
    }

    note.sort((a, b) => new Date(b.d) - new Date(a.d)).forEach(n => {
        diario.innerHTML += `<div class="ricordo-item"><strong>${n.d}</strong><p>${n.t}</p></div>`;
    });

    overlay.style.display = 'block';
    setTimeout(() => { overlay.classList.add('active'); diario.classList.add('active'); }, 10);
}

// Chiudi Archivio
document.getElementById('archivio-overlay').addEventListener('click', () => {
    const o = document.getElementById('archivio-overlay');
    const d = document.getElementById('archivio-diario');
    o.classList.remove('active'); d.classList.remove('active');
    setTimeout(() => o.style.display = 'none', 400);
});

// CASSETTO MOTTO

const audioMotto = new Audio('suoni/freesound_community-light-switch-82388.mp3');
audioMotto.volume = 0.4;

function toggleCassetto(elemento) {
    // Suono al click (opzionale, ma consigliato per coerenza)
    audioMotto.currentTime = 0.2;
    audioMotto.play();

    // Accende/Spegne la classe "aperto"
    elemento.classList.toggle('aperto');
}











// Carica il file (assicurati che il percorso sia corretto, es: 'suoni/click.mp3')
const audioPianta = new Audio('suoni/489862__lordfrodo10__235-hojas2.wav');

function togglePianta(elemento) {
    // Reset e Play: suona SEMPRE al click
    audioPianta.currentTime = 0;
    audioPianta.play();

    // Cambia lo stato visivo (ingrandisce/rimpicciolisce)
    elemento.classList.toggle('ingrandita');
}