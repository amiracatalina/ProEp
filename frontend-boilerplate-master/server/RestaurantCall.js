const url = 'https://proepapi.azurewebsites.net/api/Restaurant/List'
const fetch = require('node-fetch')

class NewsService {

  static getAllRestaurants() {
    const url = 'https://proepapi.azurewebsites.net/api/Restaurant/List'
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json, text/json',
        'APIKey': 'foodieAPIKey2019'
      }
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        return this._transformData(data)
      })
      .catch(err => {
        console.log('Fetch problem: ' + err.message)
      })
  }

  static _transformData(data) {
    return data.map(({ ID, Name, Address, Type, Rating }) => {
      return {
        id: ID,
        nameRestaurant: Name,
        locationRestaurant: Address,
        type: Type,
        rating: Rating
      }
    })
  }

  static getTopRated(data) {
    const filteredCards = data.filter(card => {
      const incompleteData = card.rating == null
      return !incompleteData
    })

    const topRated = filteredCards.sort((a, b) =>
      {
        return b.rating - a.rating
      }).slice(0, 3)

    return topRated
  }

  static getSingleRestaurantByID(category, id){
    const singleCard = category.filter(card => {
      return card.id == id;
    });

    return singleCard ? singleCard[0] : null;
  }
}

module.exports = NewsService
