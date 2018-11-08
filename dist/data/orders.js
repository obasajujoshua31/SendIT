'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orders = {
  userA: [{
    id: 'userA1',
    pickUpLocation: '25 Lekki Lagos',
    destination: '39 Alausa Ikeja Lagos',
    status: _status2.default.ONTRANSIT,
    orderDate: new Date().toLocaleString()
  }, {
    id: 'userA2',
    pickUpLocation: '24 Ogbomosho road, Ibadan',
    destination: '10 Obaro way, Ilupeju Lagos',
    status: _status2.default.DELIVERED,
    orderDate: new Date().toLocaleString()
  }, {
    id: 'userA3',
    pickUpLocation: '45 Abraham Adesanya Estate Ajah Lagos',
    destination: '22 Olorundare close, Iyana Apaja, Lagos',
    status: _status2.default.CANCELLED,
    orderDate: new Date().toLocaleString()
  }],
  userB: [{
    id: 'userB1',
    pickUpLocation: '22 Joseph Street Idumota Lagos',
    destination: '44 Akinola estate, Olokonla Lagos',
    status: _status2.default.ONTRANSIT,
    orderDate: new Date().toLocaleString()
  }, {
    id: 'userB2',
    pickUpLocation: '104A Doherty lane, Lekki, Lagos',
    destination: 'B324A Banana Island Ikoyi, Lagos',
    status: _status2.default.ONTRANSIT,
    orderDate: new Date().toLocaleString()
  }],
  userC: [{
    id: 'userC1',
    pickUpLocation: '102 Lagos Hostel, University of Ilorin, Ilorin',
    destination: '23 Airport Road, Jabu Abuja',
    status: _status2.default.CANCELLED,
    orderDate: new Date().toLocaleString()
  }, {
    id: 'userC2',
    pickUpLocation: '11 David Road, Ilupeju, Lagos',
    destination: '21 Kingsley street, Kudirat Abiola Way, Ikeja Lagos',
    status: _status2.default.DELIVERED,
    orderDate: new Date().toLocaleString()
  }]

};

exports.default = orders;