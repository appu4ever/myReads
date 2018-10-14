import React, { Component } from 'react'
import BooksApp from './App'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class SearchBook extends Component {
  state= {
    query: '',
    bookDetails: [{
      bookId: '',
      bookName: '',
      bookAuthor: [],
      bookUrl: '',
      shelf: ''
    }]
  }

  /*
   * Function name : updateQuery
   * Description : update the query state variable entered in the input box.
   * Parameters : query string
   */

  updateQuery = (query) => {
    this.setState({query: query})
  }

  /*
   * Function name : searchBook
   * Description : Called when the enter key is
   *               pressed after query is entered in the
   *               input box.
   * Parameters : Event object
   */

  searchBook = (e) => {
    /* If the keycode is delete, empty the state variable so that
     * nothing is displayed */

    if (e.keyCode === 8) {
      this.setState({bookDetails: []})
    }

    /* If the keycode is enter, search for all books that match the query, update the
     * state variable with those details*/

    if (e.keyCode === 13 ) {
      let searchDetails = []
      let shelfDetails = [{id:'',shelf:''}]


    /* If a book in the search results has already been added to the
     * shelves, update the shelf info */

      BooksAPI.getAll().then(details => {
        details.map(detail => {
          shelfDetails.push({id: detail.id,shelf: detail.shelf})
        })
      }).then(
        BooksAPI.search(e.target.value).then(books => {
          books.map(book => {
             let shelf = 'none'
             let id, name, author, url

              shelfDetails.map(detail => {
                if (book.id === detail.id) {
                  shelf= detail.shelf
                }
              })
              
              book.id !== ''? id= book.id: id= ''
              book.title !== ''? name= book.title: name= ''
              book.hasOwnProperty('authors')? author= book.authors: author= ''
              book.hasOwnProperty('imageLinks')? url= book.imageLinks.smallThumbnail: url= ''

              searchDetails.push({
                bookId: id,
                bookName : name,
                bookAuthor: author,
                bookUrl: url,
                shelf: shelf
              })
              this.setState({
                bookDetails: searchDetails
              })
          })
        }).catch(err => {
          this.setState({bookDetails:err})
        })
      ).catch(err => {
        this.setState({bookDetails:err})
      })
    }
  }

  /* Function name: showSearchBooks
   * Description: This function is called after the enter key
   *              is pressed and the search results need to be displayed.
   *              shelf details and the state variable are passed to the child
   *              component. If search string is not valid, appropriate message is shown.
   * Parameter: none
   */

  showSearchBooks = () => {
    const shelfDetails = [
      {'move':'Move to ...'},
      {'currentlyReading':'Currently Reading'},
      {'wantToRead':'Want to Read'},
      {'read':'Read'},
      {'none':'None'}
    ]

    if (this.state.bookDetails.message) {
      return (<span>Searched string <strong>{this.state.query}</strong> not valid or book not available</span>)
    } else {
      return (
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.state.bookDetails.map(book => {
                if (book.bookId !== '') {
                  return (<BookShelf key= {book.bookId} bookDetails= {book} shelfDetails= {shelfDetails} shelf= {book.shelf}/>)
                }
              })
            }
        </ol>
      </div>
      )
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to= '/' className="close-search"/>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value= {this.state.query}
            onChange= {(event) => this.updateQuery(event.target.value)}
            onKeyDown= {(event) => this.searchBook(event)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.showSearchBooks()}
          </ol>
        </div>
      </div>
    )
  }
}
export default SearchBook
