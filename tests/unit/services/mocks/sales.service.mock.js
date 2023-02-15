const invalidInput = [
  {
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const invalidQuantity = [
  {
    "productId": 1,
    "quantity": 0
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const productNotFound = [
  {
    "productId": 999,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const requestNewSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const newSale = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

module.exports = {
  invalidInput,
  invalidQuantity,
  productNotFound,
  newSale,
  requestNewSale
};
