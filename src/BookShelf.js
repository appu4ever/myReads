import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import  SearchBook  from './SearchBook'

class BookShelf extends Component {
  state= {
    bookDetails: []
  }

  componentDidMount() {
    this.setState({
      bookDetails: this.props.bookDetails
    })
  }

  /*
   * Function name : updateBookShelf
   * Description : Called when the bookshelf to which
   *               a book is to be added is selected.
   *               It triggers the renderShelf Function
   *               in the parent component MyBooks to
   *               re-render the shelves.
   * Parameters : Id of the book, shelf to which book is to be added.
   */

 updateBookShelf = (bookId,shelf) => {
   BooksAPI.update(bookId,shelf).then(updateBook => {
     if (this.props.renderShelf) {
       this.props.renderShelf()
     }
   }).catch(err => {
     console.log(err)
   })
 }



  render() {
      return (
        <div>
          <li key= {this.props.bookDetails.bookId}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.bookDetails.bookUrl})`}}></div>
                <div className="book-shelf-changer">
                  <select value= {this.props.shelf} onChange= {(event) => this.updateBookShelf({id:this.props.bookDetails.bookId},event.target.value)}>
                  {this.props.shelfDetails.map(option => {
                    return (<option key= {Object.keys(option)[0]} value={Object.keys(option)[0]}>{Object.values(option)}</option>)
                  })}
                  </select>
                </div>
              </div>
              <div className="book-title">{this.props.bookDetails.bookName}</div>
              <div className="book-authors">{(this.props.bookDetails.bookAuthor)?this.props.bookDetails.bookAuthor.join(' / '):this.props.bookDetails.bookAuthor}</div>
            </div>
           </li>
          </div>
        )
     }
 }
export default BookShelf
