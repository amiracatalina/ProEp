class Card {

  constructor(element) {
    this._element = element;
    //this._cards = Array.from(this._element.querySelectorAll('.restaurant_card'))
    //this._current = null

    this._initialize();
  }

  _initialize() {
    this._element.addEventListener('click', e => {
      console.log('here');
      //change it here for server side
      location = "singleRestaurant/" + id
    });
  }
}

export default Card;
