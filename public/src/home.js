function getTotalBooksCount(books) {
  let totalBooks = books.reduce((total, book) => {
    total +=1;
    return total

  }, 0)
  return totalBooks;
}

function getTotalAccountsCount(accounts) {
  let accountTotal = accounts.reduce((total, account) => {
    total +=1;
    return total;
  }, 0)
  return accountTotal;
}

function getBooksBorrowedCount(books) {
  let rentedBooks = books.filter(book => book.borrows[0].returned === false);
  return rentedBooks.length;


}

function getMostCommonGenres(books) {
  
  let mostCommon = books.reduce((cache, currentBook) => {
    let nameofGenre = currentBook.genre;
    
    let isInArray = cache.some(genre => genre.name === nameofGenre)
      
      if(isInArray === false){
      cache.push({'name' :  nameofGenre , 'count' : 1})
      
      }else{
          let findGenre = cache.map((currentGenre) => currentGenre.name)
          let indexofGenre = findGenre.indexOf(nameofGenre);
          cache[indexofGenre].count +=1;
      }
    return cache;
   
  
  
  }, [])

  let ordered = mostCommon.sort((a,b) => a.count < b.count ? 1 : -1);
  return ordered.slice(0,5);

}


function getMostPopularBooks(books) {
  let mostCommon = books.reduce((cache, currentBook) => {
    let titleofBook = currentBook.title;
    let numRented = currentBook.borrows.length;
    let isInArray = cache.some(title => title.name === titleofBook)
      
      if(isInArray === false){
      cache.push({'name' : titleofBook , 'count' : numRented})
      
      }
    
      return cache;
   
  
  
  }, [])
 
  let ordered = mostCommon.sort((a,b) => a.count < b.count ? 1 : -1);
  return ordered.slice(0,5);

}

function getMostPopularAuthors(books, authors) {

  let mostCommon = authors.reduce((acc, currentAuthor) => {
    /*current idea is create an array of objects like before. but for the "count"
    use another higher order function to match author id and return the arr.length*/
    
    const foundId = books.filter((book) => book.authorId === currentAuthor.id);
    const countBorrows = foundId.reduce((cache, id) => {
      return cache + id.borrows.length;
    }, 0)
    
    
     acc.push({'name': `${currentAuthor.name.first} ${currentAuthor.name.last}`,
     'count': countBorrows})

    return acc;

  }, [])
  .sort((a,b) => a.count < b.count ? 1 : -1)
  .slice(0,5)


  return mostCommon
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
