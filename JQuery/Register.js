$(() => {
    $("#reg_button").click(() => {
        var name = $("#name_reg").val();
        var username = $("#username_reg").val();
        var pass = $("#password_reg").val();
        var address = $("#address_reg").val();
        var city = $("#city_reg").val();
        var role = $("#reg_select").val();  // 0=Yksityinen, 1=yritys

        var addons = $("#register_form").serialize();

        $.post("http://localhost:3001/create_user", addons);
    });
});