$(() => {
    $.get(
        "http://localhost:3001/workOrders/"+
        sessionStorage['login_username']
    );

    $("#user_name").append(
        "<h2>"+
        "Hei "+sessionStorage['login_name']+
        "<h2>"
        );
});