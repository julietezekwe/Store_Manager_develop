'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var userDetails = {
  admin: {
    id: 1,
    name: 'Admin',
    username: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
    role: 'admin'
  },
  attendant: {
    id: 3,
    name: 'ogechi',
    username: 'ogechi',
    email: 'ogechi@gmail.com',
    password: 'ogechi',
    role: 'attendant'
  },
  attendant2: {
    id: 3,
    name: 'chinedu',
    username: 'chinedu',
    email: 'chinedu@gmail.com',
    password: 'ogechi',
    role: 'attendant'
  },
  newAttendant: {
    name: 'Seyi Ibezim',
    username: 'seyi',
    password: 'seyiii',
    role: 'attendant',
    email: 'seyi@gmail.com'
  },
  emptyField: {
    name: '',
    username: 'seyi',
    password: '',
    role: 'attendant',
    email: 'seyi@gmail.com'
  },
  wrongPassword: {
    username: 'ogechi',
    password: 'juljnjbx'
  }
};

var productDetails = {
  emptyField: {
    productName: 'Red Shoes',
    description: '',
    prize: 1000,
    quantity: 100,
    min: 10,
    category: ''
  },
  validProduct: {
    productName: 'Red Shoes',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Ipsum tempore eum, mollitia in dolores nostrum placeat numquam, quidem, ad cumque nam provident illo maxime magni',
    prize: 1000,
    quantity: 100,
    min: 10,
    category: 'flat'
  }

};

var saleDetails = {
  emptyField: {
    productId: '',
    productName: 'Sneakers',
    prize: 1000,
    quantity: 2
  },
  validSale: {
    productId: 3,
    productName: 'Sneakers',
    prize: 1000,
    quantity: 2
  }
};

exports.userDetails = userDetails;
exports.productDetails = productDetails;
exports.saleDetails = saleDetails;