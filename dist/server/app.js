'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _customValidator = require('./middlewares/customValidator');

var _customValidator2 = _interopRequireDefault(_customValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var swaggerDocument = require('./swagger.json');

// Set up the express app
var app = (0, _express2.default)();

// Parse incoming requests data
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// Validator to check requests
app.use((0, _expressValidator2.default)(_customValidator2.default));

// Versioning and Routes
app.use('/api/v1/', _index2.default);

// Document API with Swagger
app.use('/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(swaggerDocument));

// Setup a default catch-all route
app.use('*', function (req, res, next) {
  res.status(404).json({
    message: 'Page not found'
  });
  next();
});

_dotenv2.default.config();
// Listen for requests
var port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log('App is running, check me out on http://localhost:' + port);
});
exports.default = app;