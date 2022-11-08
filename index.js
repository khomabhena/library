let myLibrary = []
let myLibraryDeleted = []

function Book(author, title, pages, isRead) {
    this.author = author
    this.title = title
    this.pages = pages
    this.isRead = isRead
}

function createTableRow(id, book) {
    const tr = document.createElement('tr')
    const tdAuthor = document.createElement('td')
    const tdTitle = document.createElement('td')
    const tdPages = document.createElement('td')
    const tdRead = document.createElement('td')
    const tdDelete = document.createElement('td')
    const checkBox = document.createElement('input')
    const deleteSpan = document.createElement('span')
    
    tdAuthor.textContent = book.author
    tdTitle.textContent = book.title
    tdPages.textContent = book.pages
    deleteSpan.textContent = 'delete'

    tdPages.classList.toggle('left')
    tdRead.classList.toggle('left')
    tdDelete.classList.toggle('delete')

    checkBox.setAttribute('type', 'checkbox')
    deleteSpan.classList.toggle('material-symbols-outlined')

    tdRead.appendChild(checkBox)
    tdDelete.appendChild(deleteSpan)
    

    tr.appendChild(tdAuthor)
    tr.appendChild(tdTitle)
    tr.appendChild(tdPages)
    tr.appendChild(tdRead)
    tr.appendChild(tdDelete)

    return tr
}

function addBooksToPage() {
    const table = document.querySelector('table')
   
    myLibrary.forEach((item, index) => {
        table.appendChild(createTableRow(index, item))
    })
}

function addBookToLibrary(author, title, pages, isRead) {
    const newBook = new Book(author, title, pages, isRead)
    myLibrary.push(newBook)

    addBooksToPage()
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