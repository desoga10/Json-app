const app = document.getElementById('root');
const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

//create a request variable and attach XMLHTTPRequest onject to it.
var ourRequest = new XMLHttpRequest();

//Open a new request that reqiures the URL end point
ourRequest.open('GET', 'https://jsonplaceholder.typicode.com/posts');

ourRequest.onload = function() {
  //Start Accessing the JSON data

  var data = JSON.parse(this.response);

  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    data.forEach(post => {
      //create div with a card class
      const card = document.createElement('div');
      //create an h1 and set text content to post title
      const h1 = document.createElement('h1');
      h1.textContent = post.title;

      //create a p tag and set text content to the post's body
      const p = document.createElement('p');
      post.body = post.body.substring(0, 500); // limit to 500 characters
      p.textContent = `${post.body}...`; //End with ellipses

      //append card to container element
      container.appendChild(card);

      //Each card will contain an h1 and p tag with strings stripped
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('connectionError');
    errorMessage.textContent = 'Your request failed to work!';
    app.appendChild(errorMessage);
  }
};

//send request
ourRequest.send();
