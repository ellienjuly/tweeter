/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = [{
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": timeago.format(new Date())
  },
  {
    "user": {
      "name": "Another",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@Hello"
      },
    "content": {
        "text": "I hate my life"
      },
    "created_at": timeago.format(new Date())
  }
]

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $('article').append(createTweetElement(tweet));
  }
}
 
const createTweetElement = function(data) {
  let $tweet = `
      <header class="tweet-header">
        <div class="avatar"><img src="${data.user.avatars}" />
          <p>${data.user.name}</p> 
        </div>
        <div class="handle"><h4>${data.user.handle}</h4></div>
      </header>

      <div>
        <p class="tweet-body">${data.content.text}</p>
      </div>
      <hr>

      <footer>
        <div class="posted"><h3>${data.created_at}</h3></div> 
        <div class="buttons">
          <i class="fas fa-flag"></i> 
          <i class="fas fa-retweet"></i> 
          <i class="fas fa-heart"></i>
        </div>
      </footer>
  `
  return $tweet;
}

$("#tweet-post").submit(function(event) {
  event.preventDefault();
  let content = event.val()
  let url = content.serialize();
console.log(url);
  $.post({ url }).then((data) => {
    
  })
})


$(document).ready(function() {
  renderTweets(tweetData);
})
