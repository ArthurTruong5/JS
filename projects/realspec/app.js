function getExternal() {
  fetch("https://api.domain.com.au/v1/salesResults/Sydney", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer 2a3d72cce0e3ba39aa866a8e56a2ccfe"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let output = '';
    document.getElementById('sydneyAunction').innerHTML =  "Number of Listed Aunctions in Sydney: " + data.numberListedForAuction;

    document.getElementById('sydneySold').innerHTML =  "Number of Houses Sold in Sydney: " + data.numberSold;

    document.getElementById('sydneyMedian').innerHTML =  "Median House Price in Sydney: " + "$" + data.median.toLocaleString();

    })
    .catch(err => console.log(err));
}

getExternal();
