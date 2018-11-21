$(() => {
    // Makes table full workorders with status JÄTETTY, VASTATTU, HYVÄKSYTTY, HYLÄTTY,
    // if user doesn't have any orders with those statuses, 
    // then writes EI TARJOUSPYYNTÖJÄ on screen
    $.get(
        "http://localhost:3001/workOrders/"+
        sessionStorage['login_username']
    )
    .done((data, status, jqXHR) => {
        var emptyTable = true;
        $.each(data, (i, data) => {
            var button = "";
            if(data.status == "JÄTETTY" || data.status == "VASTATTU" || data.status == "HYVÄKSYTTY" || data.status == "HYLÄTTY") {
                if(emptyTable) {
                    $("#offers_table").append(
                        "<thead>" + 
                        "<th>Tilaaja</th>" +
                        "<th>Työ info</th>" +
                        "<th>Katuosoite</th>" +
                        "<th>Kaupunki</th>" +
                        "<th>Tilauspäivä</th>" +
                        "<th>Aloituspäivä</th>" +
                        "<th>Valmistumispäivä</th>" +
                        "<th>Kommentti tehdystä työstä</th>" +
                        "<th>Käytetty tuntimäärä</th>" +
                        "<th>Kustannusarvio</th>" +
                        "<th>Tarvikkeet</th>" +
                        "<th>Status</th>" +
                        "</thead>" +
                        "<tbody>"
                    );
                }
                emptyTable = false;

                if(data.status == "JÄTETTY") {
                    button = "<td><button class='edit_button' data-editid="+ data.order_id +">Muokkaa</button></td><td><button class='delete' data-deleteid="+ data.order_id +">Poista</button></td>";
                }

                $("#offers_table").append(
                    "<tr>" +
                    "<td>" + data.order_username + "</td>"+
                    "<td>" + data.work_description + "</td>" +
                    "<td>" + data.address + "</td>" +
                    "<td>" + data.city + "</td>" +
                    "<td>" + dateFormatter(data.orderdate) + "</td>" +
                    "<td>" + dateFormatter(data.startdate) + "</td>" +
                    "<td>" + dateFormatter(data.readydate) + "</td>" +
                    "<td>" + data.comment_of_work + "</td>" +
                    "<td>" + data.hours + "</td>" +
                    "<td>" + data.approx_budget + "</td>" +
                    "<td>" + data.comment_of_used_material + "</td>" +
                    "<td>" + data.status + "</td>" +
                    button + 
                    "</tr>"
                );
                // Closes table body
                $("#offers_table").append("</tbody>");
                    
                // Calls deleteWorkorder and pass order_id to function, this is added to every delete button
                $(".delete").click(function(){
                    var id = $(this).attr("data-deleteid");
                    deleteWorkorder(id);
                });

                // Opens dialog and calls editWorkorder and pass order_id to function to get info of workorder,
                // Is added to every edit button
                $(".edit_button").click(function() {
                    $("#edit_dialog").dialog("open");
                    var id = $(this).attr('data-editid');
                    workorder_id = id;
                    editWorkorder(id);
                }); 
            }
        });

        // Checks if user haves any offers
        if(emptyTable) {
            $("#section").append("<h1>Ei tarjouspyyntöjä</h1>");
        }
    }
    ).fail( (jqXHR, status, err) => {
        console.log("Status=" + status + ", " + err);
    });





    $("#edit_dialog").dialog({
        autoOpen: false,
        buttons: [
            {
                text: "Tallenna",
                click: () => {
                    saveWorkorder();
                }
            },
            {
                text: "Peruuta",
                click: function() {
                    $(this).dialog("close");
                }
            }
        ]
    });

    $("#add_dialog").dialog({
        autoOpen: false,
        buttons: [
            {
                text: "Tallenna",
                click: () => {
                    addWorkorder();
                    window.location.href="tarjouspyynto.html";
                }
            },
            {
                text: "Peruuta",
                // Have to use this basic javascript function to use this notation,
                // won't work with ES6 arrow function
                click: function() {
                    $(this).dialog("close");
                }
            }
        ]
    });

    $("#add_button").click(() => {
        $("#add_dialog").dialog("open");
    });





    // Deletes workorder from workorders table, "refresh" page
    function deleteWorkorder(key) {
        $.ajax(
        {
            url: "http:localhost:3001/workorders/"+key,
            method: 'delete'
        }
        ).done( (data, status, jqXHR) => {
            window.location.href='tarjouspyynto.html';
        }
        ).fail( (jqXHR, status, errorThrown) => {
            console.log("Call failed: "+errorThrown);
        });
    }

    // Checks if textboxes are empty, if not then adds new workorder to workorders table
    function addWorkorder() {
        var infoOK, addressOK, cityOK;
        if($("#add_info").val() == "") {
            infoOK = false;
            $('input[id=add_info]').css("border", "2px solid red");
        } else {
            infoOK = true;
            $('input[id=add_info]').css("border", "");
        }

        if($("#add_address").val() == "") {
            addressOK = false;
            $('input[id=add_address]').css("border", "2px solid red");
        } else {
            addressOK = true;
            $('input[id=add_address]').css("border", "");
        }

        if($("#add_city").val() == "") {
            cityOK = false;
            $('input[id=add_city]').css("border", "2px solid red");
        } else {
            cityOK = true;
            $('input[id=add_city]').css("border", "");
        }

        if(infoOK && addressOK && cityOK) {
            var info = $("#add_form").serialize();
            $.post(
                "http://localhost:3001/workorders",
                info
            ).done((data, status, jqXHR) => {

            }).fail((jqXHR, status, errorThrown) => {
                console.log("Status= " + status + ", " + errorThrown);
            });
        }
    }

    // Gets workorder info for edit dialog
    function editWorkorder(id) {
            
        $.get(
            "http://localhost:3001/workorder/"+
            id
        )
        .done( (data, status, jqXHR) => {
            $("#edit_work_desc").val( data[0].work_description );
            $("#edit_address").val( data[0].address );
            $("#edit_city").val( data[0].city );
        });

    }

    // Checks if edit workorder textboxes are empty, if not then updates workorder and "refresh" page
    function saveWorkorder() {
        var descOK, addressOK, cityOK;
        if($("#edit_work_desc").val() == "") {
            $('input[id=edit_work_desc]').css("border", "2px solid red");
            descOK = false;
        } else {
            $('input[id=edit_work_desc]').css("border", "");
            descOK = true;
        }

        if($("#edit_address").val() == "") {
            $('input[id=edit_address]').css("border", "2px solid red");
            addressOK = false;
        } else {
            $('input[id=edit_address]').css("border", "");
            addressOK = true;
        }

        if($("#edit_city").val() == ""){
            $('input[id=edit_city]').css("border", "2px solid red");
            cityOK = false;
        } else {
            $('input[id=edit_city]').css("border", "");
            cityOK = true;
        }

        if(descOK && addressOK && cityOK) {
            $.ajax({
                url: "http://localhost:3001/workorder/" + workorder_id,
                method: 'put',
                data: $("#edit_form").serialize()
            }).done( function(data, status, jqXHR) {
                window.location.href='tarjouspyynto.html';
            }).fail( (jqXHR, status, errorThrown) => {
                console.log("Ajax put call for workorder did fail, reason: " + errorThrown);
            });
        }
    }
    
    
    
    
    
    // Formats date to dd.MM.YYYY format
    function dateFormatter(date) {
        var d = new Date(date);
        if(date != null)
        return d.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear();
        else
        return null;
    }

    // Adds username and status to hidden input box
    $("#add_status").val(7);
    $("#add_username").val(sessionStorage['login_username']);    
});