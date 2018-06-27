"use strict";

class Person {
    constructor(pName, pGeld) {
        this.name = pName;
        this.geld = parseFloat(pGeld);
        this.deleted = false;
        this.noMoney = false;
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

    get has0() {
        return this.noMoney;
    }

    set name(pName) {
        this._name = pName;
    }

    set geld(pGeld) {
        this._geld = pGeld;
    }

    toggleHas0() {
        this.noMoney = !this.noMoney;
    }

    toggleDelete() {
        this.deleted = !this.deleted;
    }

    addGeld(pGeld) {
        this._geld += parseFloat(pGeld);
    }

    isEqual(pPerson) {
        return pPerson.name == this.name ? true : false;
    }

}