$(() => {
    var workorder_id;
    $("#add_dialog").dialog({
        autoOpen: false,
        buttons: [
            {
                text: "Tilaa",
                click: () => {
                    addWorkorder();
                    window.location.href='etusivu.html';
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
    })
    
    
    $("#add_button").click(() => {
        $("#add_dialog").dialog("open");
    });

    
    $.get(
        "http://localhost:3001/workOrders/"+
        sessionStorage['login_username']
    ).done( (data, status, jqXHR) => {
        if(data[0].order_username != undefined) {
            $("#orders_table").empty();
            for(var i = 0; i < data.length; i++) {
                var button = "";
                if(data[i].status == "TILATTU") {
                    button = "<td><button class='edit_button' data-editid="+ data[i].order_id +">Muokkaa</button></td><td><button class='delete' data-deleteid="+ data[i].order_id +">Poista</button></td>";
                }
                
                $("#orders_table").append(
                    "<tr>" +
                    "<td>" + data[i].order_username + "</td>"+
                    "<td>" + data[i].work_description + "</td>" +
                    "<td>" + data[i].address + "</td>" +
                    "<td>" + data[i].city + "</td>" +
                    "<td>" + dateFormatter(data[i].orderdate) + "</td>" +
                    "<td>" + dateFormatter(data[i].startdate) + "</td>" +
                    "<td>" + dateFormatter(data[i].readydate) + "</td>" +
                    "<td>" + data[i].comment_of_work + "</td>" +
                    "<td>" + data[i].hours + "</td>" +
                    "<td>" + data[i].approx_budget + "</td>" +
                    "<td>" + data[i].comment_of_used_material + "</td>" +
                    "<td>" + data[i].status + "</td>" +
                    button + 
                    "</tr>"
                )
                    
                
                $(".delete").click(function(){
                    var id = $(this).attr("data-deleteid");
                    deleteWorkorder(id);
                })

                $(".edit_button").click(function() {
                    $("#edit_dialog").dialog("open");
                    var id = $(this).attr('data-editid');
                    workorder_id = id;
                    editWorkorder(id);
                }); 
            }
        }
    }).fail( (jqXHR, status, err) => {
        console.log("Status=" + status + ", " + err);
    });

    function deleteWorkorder(key) {
        $.ajax(
        {
            url: "http:localhost:3001/workorders/"+key,
            method: 'delete'
        }).done( (data, status, jqXHR) => {
            window.location.href='etusivu.html';
        }).fail( (jqXHR, status, errorThrown) => {
            console.log("Call failed: "+errorThrown);
        });
}

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
                window.location.href='etusivu.html';
            }).fail( (jqXHR, status, errorThrown) => {
                console.log("Ajax put call for workorder did fail, reason: " + errorThrown);
            });
        }
    }

    function editWorkorder(id) {
        
        $.get(
            "http://localhost:3001/workorder/"+
            id
        ).done( (data, status, jqXHR) => {
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
    
    // Adds username to hidden input box
    $("#add_username").val(sessionStorage['login_username']);
    });