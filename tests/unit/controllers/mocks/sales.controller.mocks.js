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
};

const allSales = [
  {
    "saleId": 1,
    "productId": 1,
    "date": "2023-02-16T18:32:28.000Z",
    "quantity": 5
  },
  {
    "saleId": 1,
    "productId": 2,
    "date": "2023-02-16T18:32:28.000Z",
    "quantity": 10
  },
  {
    "saleId": 2,
    "productId": 3,
    "date": "2023-02-16T18:32:28.000Z",
    "quantity": 15
  },
  {
    "saleId": 3,
    "productId": 1,
    "date": "2023-02-16T18:34:50.000Z",
    "quantity": 1
  },
  {
    "saleId": 3,
    "productId": 2,
    "date": "2023-02-16T18:34:50.000Z",
    "quantity": 5
  }
];

const saleById = [
  {
    "date": "2023-02-16T20:41:50.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-02-16T20:41:50.000Z",
    "productId": 2,
    "quantity": 10
  }
]

module.exports = {
  invalidInput,
  invalidQuantity,
  productNotFound,
  newSale,
  requestNewSale, 
  allSales,
  saleById
};