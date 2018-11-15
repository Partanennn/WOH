$(() => {
    $.get(
        "http://localhost:3001/workOrders/"+
        sessionStorage['login_username']
    ).done( (data, status, jqXHR) => {
        if(data[0].order_username != undefined) {
            $("#orders_table").empty();
            
            for(var i = 0; i < data.length; i++) {
            
                $("#orders_table").append(
                    "<tr>" +
                    "<td>" + data[i].order_username + "</td>"+
                    "<td>" + data[i].work_description + "</td>" +
                    "<td>" + dateFormatter(data[i].orderdate) + "</td>" +
                    "<td>" + dateFormatter(data[i].startdate) + "</td>" +
                    "<td>" + dateFormatter(data[i].readydate) + "</td>" +
                    "<td>" + dateFormatter(data[i].accepteddate) + "</td>" +
                    "<td>" + dateFormatter(data[i].denieddate) + "</td>" +
                    "<td>" + data[i].comment_of_work + "</td>" +
                    "<td>" + data[i].hours + "</td>" +
                    "<td>" + data[i].approx_budget + "</td>" +
                    "<td>" + data[i].status + "</td>" +
                    "</tr>"
                )
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
});