//DOM Content Loaded Event Listener & Corresponding Functions
document.addEventListener('DOMContentLoaded', () => {
  fetchBreweries()
  submitListener()
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

  const breweryList = document.getElementById('brewery-list')
  if (breweryList.innerHTML === '\n        ' || breweryList.innerHTML === ' ' || breweryList.innerHTML === '' || breweryList.innerText === "") {
    resultsInState = breweries.filter((brewery) => brewery.state === selectedState)

    for (let i = 0; i < resultsInState.length; i++) {
      const listItem = document.createElement('li')
      const name = document.createElement('p')
      name.innerText = resultsInState[i].name
      name.classList.add('nameOfBrewery')
      const descrip = document.createElement('p')
      descrip.innerText = `Brewery Type: `
      const type = document.createElement('span')
      type.classList.add('typeOfBrewery')
      type.innerText = resultsInState[i].brewery_type
      descrip.append(type)
      const phone = document.createElement('p')
      phone.innerText = `Phone Number: ${resultsInState[i].phone || ''}`
      const weblink = document.createElement('a')
      weblink.innerText = `Website`
      weblink.href = resultsInState[i].website_url
      const address = document.createElement('p')
      address.innerText = `Address: ${resultsInState[i].street || ''} ${resultsInState[i].city || ''}, ${resultsInState[i].state || ''} ${resultsInState[i].postal_code || ''}`
      const liker = document.createElement('button')
      liker.classList.add('likeButton')
      liker.textContent = EMPTY_HEART
      liker.addEventListener('click', likeBrewery)

      listItem.append(name, descrip, phone, address, weblink, liker)
      list.append(listItem)
    }
  }
  else {
    window.alert('Please clear selection before performing a new search.')
  }
}

//Clear Event Listener
const clearBtn = document.getElementById("clear")
clearBtn.addEventListener("click", () => {
  list.innerHTML = '\n        '
})