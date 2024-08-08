
$(document).ready(() => {
  const $body = $('body');
  $body.html('');

  // for each item in streams.home (array) containing all posts on the entire website
  const $tweets = streams.home.map((tweet) => {

    // create a new division for each tweet
    const $tweet = $('<div></div>');

    // create a variable (String) that uses the current tweet properties (.user & .message & .created_at) 
    const text = `@${tweet.user}: ${tweet.message} ${moment().startOf(tweet.created_at).fromNow()}`;

    // add the variable 'text' (String) to our newly created division
    $tweet.text(text);

    // return the new division
    return $tweet;
  });

  // appends result from running $tweets
  $body.append($tweets);

});
