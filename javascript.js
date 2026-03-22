'use strict'

// Variabile globale per tenere il conto
let totaleGiornaliero = 0;

function aggiungiSpesa() {
    let input = prompt("Inserisci spesa ristorazione:");

    if (input !== null && input !== "") {
        let cifra = parseFloat(input);

        if (!isNaN(cifra)) {
            // SOMMIAMO la nuova cifra al totale esistente
            totaleGiornaliero += cifra;

            // Aggiorniamo il paragrafo in alto
            const paragrafo = document.getElementById('risultato-totale');
            paragrafo.textContent = `Totale oggi: ${totaleGiornaliero.toFixed(2)}€`;
        } else {
            alert("Inserisci un numero valido!");
        }
    }
}