//variable global
var datos = [];

//Drag and drop, para elementos de seleccion es muy interesante, sólo funciona con ratón por lo tanto con tablet y móvil no se podrá usar
function drag(evt) {
    evt.dataTransfer.setData("text/html", evt.target.id);
}

function dropable(evt) {
    evt.preventDefault();//significa que le indicamos que no actúes como predefinido
}

function drop(evt) {
    evt.preventDefault();
    var datos = evt.dataTransfer.getData("text/html");
    evt.target.appendChild(document.getElementById(datos));//con esto hacemos que se pueda meter dentro
}

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

function dibujar() {
    var micanvas = document.querySelector("#micanvas");
    var c = micanvas.getContext("2d");

    c.fillStyle = "#05ac33";//fillStyle es una propiedad
    c.fillRect(5, 5, 60, 30);//dibuja un rectángulo

    c.fillStyle="#0067cb";
    c.arc(70, 50, 70, 0, 2 * Math.PI);//dibuja una circunferencia
    c.stroke();
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

    //Drag and drop
    document.querySelector("#dragame").addEventListener("dragstart", drag);
    document.querySelector("#dropeame").addEventListener("dragover", dropable);
    document.querySelector("#dropeame").addEventListener("drop", drop);

    posicion();
    leerInfo();
    dibujar();

})();
