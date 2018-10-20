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
    username: 'ibezim',
    password: 'seyiii',
    role: 'attendant',
    email: 'seyi@gmail.com'
  },
  emptyField: {
    name: '',
    username: 'okoro',
    password: '',
    role: 'attendant',
    email: 'seyi@gmail.com'
  },
  spacedField: {
    name: '     ',
    username: 'seyi',
    password: 'seyiii',
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
    image: 'imageurl',
    prize: '1000',
    quantity: '100',
    min: '10',
    category: ''
  },
  spacedField: {
    productName: 'uhhh',
    description: 'ogechi oooo mmmmm',
    image: 'image',
    prize: '5000',
    quantity: '  ',
    min: '10',
    category: 'flat'
  },
  validProduct: {
    productName: 'uhhh',
    description: 'ogechi oooo mmmmm',
    image: 'image',
    prize: '5000',
    quantity: '12',
    min: '10',
    category: 'flat'
  }

};

var saleDetails = {
  emptyField: {
    productId: '',
    productName: 'Sneakers',
    prize: '1000',
    quantity: '2'
  },
  spacedField: {
    productId: '    ',
    productName: 'Sneakers',
    prize: '1000',
    quantity: '2'
  },
  validSale: {
    productId: '3',
    productName: 'Sneakers',
    prize: '1000',
    quantity: '2'
  },
  invalidSale: {
    productId: '30',
    productName: 'Sneakers',
    prize: '1000',
    quantity: '2'
  },
  invalidSale2: {
    productId: '1',
    productName: 'Sneakers',
    prize: '1000',
    quantity: '200'
  }
};

exports.userDetails = userDetails;
exports.productDetails = productDetails;
exports.saleDetails = saleDetails;