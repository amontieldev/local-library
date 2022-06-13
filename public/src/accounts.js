function findAccountById(accounts, id) {
  let matchingAccount = accounts.find(account => account.id === id)
  return matchingAccount;

}

function sortAccountsByLastName(accounts) {
  const sortedAccounts = accounts.sort((first,second) => first.name.last > second.name.last ? 1 : -1);
  return sortedAccounts;

}

function getTotalNumberOfBorrows(account, books) {
  let{id} = account; 

  let bookIds = books.map((book) => book.borrows.map(index => index.id));
  ///const bookIdArray = [].concat.apply([],bookIds);
  const bookIdArray = [].concat(...bookIds);
  /*let answer=0;
  for(let i = 0; i < bookIdArray.length; i++){
    if(bookIdArray[i]===id){
      answer +=1;
    }
  }*/
  let answer = bookIdArray.reduce((total, currentId) => {
    if(currentId === id){
      total +=1;
    }
    return total;
  } , 0)
  
  return answer;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const rentedBooks = books.filter((book) => book.borrows[0].returned === false);
  const matchingBooks = rentedBooks.filter((index) => index.borrows[0].id === accountId)
  const matchingAuthor = authors.find((val) => val.id === matchingBooks[0].authorId)
  
  let answer = matchingBooks.map((currentObj =>{
    return {...currentObj, 'author': matchingAuthor}
  }))
  

  return answer;
  
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
