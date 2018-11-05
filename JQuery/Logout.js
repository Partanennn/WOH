$(() => {
    $("#logout_dialog").dialog({
        buttons: [
            {
                text: "Kyllä",
                click: () => {
                    $("#logout_button").click(() => {
                        sessionStorage.clear();
                        window.location.href='Rekisteroidy.html';
                    });
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