/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 
const createTweetElement = function(data) {
  let $tweet = `
    <div class="tweet">
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
    </div>
  `
  return $tweet;
}

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      
      for (let tweet of tweets) {
        $('article').append(createTweetElement(tweet));
      }
  });
}

$(document).ready(function() {
  $("#tweet-post").submit(function(event) {
    event.preventDefault();
    let tweetText = $(this).serialize();
    console.log(tweetText);

    if (tweetText.length){
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: tweetText,
        datatype: 'json'
      }); 
    } else {
      alert('Invalid message');
    }
  });
  loadTweets();
})
