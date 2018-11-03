    $(document).ready(() => {
    $("#login_button").click(() => {
        var user = $("#username_login").val();
        var pass = $("#password_login").val();
        
        // Sets red border around textbox if it is empty
        if(user == '' && pass == '') {
            $('input[id="username_login"], input[id="password_login"]').css("border", "2px solid red");
            alert("Ole hyvä ja täytä kaikki kentät..!!");
        } else if(user == '') {
            $('input[id="username_login"]').css("border", "2px solid red");
            $('input[id="password_login"]').css("border", "none");
            alert("Ole hyvä ja syötä tunnus..!!");
        } else if(pass == '') {
            $('input[id="username_login"]').css("border", "none");
            $('input[id="password_login"]').css("border", "2px solid red");
            alert("Ole hyvä ja syötä salasana..!!");
        } else {
            $('input[id="username_login"]').css("border", "none");
            $('input[id="password_login"]').css("border", "none");
            
            // Checks if username and password match
            $.get("http://localhost:3001/users/"+user)
                .done( (data, textstatus, jqXHR) => {
                    if(data[0].salasana == pass) {
                        sessionStorage['login_enimi'] = data[0].nimi;
                        window.location.href = 'etusivu.html';
                    } else {
                        alert("Väärä tunnus tai salasana!!");
                    }
                })
                .fail( (error) => {
                    alert("Virhe haettaessa tietoja, err: "+error);
                });
        }
    });
});