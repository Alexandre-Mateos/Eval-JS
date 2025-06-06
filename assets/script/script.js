let form = document.querySelector("#quote-form");
let quoteTextInput = document.querySelector("#quote-text");
let authorInput = document.querySelector("#quote-author");
let quoteTypeInput = document.querySelector("#quote-type");
let quoteList = document.querySelector("#quote-list");
let errorMsg = document.querySelector("#error-msg");
let dailyQuote = document.querySelector("#daily-quote");

/**
 * On vérifie si le tableau de stockage existe déjà pour éviter de l'écraser au rechargement de la page.
 * Si il n'éxiste pas on le crée.
 *  */ 
if (!localStorage.getItem("collection-citations")) {
  const collection = [];
  let quoteCollection = JSON.stringify(collection);
  localStorage.setItem("collection-citations", quoteCollection);

}else{

    // je récupère mon tableau du local storage et le décode(JSON.parse) pour l'utiliser dans les fonctions numberOfSavedQuotes et displayCardQuote
    let myCryptedQuotes = localStorage.getItem("collection-citations");
    let myQuotes = JSON.parse(myCryptedQuotes);
    // nombre de citations sauvegardées
    numberOfSavedQuotes(myQuotes);

    // citation aléatoire seulement si il y en a au moins une de stockée
    if( myQuotes.length>0){

        let quoteOfTheDay = document.createElement("h2");
        quoteOfTheDay.innerHTML = `Citation du jour`
        quoteOfTheDay.classList.add("fs-3", "text-center");
        dailyQuote.insertAdjacentElement("beforeend", quoteOfTheDay);

        let randomIndex = Math.floor( Math.random()*myQuotes.length);
        displayCardQuotes(myQuotes[randomIndex],dailyQuote );
    }
}

form.addEventListener("submit", (e) => {
  // empêche le rafraichissement automatique de la page
  e.preventDefault();

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
  displayCardQuotes(myQuote, quoteList);
  return myQuote;
}

/**
 * Récupère le tableau encodé (crée au début du script sous condition qu'il n'éxiste pas déjà), et le décode pour y ajouter l'objet
 * citation nouvellement crée.
 */
function pushQuoteToCollection(newQuote) {
  let collectionEncoded = localStorage.getItem("collection-citations");

  let collectionDecoded = JSON.parse(collectionEncoded);

  collectionDecoded.push(newQuote);

  let collectionReEncoded = JSON.stringify(collectionDecoded);
  localStorage.setItem("collection-citations", collectionReEncoded);
}


/**
 * Ajout d'une nouvelle carte dans la liste à la soumission du formulaire. Ajout d'un bouton et d'un eventListener sur ce bouton pour
 * pouvoir supprimer la carte de la liste.
 */
function displayCardQuotes(quote, elementToAttach){

    let quoteCard = document.createElement("div");
    quoteCard.classList.add("card", "card-body", "ma-carte");

    let paraTextQuote = document.createElement("p");
    paraTextQuote.innerHTML = quote.text;
    paraTextQuote.classList.add("card-title", "text-center");

    let paraAuthorQuote = document.createElement("p");
    paraAuthorQuote.innerHTML = `Auteur : ${quote.author}`;
    paraTextQuote.classList.add("card-text");

    let paraTypeQuote = document.createElement("p");
    paraTypeQuote.innerHTML = `Catégorie : ${quote.type}`;
    paraTextQuote.classList.add("card-text");

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "mon-bouton");
    deleteButton.innerHTML = "Effacer";
    deleteButton.addEventListener("click", () => {
      quoteCard.remove();
      
    });

    quoteCard.insertAdjacentElement("beforeend", paraTextQuote);
    quoteCard.insertAdjacentElement("beforeend", paraAuthorQuote);
    quoteCard.insertAdjacentElement("beforeend", paraTypeQuote);
    quoteCard.insertAdjacentElement("beforeend", deleteButton);
    elementToAttach.insertAdjacentElement("beforeend", quoteCard);
}


// Affiche le nombre de citation sauvegardées dans le local storage.
function numberOfSavedQuotes (quoteTab){
    let paraNumberQuote = document.createElement("p");
    paraNumberQuote.classList.add("text-center");
    paraNumberQuote.innerHTML = `Citations enregistrées : ${quoteTab.length}`;
    dailyQuote.insertAdjacentElement("beforebegin", paraNumberQuote);
}


