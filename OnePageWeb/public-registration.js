function addUserDataToLocalStorage(userObj) {

    //already has data in localstorage then update it other create new one
    var users = JSON.parse(localStorage.getItem('userData'));
    if (users != null) {
        users.push(userObj);

        localStorage.setItem('userData', JSON.stringify(users));
    }
    else {
        var userData = new Array();
        userData.push(userObj);
        localStorage.setItem('userData', JSON.stringify(userData));

    }
}

function GetUserID() {
    const ID = Date.now();
    return ID;
}

function addUser() {
    var userId = GetUserID();
    var name = document.getElementById("name").value;
    if (!name) {
        alert("Please Enter Your Name");
    };

    var email;
    email= document.getElementById("email").value;
    if (!email) {
        alert('Please Enter Your email!')
        return false;
    }

    var emailCheck = JSON.parse(localStorage.getItem('userData'));
    if (!emailCheck && !email) {
        if (isExistEmail(emailCheck, email) == false) {
            return false;
        };
    };

    var emailfilter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailfilter.test(email)) {
        alert('Please enter a valid email address!');
        return false;
    };

    var gender = document.getElementById("gender").value;
    var membership = document.getElementById("membership").value;

    var userObj = {
        "id": userId,
        "name": name,
        "email": email,
        "gender": gender,
        "status": "new",
        "membership": membership
    };

    addUserDataToLocalStorage(userObj);


};