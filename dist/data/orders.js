'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orders = [{
  id: 1,
  from: '25 Lekki Lagos',
  placedBy: 11,
  weight: 3.5,
  weightMetric: 'Kg',
  sentOn: new Date().toLocaleString(),
  deliveredOn: new Date().toLocaleString(),
  to: '39 Alausa Ikeja Lagos',
  status: _status2.default.TRANSITING,
  currentLocation: '25 Lekki Lagos'
}, {
  id: 2,
  placedBy: 12,
  weight: 5.6,
  weightMetric: 'Kg',
  sentOn: new Date().toLocaleString(),
  deliveredOn: new Date().toLocaleString(),
  from: '24 Ogbomosho road, Ibadan',
  to: '10 Obaro way, Ilupeju Lagos',
  status: _status2.default.DELIVERED,
  currentLocation: new Date().toLocaleString()
}, {
  id: 3,
  placedBy: 13,
  weight: 0.45,
  weightMetric: 'Kg',
  sentOn: new Date().toLocaleString(),
  deliveredOn: new Date().toLocaleString(),
  from: '45 Abraham Adesanya Estate Ajah Lagos',
  to: '22 Olorundare close, Iyana Apaja, Lagos',
  status: _status2.default.DELIVERED,
  currentLocation: new Date().toLocaleString()
}, {
  id: 4,
  placedBy: 11,
  weight: 0.9,
  weightMetric: 'Kg',
  sentOn: new Date().toLocaleString(),
  deliveredOn: new Date().toLocaleString(),
  from: '22 Joseph Street Idumota Lagos',
  to: '44 Akinola estate, Olokonla Lagos',
  status: _status2.default.TRANSITING,
  currentLocation: new Date().toLocaleString()
}, {
  id: 5,
  placedBy: 15,
  weight: 0.19,
  weightMetric: 'Kg',
  sentOn: new Date().toLocaleString(),
  deliveredOn: new Date().toLocaleString(),
  from: '104A Doherty lane, Lekki, Lagos',
  to: 'B324A Banana Island Ikoyi, Lagos',
  status: _status2.default.PLACED,
  currentLocation: new Date().toLocaleString()
}];

exports.default = orders;