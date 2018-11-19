$(() => {
    //
    //
    //
    //
    //
    //
    //  Tallennus
    //  Poisto VALMIS
    //  Muokkaus
    //  Hyväksyminen
    //  Hylkääminen
    //
    //
    //
    //
    //
    //
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

    // Formats date to dd.MM.YYYY format
    function dateFormatter(date) {
        var d = new Date(date);
        if(date != null)
        return d.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear();
        else
        return null;
    }
});