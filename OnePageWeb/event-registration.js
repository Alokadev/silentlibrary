bindUserEventData();
function addEventDataToLocalStorage(userObj) {

    //already has data in localstorage then update it other create new one
    var users = JSON.parse(localStorage.getItem('eventData'));
    if (users != null) {
        users.push(userObj);

        localStorage.setItem('eventData', JSON.stringify(users));
    }
    else {
        var userData = new Array();
        userData.push(userObj);
        localStorage.setItem('eventData', JSON.stringify(userData));

    }
}



function deleteEventDataFromLocalStorage(UserId) {

    var users = JSON.parse(localStorage.getItem('eventData'));
    if (users != null) {
        users.splice(users.findIndex(a => a.id === UserId), 1)
        localStorage.setItem('eventData', JSON.stringify(users));
    }
}


function bindUserEventData() {
    var users = JSON.parse(localStorage.getItem('eventData'));
    if (users != null) {
        document.getElementById('tblbody3').innerHTML = "";
        users.forEach(function (item, index) {
            debugger;
            var btnEditId = "btnedit" + item.id;
            var btnDeleteId = "btndelete" + item.id;
            var tableRow = "<tr Id='" + item.id + "'   data-CustomerID='" + item.id + "'   data-name='" + item.name +
                "' data-desc='" + item.desc + "' data-date='" + item.dateTime + "'>"
                + "<td class='td-data'>" + item.id + "</td>"
                + "<td class='td-data'>" + item.name + "</td>"
                + "<td class='td-data'>" + item.desc + "</td>"
                + "<td class='td-data'>" + item.dateTime + "</td>"
                + "<td class='td-data'>" +
                "<button id='" + btnDeleteId + "' class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteRowEvent(" + item.id + ")'><i class='fa fa-trash' aria-hidden='true'>Delete</button>"
                + "</td>"
                + "</tr>";
            document.getElementById('tblbody3').innerHTML += tableRow;
        })
    }
    var AddRow = "<tr>"
        + "<td class='td-data'></td>"
        + "<td class='td-data'><input type='text' id='name' placeholder='name..'></td>"
        + "<td class='td-data'><input type='text' id='desc' placeholder='Description..'></td>"
        + "<td class='td-data'><input type='datetime-local' id='daytime' name='birthdaytime'></td>"
        + "<td class='td-data'>" + "<button id= 'btnaddCustomer' onclick='addUser1()' class='btn btn-success'> <i class='fa fa-plus-circle' aria-hidden='true'></i>Add</button>" + "</td>"
        + "</tr>";
    document.getElementById('tblbody3').innerHTML += AddRow;
}

function GetUserID() {
    const ID = Date.now();
    return ID;
}

function addUser1() {
    var eventId = GetUserID();
    var name = document.getElementById("name").value;
    var desc = document.getElementById("desc").value;
    var dateTime = document.getElementById("daytime").value;
    var status = document.getElementById("ddlstatus").value;
    var userObj = {
        "id": eventId,
        "name": name,
        "desc": desc,
        "dateTime": dateTime
    };
    addEventDataToLocalStorage(userObj);
    bindUserEventData();
};


function deleteRowEvent(UserID) {
    deleteEventDataFromLocalStorage(UserID);
    bindUserEventData();
}