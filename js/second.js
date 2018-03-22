
let prefix = "https://cors-anywhere.herokuapp.com/";

let tweetLink = "https://twitter.com/intent/tweet?text=";
let quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
    let requestQuoteUrl = new XMLHttpRequest();
    requestQuoteUrl.open('GET', prefix + quoteUrl);
    requestQuoteUrl.addEventListener('load', createTweet);
    requestQuoteUrl.send();

function createTweet() {
    let responseQuoteUrl = JSON.parse(requestQuoteUrl.response);
    let data = responseQuoteUrl[0];

    let quoteText = data.content.slice(3, -5);
    console.log(quoteText);
    let quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }

    let tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
    /* if (tweetText.length > 140) {
        getQuote();
    }
    else { */
        let tweet = tweetLink + encodeURIComponent(tweetText);
        document.querySelector('.quote').textContent = quoteText;
        document.querySelector('.author').textContent = "Author: " + quoteAuthor;
        document.querySelector('.tweet').setAttribute('href', tweet);
    //}
}
}

getQuote();

document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });