bindEventInqData();

function deleteEventInqFromLocalStorage(UserId) {

    var users = JSON.parse(localStorage.getItem('inqData'));
    if (users != null) {
        users.splice(users.findIndex(a => a.id === UserId), 1)
        localStorage.setItem('inqData', JSON.stringify(users));
    }
}


function bindEventInqData() {
    var users = JSON.parse(localStorage.getItem('inqData'));
    if (users != null) {
        document.getElementById('tblbody4').innerHTML = "";
        users.forEach(function (item, index) {
            debugger;
            var btnDeleteId = "btndelete" + item.id;
            var tableRow = "<tr Id='" + item.id + "'   data-inq='" + item.id + "'   data-name='" + item.name + "' data-email='" + item.email +
                "' data-question='" + item.question + "' data-event='" + item.eventInq + "' " +
                "data-membership='" + item.membership +"'>"
                + "<td class='td-data'>" + item.id + "</td>"
                + "<td class='td-data'>" + item.name + "</td>"
                + "<td class='td-data'>" + item.email + "</td>"
                + "<td class='td-data'>" + item.question + "</td>"
                + "<td class='td-data'>" + item.eventInq + "</td>"
                + "<td class='td-data'>" +
                "<button id='" + btnDeleteId + "' class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteRowEventInq(" + item.id + ")'><i class='fa fa-trash' aria-hidden='true'>Delete</button>"
                + "</td>"
                + "</tr>";
            document.getElementById('tblbody4').innerHTML += tableRow;
        })
    }
}
function deleteRowEventInq(UserID) {
    deleteEventInqFromLocalStorage(UserID);
    bindEventInqData();
}
