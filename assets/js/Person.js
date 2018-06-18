"use strict";

class Person {
    constructor(pName, pGeld) {
        this.name = pName;
        this.geld = parseFloat(pGeld);
        this.bekommt = [];
        this.deleted = false;
    }

    get name() {
        return this._name;
    }

    get geld() {
        return this._geld;
    }

    get isDeleted() {
        return this.deleted;
    }

    set name(pName) {
        this._name = pName;
    }

    set geld(pGeld) {
        this._geld = pGeld;
    }

    delete() {
        this.deleted = true;
    }

    addGeld(pGeld) {
        this._geld += parseFloat(pGeld);
    }

    isEqual(pPerson) {
        return pPerson.name == this.name ? true : false;
    }

}