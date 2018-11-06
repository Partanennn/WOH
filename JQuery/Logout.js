$(() => {

    
    $("#logout_dialog").dialog({
        buttons: [
            {
                text: "Kyllä",
                click: () => {
                        sessionStorage.clear();
                        window.location.href='Rekisteroidy.html';
                }
            },
            {
                text: "En",
                click: () => {
                    $(this).dialog("close");
                }
            }
        ]
    });
    
});