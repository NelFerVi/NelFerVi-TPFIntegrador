function validar() {
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let nacion = document.getElementById("nacion");
    let email = document.getElementById("email");
    let comentarios = document.getElementById("comentarios");

    let error = false;

    if (nombre.value == "") {
        nombre.focus();
        nombre.style.backgroundColor = "red";
        error = true;
    }
    if (apellido.value == "") {
        apellido.focus();
        apellido.style.backgroundColor = "red";
        error = true;
    }
    if (nacion.value == "Seleccione una opcion") {
        nacion.focus();
        nacion.style.backgroundColor = "red"
        error = true;
    }
    if (email.value == "") {
        email.focus();
        email.style.backgroundColor = "red"
        error = true;
    }
    if (comentarios.value == "") {
        comentarios.focus();
        comentarios.style.backgroundColor = "red";
        error = true;
    }

    if (error == false) {
        alert("Dato enviado")
    } else { alert("ATENCION: Debe completar los datos obligatorios!!!") }

    if (error)
        return false;
    else
        return true;
}

function valNombre() {
    let nombre = document.getElementById("nombre");
    nombre.onblur = function () {
        if (nombre.value == "") {
            nombre.focus();
            nombre.setAttribute("placeholder", "Debe ingresar el nombre");
            nombre.style.backgroundColor = "red";
        }
    }
}

function valApellido() {
    let apellido = document.getElementById("apellido");
    apellido.onblur = function () {
        if (apellido.value == "") {
            apellido.focus();
            apellido.setAttribute("placeholder", "Debe ingresar el apellido");
            apellido.style.backgroundColor = "red";
        }
    }
}

function valNacion() {
    let nacion = document.getElementById("nacion");
    nacion.onblur = function () {
        if (nacion.value == "Seleccione una opcion") {
            nacion.focus();
            nacion.style.backgroundColor = "red";
        } else { nacion.style.backgroundColor = "" }
    }
}

function valEmail() {
    let email = document.getElementById("email");
    email.onblur = function () {
        if (email.value == "") {
            email.focus();
            email.setAttribute("placeholder", "Debe ingresar el email");
            email.style.backgroundColor = "red";
        } else {
            if (pruebaemail(email.value) == "true") {
                email.style.backgroundColor = "";
            }
        }
    }
}

function pruebaemail(valor) {
    re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if (!re.exec(valor)) {
        alert('email no valido');
    }
    else {
        alert('email valido');
        return "true";
    }
}

function valCom() {
    let comentarios = document.getElementById("comentarios");
    comentarios.onblur = function () {
        if (comentarios.value == "") {
            comentarios.focus();
            comentarios.setAttribute("placeholder", "Debe ingresar un comentario");
            comentarios.style.backgroundColor = "red";
        } else { comentarios.style.backgroundColor = "" }
    }
}