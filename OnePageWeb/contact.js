function addInqDataToLocalStorage(inqObj) {
    //already has data in localstorage then update it other create new one
    var eventInq = JSON.parse(localStorage.getItem('inqData'));
    if (eventInq != null) {
        eventInq.push(inqObj);

        localStorage.setItem('inqData', JSON.stringify(eventInq));
    }
    else {
        var inqData = new Array();
        inqData.push(inqObj);
        localStorage.setItem('inqData', JSON.stringify(inqData));
    }
}

function GetInqID() {
    const ID = Date.now();
    return ID;
};

function addInq() {

    var inqId = GetInqID();
    var name = document.getElementById("name").value;
    if (!name) {
        alert('Please Enter Name!')
        return false;
    }

    var email = document.getElementById("email").value;
    if (!email) {
        alert('Please Enter Email!')
        return false;
    }

    var emailfilter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailfilter.test(email)) {
        alert('Please Enter a Valid Email Address!');
        return false;
    }

    var question = document.getElementById("question").value;
    var eventInq = document.getElementById("inq-event").value;
    var inqObj = {
        "id": inqId,
        "name": name,
        "email": email,
        "question": question,
        "eventInq": eventInq
    };
    addInqDataToLocalStorage(inqObj);
};