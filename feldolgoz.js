$(function () {
    napKiir();
    beolvas();
    $("article").delegate(".aktiv", "click", kivalaszt);
    $("#kuld").on("click", feltolt);
});

var feladatok = [];

function napKiir() {
    var txt = "";
    for (var i = 0; i < 31; i++) {
        txt += "<div class='nap' data-id='" + Number(i) + "'>" + Number(i+1) + "</div>";
    }
    $("article").html(txt);
}

function beolvas() {
    $.ajax({
        type: "GET",
        url: "feldolgoz.php",
        success: function (eredmeny) {
            feladatok = JSON.parse(eredmeny);
            szinez();
        },
        error: function () {
            alert("Hiba az adatok beolvasasakor!");
        }
    });
}

function szinez() {
    var ev = 2021;
    var honap = 5;
    for (var i = 0; i < feladatok.length; i++) {
        var datumok = feladatok[i].datum;
        var datum = datumok.split("-");
        var nap = Number(datum[2]);
        
        console.log(nap);

        if (ev === Number(datum[0]) && honap === Number(datum[1])) {
            $(".nap").eq(nap - 1).addClass("aktiv");
            $(".nap").eq(nap - 1).attr("data-nap", i);
        }
    }
}

var adatok = [];

function kivalaszt() {
    //console.log("kivalaszt");
    var id = $(this).attr("data-nap");
    //console.log(id);
    esemenyKiir(id);
}

function esemenyKiir(id) {
    $("#idopontadatok").empty();
    txt = "<p>Tevékenység: " + feladatok[id].tevekenyseg + "</p>";
    txt += "<p>Dátum: " + feladatok[id].datum + "</p>";
    txt += "<p>Idő: " + feladatok[id].ido + "</p>";

    $("#idopontadatok").html(txt);
}

function feltolt() {
    $("#idopontadatok").empty();
    var tevekenyseg = {
        tev: $("#tevekenyseg").val(),
        datum: $("#datum").val(),
        ido: $("#ido").val()
    };
    console.log(tevekenyseg);
    if (tevekenyseg.tev !== "" && tevekenyseg.datum !== "" && tevekenyseg.ido !== "") {
        console.log(tevekenyseg);
        $.ajax({
            type: "POST",
            url: "feltolt.php",
            data: tevekenyseg,
            success: function () {
                adatok.push(tevekenyseg);
                beolvas();
            },
            error: function () {
                console.log("Hiba az adatok felvitelekor!");
            }
        });
    }else{
        $("#idopontadatok").html("Nincs kitoltve minden adat!");
    }
}






