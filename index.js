
$(document).ready(() => {

  /* Head, Body Initialization Styles, Scripts, etc.                                                                                                                  */
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const $head = $('head');
  const $body = $('body');
  $body.html('');
  const $styles = $('style');

  $styles.append('body{ background-color: rgb(21,32,43); }');
  $styles.append('.refresh, .visitor-createTweet{ background-color: rgb(25,39,52); border-radius: 10px; color:rgb(225,232,237); border-color: rgb(225,232,237); height:50px; width:50px; border-style: solid; margin-right: 10px; font-size:xx-large; }');
  $styles.append('.tweet-container{ max-width: fit-content; margin-left: auto; margin-right: auto; margin-top: 10px; }');
  $styles.append('.table-main{ width: 400px; border-radius: 10px; background-color: rgb(25,39,52); border-spacing: 30px; }');
  $styles.append('.tweet-username{ text-align: left; color: rgb(225,232,237); font-family: Arial, Helvetica, sans-serif; }');
  $styles.append('.tweet-contents{ text-align: left; text-wrap: wrap; color: rgb(170,184,194); padding-left: 25px; font-family: Arial, Helvetica, sans-serif; }');
  $styles.append(' .tweet-timestamp{ text-align: right; color: rgb(136,153,172); font-size: x-small; font-family: Arial, Helvetica, sans-serif; border-top: 2px solid rgb(225,232,237); }');

  // BOOTSTRAPPER //
  $head.append('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
  $body.append('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  /* This code block displays all tweets on the page, when it is invoked the page is first emptied and then refilled with the latest posts                            */
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function update(){
    $body.html(''); // clean document, wipes page at start
    const $updateTweets = streams.home.map((tweet) => { // get an updated list of posts from stream.home (array)
      const $division = $('<div class="tweet-container"></div>'); // create a new division for each tweet

      let localArray = tweet.message.split(" ");

      
      let messageWithHashtags = localArray.map(function(word){

        if (word[0] === "#"){
          return`<a class="hashtag">${word}</a>`
        } else {
          return word;
        };
      }).join(` `);

      $division.append(`<table class="table-main"><tr class="table-header"><th class="tweet-username">@${tweet.user}</th></tr><tr class="table-body"><td class="tweet-contents">${messageWithHashtags}</td></tr><tr class="table-footer"><td class="tweet-timestamp">${moment().format('lll')} - <i>${moment(tweet.created_at).startOf('second').fromNow()}</i></td></tr></table>`)
      return $division; // return value of division
    });
    $body.append('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');    
    $body.append($updateTweets.reverse()); // add the REVERSE of $updateTweets (newest results are pushed to end)
    $body.prepend('<button class="visitor-createTweet">+</button>'); // allows user to write a tweet
    $body.prepend('<button class="refresh">&#x21bb;</button>'); // allows user to refresh feed
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  /* This code block makes usernames clickable, when names are clicked the page is emptied and ONLY posts from the clicked username are shown                         */
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // for all items of class tweet-username, when they are clicked
  $(document).on('click', '.tweet-username', function(event){
    let $target = event.currentTarget.innerText.slice(1); 
    
    // $target represents the item that was clicked
    let $userTweets = streams.home.filter(function(currentTweet){   // for each Tweet on the website
      if (currentTweet.user === $target){                           // if the Tweet belongs to the event target
        return currentTweet;                                        // push it to an array, which gets returned on line 31
      }
    }).map(function(tweet){    
                                           // from array produced from filter()
      let localArray = tweet.message.split(" ");

      
      let messageWithHashtags = localArray.map(function(word){

        if (word[0] === "#"){
          return`<a class="hashtag">${word}</a>`
        } else {
          return word;
        };
      }).join(` `);

      const $division = $('<div class="tweet-container"></div>');   // create a new $division that will receive modifications
      const $tableHead = `<tr class="table-header"><th class="tweet-username">@${tweet.user}</th></tr>`;
      const $tableBody = `<tr class="table-body"><td class="tweet-contents">${messageWithHashtags}</td></tr>`;
      const $tableFoot = `<tr class="table-footer"><td class="tweet-timestamp">${moment().format('lll')} - <i>${moment(tweet.created_at).startOf('second').fromNow()}</i></td></tr>`;
      $division.prepend(`<table class="table-main">${$tableHead}${$tableBody}${$tableFoot}</table>`)
      return $division;                                             // return that $division so that we can append to $body
    });
    $body.append('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');
    $body.html('');
    $body.append($userTweets);
    $body.prepend('<button class="visitor-createTweet">+</button>'); // allows user to write a tweet
    $body.prepend('<button class="refresh">&#x21bb;</button>'); // allows user to refresh feed

  })
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  


  /* This code block allows for a visitor to create a tweet                                                                                                           */
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $(document).on('click', '.visitor-createTweet', function(){                       // when the button is clicked
    $division = $('<div></div>');                                                   // create a new division

    let $formUsername = '<input placeholder="Username..." type="text" id="input-username"/>';
    let $formMessage = '<input placeholder="Your message..." type="text" name="message" id="input-message"/>';
    let $formSubmit = '<button type="submit" id="input-submission">Post</button>';

    $division.append(`<form>${$formUsername}${$formMessage}${$formSubmit}</form>`)  // create a new form inside of that division
    $body.prepend($division);                                                       // add that form to the top of the body
    console.log('waiting for user input...')

    $('form').on('submit', function(event){                                         // when button created by $formSubmit is clicked

      event.preventDefault();

      let $inputMessage = $('#input-message').val();
      let $inputUsername = $('#input-username').val();
      window.visitor = $inputUsername                                               // assign window visitor to the value input from $formUsername

      if (!streams.users[window.visitor]){                                          // if our website at streams.users does not already have this user in the object
        streams.users[window.visitor] = [];                                         // create a new key in streams.users and initialize to an array
      }

      console.log('window visitor assigned, attempting form submission...');
      writeTweet($inputMessage);
      update();                                                                     // pass the value input from $formMessage to the writeTweet() function
    });

  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  /* This code block allows you to view posts by hashtag */
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $(document).on('click', 'a', function(event){

    let $target = event.currentTarget.text;

    let $userTweets = streams.home.filter(function(currentTweet){   // for each Tweet on the website
      if (currentTweet.message.includes($target)){                           // if the Tweet belongs to the event target
        return currentTweet;                                        // push it to an array, which gets returned on line 31
      }
    }).map(function(tweet){    
                                           // from array produced from filter()
      let localArray = tweet.message.split(" ");
      
      let messageWithHashtags = localArray.map(function(word){

        if (word[0] === "#"){
          return`<a class="hashtag">${word}</a>`
        } else {
          return word;
        };
      }).join(` `);

      const $division = $('<div class="tweet-container"></div>');   // create a new $division that will receive modifications
      const $tableHead = `<tr class="table-header"><th class="tweet-username">@${tweet.user}</th></tr>`;
      const $tableBody = `<tr class="table-body"><td class="tweet-contents">${messageWithHashtags}</td></tr>`;
      const $tableFoot = `<tr class="table-footer"><td class="tweet-timestamp">${moment().format('lll')} - <i>${moment(tweet.created_at).startOf('second').fromNow()}</i></td></tr>`;
      $division.prepend(`<table class="table-main">${$tableHead}${$tableBody}${$tableFoot}</table>`)
      return $division;                                             // return that $division so that we can append to $body
    });
    $body.append('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');
    $body.html('');
    $body.append($userTweets);
    $body.prepend('<button class="visitor-createTweet">+</button>'); // allows user to write a tweet
    $body.prepend('<button class="refresh">&#x21bb;</button>'); // allows user to refresh feed

  })    
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  /* This code block allows for the "refresh" button created on each page to run the update(), effectively refreshing the page and updating posts                     */
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $(document).on('click', '.refresh', function(event){
    update();
    console.log('page refreshed');
  })
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  update(); // initial run shows the items on our page at start

  scheduleNextTweet(); // allows for new items to be generated, runs perpetually in background

});

