"use strict";

class Person {
    constructor(pName, pGeld) {
        this._name = pName;
        this._geld = parseFloat(pGeld);
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

    delet() {
        this.deleted = true;
    }

    addGeld(pGeld) {
        this._geld += parseFloat(pGeld);
    }

    isEqual(pPerson) {
        return pPerson.name() == this._name ? true : false;
    }

}