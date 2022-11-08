let myLibrary = []
let myLibraryDeleted = []

function Book(author, title, pages, isRead) {
    this.author = author
    this.title = title
    this.pages = pages
    this.isRead = isRead
}

function createCard(id, book) {
    const card = document.createElement('div')
    card.classList.toggle('card')

    const h4 = document.createElement('h4')
    h4.classList.toggle('author')
    h4.textContent = book.author
    
    const h5 = document.createElement('h5')
    h5.classList.toggle('title')
    h5.textContent = book.title
    
    const p = document.createElement('p')
    p.classList.toggle('pages')
    p.textContent = book.pages + " pages"

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.toggle('button-container')

    const buttonRead = document.createElement('button')
    buttonRead.classList.toggle('read')
    buttonRead.textContent = 'Not Read'

    const buttonDelete = document.createElement('button')
    buttonDelete.classList.toggle('delete')
    buttonDelete.textContent = 'Delete'
    
    buttonContainer.appendChild(buttonRead)
    buttonContainer.appendChild(buttonDelete)

    card.appendChild(h4)
    card.appendChild(h5)
    card.appendChild(p)
    card.appendChild(buttonContainer)

    return card
}

function addBooksToPage(book) {
    const index = myLibrary.length - 1
    const content = document.querySelector('.content')
    content.appendChild(createCard(index, book))
}

function addBookToLibrary(author, title, pages, isRead) {
    const newBook = new Book(author, title, pages, isRead)
    myLibrary.push(newBook)

    addBooksToPage(newBook)
}

function getAllBooks() {
    let tableRows = document.querySelector('.table-rows')
    for (let x = 0; x < myLibrary.length; x++) {

        const book = myLibrary[x]
        console.log(`Author: ${book.author} Book: ${book.title} Pages: ${book.pages}`)
    }
}

function removeBook(id) {
    const removed = myLibrary.splice(id, 1)[0]
    const newBook = new Book(removed.author, removed.title, removed.pages, removed.isRead)
    myLibraryDeleted.push(newBook)

    console.log(myLibrary)
    console.log(myLibraryDeleted)
}

function setRead(id) {
    const book = myLibrary[id]
    const newBook = new Book(book.author, book.title, book.pages, !book.isRead)

    // Update array
    myLibrary.splice(id, 1, newBook)
}

document.querySelector('.submit').addEventListener('click', e => {
    const author = document.querySelector('.iAuthor')
    const title = document.querySelector('.iTitle')
    const pages = document.querySelector('.iPages')
    const errorMessage = document.querySelector('.errorMessage')

    let message = ''
    if (author.value === '') {
        message = "Author is required!"
        errorMessage.textContent = message
    } else if (title.value === '') {
        message = "Title is required!"
        errorMessage.textContent = message
    } else if (pages.value === '') {
        message = "No. of pages are required!"
        errorMessage.textContent = message
    } else {
        addBookToLibrary(author.value, title.value, pages.value)

        author.value = ''
        title.value = ''
        pages.value = ''
    }
})