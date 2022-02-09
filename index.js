//DOM Content Loaded Event Listener & Corresponding Functions
document.addEventListener('DOMContentLoaded', () => {
  fetchBreweries();
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

// "Submit" Event Listener For the Selected State
let resultsInState = []
function submitListener() {
  const breweryForm = document.getElementById('brewery-form')
  breweryForm.addEventListener('submit', (e) => {
      e.preventDefault()
      resultsInState = []
      const state = document.getElementById('states')
      const selectedState = [state].map(option => option.value)
      renderStates(selectedState[0]) 
  })
}