$(() => {
    $("#logout_button").click(() => {
        $("#logout_dialog").dialog();
    });
    $("#user_name").append(
        "<h2>"+
        "Hei "+sessionStorage['login_name']+
        "<h2>"
        );
});