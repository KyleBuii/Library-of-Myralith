let books = [{
    name: "The Story of Dranksfe",
    author: "Kyle Bui"
}];
const bookColors = ["red", "purple", "blue", "green", "pink"];
const booksToPerish = [];
let isDeleteBook = false;

function onLoad(){
    if(JSON.parse(localStorage.getItem("books")) !== null){
        books = [...JSON.parse(localStorage.getItem("books"))];
        for(let i of books){
            addBook(i.name, i.author);
        };
    }else{
        addBook(books[0].name, books[0].author);
    };
};

function onUnload(){
    if(books.length !== 0){
        localStorage.setItem("books", JSON.stringify(books));
    };
};

function newBook(){
    const buttonBookCreate = document.getElementById("button-book-create");
    const bookCreate = document.getElementById("book-create");
    buttonBookCreate.disabled = true;
    bookCreate.style.display = "block";
};

function deleteBook(){
    const buttonBookDelete = document.getElementById("button-book-delete");
    if(!isDeleteBook){
        isDeleteBook = true;
        buttonBookDelete.style.color = "rgb(255, 0, 0)";
        buttonBookDelete.style.border = "2px solid rgb(255, 0, 0)";
    }else{
        isDeleteBook = false;
        buttonBookDelete.style.color = "#daa520";
        buttonBookDelete.style.border = "2px solid #daa520";
        perishBook();
    };
};

function perishBook(){
    const elementLibrary = document.querySelector(".library");
    let booksRemove = [];
    for(let i of booksToPerish){
        elementLibrary.removeChild(i);
        let bookInformation = i.innerText.trim().split("\n");
        booksRemove.push({
            name: bookInformation[0],
            author: bookInformation[1].trim()
        });
    };
    books = books.filter((book) => {
        return !booksRemove.some((bookRemove) => {
            return book.name === bookRemove.name;
        });
    });
    booksToPerish.length = 0;
};

function cancelBook(){
    const buttonBookCreate = document.getElementById("button-book-create");
    const bookCreate = document.getElementById("book-create");
    buttonBookCreate.disabled = false;
    bookCreate.style.display = "none";
};

function addBook(name, author){
    const inputBookName = document.getElementById("input-book-name");
    const inputBookAuthor = document.getElementById("input-book-author");
    const bookName = (name)
        ? name
        : (inputBookName.innerText === "")
            ? "[　　]"
            : inputBookName.innerText;
    const bookAuthor = (author)
        ? author
        : (inputBookAuthor.innerText === "")
            ? "[　　]"
            : inputBookAuthor.innerText;
    const elementBookNew = document.createElement("div");
    if(!name){
        const buttonBookCreate = document.getElementById("button-book-create");
        const bookCreate = document.getElementById("book-create");
        buttonBookCreate.disabled = false;
        bookCreate.style.display = "none";    
        inputBookName.innerText = "";
        inputBookAuthor.innerText = "";
        books.push({
            name: bookName,
            author: bookAuthor
        });    
    };
    const randomBookColor = bookColors[Math.floor(Math.random() * bookColors.length)];
    elementBookNew.className = "book-overlay";
    elementBookNew.innerHTML = `
        <div class="book ${randomBookColor}">
            <span>${bookName}</span>
            <span>${bookAuthor}</span>
        </div>
    `;
    elementBookNew.onclick = () => clickBook(elementBookNew);
    const elementLibrary = document.querySelector(".library");
    elementLibrary.appendChild(elementBookNew);
};

function clickBook(book){
    if(!isDeleteBook){
        if(book.children[0].classList.contains("view")){
            book.children[0].classList.remove("view");
        }else if(document.querySelectorAll(".view").length !== 0){
            document.querySelectorAll(".view")[0].classList.remove("view");
            book.children[0].classList.add("view");      
        }else{
            book.children[0].classList.add("view");      
        };
    }else{
        if(!book.classList.contains("ready-to-perish")){
            book.classList.add("ready-to-perish");
            booksToPerish.push(book);
        }else{
            book.classList.remove("ready-to-perish");
            let indexElement = booksToPerish.indexOf(book);
            if(indexElement !== -1){
                booksToPerish.splice(indexElement, 1);
            };
        };
    };
};