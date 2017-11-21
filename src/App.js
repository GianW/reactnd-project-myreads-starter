import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksShelf from './BooksShelf'
import BooksSearch from './BooksSearch'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  updateBooks = () => {
   BooksAPI.getAll().then((listBooks) => {
      this.setState({books: listBooks})
    })
  }

  componentDidMount() {
    this.updateBooks()
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => this.updateBooks())
  }


  render() {

    const {books } = this.state

    return(
      <div className="app">
        <Route exact path='/search' render={() => (
          <BooksSearch
            books={books}
            onChangeShelf={this.changeShelf}
          />
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads @gianwinckler</h1>
            </div>
            <div className="list-books-content">
              <BooksShelf
                books={books.filter((book) => book.shelf === "currentlyReading")}
                title={'Currently Reading'}
                onChangeShelf={this.changeShelf}
              />
              <BooksShelf
                books={books.filter((book) => book.shelf === "wantToRead")}
                title={'Want to Read'}
                onChangeShelf={this.changeShelf}
              />
              <BooksShelf
                books={books.filter((book) => book.shelf === "read")}
                title={'Read'}
                onChangeShelf={this.changeShelf}
              />
            </div>
            <div className="open-search">
              <Link className='close-search' to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
