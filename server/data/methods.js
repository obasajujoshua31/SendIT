import orders from './orders';
import status from './status';

const getAllOrdersByAdmin = () => (orders);

const getAllOrders = () => {
  const allOrders = [];
  for (const key in orders) {
    if ({}.hasOwnProperty.call(orders, key)) {
      allOrders.push(orders[key]);
    }
  }
  return allOrders;
};
const getOrderByUserId = (userId) => {
  let allOrders;
  for (const key in orders) {
    if ({}.hasOwnProperty.call(orders, key)) {
      if (key === userId) {
        allOrders = [...orders[key]];
      }
    }
  }
  return allOrders;
};
const getOrderById = (orderId) => {
  let allOrders;
  for (const key in orders) {
    if ({}.hasOwnProperty.call(orders, key)) {
      for (const order of orders[key]) {
        if (order.id === orderId) {
          allOrders = order;
        }
      }
    }
  }
  return allOrders;
};
const addNewOrderByUser = (userId, order) => {
  const { pickUpLocation, destination } = order;
  const allOrders = getOrderByUserId(userId);
  const index = allOrders.length + 1;
  const newOrder = {
    id: userId + index,
    pickUpLocation,
    destination,
    status: status.ONTRANSIT,
    orderDate: new Date(),
  };
  return [...allOrders, newOrder];
};
const cancelOrderByUser = (userId, orderId) => {
  const allOrders = getOrderByUserId(userId);
  if (!allOrders) {
    return null;
  }
  for (const order of allOrders) {
    if (order.id === orderId) {
      order.status = status.CANCELLED;
    }
  }
  return allOrders;
};

const cancelOrderByAdminById = (orderId) => {
  const allOrders = getOrderById(orderId);
  if (!allOrders) {
    return null;
  }
  allOrders.status = status.CANCELLED;
  return allOrders;
};

const getAllUsers = () => {
  const users = [];
  for (const key in orders) {
    if ({}.hasOwnProperty.call(orders, key)) {
      users.push(key);
    }
  }
  return users;
};

const removeOrderByUser = (userId, orderId) => {
  const allOrders = getOrderByUserId(userId);
  if (!allOrders) {
    return null;
  }
  return allOrders.filter(order => order.id !== orderId);
};
const changePresentLocationByAdminById = (orderId, presentLocation) => {
  const allOrders = getOrderById(orderId);
  if (!allOrders) {
    return null;
  }
  allOrders.location = presentLocation;
  return allOrders;
};
export {
  getAllOrdersByAdmin,
  getAllOrders,
  getOrderByUserId,
  getOrderById,
  addNewOrderByUser,
  cancelOrderByUser,
  cancelOrderByAdminById,
  getAllUsers,
  removeOrderByUser,
  changePresentLocationByAdminById,
};
