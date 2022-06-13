function findAuthorById(authors, id) {
  
  let matchingAuthor = authors.find(author => author.id === id);
  return matchingAuthor;
}

function findBookById(books, id) {
  let matchingBook = books.find(book => book.id === id);
  return matchingBook;
}

function partitionBooksByBorrowedStatus(books) {
 
  const checkedOut = books.filter((book) => book.borrows[0].returned === false)
  const returned = books.filter((book) => book.borrows[0].returned === true)

  let easyCombine = [checkedOut,returned]
  return easyCombine
  
}

function getBorrowersForBook(book, accounts) {
  const bookBorrows = book.borrows;
  let idArray = bookBorrows.map(book => book.id)
  const accountMatch = accounts.filter((account) => idArray.includes(account.id))
  
    
  
  let accountMap = accountMatch.map((acc) => {
    let match = bookBorrows.find((book) => book.id === acc.id)
    return {...acc, ...match}
  })
  
  return accountMap
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
