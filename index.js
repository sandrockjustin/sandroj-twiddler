
$(document).ready(() => {
  const $body = $('body');
  $body.html('');


  // $tweets is NOT a function, it just stores a result from map(), it is an array!
  // for each item in streams.home (array) containing all posts on the entire website
  const $tweets = streams.home.map((tweet) => {

    const $tweet = $('<div></div>'); // create a new division for each tweet

    // create a variable (String) that uses the current tweet properties (.user & .message & .created_at)
    const text = `@${tweet.user}: ${tweet.message} ${moment(tweet.created_at).startOf('second').fromNow()}`;

    $tweet.text(text); // add the variable 'text' (String) to the text of our newly created division

    return $tweet;    // return the new division
  });

  $body.append($tweets); // appends result from running $tweets

  scheduleNextTweet(); // allows for new items to be generated

  // update() does verything that $tweets does, but it iterates continuously
  function update(){
    $body.html(''); // clean document

    // get an updated list of posts from stream.home (array)
    const $updateTweets = streams.home.map((tweet) => {

      const $tweet = $('<div></div>'); // create a new division for each tweet

      // create a variable (String) that uses the current tweet properties (.user & .message & .created_at)
      const text = `@${tweet.user}: ${tweet.message} ${moment(tweet.created_at).startOf('second').fromNow()}`;

      $tweet.text(text); // add the variable 'text' (String) to the text of our newly created division

      return $tweet;    // return the new division
    });

    // add the REVERSE of $updateTweets (newest results are pushed to end) and append that to the cleaned document
    $body.append($updateTweets.reverse());

    setInterval(update, 15000);
  }
  update();

});

