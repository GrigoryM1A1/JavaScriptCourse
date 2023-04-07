const buyBike = document.querySelector('#buyBikeBtn');
const rentBike = document.querySelector('#rentBikeBtn');
const rentScooter = document.querySelector('#rentScooterBtn');
const showAll = document.querySelector('#showAll');
const mainContainer = document.querySelector('.container');
const cardsContainer = document.querySelector('.cards-container');


const rentForm = document.querySelector('#rent');
const rentNick = rentForm['nick'];
const rentName = rentForm['name'];
const rentSurname = rentForm['surname'];
const rentVehicle = rentForm['vehicle'];
const rentAmount = rentForm['amount'];

const returnForm = document.querySelector('#return');
const returnNick = returnForm['nick'];
const returnVehicle = returnForm['vehicle'];

const rentButton = document.querySelector("#rentBtn");
const returnButton = document.querySelector('#returnBtn');


// Local Storage
const customers = JSON.parse(localStorage.getItem("customers")) || [];
const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];


// Vehicle
// [
//     {
//         name: "",
//         brand: "",
//         type: "",
//         amount: num,
//         imgURL: "",
//         forRent: bool,
//         rentPrice: num
//         forSale: bool
//         salePrice: num
//     }
// ]

// Customer
// [
//     {
//         nickname: "",
//         name: "",
//         surname: "",
//         basket: [['Name', 5, 'rent/sale']]
//     }
// ]
function displayRentalScooters() {
    while(cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.lastChild);
    }

    for (item of vehicles) {
        if (item.forRent && item.type === 'scooter') {
            createVehicleDiv(item);
        }
    }
}


function displayOnSaleBikes() {
    while(cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.lastChild);
    }

    for (item of vehicles) {
        if (item.forSale && item.type === 'bike') {
            createVehicleDiv(item);
        }
    }
}


function displayOnlyRentalBikes() {
    while(cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.lastChild);
    }

    for (item of vehicles) {
        if (item.forRent && item.type === 'bike') {
            createVehicleDiv(item);
        }
    }
}


function displayAll() {
    while(cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.lastChild);
    }
    vehicles.forEach(createVehicleDiv);
}


function createVehicleDiv({name, brand, amount, imgURL, forRent, forSale, rentPrice, salePrice}) {
    const card = document.createElement('div');
    card.classList.add('card');

    const category = document.createElement('h5');
    category.classList.add('category');
    category.innerText = brand;

    const vehName = document.createElement('h4');
    vehName.innerText = name;

    const img = document.createElement('img');
    img.src = imgURL;

    const amountLeft = document.createElement('h4');
    amountLeft.innerText = 'Sztuk w magazynie: ' + amount;

    if (forRent && forSale) {
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');

        p1.innerText = 'Koszt zakupu: ' + salePrice + 'zł';
        p2.innerText = 'Koszt wypozycznie: ' + rentPrice + 'zł/h';
        card.append(category, vehName, img, amountLeft, p1, p2);
    } else if (forRent && !forSale) {
        const p2 = document.createElement('p');
        p2.innerText = 'Koszt wypozycznie: ' + rentPrice + 'zł/h';
        card.append(category, vehName, img, amountLeft, p2);
    } else if (!forRent && forSale) {
        const p1 = document.createElement('p');
        p1.innerText = 'Koszt zakupu: ' + salePrice + 'zł';
        card.append(category, vehName, img, amountLeft, p1);
    }

    cardsContainer.appendChild(card);    
}


function addVehicle(name, brand, type, amount, imgURL, forRent, forSale, rentPrice, salePrice) {
    customers.push({
        name: name,
        brand: brand,
        type: type,
        amount: amount,
        imgURL: imgURL,
        forRent: forRent,
        forSale: forSale,
        rentPrice: rentPrice,
        salePrice: salePrice
    });
}


function setDataBase() {
    let vehiclesToSet = [
        {
            name: "Evado 4.0",
            brand: "Kross",
            type: "bike",
            amount: 15,
            imgURL: "https://kross.eu/media/cache/gallery/rc/sica4r7t/images/13/13347/KREV4Z28X23M140003-KR-Evado-4.0-czarny-niebieski-matowy-g.jpg",
            forRent: true,
            forSale: true,
            rentPrice: 20,
            salePrice: 1400
        },
        {
            name: "Level 2.0",
            brand: "Kross",
            type: "bike",
            amount: 20,
            imgURL: "https://kross.eu/media/cache/gallery/rc/jqvy4b0i/images/38/38373/KRLV2Z29X19M002320-KR-Level-2.0-%C5%BC%C3%B3%C5%82ty-czarny-po%C5%82ysk-g.jpg",
            forRent: false,
            forSale: true,
            rentPrice: 0,
            salePrice: 1200
        },
        {
            name: "2XE Sentinel",
            brand: "JEEP",
            type: "scooter",
            amount: 25,
            imgURL: "https://prod-api.mediaexpert.pl/api/images/gallery/thumbnails/images/40/4087842/JEEP-2XE-Sentinel-Czarno-zielono-zolty-skos1.jpg",
            forRent: true,
            forSale: false,
            rentPrice: 15,
            salePrice: 0
        },
        {
            name: "INDIANA X-Pulser",
            brand: "MTB",
            type: "bike",
            amount: 10,
            imgURL: "https://www.mediaexpert.pl/media/cache/resolve/gallery/images/21/2136441/INDIANA-X-Pulser-6-9-M19-Czarno-brazowy-new.jpg",
            forRent: true,
            forSale: true,
            rentPrice: 20,
            salePrice: 1125
        },
        {
            name: "Scooty 10",
            brand: "MOTUS",
            type: 'scooter',
            amount: 20,
            imgURL: "https://prod-api.mediaexpert.pl/api/images/gallery/thumbnails/images/36/3625537/MOTUS-Scooty-10-Turkusowy-skos.jpg",
            forRent: true,
            forSale: false,
            rentPrice: 14,
            salePrice: 0
        }
    ]
    if (vehicles.length === 0) {
        console.log('We must set db');
        for (item of vehiclesToSet) {
            vehicles.push(item);
            localStorage.setItem("vehicles", JSON.stringify(vehicles));
        }
    } else {
        console.log('Db already set');
    }
    displayAll();
}


function addCustomer(nickname, name, surname, basket) {
    customers.push({
        nickname: nickname,
        name: name,
        surname: surname,
        basket: basket
    });

    localStorage.setItem("customers", JSON.stringify(customers));
}


function canBeRented(vehId, amountToRent) {
    if (vehicles[vehId].forRent && vehicles[vehId] >= amountToRent) {
        return true;
    }
    return false;
}


function vehicleInShop(vehicleName) {
    for (let i = 0; i < vehicles.length; i++) {
        if (vehicles[i].name === vehicleName) {
            return i;
        }
    }
    return -1;
}


function personInDb(customerNick) {
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].nickname === customerNick) {
            return i;
        }
    }
    return -1;
}



window.onload = setDataBase;
localStorage.setItem("customers", JSON.stringify(customers));
localStorage.setItem("vehicles", JSON.stringify(vehicles));


showAll.addEventListener('click', displayAll);
buyBike.addEventListener('click', displayOnSaleBikes);
rentBike.addEventListener('click', displayOnlyRentalBikes);
rentScooter.addEventListener('click', displayRentalScooters);


rentForm.onsubmit = (e) => {
    e.preventDefault();

    let personId = personInDb(rentNick.value);
    if (personId === -1) {
        addCustomer(rentNick.value, rentName.value, rentSurname.value, []);
    }

    let vehicleId = vehicleInShop(rentVehicle.value);
    if (vehicleId === -1) {
        alert("Nie ma takiego modelu w naszym sklepie.");
    } else if (canBeRented(vehicleId)) {
        // Wykonujemy odpowiednie operacje - dodajemy do basketa dopowiedniej osoby odpowiednie dane i odejmujemy odpowiednią liczbę w vehicles
    }
};


returnForm.onsubmit = (e) => {
    e.preventDefault();
    
    let personId = personInDb(returnNick.value);
    let vehicleId = vehicleInShop(returnVehicle.value);
    if (personId === -1) {
        alert("Nie ma takiej osoby w naszej bazie danych.");
    } else if (vehicleId === - 1) {
        alert("Nie było takiego pojazdu w naszym sklepie.");
    } else {
        // Wykonujemy odpowiednie operacje - wywalamy z basketa danej osoby i dodajemy odpowiednią wartość do odpowiedniego pojazdu
    }
};