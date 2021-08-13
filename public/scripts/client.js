/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 
const createTweetElement = function(data) {
  let text = data.content.text;
  let $tweet = `
    <div class="tweet">
      <header class="tweet-header">
        <div class="avatar"><img src="${data.user.avatars}" />
          <p>${data.user.name}</p> 
        </div>
        <div class="handle"><h4>${data.user.handle}</h4></div>
      </header>

      <div>
        <p class="tweet-body">${escape(text)}</p>
      </div>
      <hr>

      <footer>
        <div class="posted"><h3>${timeago.format(data.created_at)}</h3></div> 
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

//add the new post to the tweet list
const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      for (let tweet of tweets) {
        $('article').append(createTweetElement(tweet));
      }
    });
}

//XSS
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const longError = function() {
  $('#longError').slideDown();
  $('#longError').delay(3000).slideUp();
}

const emptyError = function() {
  $('#emptyError').slideDown();
  $('#emptyError').delay(3000).slideUp();
}

//get tweet text from html and post them
$(document).ready(function() {
  $('#longError').hide();
  $('#emptyError').hide();
  $('#newtweet').hide();
  $('#totop').hide();
  
  $("#tweet-post").submit(function(event) {
    event.preventDefault();
    
    //form validation 
    if ($('#tweet-text').val().length > 140  ) {
      longError();
    } else if (!$('#tweet-text').val()) {
      // alert('Your tweets cannot be empty');
      emptyError();
    } else {
      let tweetText = $(this).serialize();

      $.post('/tweets', tweetText, function (){
        location.reload();
      })
    }
  });

  //open up tweet compose section
  $('.toggle').on('click', function() {
    $('#newtweet').slideDown();
  });

  // scroll to top
  $(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
      $('#totop').show();
    } else {
      $('#totop').hide();
    }
    $('#totop').on('click', function() {
      $(window).scrollTop(0);
    })
  });

    


  loadTweets();
});