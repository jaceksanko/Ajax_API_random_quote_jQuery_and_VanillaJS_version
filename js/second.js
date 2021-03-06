
let prefix = "https://cors-anywhere.herokuapp.com/";

let tweetLink = "https://twitter.com/intent/tweet?text=";
let quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function randomString() {
    let chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    let str = '';
    for (let i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function getQuote() {
    let requestQuoteUrl = new XMLHttpRequest();
    requestQuoteUrl.open('GET', prefix + quoteUrl + "&value" + randomString());
    requestQuoteUrl.addEventListener('load', createTweet);
    requestQuoteUrl.send();
}

function createTweet(input) {
    let responseQuoteUrl = JSON.parse(input.currentTarget.response);

    let data = responseQuoteUrl[0];

    const reg1 = /&#8217;/g;
    const reg2 = /&#8211;/g; 
    const reg3 = /&#8220;/g;
    const reg4 = /&#8221;/g;
    const reg5 = /&#8216;/g;
    const reg6 = /&#038;/g;
    const regHtmlTag = /<(?:.|\s)*?>/g;

    let quoteText = data.content.replace(reg1, "'").replace(reg2, "-").replace(reg3, "“").replace(reg4, "”").replace(reg5, "‘").replace(reg6, "&").replace(regHtmlTag, '');  //slice(3, -5);
    
    let quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }

    let tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
    if (tweetText.length > 140) {
        getQuote();
    }
    else { 
        let tweet = tweetLink + encodeURIComponent(tweetText);
        document.querySelector("#dvloader").style.display = 'none';
        document.querySelector('.quote').textContent = quoteText;
        document.querySelector('.author').textContent = "Author: " + quoteAuthor;
        document.querySelector('.tweet').setAttribute('href', tweet);
    }
}

getQuote();

document.querySelector('.trigger').addEventListener('click', function() {
    document.querySelector("#dvloader").style.display = 'block';
    document.querySelector('.quote').textContent = '';
    document.querySelector('.author').textContent = '';
    getQuote();
    });