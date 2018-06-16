"use strict";

class Person {
    constructor(pName, pGeld) {
        this.name = pName;
        this.geld = parseFloat(pGeld);
        this.bekommt = [];
        this.deleted = false;
    }

    get name() {
        return this.name;
    }

    get geld() {
        return this.geld;
    }

    get isDeleted() {
        return this.deleted;
    }

    addGeld(pGeld) {
        this.geld += parseFloat(pGeld);
    }

    isEqual(pPerson) {
        return pPerson.name() == this.name ? true : false;
    }
}