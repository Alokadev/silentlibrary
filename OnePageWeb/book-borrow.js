bindBorrowDetails();

function addBookBorrowToLocalStorage(bookBorrowObj) {

    var bookBorrow = JSON.parse(localStorage.getItem('bookBorrowData'));
    if (bookBorrow != null) {
        bookBorrow.push(bookBorrowObj);

        localStorage.setItem('bookBorrowData', JSON.stringify(bookBorrow));
    }
    else {
        var bookBorrowData = new Array();
        bookBorrowData.push(bookBorrowObj);
        localStorage.setItem('bookBorrowData', JSON.stringify(bookBorrowData));
    }
}

function bindBorrowDetails() {
    var borrows = JSON.parse(localStorage.getItem('bookBorrowData'));
    if (borrows != null) {
        document.getElementById('tblbody2').innerHTML = "";
        borrows.forEach(function (item, index) {
            var btnEditId = "btnedit" + item.id;
            var btnDeleteId = "btndelete" + item.id;
            var tableRow = "<tr Id='" + item.id + "'   borrow-Id='" + item.id + "'   book-Id='" + item.bookId + "' " +
                "book-title='" + item.title + "' book-isbn='" + item.isbn + "' user-id='" + item.userId + "' user-email='" + item.userEmail + "'>"
                + "<td class='td-data'>" + item.id + "</td>"
                + "<td class='td-data'>" + item.bookId + "</td>"
                + "<td class='td-data'>" + item.title + "</td>"
                + "<td class='td-data'>" + item.isbn + "</td>"
                + "<td class='td-data'>" + item.userId + "</td>"
                + "<td class='td-data'>" + item.userEmail + "</td>"
                + "<td class='td-data'>" +
                "<button id='" + btnDeleteId + "' class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteRow1(" + item.id + ")'><i class='fa fa-trash' aria-hidden='true'>Delete</button>"
                + "</td>"
                + "</tr>";
            document.getElementById('tblbody2').innerHTML += tableRow;
        });
    }
    var AddRow = "<tr>"
        + "<td class='td-data'></td>"
        + "<td class='td-data'><input type='text' id='bookId' placeholder='Book ID..' disabled></td>"
        + "<td class='td-data'><input type='text' id='title' placeholder='Book Title..'></td>"
        + "<td class='td-data'><input type='text' id='isbn' placeholder='ISBN..' disabled></td>"
        + "<td class='td-data'><input type='text' id='userid' placeholder='User ID..' disabled></td>"
        + "<td class='td-data'><input type='email' id='useremail' placeholder='Email..'></td>"

        + "<td class='td-data'>" + "<button id= 'btnaddBookBorrow' onclick='' class='btn btn-success'> <i class='fa fa-plus-circle' aria-hidden='true'></i>Add</button>" + "</td>"
        + "</tr>";
    document.getElementById('tblbody2').innerHTML += AddRow;
}


// parse the book data from local storage



function GetBookBorrowID() {
    const ID = Date.now();
    return ID;
}

document.addEventListener('DOMContentLoaded', function() {
    var addBookBorrow = document.getElementById("btnaddBookBorrow");
    addBookBorrow.addEventListener("click", function() {
        var bookBorrowId = GetBookBorrowID();
        var bookId = document.getElementById("bookId").value;
        var title = document.getElementById("title").value;
        var isbn = document.getElementById("isbn").value;
        var userId = document.getElementById("userid").value;
        var userDetails = JSON.parse(localStorage.getItem('bookBorrowData'))
        if (userDetails != null) {
            var counter = 0;
            for (var i = 0; i < userDetails.length; i ++) {
                if (userDetails[i].userId === userId) {
                    counter ++;
                    if (counter > 1) {
                        alert("Users Can not take more than Two books");
                        return false;
                    }
                }
            }
        }

        var userEmail = document.getElementById("useremail").value;

        var bookBorrowObj = {
            "id": bookBorrowId,
            "bookId": bookId,
            "title": title,
            "isbn": isbn,
            "userId": userId,
            "userEmail": userEmail
        };
        addBookBorrowToLocalStorage(bookBorrowObj);
        bindBorrowDetails();
        location. reload()
    });
});



var booksData = JSON.parse(localStorage.getItem('bookData'));

// check if the bookBorrowData is present in local storage
if (localStorage.getItem('bookBorrowData')) {
    // parse the borrowed book data from local storage
    var bookBorrowData = JSON.parse(localStorage.getItem('bookBorrowData'));
} else {
    var bookBorrowData = [];
}

// create an object to store the available books
var availableBooks = {
    available: []
}

// loop through the books data
for (let i = 0; i < booksData.length; i++) {
    let currentBook = booksData[i];
    let matchFound = false;

    // check if bookBorrowData is not null
    if (bookBorrowData) {
        // loop through the borrowed book data
        for (let j = 0; j < bookBorrowData.length; j++) {
            let currentBorrowBook = bookBorrowData[j];

            // check if the current book's id matches the id of a borrowed book
            if (currentBook.id == currentBorrowBook.bookId) {
                matchFound = true;
                break;
            }
        }
    }

    // if the current book is not in the borrowed book data, add it to the available books
    if (!matchFound) {
        availableBooks.available.push(currentBook);
    }
}

// wait for the DOM to load before running the function
$(document).ready(function(){
    $("#title").on("input", showSuggestions);
    $(document).on("click",".suggestion2", function() {
        $("#title").val($(this).text());
        $("#bookId").val($(this).data("id"));
        $("#isbn").val($(this).data("isbn"));
        $("#suggestions").html("");
    });
});

function showSuggestions() {
    var inputValue = $("#title").val();
    var suggestions = "";

    // loop through the available books and check for a match
    for (var i = 0; i < availableBooks.available.length; i++) {
        if (availableBooks.available[i].bTitle.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) {
            suggestions += "<div class='suggestion2' data-id='" + availableBooks.available[i].id + "' " +
                "data-isbn='" + availableBooks.available[i].bIsbn + "'>" + availableBooks.available[i].bTitle + "</div>";
        }
    }

    $("#suggestions").html(suggestions);
}





var users = JSON.parse(localStorage.getItem('userData'))

$(document).ready(function(){
    $("#useremail").on("input", showSuggestionsUsers);
    $(document).on("click",".suggestion3", function() {

        $("#userid").val($(this).data("id"));
        $("#useremail").val($(this).text());
        $("#suggestions1").html("");
    });
});
function showSuggestionsUsers() {
    var inputValue = $("#useremail").val();
    var suggestions = "";
    for (var i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 && users[i].status == 'active') {
            suggestions += "<div class='suggestion3' data-id='" + users[i].id + "'>" + users[i].email + "</div>";
        }
    }
    $("#suggestions1").html(suggestions);
}

function deletedataFromLocalStorage(UserId) {

    var users = JSON.parse(localStorage.getItem('userData'));
    if (users != null) {
        users.splice(users.findIndex(a => a.id === UserId), 1)
        localStorage.setItem('userData', JSON.stringify(users));
    }
}

function deletedataFromLocalStorage1(UserId) {

    var users = JSON.parse(localStorage.getItem('bookBorrowData'));
    if (users != null) {
        users.splice(users.findIndex(a => a.id == UserId), 1)
        localStorage.setItem('bookBorrowData', JSON.stringify(users));
    }
}

function deleteRow1(UserID) {
    deletedataFromLocalStorage1(UserID);
    bindBorrowDetails();
}

