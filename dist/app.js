'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('./routes/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 5200;
var app = (0, _express2.default)();

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));
app.get('/', function (req, res) {
  res.redirect('/api/v1');
});
app.use('/api/v1', _api2.default);

app.listen(PORT, function () {
  console.log('Server started at port ' + PORT + ' ');
});
exports.default = app;