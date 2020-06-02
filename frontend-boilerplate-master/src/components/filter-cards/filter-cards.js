// class Filter {
//
//   constructor(element) {
//     this._element = element;
//
//     this._elements = {
//       allCheckboxes: document.querySelectorAll('input[type=checkbox]'),
//       checkboxInternational: document.querySelector('[data-criteria = international]'),
//       allPlayers: Array.from(document.querySelectorAll('.restaurant_card')),
//     }
//     this._change()
//   }
//   _change(){
//
//     this._elements.checkboxInternational.addEventListener('click', e =>{
//       let result = this._elements.allPlayers.filter(card =>{
//           const results = card.innerHTML.indexOf("International")!= -1
//           return !results
//         })
//       console.log(result)
//
//       result.forEach(card => {
//         card.style.display = "none"
//       })
//
//     })
//
//   }
// }
//
// export default Filter
