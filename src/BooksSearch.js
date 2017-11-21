import React, { Component }  from 'react'
import { Link } from 'react-router-dom'
import {DebounceInput} from 'react-debounce-input';
import BooksShelf from './BooksShelf'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class BooksSearch extends Component{
   state = {
      query: '',
      searchList: []
    }

    updateQuery = (query) => {
      this.setState({searchList:[], query: query.trim()})

      if (this.state.query.length > 0) {
        BooksAPI.search(this.state.query).then((listBooks) => {
          if (listBooks.error === undefined) {
            return listBooks.map(book => this.props.books.find(b => b.id === book.id) || book)
          }
        }).then((newlistBook) => {
          this.setState({searchList: newlistBook })
        })
      }

    }

  render() {

    const {query, searchList} = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          {<Link className='close-search' to='/'>Close</Link>}
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
                title={''}
                onChangeShelf={this.props.onChangeShelf}
              />
            )}
          </ol>
        </div>
      </div>
    )
  }
}

BooksSearch.PropTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default BooksSearch

