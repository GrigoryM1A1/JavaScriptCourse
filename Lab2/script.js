const form1 = document.getElementById('rent');
const form2 = document.getElementById('return');
const form3 = document.getElementById('display');
const reset = document.getElementById('reset');

reset.addEventListener('click', function () {
    location.reload();
});

form1.addEventListener("submit", function(event) {
    event.preventDefault();
});

form2.addEventListener("submit", function(event) {
    event.preventDefault();
});

form3.addEventListener("submit", function(event) {
    event.preventDefault();
});




function onDisplay() {
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        let item = JSON.parse(sessionStorage.getItem(key));
        if (item.type === "Hulajnoga" || item.type === "Rower") {
            console.log(`${key} => ${item.type} ${item.brand} ${item.amount} sztuk`);
        }
    }
}

function onRent() {
    let nick = document.getElementById('rentNick').value;
    let name = document.getElementById('rentName').value;
    let surname = document.getElementById('rentSurname').value;
    let vehicle = document.getElementById('rentVehicle').value;
    let amount = document.getElementById('rentAmount').value;
    amount = parseInt(amount);

    let item = JSON.parse(sessionStorage.getItem(vehicle));
    
    if (item === null) {
        alert("Nie ma takiego pojazdu w wypożyczalni!");
    } else if (item.amount < amount) {
        alert(`Nie mamy tak wiele sztuk ${vehicle} na stanie w tym momencie!`);
    } else {
        let type = item.type;
        let brand = item.brand;
        let imgURL = item.imgURL;
        let count = item.amount - amount;

        let obj = {
            type: type,
            brand: brand,
            imgURL: imgURL,
            amount: count
        }

        sessionStorage.setItem(vehicle, JSON.stringify(obj));

        let person = {
            name: name,
            surname: surname,
            model: vehicle,
            amount: amount
        }

        sessionStorage.setItem(nick, JSON.stringify(person));
    }
}

function onReturn() {
    let nick = document.getElementById('returnNick').value;
    let vehicle = document.getElementById('returnVehicle').value;

    let item = JSON.parse(sessionStorage.getItem(vehicle));
    let returned = JSON.parse(sessionStorage.getItem(nick));
    
    if (item === null) {
        alert("Nie ma takiego pojazdu w wypożyczalni!");
    } else if (returned === null) {
        alert("Taka osoba u nas nie wypożyczała!");
    } else {
        let type = item.type;
        let brand = item.brand;
        let imgURL = item.imgURL;
        let count = item.amount + returned.amount;

        let obj = {
            type: type,
            brand: brand,
            imgURL: imgURL,
            amount: count
        }

        sessionStorage.setItem(vehicle, JSON.stringify(obj));

        sessionStorage.removeItem(nick);
    }
}


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


    const renters = ["JanuszHD"];
    const rentersData = [
        {
            name: "Janusz",
            surname: "Kowalski",
            model: "INDIANA X-Pulser",
            amount: 1
        }
    ];

    sessionStorage.setItem(renters[0], JSON.stringify(rentersData[0]));
}

// setDataBase()