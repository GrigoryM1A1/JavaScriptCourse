const buyBike = document.querySelector('#buyBikeBtn');
const rentBike = document.querySelector('#rentBikeBtn');
const rentScooter = document.querySelector('#rentScooterBtn');


function setDataBase() {
    const vehicles = [
        {
            type: "Rower",
            brand: "Kross",
            imgURL: "https://kross.eu/media/cache/gallery/rc/sica4r7t/images/13/13347/KREV4Z28X23M140003-KR-Evado-4.0-czarny-niebieski-matowy-g.jpg",
            amount: 4
        },
        {
            type: "Rower",
            brand: "Kross",
            imgURL: "https://kross.eu/media/cache/gallery/rc/jqvy4b0i/images/38/38373/KRLV2Z29X19M002320-KR-Level-2.0-%C5%BC%C3%B3%C5%82ty-czarny-po%C5%82ysk-g.jpg",
            amount: 10
        },
        {
            type: "Hulajnoga",
            brand: "JEEP",
            imgURL: "https://prod-api.mediaexpert.pl/api/images/gallery_290_300/thumbnails/images/40/4087842/JEEP-2XE-Sentinel-Czarno-zielono-zolty-skos2.jpg",
            amount: 20
        },
        {
            type: "Rower",
            brand: "MTB",
            imgURL: "https://www.mediaexpert.pl/media/cache/resolve/gallery/images/21/2136441/INDIANA-X-Pulser-6-9-M19-Czarno-brazowy-new.jpg",
            amount: 4
        }
    ]

    const models = ["Evado 4.0", "Level 2.0", "2XE Sentinel", "INDIANA X-Pulser"];

    for (let i = 0; i < models.length; i++) {
        sessionStorage.setItem(models[i], JSON.stringify(vehicles[i]));
    }
}



function displayOnlyBikesToRent() {

}


function displayOnlyScootersToRent() {

}


function displayOnlyBikesOnSale() {

}


function displayAll() {

}

function displayStartProducts() {
    const container = document.querySelector('.container');
    const pageTitleContainer = document.createElement('div');
    const pageTitle = document.createElement('h2');

    pageTitleContainer.classList.add('title');
    pageTitle.innerText = 'Wypożyczalnia rowerów i hulajnóg';

    pageTitleContainer.appendChild(pageTitle);
    container.appendChild(pageTitleContainer);


    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards-container');
    container.appendChild(cardsContainer);
}

// setDataBase();
displayStartProducts();