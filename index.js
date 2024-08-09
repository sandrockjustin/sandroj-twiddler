
$(document).ready(() => {
  const $body = $('body');
  $body.html('');

  function update(){
    $body.html(''); // clean document, wipes page at start
    const $updateTweets = streams.home.map((tweet) => { // get an updated list of posts from stream.home (array)
      const $division = $('<div class="tweet-container"></div>'); // create a new division for each tweet
      $division.append(`<table class="table-main"><tr class="table-header"><th class="tweet-username">@${tweet.user}</th></tr><tr class="table-body"><td class="tweet-contents">${tweet.message}</td></tr><tr class="table-footer"><td class="tweet-timestamp">${moment().format('lll')} - <i>${moment(tweet.created_at).startOf('second').fromNow()}</i></td></tr></table>`)
      return $division; // return value of division
    });

    $body.append($updateTweets.reverse()); // add the REVERSE of $updateTweets (newest results are pushed to end)
    $body.prepend('<button class="visitor-createTweet">+</button>'); // allows user to write a tweet
    $body.prepend('<button class="refresh">&#x21bb;</button>'); // allows user to refresh feed
  }

  $(document).on('click', '.refresh', function(event){
    update();
    console.log('page refreshed');
  })

  // for all items of class tweet-username, when they are clicked
  $(document).on('click', '.tweet-username', function(event){
    let $target = event.currentTarget.innerText.slice(1);           // $target represents the item that was clicked
    let $userTweets = streams.home.filter(function(currentTweet){   // for each Tweet on the website
      if (currentTweet.user === $target){                           // if the Tweet belongs to the event target
        return currentTweet;                                        // push it to an array, which gets returned on line 31
      }
    }).map(function(tweet){                                         // from array produced from filter()
      const $division = $('<div class="tweet-container"></div>');   // create a new $division that will receive modifications
      const $tableHead = `<tr class="table-header"><th class="tweet-username">@${tweet.user}</th></tr>`;
      const $tableBody = `<tr class="table-body"><td class="tweet-contents">${tweet.message}</td></tr>`;
      const $tableFoot = `<tr class="table-footer"><td class="tweet-timestamp">${moment().format('lll')} - <i>${moment(tweet.created_at).startOf('second').fromNow()}</i></td></tr>`;
      $division.prepend(`<table class="table-main">${$tableHead}${$tableBody}${$tableFoot}</table>`)
      return $division;                                             // return that $division so that we can append to $body
    });

    $body.html('');
    $body.append($userTweets);
    $body.prepend('<button class="visitor-createTweet">+</button>'); // allows user to write a tweet
    $body.prepend('<button class="refresh">&#x21bb;</button>'); // allows user to refresh feed

  })

  // $(document).on('click', '.visitor-createTweet', function(event){
  //   //update();
  //   $division = $('<div></div>');
  //   $division.append(`<form><input placeholder="Username..." type="text" class="input-username"/><input placeholder="Your message..." type="text" name="message" class="input-message"/><button type="submit" class="input-submission">Post</button></form>`)
  //   $body.prepend($division);
  //   console.log('waiting for user input...')

  //   $('.input-submission').on('click', function(){

  //     window.visitor = $('.input-username').val(); //assign window visitor to input argument

  //     if (!streams.users[window.visitor]){
  //       streams.users[window.visitor] = [];
  //     }

  //     console.log('window visitor assigned, attempting form submission...');
  //     writeTweet($('.input-message').val());
  //   });

  // });

  // let $tweetContents = $('.tweet-contents')
  // let $hashtag = $tweetContents.slice($tweetContents.indexOf('#'));

  // $(document).on('click', $hashtag, function(){

  //   // for every Tweet on our website
  //   let $byHashtag = streams.home.filter(function(tweet){
  //     // ('.tweet-contents').slice($('.tweet-contents').indexOf('#')); equal to "#hashtag" from the "tweet-contents" class of a Tweet
  //     if (tweet.message.includes($hashtag)){ // if the current Tweet includes the hashtag
  //       return tweet; // return that tweet to be pushed to our array
  //     }
  //   }).map(function(tweet){                                         // from array produced from filter()
  //     const $division = $('<div class="tweet-container"></div>');          // create a new $division that will receive modifications
  //     const $tableHead = `<tr class="table-header"><th class="tweet-username">@${tweet.user}</th></tr>`;
  //     const $tableBody = `<tr class="table-body"><td class="tweet-contents">${tweet.message}</td></tr>`;
  //     const $tableFoot = `<tr class="table-footer"><td class="tweet-timestamp">${moment().format('lll')} - <i>${moment(tweet.created_at).startOf('second').fromNow()}</i></td></tr>`;
  //     $division.prepend(`<table class="table-main">${$tableHead}${$tableBody}${$tableFoot}</table>`)
  //     return $division; // return that $division so that we can append to $body
  //   });

  //   $body.html('');
  //   $body.append($byHashtag);
  //   $body.prepend('<button class="visitor-createTweet">+</button>'); // allows user to write a tweet
  //   $body.prepend('<button class="refresh">&#x21bb;</button>'); // allows user to refresh feed

  // });


  update();

  scheduleNextTweet(); // allows for new items to be generated

});

