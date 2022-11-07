let myLibrary = []

function Book(author, title, pages, isRead) {
    this.author = author
    this.title = title
    this.pages = pages
    this.isRead = isRead
}

function addBookToLibrary(author, title, pages, isRead) {
    const newBook = new Book(author, title, pages, isRead)
    myLibrary.push(newBook)
}

function getAllBooks() {
    for (let x = 0; x < myLibrary.length; x++) {
        const book = myLibrary[x]
        console.log(`Author: ${book.author} Book: ${book.title} Pages: ${book.pages}`)
    }
}

function removeBook(id) {
    const removed = myLibrary.splice(id, 1)
    
    getAllBooks()
}

function setRead(id) {
    const book = myLibrary[id]
    const newBook = new Book(book.author, book.title, book.pages, !book.isRead)

    // Update array
    myLibrary.splice(id, 1, newBook)
}

addBookToLibrary("Kho", "Software Engineering", 27, false)
addBookToLibrary("Hle", "Chemical Engineering", 4, false)
addBookToLibrary("Mdu", "Graphic Art", 28, false)

setRead(0)