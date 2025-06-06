let form = document.querySelector("#quote-form");
let quoteTextInput = document.querySelector("#quote-text");
let authorInput = document.querySelector("#quote-author");
let quoteTypeInput = document.querySelector("#quote-type");
let quoteList = document.querySelector("#quote-list");


if (!localStorage.getItem("collection-citations")) {
  
  const collection = [];
  
  let quoteCollection = JSON.stringify(collection);
  
  localStorage.setItem("collection-citations", quoteCollection);
}


form.addEventListener("submit", (e) => {
  // empêche le rafraichissement automatique de la page
  e.preventDefault();

    quoteList.innerHTML = "";
    // récupère les valeurs des inputs
    let quoteText = quoteTextInput.value;
    let quoteAuthor = authorInput.value;
    let quoteType = quoteTypeInput.value

    let newQuote = createThisQuote(quoteText, quoteAuthor, quoteType)
    pushQuoteToCollection(newQuote);
    
  
});

/**
 * crée un objet pour sauvegarder la citation, son auteur et son type, puis renvois cet objet
 */
function createThisQuote (text, author, type){
    let myQuote = {
        text : text,
        author : author,
        type : type,
    }
    return myQuote;
}

/**
 * Récupère le tableau encodé (crée au début du script sous condition qu'il n'éxiste pas déjà), et le décode pour y ajouter l'objet
 * citation nouvellement crée. Appel la fonction displayQuote pour afficher les cartes au même moment 
 */
function pushQuoteToCollection (newQuote){
    let collectionEncoded = localStorage.getItem("collection-citations");

    let collectionDecoded = JSON.parse(collectionEncoded);

    collectionDecoded.push(newQuote);

    displayQuote (collectionDecoded);

    let collectionReEncoded = JSON.stringify(collectionDecoded);
    localStorage.setItem("collection-citations", collectionReEncoded);
}

// Affiche les cartes stockées dans la collection sauveagrdé dans le localStorage
function displayQuote(collection){
    for (let i = 0 ; i < collection.length ; i++){

        let quoteCard = document.createElement("div");
        quoteCard.classList.add("card");

        let paraTextQuote = document.createElement("p");
        paraTextQuote.innerHTML = collection[i].text;

        let paraAuthorQuote = document.createElement("p");
        paraAuthorQuote.innerHTML = `Auteur : ${collection[i].author}`;

        let paraTypeQuote = document.createElement("p");
        paraTypeQuote.innerHTML = `Catégorie : ${collection[i].type}`;

        quoteCard.insertAdjacentElement("beforeend", paraTextQuote);
        quoteCard.insertAdjacentElement("beforeend", paraAuthorQuote);
        quoteCard.insertAdjacentElement("beforeend",paraTypeQuote);
        quoteList.insertAdjacentElement("beforeend",quoteCard);
    }
}