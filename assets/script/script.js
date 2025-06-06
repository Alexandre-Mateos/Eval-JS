let form = document.querySelector("#quote-form");
let quoteTextInput = document.querySelector("#quote-text");
let authorInput = document.querySelector("#quote-author");
let quoteTypeInput = document.querySelector("#quote-type");
let quoteList = document.querySelector("#quote-list");
let errorMsg = document.querySelector("#error-msg");

/**
 * On vérifie si le tableau de stockage existe déjà pour éviter de l'écraser au rechargement de la page.
 * Si il n'éxiste pas on le crée.
 *  */ 
if (!localStorage.getItem("collection-citations")) {
  const collection = [];

  let quoteCollection = JSON.stringify(collection);

  localStorage.setItem("collection-citations", quoteCollection);
}else{
    numberOfSavedQuotes ();
}

form.addEventListener("submit", (e) => {
  // empêche le rafraichissement automatique de la page
  e.preventDefault();

  quoteList.innerHTML = "";
  // récupère les valeurs des inputs
  let quoteText = quoteTextInput.value;
  let quoteAuthor = authorInput.value;
  let quoteType = quoteTypeInput.value;

//   on vérifie que les champs sont correctement remplis
  if (quoteText && quoteAuthor) {
    let newQuote = createThisQuote(quoteText, quoteAuthor, quoteType);
    pushQuoteToCollection(newQuote);
    
  } else {
    let paraErrorMsg = document.createElement("p");
    paraErrorMsg.innerHTML =
      "Vous devez remplir les champs correspondant avant d'jouter une citation";
    errorMsg.insertAdjacentElement("beforeend", paraErrorMsg);
  }

});

/**
 * crée un objet pour sauvegarder la citation, son auteur et son type, puis renvois cet objet
 */
function createThisQuote(text, author, type) {
  let myQuote = {
    text: text,
    author: author,
    type: type,
  };
  return myQuote;
}

/**
 * Récupère le tableau encodé (crée au début du script sous condition qu'il n'éxiste pas déjà), et le décode pour y ajouter l'objet
 * citation nouvellement crée. Appel la fonction displayQuote pour afficher les cartes au même moment
 */
function pushQuoteToCollection(newQuote) {
  let collectionEncoded = localStorage.getItem("collection-citations");

  let collectionDecoded = JSON.parse(collectionEncoded);

  collectionDecoded.push(newQuote);

  displayQuote(collectionDecoded);

  let collectionReEncoded = JSON.stringify(collectionDecoded);
  localStorage.setItem("collection-citations", collectionReEncoded);
}

// Affiche les cartes stockées dans la collection sauveagrdé dans le localStorage. Ajout d'un event Listener au click pour supprimer la carte du DOM
function displayQuote(collection) {
  for (let i = 0; i < collection.length; i++) {
    let quoteCard = document.createElement("div");
    quoteCard.classList.add("card");

    let paraTextQuote = document.createElement("p");
    paraTextQuote.innerHTML = collection[i].text;

    let paraAuthorQuote = document.createElement("p");
    paraAuthorQuote.innerHTML = `Auteur : ${collection[i].author}`;

    let paraTypeQuote = document.createElement("p");
    paraTypeQuote.innerHTML = `Catégorie : ${collection[i].type}`;

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Effacer";
    deleteButton.addEventListener("click", () => {
      quoteCard.remove();
    });

    quoteCard.insertAdjacentElement("beforeend", paraTextQuote);
    quoteCard.insertAdjacentElement("beforeend", paraAuthorQuote);
    quoteCard.insertAdjacentElement("beforeend", paraTypeQuote);
    quoteCard.insertAdjacentElement("beforeend", deleteButton);
    quoteList.insertAdjacentElement("beforeend", quoteCard);
  }
}

// Affiche le nombre de citation sauvegardées dans le local storage.
function numberOfSavedQuotes (){
    let myCryptedQuotes = localStorage.getItem("collection-citations");
    let myQuotes = JSON.parse(myCryptedQuotes);
    
    let paraNumberQuote = document.createElement("p");
    paraNumberQuote.innerHTML = `Citations enregistrées : ${myQuotes.length}`;
    quoteList.insertAdjacentElement("beforeend", paraNumberQuote);
}
