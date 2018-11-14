$(() => {
    
    $.get("http://localhost:3001/users/"+sessionStorage['login_username'])
    .done((data, status, jqXHR) => {
        
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