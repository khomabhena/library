let myLibrary = []
let myLibraryDeleted = []
const LIBRARY_MAIN = 'main'
const LIBRARY_DELETED = 'deleted'

function Book(author, title, pages, isRead) {
    this.author = author
    this.title = title
    this.pages = pages
    this.isRead = isRead
}

function getLibrary(type) {
    const lib = JSON.parse(localStorage.getItem(type)) || []
    // console.log(`Get: `)
    // console.table(lib)    
    return lib
}

function storeLibrary(type, library) {
    // console.log(`Store:`)
    // console.table(library)
    localStorage.setItem(type, JSON.stringify(library))
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
    buttonRead.setAttribute('id', book.isRead ? 'read' : '')
    buttonRead.textContent = book.isRead ? 'Read' : 'Not Read'

    const buttonDelete = document.createElement('button')
    buttonDelete.classList.toggle('delete')
    buttonDelete.textContent = 'Delete'
    
    buttonContainer.appendChild(buttonRead)
    buttonContainer.appendChild(buttonDelete)

    card.appendChild(h4)
    card.appendChild(h5)
    card.appendChild(p)
    card.appendChild(buttonContainer)

    buttonDelete.addEventListener('click', e => {
        removeBook(id)
    })

    buttonRead.addEventListener('click', e => {
        setRead(id)
    })

    return card
}

function addBookToLibrary(author, title, pages, isRead) {
    const newBook = new Book(author, title, pages, false)
    const lib = getLibrary(LIBRARY_MAIN)

    // lib.push(newBook)
    lib.unshift(newBook)
    storeLibrary(LIBRARY_MAIN, lib)
    getAllBooks(LIBRARY_MAIN)
}

function getAllBooks(type) {
    let content = document.querySelector('.content')
    content.innerHTML = ''
    const lib = getLibrary(type)

    lib.forEach((item, index) => {
       const card = createCard(index, item)
       content.appendChild(card)
    });
}

getAllBooks(LIBRARY_MAIN)

function removeBook(id) {
    const lib = getLibrary(LIBRARY_MAIN)

    const removed = lib.splice(id, 1)[0]
    storeLibrary(LIBRARY_MAIN, lib)
    
    getLibrary(LIBRARY_DELETED).push(removed)

    getAllBooks(LIBRARY_MAIN)
}

function setRead(id) {
    let lib = getLibrary(LIBRARY_MAIN)

    const book = lib[id]
    const newBook = new Book(book.author, book.title, book.pages, !book.isRead)

    console.log(newBook)
    // Update array
    lib.splice(id, 1, newBook)
    console.table(lib)
    storeLibrary(LIBRARY_MAIN, lib)
    getAllBooks(LIBRARY_MAIN)
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