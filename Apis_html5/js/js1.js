//variable global
var datos = [];

function posicion() {
    if (navigator.geolocation) { //para saber si puede acceder a la geolocalizacion
        //bien por el navegador web o por el usuario
        navigator.geolocation.getCurrentPosition(
            function(pos) {
                document.querySelector("#latitud").innerHTML = pos.coords.latitude;
                document.querySelector("#longitud").innerHTML = pos.coords.longitude;
            },
            function(error) {
                document.querySelector("#latitud").innerHTML = "";
                document.querySelector("#longitud").innerHTML = error.message;
                document.querySelector("#error").innerHTML = "";
            }
        );
    }
    else
    {
        document.querySelector("#latitud").innerHTML = "";
        document.querySelector("#longitud").innerHTML = "";
        document.querySelector('#error').innerHTML = "Sin acceso";
    }

    }

function leerInfo() {
    if (localStorage && localStorage["datos"]) {//si existe
        datos = eval(localStorage["datos"]);//eval porque estoy leyendo
        //recuperamos la lista
        var lista = document.querySelector("#emails");
        for (var i = 0; i < datos.length; i++) {
            var item = document.createElement("li");
            var texto = document.createTextNode(datos[i]);

            item.appendChild(texto);
            lista.appendChild(item);

        }

    } else {
        alert("No soportado, actualiza!! ");
    }
}

function escribir() {
    var texto = document.querySelector("#txtEmail").value;

    datos.push(texto);
    var lista = document.querySelector("#emails");
    var item = document.createElement("li");
    var textItem = document.createTextNode(texto);

    item.appendChild(textItem);
    lista.appendChild(item);
    localStorage["datos"] = JSON.stringify(datos);
}

(function () {
    var ele = document.querySelectorAll('.dibujo');//hace lo mismo que jQuery
    //var ele = document.querySelectorAll('#dibujo');//no valdría porque es para un array
    //ele.style.background = "red";

    for (var i = 0; i < ele.length; i++) {
        ele[i].style.background = "red";

        ele[i].addEventListener("click", function () { alert('click'); });//cuando pulse en cualquiera de las capas que haga una alerta
        //hace lo mismo que el bind en jquery
    }
    document.querySelector("#btnGuardar").addEventListener("click", escribir);
    posicion();
    leerInfo();

})();
