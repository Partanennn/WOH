$(() => {
    $("#user_name").append(
        "<h2>"+
        "Hei "+sessionStorage['login_name']+
        "<h2>"
        );
});