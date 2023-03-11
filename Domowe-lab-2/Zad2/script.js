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


describe("Same cyfry", function() {
    it('cyfry("12345") = [9, 6]', function() {
        expect(cyfry("12345")).deep.to.equal([9, 6]);
    });
    it('litery("12345") = [0, 0]', function() {
        expect(litery("12345")).deep.to.equal([0, 0]);
    });
    it('suma("12345") = 12345', function() {
        expect(suma("12345")).to.equal(12345);
    });
});

describe("Same litery", function() {
    it('cyfry("aBcDEFgh") = [0, 0]', function() {
        expect(cyfry("aBcDEFgh")).deep.to.equal([0, 0]);
    });
    it('litery("aBcDEFgh") = [0, 0]', function() {
        expect(litery("aBcDEFgh")).deep.to.equal([4, 4]);
    });
    it('suma("aBcDEFgh") = 0', function() {
        expect(suma("aBcDEFgh")).to.equal(0);
    });
});

describe("Litery, a po nich cyfry", function() {
    it('cyfry("aBcDEFgh12345") = [9, 6]', function() {
        expect(cyfry("aBcDEFgh12345")).deep.to.equal([9, 6]);
    });
    it('litery("aBcDEFgh12345") = [4, 4]', function() {
        expect(litery("aBcDEFgh12345")).deep.to.equal([4, 4]);
    });
    it('suma("aBcDEFgh12345") = 0', function() {
        expect(suma("aBcDEFgh12345")).to.equal(0);
    });
});

describe("Cyfry, a po nich litery", function() {
    it('cyfry("12345aBcDEFgh") = [9, 6]', function() {
        expect(cyfry("12345aBcDEFgh")).deep.to.equal([9, 6]);
    });
    it('litery("12345aBcDEFgh") = [4, 4]', function() {
        expect(litery("12345aBcDEFgh")).deep.to.equal([4, 4]);
    });
    it('suma("12345aBcDEFgh") = 12345', function() {
        expect(suma("12345aBcDEFgh")).to.equal(12345);
    });
});

describe("Pusty napis", function() {
    it('cyfry("") = [0, 0]', function() {
        expect(cyfry("")).deep.to.equal([0, 0]);
    });
    it('litery("") = [0, 0]', function() {
        expect(litery("")).deep.to.equal([0, 0]);
    });
    it('suma("") = 0', function() {
        expect(suma("")).to.equal(0);
    });
});