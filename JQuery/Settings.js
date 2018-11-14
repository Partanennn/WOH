$(() => {
    
    $.get("http://localhost:3001/users/"+sessionStorage['login_username'])
    .done((data, status, jqXHR) => {
        $("#name_reg").val(data[0].name);
        $("#username_reg").val(data[0].username);
    });
    
    $.get("http://localhost:3001/housing_types")
    .done((data, status, jqXHR) => {
        data.forEach(x => {
            $("#update_select").append(
                "<option>" +
                x.housing +
                "</option"
            );
        });
    });   
});