const lodash = require('lodash')

const a =  {
    pieceName: "Emo Flamingos",
    price: 30,
    ownerList: [
      {
        name: "Fida Ernest",
        userID: 23849,
        purchaseDate: "09/13/2021",
      },
      {
        name: "Eric Karger",
        userID: 23510,
        purchaseDate: "09/13/2021",
      },
    ],
  }
const b = {
    pieceName: "Emo Flamingos",
    price: 30,
    ownerList: [
      {
        name: "Fida Ernest",
        userID: 23849,
        purchaseDate: "09/12/2021",
      },
      {
        name: "Eric Karger",
        userID: 23510,
        purchaseDate: "09/13/2021",
      },
    ],
  }


console.log(lodash.isEqual(a,b))