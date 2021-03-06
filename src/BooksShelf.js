import React from 'react'
import PropTypes from 'prop-types'

function BooksShelf(props){

  const { books, title  } = props
  const capaPadrao = "https://d1pkzhm5uq4mnt.cloudfront.net/imagens/capas/_822a5d14da9a2c8b035750e0f1838e2c186360a9.jpg"

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title"> {title} </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books && books.map(book => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url( ${book.imageLinks.thumbnail || capaPadrao} )` }}></div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf || 'none'} onChange={(event) => props.onChangeShelf(book, event.target.value)}>
                      <option value="" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                 </div>
                </div>
                <div className="book-title"> {book.title} </div>
                <div className="book-authors"> {book.authors} </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
   </div>
  )
}

BooksShelf.PropTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default BooksShelf