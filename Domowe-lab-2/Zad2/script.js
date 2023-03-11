"use strict";
var expect = chai.expect;

function sum(x,y) {
	return x+y;
}

function cyfry(napis) {
    let res = [];
    let evenSum = 0;
    let oddSum = 0;
    
    for (let character of napis) {
        let sth = parseInt(character);

        if (isNaN(sth)) {
            continue;
        } else if (sth % 2 === 0) {
            evenSum += sth;
        } else {
            oddSum += sth;
        }
    }
    
    res.push(oddSum);
    res.push(evenSum);
    return res;
}


function litery(napis) {
    let res = [];
    let lowerCaseLetters = 0;
    let upperCaseLetters = 0;

    for (let character of napis) {
        if (!(character.toLowerCase() != character.toUpperCase())) {
            continue;
        }

        if (character === character.toLowerCase()) {
            lowerCaseLetters++;
        } else {
            upperCaseLetters++;
        }
    }

    res.push(lowerCaseLetters);
    res.push(upperCaseLetters);
    return res;
}

function suma(napis) {
    if (isNaN(parseInt(napis[0]))) {
        return 0;
    }

    return parseInt(napis);
}

function getData() {
    let data = window.prompt("Wczytaj dane:");
    let prevSum = 0;
    while (data != null) {
        let currSum = prevSum + suma(data);
        console.log(data);
        console.log(cyfry(data));
        console.log(litery(data));
        console.log(currSum);
        prevSum = currSum;
        data = window.prompt("Wczytaj dane:");
    }
}

describe('The sum() function', function() {
    it('Returns 4 for 2+2', function() {
        expect(sum(2,2)).to.equal(4);
    });
    it('Returns 0 for -2+2', function() {
        expect(sum(-2,2)).to.equal(0);
    });
});