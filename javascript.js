'use strict'

// calcolo giorni rimanenti a Pasqua


function getEaster(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31); // 3 = Marzo, 4 = Aprile
    const day = ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(year, month - 1, day);
}


function daysUntilEaster() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset orario per precisione

    let year = today.getFullYear();
    let easter = getEaster(year);

    // Se la Pasqua di quest'anno è già passata, calcoliamo quella dell'anno prossimo
    if (today > easter) {
        easter = getEaster(year + 1);
    }

    const diffInMs = easter - today;
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
}

function aggiornaContatorePasqua() {
    const elementoPasqua = document.getElementById('Pasqua');

    if (elementoPasqua) {
        const numeroGiorni = daysUntilEaster();

        // Usiamo i backtick ` e la sintassi ${} per inserire le parentesi
        elementoPasqua.textContent = `(${numeroGiorni})`;
    }
}



// calcolo giorni rimanenti a Natale

function daysUntilChristmas() {
    const oggi = new Date();
    oggi.setHours(0, 0, 0, 0); // Reset dell'ora per un calcolo preciso dei giorni

    let annoCorrente = oggi.getFullYear();
    // In JS i mesi partono da 0 (0=Gennaio, 11=Dicembre)
    let natale = new Date(annoCorrente, 11, 25);

    // Se il Natale di quest'anno è già passato, calcola quello dell'anno prossimo
    if (oggi > natale) {
        natale = new Date(annoCorrente + 1, 11, 25);
    }

    const differenzaMs = natale - oggi;
    const giorniMancanti = Math.ceil(differenzaMs / (1000 * 60 * 60 * 24));

    return giorniMancanti;
}

function mostraNatale() {
    const elemento = document.getElementById('Natale');
    if (elemento) {
        const giorni = daysUntilChristmas();
        // Inserisce il numero tra parentesi tonde: (X)
        elemento.textContent = `(${giorni})`;
    }
}

// Avvia la funzione al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
    aggiornaContatorePasqua();
    mostraNatale();
});


// BOX NOTE
const noteBox = document.getElementById('note-input');
let testoReale = noteBox.innerText; // Memorizza il contenuto vero

// Quando clicchi per scrivere
noteBox.addEventListener('focus', () => {
    noteBox.innerText = testoReale; // Mostra tutto il testo originale
});

// Quando clicchi fuori (o premi invio e perdi il focus)
noteBox.addEventListener('blur', () => {
    testoReale = noteBox.innerText; // Salva quello che hai scritto

    const limiteCaratteri = 80; // Regola questo numero per le tue 2 righe di Lora

    if (testoReale.length > limiteCaratteri) {
        // Taglia il testo e aggiunge i puntini
        noteBox.innerText = testoReale.substring(0, limiteCaratteri) + "...";
    }
});