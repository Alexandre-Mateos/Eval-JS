let form = document.querySelector("#quote-form");
let quoteTextInput = document.querySelector("#quote-text");
let authorInput = document.querySelector("#quote-author");
let quoteTypeInput = document.querySelector("#quote-type");


if (!localStorage.getItem("collection-citations")) {
  
  const collection = [];
  
  let quoteCollection = JSON.stringify(collection);
  
  localStorage.setItem("collection-citations", quoteCollection);
}


form.addEventListener("submit", (e) => {
  // empêche le rafraichissement automatique de la page
  e.preventDefault();

    let quoteText = quoteTextInput.value;
    let quoteAuthor = authorInput.value;
    let quoteType = quoteTypeInput.value

    let newQuote = createThisQuote(quoteText, quoteAuthor, quoteType)
    pushQuoteToCollection(newQuote);
    
  
});

function createThisQuote (text, author, type){
    let myQuote = {
        text : text,
        author : author,
        type : type,
    }
    return myQuote;
}
function pushQuoteToCollection (newQuote){
    let collectionEncoded = localStorage.getItem("collection-citations");

    let collectionDecoded = JSON.parse(collectionEncoded);

    collectionDecoded.push(newQuote);

    let collectionReEncoded = JSON.stringify(collectionDecoded);

    localStorage.setItem("collection-citations", collectionReEncoded);
}