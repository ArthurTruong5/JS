<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Callbacks & JSON</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Load Bulma CSS framework -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css">
  </head>
  <body>
    <!-- Header -->
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Rhandom
          </h1>
          <h2 class="subtitle">
            Gettin' some randoms
          </h2>
          <a class="button is-primary is-inverted is-outlined" id="another-one">Another one!</a>
        </div>
      </div>
    </section>
    <!-- Our list of randoms -->
    <section id="randoms">
    </section>
    <script>
    const randoms = document.querySelector('#randoms');
    const anotherOneBtn = document.querySelector('#another-one');
    // When they click the 'Another one!' button, run getRandomUser
    anotherOneBtn.addEventListener("click", getRandomUser);
    function createUser(jsonResults) {
      const user = JSON.parse(jsonResults).results[0];
      const html = `<div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="${user.picture.thumbnail}" alt="${user.name.first}">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">
                ${user.name.title} ${user.name.first} ${user.name.last}
              </p>
              <p class="subtitle is-6">${user.email}</p>
            </div>
          </div>
        </div>
      </div>`;
      randoms.innerHTML = html + randoms.innerHTML;
    }
    // function getRandomUser () {
    //
    //   // If the button is in a `disabled` state, we're waiting for a request to finish.
    //   // Return so we don't send another request.
    //   if (anotherOneBtn.hasAttribute('disabled')) {
    //     return;
    //   }
    //
    //   // Update the button to give the user some feedback
    //   anotherOneBtn.innerText = 'Loading...';
    //   anotherOneBtn.setAttribute('disabled', '');
    //
    //   const request = new XMLHttpRequest();
    //   request.open('GET', 'https://randomuser.me/api/', true);
    //   request.onload = function () {
    //     // Pass the response to createUser.
    //     createUser(request.response);
    //
    //     // Set the button back to a ready state
    //     anotherOneBtn.innerText = 'Another one!';
    //     anotherOneBtn.removeAttribute('disabled');
    //   };
    //
    //   request.send();
    // }
    function getRandomUser () {
      // If the button is in a `disabled` state, we're waiting for a request to finish.
      // Return so we don't send another request.
      if (anotherOneBtn.hasAttribute('disabled')) {
        return;
      }
      // Update the button to give the user some feedback
      anotherOneBtn.innerText = 'Loading...';
      anotherOneBtn.setAttribute('disabled', '');
      fetch("https://randomuser.me/api/")
        .then(function(response) {
          // console.log(response.text());
          // console.log(response.text()); returns another promise so we need to chain it further with another .then & .catch
          return response.text();
        // Promises chaining; we add another .then & .catch to capture the values of the returned promise
        }).then(function(result) {
          console.log(result)
          createUser(result);
          anotherOneBtn.innerText = 'Another one!';
          anotherOneBtn.removeAttribute('disabled');
        })
        // var data = response.text();
        .catch(function(){
          alert("Fail");
        })
        .catch(function() {
          console.log("something went wrong!")
        })
    }
    </script>
  </body>
</html>
