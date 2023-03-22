let disableCnt = 0;
const wojski = [
    "Natenczas Wojski chwycił na taśmie przypięty Swój róg bawoli, długi, cętkowany, kręty Jak wąż boa, oburącz do ust go przycisnął, Wzdął policzki jak banię, w oczach krwią zabłysnął, Zasunął wpół powieki, wciągnął w głąb pół brzucha I do płuc wysłał z niego cały zapas ducha, I zagrał: róg jak wicher, wirowatym dechem Niesie w puszczę muzykę i podwaja echem.",
    "Umilkli strzelcy, stali szczwacze zadziwieni Mocą, czystością, dziwną harmoniją pieni. Starzec cały kunszt, którym niegdyś w lasach słynął, Jeszcze raz przed uszami myśliwców rozwinął; Napełnił wnet, ożywił knieje i dąbrowy, Jakby psiarnię w nie wpuścił i rozpoczął łowy.",
    "Bo w graniu była łowów historyja krótka: Zrazu odzew dźwięczący, rześki: to pobudka; Potem jęki po jękach skomlą: to psów granie; A gdzieniegdzie ton twardszy jak grzmot: to strzelanie."
]


function setStyles() {
    document.getElementsByTagName('header')[0].classList.add('azure');
    document.getElementsByTagName('header')[0].classList.add('border');
    document.getElementsByTagName('header')[0].classList.add('shadow');
    document.getElementsByTagName('header')[0].classList.add('content-padding');
    document.getElementsByTagName('h1')[0].classList.add('animate');

    document.getElementsByTagName('div')[0].classList.add('container');
    document.getElementsByTagName('div')[1].classList.add('nav-main-container');

    document.getElementsByTagName('nav')[0].classList.add('azure');
    document.getElementsByTagName('nav')[0].classList.add('border');
    document.getElementsByTagName('nav')[0].classList.add('shadow');
    document.getElementsByTagName('nav')[0].classList.add('content-padding');

    document.getElementsByTagName('main')[0].classList.add('azure');
    document.getElementsByTagName('main')[0].classList.add('border');
    document.getElementsByTagName('main')[0].classList.add('shadow');
    document.getElementsByTagName('main')[0].classList.add('content-padding');
    document.getElementsByTagName('h1')[1].classList.add('animate');


    document.getElementsByTagName('aside')[0].classList.add('azure');
    document.getElementsByTagName('aside')[0].classList.add('border');
    document.getElementsByTagName('aside')[0].classList.add('shadow');
    document.getElementsByTagName('aside')[0].classList.add('content-padding');
    document.getElementsByTagName('h1')[2].classList.add('animate');

    document.getElementsByTagName('footer')[0].classList.add('azure');
    document.getElementsByTagName('footer')[0].classList.add('border');
    document.getElementsByTagName('footer')[0].classList.add('shadow');
    document.getElementsByTagName('footer')[0].classList.add('content-padding');
}


function deleteStyles() {
    let allDoms = document.getElementsByTagName('*');

    for (let i = 0; i < allDoms.length; i++) {
        allDoms[i].classList = [];
    }
}


function addParagraph() {
    let parentElem = document.querySelector('blockquote');

    if (disableCnt < 3) {
        let content = document.createTextNode(wojski[disableCnt]);
        parentElem.appendChild(content);

        if (disableCnt < 2) {
            parentElem.appendChild(document.createElement('br'));
            parentElem.appendChild(document.createElement('br'));
        }
    }

    disableCnt++;

    if (disableCnt === 3) {
        document.querySelector('#add').disabled = true;
    }
}


const setButton = document.querySelector('#set');
const deleteButton = document.querySelector('#delete');
const addButton = document.querySelector('#add');

setButton.addEventListener('click', setStyles);
deleteButton.addEventListener('click', deleteStyles);
addButton.addEventListener('click', addParagraph);