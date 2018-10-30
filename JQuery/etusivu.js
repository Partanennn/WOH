$(document).ready(() => {
    if(sessionStorage['logged'] == "true") {
        $("#login").append("<h3>Moi " +
            sessionStorage['login_enimi'] +
            "</h3>"
        );
    }
});