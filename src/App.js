import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksShelf from './BooksShelf'
import {DebounceInput} from 'react-debounce-input';

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false,
    query: '',
    searchList: []
  }

  updateBooks = () => {
   BooksAPI.getAll().then((listBooks) => {
      this.setState({books: listBooks})
      // console.log(this.state)
    })
  }

  componentDidMount() {
    this.updateBooks()
  }

  updateQuery = (query) => {
    this.setState({searchList:[], query: query.trim()})

    BooksAPI.search(this.state.query).then((listBooks) => {
      return listBooks.map((book) => (this.state.books.find(function(b){ return b.id === book.id}) || book))
    }).then((newlistBook) => {
      this.setState({searchList: newlistBook })
    })
  }

  changeShelf = (book, event) => {

    book.shelf = event.target.value
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id).concat([ book ])
    }))
    //Aplica primeiro no estado local e depois de replica pro server, assim não tem 'delay'.
    BooksAPI.update(book, event.target.value).then((res) => this.updateBooks())
  }


  render() {

    const {books, query, searchList } = this.state

    // console.log(books)

    return(
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              { <a className="close-search" onClick={() => this.setState({ showSearchPage: false, query: '', searchList: [] })}>Close</a> }
              <div className="search-books-input-wrapper">
                <DebounceInput
                  debounceTimeout={300}
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {searchList && (
                  <BooksShelf
                    books={searchList}
                    tittle={''}
                    onChangeShelf={this.changeShelf}
                  />

                )}

              </ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads @gianwinckler</h1>
            </div>
            <div className="list-books-content">
              <BooksShelf
                books={books.filter((book) => book.shelf === "currentlyReading")}
                tittle={'Currently Reading'}
                onChangeShelf={this.changeShelf}
              />
              <BooksShelf
                books={books.filter((book) => book.shelf === "wantToRead")}
                tittle={'Want to Read'}
                onChangeShelf={this.changeShelf}
              />
              <BooksShelf
                books={books.filter((book) => book.shelf === "read")}
                tittle={'Read'}
                onChangeShelf={this.changeShelf}
              />
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
