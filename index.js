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

//Function to Render States
const list = document.getElementById('brewery-list')
function renderStates(selectedState) {
  const EMPTY_HEART = '♡'
  const FULL_HEART = '♥'

  const likeBrewery = (e) => {
    const liker = e.target
    const like = liker.textContent
    if (like === EMPTY_HEART) {
      liker.textContent = FULL_HEART
    } else {
      liker.textContent = EMPTY_HEART
    }
  }