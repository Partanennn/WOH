$(() => {
    $("#add_dialog").dialog({
        autoOpen: false,
        buttons: [
            {
                text: "Tilaa",
                click: () => {
                    addWorkorder();
                    alert("Tilaus tehty onnistuneesti!");
                    $("#add_form").submit();
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
                    button = "<td><button>Muokkaa</button></td><td><button class='delete' data-deleteid="+ data[i].order_id +">Poista</button></td>";
                }
                
                $("#orders_table").append(
                    "<tr>" +
                    "<td>" + data[i].order_username + "</td>"+
                    "<td>" + data[i].work_description + "</td>" +
                    "<td>" + dateFormatter(data[i].orderdate) + "</td>" +
                    "<td>" + data[i].address + "</td>" +
                    "<td>" + data[i].city + "</td>" +
                    "<td>" + dateFormatter(data[i].startdate) + "</td>" +
                    "<td>" + dateFormatter(data[i].readydate) + "</td>" +
                    "<td>" + data[i].comment_of_work + "</td>" +
                    "<td>" + data[i].hours + "</td>" +
                    "<td>" + data[i].approx_budget + "</td>" +
                    "<td>" + data[i].status + "</td>" +
                    button + 
                    "</tr>"
                )
            
                
                $(".delete").click(function(){
                    var id = $(this).attr("data-deleteid");
                    deleteUser(id);
                })
            }
        }
    }).fail( (jqXHR, status, err) => {
        console.log("Status=" + status + ", " + err);
    });
        
    // Formats date to dd.MM.YYYY format
    function dateFormatter(date) {
        var d = new Date(date);
        if(date != null)
        return d.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear();
        else
        return null;
    }
    
    // Delete user
    function deleteUser(key) {
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