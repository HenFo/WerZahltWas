"use strict";

/**
 * fügt die Person mit dem was sie bezahlt hat der Liste hinzu
 */
var zPersonen = [];
var zIds = 0;
function add() {
    var hPerson = new Person(document.getElementById("Name").value, document.getElementById("bezahlt").value);

    var i = 0, hVorhanden = false;
    while (i < zPersonen.length && !hVorhanden) {
        hVorhanden = hPerson.isEqual(zPersonen[i]);
        i++;
    }

    if (!hVorhanden) {
        zPersonen.push(hPerson);
        document.getElementById("inputList").innerHTML += "<div class='inputList' id='list" + zIds + "'>" + hPerson.name + " hat " + hPerson.geld + " Euro bezahlt" + "<button class='btn remove' onclick = 'remove(" + i + "," + zIds + "," + hPerson.geld + ")' type = 'button'><i class='fa fa-close'></i></button><br></div>";
    } else {
        zPersonen[i].addGeld(document.getElementById("bezahlt").value);
        document.getElementById("inputList").innerHTML += "<div class='inputList' id='list" + zIds + "'>" + zPersonen[i].name + " hat noch " + hPerson.geld + " Euro bezahlt <button class='btn remove' onclick = 'remove(" + i + "," + zIds + "," + hPerson.geld + ")' type = 'button'><i class='fa fa-close'></i></button><br></div>";
    }
    zIds++;
    document.getElementById("Name").value = "";
    document.getElementById("bezahlt").value = "";
    calculateDistrebution();
}

/**
 * berechnet die Verteilung bezüglich wer was wem schuldet
 */
function calculateDistrebution() {
    document.getElementById("verteilung").innerHTML = "";
    for (var i = 0; i < zPersonen.length; i++) {
        if (!zPersonen[i].isDeleted) {
            zPersonen[i].bekommt = [];
            var personenUebrig = zPersonen.length - deleted;
            var aufteilung = zPersonen[i].geld / personenUebrig;
            for (var j = 0; j < zPersonen.length; j++) {
                if (!zPersonen[j].isDeleted) {
                    var wuerdeBekommen = zPersonen[j].geld / personenUebrig;
                    var bezahlt = aufteilung - wuerdeBekommen;
                    if (bezahlt >= 0) {
                        zPersonen[i].bekommt.push(Math.floor(100 * bezahlt) / 100);
                    } else {
                        zPersonen[i].bekommt.push(0);
                    }
                } else {
                    zPersonen[i].bekommt.push(null);
                }
            }
            document.getElementById("verteilung").innerHTML += "<tr id='" + zPersonen[i].name + "Line'><td>" + zPersonen[i].name + " hat " + zPersonen[i].geld + " Euro bezahlt" + "</td > <td id='" + zPersonen[i].name + "'></td></tr > ";
            for (var j = 0; j < zPersonen.length; j++) {
                if (!zPersonen[j].isDeleted) {
                    if (!zPersonen[i].isEqual(zPersonen[j])) {
                        document.getElementById(zPersonen[i].name).innerHTML += zPersonen[j].name + ": " + zPersonen[i].bekommt[j] + " Euro <br/>";
                    }
                }
            }
        }
    }
}

/**
 * schnelle Eingabe für eine neue Peron
 */
var personen = 1;
function quickInputName() {
    document.getElementById("Name").value = "Person " + personen++;
}

/**
 * schnelle Eingabe für geld 
 * @param {Intager} Geld
 */
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
var deleted = 0;
function remove(namePos, InputId, geld) {
    zPersonen[namePos].addGeld(-geld);
    var name = zPersonen[namePos].name + "Line";
    if (zPersonen[namePos].geld <= 0) {
        zPersonen[namePos].delete();
    }
    var element = document.getElementById("list" + InputId);
    element.parentNode.removeChild(element);
    element = document.getElementById(name);
    element.parentNode.removeChild(element);
    deleted++;
    if (deleted == zPersonen.length) {
        document.getElementById("verteilung").innerHTML = "";
        $("#tabelleVerteilung").hide();
    } else {
        calculateDistrebution();
    }
}

/**
 * resettet alle Parameter und das Layout
 */
function reset() {
    zPersonen = [];
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

/**
 * nimmt eine String und fügt den Inhalt der Liste hinzu
 * @param {String} data
 */
function convert(data) {
    var people = data.split(";")
    for (var i=0; i < people.length; i++) {
        document.getElementById("Name").value = people[i].split(",")[0];
        document.getElementById("bezahlt").value = people[i].split(",")[1];
        add();
    }
}

/**
 * nimmt die momentanen Eingaben und erzeugt daraus eine Datei zum wiederverwenden
 */
function saveToFile() {
    var str = "";
    for (var i = 0; i < zPersonen.length; i++) {
        if (i == zPersonen.length - 1) {
            str += zPersonen[i].name + "," + zPersonen[i].geld;
        } else {
            str += zPersonen[i].name + "," + zPersonen[i].geld + ";";
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
