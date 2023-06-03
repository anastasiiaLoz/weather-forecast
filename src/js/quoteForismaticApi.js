function fetchQuote() {
    return fetch("https://favqs.com/api/qotd")
    .then(response => 
        response.json())
    .then(data => data.quote)
    .catch(error => {
        console.log(error)
    })
}
export default {fetchQuote};
