import status from '../data/status';

const userA = [
  {
    id: 'userA1',
    pickUpLocation: '25 Lekki Lagos',
    destination: '39 Alausa Ikeja Lagos',
    status: status.ONTRANSIT,
    orderDate: new Date().toLocaleString(),
  },
  {
    id: 'userA2',
    pickUpLocation: '24 Ogbomosho road, Ibadan',
    destination: '10 Obaro way, Ilupeju Lagos',
    status: status.DELIVERED,
    orderDate: new Date().toLocaleString(),
  },
  {
    id: 'userA3',
    pickUpLocation: '45 Abraham Adesanya Estate Ajah Lagos',
    destination: '22 Olorundare close, Iyana Apaja, Lagos',
    status: status.CANCELLED,
    orderDate: new Date().toLocaleString(),
  },
];
const userA1 = {
  id: 'userA1',
  pickUpLocation: '25 Lekki Lagos',
  destination: '39 Alausa Ikeja Lagos',
  status: status.ONTRANSIT,
  orderDate: new Date().toLocaleString(),
};
export default {
  userA,
  userA1,
};
