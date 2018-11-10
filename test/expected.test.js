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
const userB2 = {
  id: 'userB2',
  pickUpLocation: '104A Doherty lane, Lekki, Lagos',
  destination: 'B324A Banana Island Ikoyi, Lagos',
  status: status.ONTRANSIT,
  orderDate: new Date().toLocaleString(),
};
const userC1 = {
  id: 'userC1',
  pickUpLocation: '102 Lagos Hostel, University of Ilorin, Ilorin',
  destination: '23 Airport Road, Jabu Abuja',
  status: status.CANCELLED,
  orderDate: new Date().toLocaleString(),
};
export {
  userA,
  userA1,
  userB2,
  userC1,
};
