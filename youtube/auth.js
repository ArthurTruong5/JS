const api = "AIzaSyCI5rBJBJVWVccidqLFpXGDkKOxWInHu5g"; // Specify your api key here
// Load API library
function startYoutube() {
  if(api) {
    gapi.client.load('youtube', 'v3', loadYouTubeApi);
  } else {
    document.getElementById('output').innerHTML += 'API key has not been specified!';
  }
}
// Set API Key
function loadYouTubeApi() {
  gapi.client.setApiKey(api);
  let youtubeSearch = document.getElementById("input-field").value;
  if (youtubeSearch != ""){
      search(youtubeSearch);
      // clear the field
      document.getElementById("input-field").value = "";
  }
}
// Call the search.list()
function search(queryTerm) {
  let request = gapi.client.youtube.search.list({
      part: 'id',
      q: queryTerm
  });

  // Execute the request call and output it in HTML view
  request.execute((response) => {
     playYoutubeVideo(response);
     console.log(response)
  
    /* used to display the json string on the html page: html cannot display JSON, hence converted to string:*/
    // const responseString = JSON.stringify(response, '', 2);
    // document.getElementById('output').innerHTML += responseString;
  });
  // code to parse json
  function playYoutubeVideo(response) {
      // extract Json data and populate URL to play the video
      // Insert your code here
  }
}
