"use strict";

var zPersonen = [];
var zIds = 0;
function add() {
    var hPerson = new Person(document.getElementById("Name").value, document.getElementById("bezahlt").value);

    var i = 0, hVorhanden = false;
    while (i < zPersonen.length && !hVorhanden) {
        hVorhanden = hPerson.isEqual(zPersonen[i]);
    }

    if (!hVorhanden) {
        document.getElementById("inputList").innerHTML += "<div class='inputList' id='list" + ids + "'>" + hPerson.name() + " hat " + hPerson.geld() + " Euro bezahlt" + "<button class='btn remove' onclick = 'remove(" + i + "," + ids + "," + hPerson.geld() + ")' type = 'button'><i class='fa fa-close'></i></button><br></div>";
    } else {
        zPersonen[i].addGeld(document.getElementById("bezahlt").value);
        document.getElementById("inputList").innerHTML += "<div class='inputList' id='list" + ids + "'>" + zPersonen[i].name() + " hat noch " + hPerson.geld() + " Euro bezahlt <button class='btn remove' onclick = 'remove(" + i + "," + ids + "," + hPerson.geld() + ")' type = 'button'><i class='fa fa-close'></i></button><br></div>";
    }
    zIds++;
    document.getElementById("Name").value = "";
    document.getElementById("bezahlt").value = "";
    calculateDistrebution();
}

function claculateDistrebution() {
    document.getElementById("verteilung").innerHTML = "";
    for (var i = 0; i < zPersonen.length; i++) {
        if (!zPersonen[i].isDeleted()) {
            var aufteilung = zPersonen[i].geld() / (zPersonen.length - deleted);
            for (var j = 0; j < zPersonen.length; j++) {
                if (!zPersonen[j].isDeleted()) {
                    var wuerdeBekommen = zPersonen[j].geld() / (zPersonen.length - deleted);
                    var bezahlt = aufteilung - wuerdeBekommen;
                    if (bezahlt >= 0) {
                        zPerson[i].bekommt.push(Math.floor(100 * bezahlt) / 100);
                    } else {
                        zPerson[i].bekommt.push(0);
                    }
                } else {
                    zPerson[i].bekommt.push(null);
                }
            }
            document.getElementById("verteilung").innerHTML += "<tr id='" + zPersonen[i].name() + "Line'><td>" + zPersonen[i].name() + " hat " + zPersonen[i].geld() + " Euro bezahlt" + "</td > <td id='" + zPersonen[i].name() + "'></td></tr > ";
            for (var j = 0; j < namen.length; j++) {
                if (zPersonen[j].name() != "deleted") {
                    if (zPersonen[i].name() != zPersonen[j].name()) {
                        document.getElementById(zPersonen[i].name()).innerHTML += zPersonen[j].name() + ": " + zPerson[i].bekommt[j] + " Euro <br/>";
                    }
                }
            }
        }
    }
}


var personen = 1;
function quickInputName() {
    document.getElementById("Name").value = "Person " + personen++;
}

function quickInputGeld(Geld) {
    if (document.getElementById("bezahlt").value != "") {
        document.getElementById("bezahlt").value = parseFloat(document.getElementById("bezahlt").value) + Geld;
    } else {
        document.getElementById("bezahlt").value = Geld;
    }
}

/**
 * entfernt die darstelung
 * @param {String} namePos Position der Person in der Liste
 * @param {any} InputId ID des zu entfernenden Eintrags in der InputList
 * @param {Float} geld der zu entfernende Betrag
 */
function remove(namePos, InputId, geld) {
    zPersonen[namePos].addGeld(-geld);
    var name = zPersonen[namePos].name() + "Line";
    if (zPersonen[namePos].geld() <= 0) {
        zPersonen[namePos].delete();
    }
    var element = document.getElementById("list" + InputId);
    element.parentNode.removeChild(element);
    element = document.getElementById(name);
    element.parentNode.removeChild(element);
    deleted++;
    calculateDistrebution();
}

function reset() {
    bezahlungen = [];
    namen = [];
    personen = 1;
    deleted = 0;
    document.getElementById("Name").value = "";
    document.getElementById("bezahlt").value = "";
    document.getElementById("verteilung").innerHTML = "";
    document.getElementById("inputList").innerHTML = "";
}

window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function (e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = reader.result;
            convert(data);
            calculateDistrebution();
            $("#tabelleVerteilung").show();
        }
        reader.readAsText(file);
    });
}

function convert(data) {
    var people = data.split(";")
    for (var i=0; i < people.length; i++) {
        document.getElementById("Name").value = people[i].split(",")[0];
        document.getElementById("bezahlt").value = people[i].split(",")[1];
        add();
    }
}

function saveToFile() {
    var str = "";
    for (var i = 0; i < namen.length; i++) {
        if (i == namen.length - 1) {
            str += namen[i] + "," + bezahlungen[i];
        } else {
            str += namen[i] + "," + bezahlungen[i] + ";";
        }
    }

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));
    element.setAttribute('download', 'Wer_Hat_Was_gezahlt.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

$(document).ready(function () {
    $("#QuickInputButton").click(function () {
        $("#quickInput").slideToggle();
    });
});

$(document).ready(function () {
    $("#reset").click(function () {
        $("#quickInput").hide();
        $("#tabelleVerteilung").hide();
    });
});

$(document).ready(function () {
    $("#addToList").click(function () {
        $("#tabelleVerteilung").show();
    });
});
