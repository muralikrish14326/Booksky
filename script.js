// Popup Elements
var addbtn = document.getElementById("add");
var overlay = document.getElementById("popup-overlay");
var box = document.getElementById("popup-box");

// Open Popup
addbtn.addEventListener("click", function () {
    overlay.style.display = "block";
    box.style.display = "block";
});

// Close Popup
var cancelbtn = document.getElementById("cancel");

cancelbtn.addEventListener("click", function (event) {
    event.preventDefault();
    overlay.style.display = "none";
    box.style.display = "none";
});

// Input Elements
var container = document.getElementById("container");
var addcontent = document.getElementById("add-content");

var bname = document.getElementById("bookname");
var aname = document.getElementById("authorname");
var content = document.getElementById("content");

// Load Books from Local Storage
window.onload = function () {

    var books = JSON.parse(localStorage.getItem("books")) || [];

    books.forEach(function (book) {
        createBook(book.title, book.author, book.description);
    });

};

// Add Book
addcontent.addEventListener("click", function (event) {

    event.preventDefault();

    if (
        bname.value.trim() === "" ||
        aname.value.trim() === "" ||
        content.value.trim() === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    createBook(bname.value, aname.value, content.value);

    var books = JSON.parse(localStorage.getItem("books")) || [];

    books.push({
        title: bname.value,
        author: aname.value,
        description: content.value
    });

    localStorage.setItem("books", JSON.stringify(books));

    bname.value = "";
    aname.value = "";
    content.value = "";

    overlay.style.display = "none";
    box.style.display = "none";

});

// Create Book Card
function createBook(title, author, description) {

    var div = document.createElement("div");

    div.setAttribute("id", "second");

    div.innerHTML = `
        <h2>${title}</h2>
        <h4>${author}</h4>
        <p>${description}</p>
        <button id="del" onclick="del(event)">Delete</button>
    `;

    container.append(div);

}

// Delete Book
function del(event) {

    var card = event.target.parentElement;
    var title = card.querySelector("h2").innerText;

    var books = JSON.parse(localStorage.getItem("books")) || [];

    books = books.filter(function (book) {
        return book.title !== title;
    });

    localStorage.setItem("books", JSON.stringify(books));

    card.remove();

}
