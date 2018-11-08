'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _admin = require('./routes/admin');

var _admin2 = _interopRequireDefault(_admin);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 5200;
var app = (0, _express2.default)();

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));

app.use('/api/v1/users', _users2.default);
app.use('/v1/admin', _admin2.default);
app.listen(PORT, function () {
  console.log('Server started at port ' + PORT + ' ');
});

exports.default = app;