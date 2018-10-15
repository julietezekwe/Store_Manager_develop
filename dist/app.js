"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _index = require("./server/index");

var _index2 = _interopRequireDefault(_index);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
// Listen for requests
var port = process.env.PORT;
_index2.default.listen(port, function () {
	console.log("App is running, check me out on http://localhost:" + port);
});

exports.default = _index2.default;