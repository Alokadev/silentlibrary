var books = JSON.parse(localStorage.getItem("bookData"));
var currentPage = 1;
var booksPerPage = 3;

// Display the books on the page
function displayBooks() {
    $("#book-table-body").empty();
    var startIndex = (currentPage - 1) * booksPerPage;
    var endIndex = startIndex + booksPerPage;
    var filteredBooks = books;
    if ($("#search-input").val()) {
        var searchTerm = $("#search-input").val().toLowerCase();
        filteredBooks = filteredBooks.filter(function(book) {
            return book.bTitle.toLowerCase().indexOf(searchTerm) !== -1;
        });
    }
    for (var i = startIndex; i < endIndex && i < filteredBooks.length; i++) {
        var book = filteredBooks[i];
        $("#book-table-body").append(
            "<tr>" +
            "<td>" + book.bTitle + "</td>" +
            "<td>" + book.bAuthor + "</td>" +
            "<td>" + book.bIsbn + "</td>" +
            "<td>" + book.bDesc + "</td>" +
            "</tr>"
        );
    }
    displayPagination(filteredBooks);
}

// Display the pagination buttons
function displayPagination(filteredBooks) {
    $("#pagination").empty();
    var totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    for (var i = 1; i <= totalPages; i++) {
        $("#pagination").append("<button class='page'>" + i + "</button>");
    }
    $(".page").click(function() {
        currentPage = parseInt($(this).text());
        displayBooks();
    });
    $("#pagination .page:contains(" + currentPage + ")").addClass("active");
}

$("#search-button").click(function() {
    currentPage = 1;
    displayBooks();
});
$("#search-input").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#search-button").click();
    }
});

displayBooks();
