# MyReads Project

This application allows you to view your shelves containing books of your interest. The shelves are as follows:
  - Currently reading
  - Want to Read
  - Read

Books can be shifted among the shelves too.

There is also a search page that can be navigated to by clicking the '+' symbol at the top bottom page. This
displays all books matching your search query. If the search query does not match available books, appropriate
message is shown.

If any of the books displayed after search belongs to one of your shelves, the correct shelf is selected. Once the
desired shelf is selected on any of the books, the books is shifted to the correct shelf on the main page.

To get started:

* install all project dependencies with `npm install`
* start the development server with `npm start`

# Files involved

## App.js

This file provides react router functionality and creates URLs for the main (/) and the search page (/search).

## MyBooks.js

This file creates parent component that forms the 3 shelves. The child component is called for each shelf to
populate each shelf with the books data received from the backend.

## BookShelf.js

This file creates the child component that takes book details from parent component and creates the books using the details.

## SearchBook.js

This file contains methods needed to form the search page. It forms the parent for the child component BookShelf, provides
data it receives from the back end to the child, and populates contents into the search page.
