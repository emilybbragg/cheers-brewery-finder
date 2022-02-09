//DOM Content Loaded Event Listener & Corresponding Functions
document.addEventListener('DOMContentLoaded', () => {
  
})

// Fetch the data
let breweries 
function fetchBreweries() {
  const url = 'https://api.openbrewerydb.org/breweries'
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        breweries = data;
      })
      .catch(error => console.log(error))
}