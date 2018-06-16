"use strict";

class Person {
    constructor(pName, pGeld) {
        this.name = pName;
        this.geld = parseFloat(pGeld);
    }

    get name() {
        return this.name;
    }

    get geld() {
        return this.geld;
    }

    addGeld(pGeld) {
        this.geld += parseFloat(pGeld);
    }

    isEqual(pPerson) {
        return pPerson.name() == this.name ? true : false;
    }
}