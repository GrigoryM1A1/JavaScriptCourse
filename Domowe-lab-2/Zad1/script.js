function readAndPrint() {
    for (let i = 0; i < 4; i++) {
        console.log("typWczytanejWartości: " + typeof(window.prompt("Podaj wartosc:")));
    }
}

// Liczba -> string
// Napis -> string
// Brak + OK -> string (pewnie pusty znak)
// Wartość + Anuluj -> object

readAndPrint();

function handleForm() {
    console.log("Wypisz!");
    const form_ = document.forms.zad1Form;

    console.log("wczytanaWartośćPolaTekstowego: " + form_.pole_tekstowe.value, "typWczytanejWartości: " + typeof(form_.pole_tekstowe.value));
    console.log("wczytanaWartośćPolaLiczbowego: " + form_.pole_liczbowe.value, "typWczytanejWartości: " + typeof(form_.pole_liczbowe.value));
    // brak wartości -> znak pusty - string
    // w przypadku liczby i napisu zawsze otrzymujemy string
    // w polu numerycznym nie możemy wprowadzić napisu
}