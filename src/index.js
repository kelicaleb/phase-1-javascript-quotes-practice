document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/quotes')
    .then(res => res.json())
    .then(json => renderQuotes(json))

    let idCount = 0;
    const quoteForm = document.querySelector('#new-quote-form')
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault()
        addQuote()
        quoteForm.reset()
    })

    function renderQuotes(quoteList) {
        quoteList.forEach(element => {
            idCount = element.id
            // console.log(idCount)
            createCard(element)
        });
    }

    function createElem(tag) {
        return document.createElement(tag)
    }

    function createCard(quoteObj) {
        const quoteCard = createElem('li')
        quoteText = createElem('p')
        const quoteAuthor = createElem('footer')
        const space = createElem('br')
        const quoteBlock = createElem('blockquote')
        const likesBtn = createElem('button')
        const deleteBtn = createElem('button')
        const qList = document.querySelector('#quote-list')
        const span = createElem('span')

        quoteCard.className = 'quote-card'
        quoteBlock.className = 'blockquote'
        quoteText.className = `mb-${quoteObj.id}`
        quoteAuthor.className = 'blockquote-footer'
        likesBtn.className = 'btn-success'
        deleteBtn.className = 'btn-danger'

        quoteText.textContent = quoteObj.quote
        quoteAuthor.textContent = quoteObj.author
        likesBtn.textContent = 'Likes: '
        span.textContent = '0'
        likesBtn.append(span)
        deleteBtn.textContent = 'Delete'

        likesBtn.addEventListener('click', () => span.textContent = parseInt(span.textContent) + 1)
        deleteBtn.addEventListener('click', () => deleteQuote(quoteCard))

        quoteBlock.append(quoteText, quoteAuthor, space, likesBtn, deleteBtn)
        quoteCard.append(quoteBlock)
        qList.append(quoteCard)
        console.log(span.textContent)
    }

    function addQuote() {
        const quoteIn = document.querySelector('#new-quote').value
        const authorIn = document.querySelector('#author').value
        idCount++
        const newQuote = {
            id: idCount,
            quote: quoteIn,
            author: authorIn,
            likes: 0
        }
        createCard(newQuote)
    }

    function deleteQuote(card) {
        card.remove();
    }
})