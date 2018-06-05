"use strict";

var bezahlungen = [];
var namen = [];
var ids = 0;
function add() {
    var hName = document.getElementById("Name").value;
    var hGeld = parseFloat(document.getElementById("bezahlt").value);
    if (hName != "" && !isNaN(hGeld)) {
        var vorhanden = false;
        var i = 0;
        while (!vorhanden && i < namen.length) {
            if (hName == namen[i]) 
                vorhanden = true;
            else
                i++;
        }
        if (!vorhanden) {
            bezahlungen.push(hGeld);
            namen.push(hName);

            document.getElementById("inputList").innerHTML += "<div class='inputList' id='list" + ids + "'>" + hName + " hat " + hGeld + " Euro bezahlt" + "<button class='btn remove' onclick = 'remove("+i+","+ ids + "," + hGeld + ")' type = 'button'><i class='fa fa-close'></i></button><br></div>";
        } else {
            bezahlungen[i] += parseFloat(document.getElementById("bezahlt").value);
            document.getElementById("inputList").innerHTML += "<div class='inputList' id='list" + ids + "'>" + hName + " hat noch " + hGeld + " Euro bezahlt <button class='btn remove' onclick = 'remove(" + i + "," + ids + "," + hGeld + ")' type = 'button'><i class='fa fa-close'></i></button><br></div>";
        }
        ids++;
    }
    document.getElementById("Name").value = "";
    document.getElementById("bezahlt").value = "";
    calculateDistrebution();
}

var berechnet = false;
function calculateDistrebution() {
    document.getElementById("verteilung").innerHTML = "";
    for (var i = 0; i < namen.length; i++) {
        var bekommt = [];
        var aufteilung = bezahlungen[i] / namen.length;
        for (var j = 0; j < namen.length; j++) {
            var wuerdeBekommen = bezahlungen[j] / namen.length;
            var bezahlt = aufteilung - wuerdeBekommen;
            if (bezahlt >= 0) {
                bekommt.push(Math.floor(100 * bezahlt) / 100);
            } else {
                bekommt.push(0);
            }
        }
        document.getElementById("verteilung").innerHTML += "<tr id='" + namen[i] +"Line'><td>" + namen[i] + " hat " + bezahlungen[i]+" Euro bezahlt"+ "</td > <td id='" + namen[i] +"'></td></tr > ";
        for (var j = 0; j < namen.length; j++) {
            if (namen[i] != namen[j]) {
                document.getElementById(namen[i]).innerHTML += namen[j] + ": " + bekommt[j] + " Euro <br/>";
            }
        }
    }
    berechnet = true;
}

var personen = 0;
function quickInputName() {
    document.getElementById("Name").value = "Person" + personen++;
}

function quickInputGeld(Geld) {
    if (document.getElementById("bezahlt").value != "") {
        document.getElementById("bezahlt").value = parseFloat(document.getElementById("bezahlt").value) + Geld;
    } else {
        document.getElementById("bezahlt").value = Geld;
    }
}

function remove(namePos, InputId, geld) {
    bezahlungen[namePos] -= geld;
    var name = namen[namePos] + "Line";
    if (bezahlungen[namePos] <= 0) {
        namen.splice(namePos, 1);
        bezahlungen.splice(namePos, 1);
    }
    var element = document.getElementById("list" + InputId);
    element.parentNode.removeChild(element);
    if (berechnet) {
        element = document.getElementById(name);
        element.parentNode.removeChild(element);
        calculateDistrebution();
    }
}

function reset() {
    bezahlungen = [];
    namen = [];
    personen = 0;
    berechnet = false;
    document.getElementById("Name").value = "";
    document.getElementById("bezahlt").value = "";
    document.getElementById("verteilung").innerHTML = "";
    document.getElementById("inputList").innerHTML = "";
}

function saveToFile() {
    var str = "";
    for (var i = 0; i < namen.length; i++) {
        str += namen[i] + "," + bezahlungen[i] + ";";
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
        $("#quickInput").toggle();
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
