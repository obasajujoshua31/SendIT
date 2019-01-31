import Bcrypt from '../helpers/crypt';

const parcel1 = [
  '104A Doherty lane, Lekki, Lagos',
  'B324A Banana Island Ikoyi, Lagos',
  1,
  '90',
  'Lb',
  '2018-11-18',
  'TRANSITING',
  'Iphone',
];

const parcel2 = [
  '25 Lekki Lagos',
  '39 Alausa Street, Ikeja',
  2,
  '35',
  'kg',
  '2018-11-18',
  'CANCELLED',
  'Nokia',
];

const parcel3 = [
  '12 Ajiboye Street, Off Lagoon Hospital, Ikeja',
  '22 Lagos Ibadan Express Way, Mowe',
  2,
  '67',
  'Kg',
  '2018-11-18',
  'PLACED',
  'WristWatch',
];

const user1 = [
  process.env.EMAIL,
  Bcrypt.encrypt(process.env.PASSWORD),
  'Joshua',
  'Fredrick',
  false,
];

const user2 = [
  process.env.ADMIN_EMAIL,
  Bcrypt.encrypt(process.env.ADMIN_PASSWORD),
  'Fredrick',
  'Obasaju',
  true,
];
const jwttoken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTU0Mjc2MjQ1M30.jKIrXUSlLrqISZKmQFW2sQy3p9Jk5QwV2dHdGn8evy4';
const jwtadmin =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTU0Mjc2MjU2NH0.7tHlk-5lOELNOV1XiTBqIm5J9PrL8PdxHgFUfhT0Jz4';
export default { parcel1, parcel2, parcel3, user1, user2, jwttoken, jwtadmin };
