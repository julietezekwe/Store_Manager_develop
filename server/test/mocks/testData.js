const userDetails = {
  admin: {
    id: 1,
    name: 'Admin',
    username: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
    role: 'admin',
  },
  attendant: {
    id: 3,
    name: 'ogechi',
    username: 'ogechi',
    email: 'ogechi@gmail.com',
    password: 'ogechi',
    role: 'attendant',
  },
  attendant2: {
    id: 3,
    name: 'chinedu',
    username: 'chinedu',
    email: 'chinedu@gmail.com',
    password: 'ogechi',
    role: 'attendant',
  },
  update: {
    id: 4,
    name: 'chinedu Eze',
    username: 'chinedu',
    email: 'chinedu1@gmail.com',
    password: 'ogechi',
    role: 'attendant',
  },
  newAttendant: {
    name: 'Seyi Ibezim',
    username: 'ibezim',
    password: 'seyiii',
    role: 'attendant',
    email: 'seyi@gmail.com',
  },
  newAttendant3: {
    name: 'Seyi Ibezim',
    username: 'ibezim',
    password: 'seyiii',
    role: 'manager',
    email: 'seyi2@gmail.com',
  },
  emptyField: {
    name: '',
    username: 'okoro',
    password: '',
    role: 'attendant',
    email: 'seyi@gmail.com',
  },
  spacedField: {
    name: '     ',
    username: 'seyi',
    password: 'seyiii',
    role: 'attendant',
    email: 'seyi@gmail.com',
  },
  wrongPassword: {
    email: 'ogechi@gmail.com',
    password: 'juljnjbx',
  },
};

const productDetails = {
  emptyField: {
    productName: 'Red Shoes',
    description: '',
    image: 'imageurl.jpg',
    price: '1000',
    quantity: '100',
    min: '10',
  },
  spacedField: {
    productName: '    ',
    description: 'ogechi oooo mmmmm',
    image: 'imageurl.jpg',
    price: '5000',
    quantity: '100',
    min: '10',
  },
  validProduct: {
    productName: 'uhhh',
    description: 'ogechi oooo mmmmm',
    image: 'imageurl.jpg',
    price: '5000',
    quantity: '12',
    min: '10',
  },
  updateProduct: {
    productName: 'uhhooooh',
    description: 'ogechi oooo mmmmm',
    image: 'imageurl.jpg',
    price: '5000',
    quantity: '12',
    min: '10',
  },
  invalidImage: {
    productName: 'uhhh',
    description: 'ogechi oooo mmmmm',
    image: 'imageurl',
    price: '5000',
    quantity: '12',
    min: '10',
  },
  updateCategory: {
    categoryName: 'Flat',
  },
  wrongCategory: {
    categoryName: 'flatosss',
  },

};

const saleDetails = {
  emptyField: {
    sales: ' ',
  },
  emptyField1: {
    sales: [
      { productId: '  ',
        productName: '   ',
        price: '10000',
        quantity: '2' },
    ],
  },
  multipleProduct: {
    sales: [
      { productId: '3',
        productName: 'Sneakers',
        price: '10000',
        quantity: '2' },
      { productId: '3',
        productName: 'Sneakers',
        price: '10000',
        quantity: '2' },
    ],
  },
  validSale: {
    sales: [
      { productId: '3',
        productName: 'Sneakers',
        price: '10000',
        quantity: '2' },
    ],
  },
  invalidSale: {
    sales: [
      { productId: '30',
        productName: 'Sneakers',
        price: '1000',
        quantity: '2' },
    ],
  },
  invalidSale2: {
    sales: [
      { productId: '3',
        productName: 'Sneakers',
        price: '10000',
        quantity: '20000' },
    ],
  },
};

const categoryDetails = {
  emptyField: {
    categoryName: '',
  },
  validCategory: {
    categoryName: 'Mens',
  },
  spacedField: {
    categoryName: '   ',
  },
};


export { userDetails, productDetails, saleDetails, categoryDetails };
