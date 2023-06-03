import api from './quoteForismaticApi.js';
function renderQuote() {
  api.fetchQuote().then(quote => {
    const renderQuote = document.querySelector('.additionalInfo');
    renderQuote.insertAdjacentHTML(
      'beforeend',
      `<div class='quoteBox'> 
        <svg class='quoteIcon'>
        <use href="./images/symbol-defs.svg#icon-quote-icon"></use>
        </svg>
    <p class='quote'>${quote.body}</p>
    <p class='quoteAuthor'>${quote.author}</p>
    </div>`,
    );
  });
}
// renderQuote();

export default { renderQuote };
