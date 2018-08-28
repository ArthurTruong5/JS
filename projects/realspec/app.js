document.getElementById('testButton').addEventListener('click',getExternal);

function getExternal() {
  fetch("https://api.domain.com.au/v1/salesResults/Sydney", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer 1ec303f3b0db7fe5326c4ecfa9a64d2f"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let output = '';
      document.getElementById('output').innerHTML =  "Number of Listed Aunctions" + data.numberListedForAuction;
      document.getElementById('output').innerHTML = data.numberListedForAuction;
    })
    .catch(err => console.log(err));
}
