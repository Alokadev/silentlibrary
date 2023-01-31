bindBookData();

function deleteBookdataFromLocalStorage(bookId) {

    var books = JSON.parse(localStorage.getItem('bookData'));
    if (books != null) {
        books.splice(books.findIndex(a => a.id === bookId), 1)
        localStorage.setItem('bookData', JSON.stringify(books));
    }
}

function bindBookData() {
    let books  = JSON.parse(localStorage.getItem('bookData'));
    if (books != null) {
        document.getElementById('tblbody1').innerHTML = "";
        books.forEach(function (item,index) {
            debugger;
            let btnEditId = "btnedit" + item.id;
            let btnDeleteId = "btndelete" + item.id;
            let tableRow = "<tr Id='" + item.id + "' dataBookID='" + item.id + "' bookTitle='" + item.bTitle +
                "' bookAuthor='" + item.bAuthor + "' bookIsbn='" + item.bIsbn + "' bookDesc='" + item.bDesc + "' bookImage='" + item.bImage + "'>"
                + "<td class='td-data'>" + item.id + "</td>"
                + "<td class='td-data'>" + item.bTitle + "</td>"
                + "<td class='td-data'>" + item.bAuthor + "</td>"
                + "<td class='td-data'>" + item.bIsbn + "</td>"
                + "<td class='td-data'>" + item.bDesc + "</td>"
                + "<td class='td-data'><img src='" + item.bImage + "' width='50px' height='50px'/></td>"
                + "<td class='td-data'>" +
                "<button id='" + btnDeleteId + "' class='btn btn-danger btn-xs btn-deletebooks' onclick='deleteBookRow(" + item.id + ")'><i class='fa fa-trash' aria-hidden='true'>Delete</button>"
                + "</td>"
                + "</tr>";
            document.getElementById('tblbody1').innerHTML += tableRow;
        })
    }
    var AddRow = "<tr>"
        + "<td class='td-data'></td>"
        + "<td class='td-data'><input type='text' id='titlename' placeholder='Title..'></td>"
        + "<td class='td-data'><input type='text' id='bookauthor' placeholder='Author..'></td>"
        + "<td class='td-data'><input type='text' id='bookisbn' placeholder='ISBN..'></td>"
        + "<td class='td-data'><input type='text' id='bookDesc' placeholder='Description..'></td>"
        + "<td class='td-data'><input type='file' id='bookimage'></td>"
        + "<td class='td-data'>" + "<button id= 'btnaddBook' onclick='addBookWithImagePath()' class='btn btn-success'> <i class='fa fa-plus-circle' aria-hidden='true'></i>Add</button>" + "</td>"
        + "</tr>";
    document.getElementById('tblbody1').innerHTML += AddRow;
}

function getBookId() {
    const  ID = Date.now();

    return ID;
}

function addBookWithImagePath() {
    let bookTitle = document.getElementById("titlename").value;
    let bookAuthor = document.getElementById("bookauthor").value;
    let bookIsbn = document.getElementById("bookisbn").value;
    let bookDesc = document.getElementById("bookDesc").value;
    let bookImage = document.getElementById("bookimage").files[0];

    // Create a new book object
    let newBook = {
        id: getBookId(),
        bTitle: bookTitle,
        bAuthor: bookAuthor,
        bIsbn: bookIsbn,
        bDesc: bookDesc,
        bImage: ""
    };

    // Check if an image was selected
    if (bookImage) {
        // Create a new FileReader object
        let reader = new FileReader();

        // Set the onload event to handle the image data
        reader.onload = function(event) {
            // Get the image data as a URL
            let imageUrl = event.target.result;

            // Set the image URL as the value of the bImage property
            newBook.bImage = imageUrl;

            // Add the new book to the local storage
            let books = JSON.parse(localStorage.getItem("bookData")) || [];
            books.push(newBook);
            localStorage.setItem("bookData", JSON.stringify(books));

            // Refresh the table
            bindBookData();
        };

        // Read the image file as a data URL
        reader.readAsDataURL(bookImage);
    } else {
        // If no image was selected, add the new book without the image
        let books = JSON.parse(localStorage.getItem("bookData")) || [];
        books.push(newBook);
        localStorage.setItem("bookData", JSON.stringify(books));

        // Refresh the table
        bindBookData();
    }
}

function deleteBookRow(bookId) {
    deleteBookdataFromLocalStorage(bookId);
    bindBookData();
}
