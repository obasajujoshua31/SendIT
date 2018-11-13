import orders from './orders';
import status from './status';


const getAllOrders = () => orders;
const getOrderByUserId = (userId) => {
  const allOrders = [];
  const allTheOrders = [...orders];
  for (const order of allTheOrders) {
    if (order.placedBy === userId) {
      allOrders.push(order);
    }
  }
  return allOrders;
};
const getOrderById = (orderId) => {
  const allOrders = [];
  for (const order of orders) {
    if (order.id === orderId) {
      allOrders.push(order);
    }
  }
  return allOrders;
};
const addNewOrder = (order) => {
  const {
    placedBy, weight, weightMetric, from, to,
  } = order;
  const lastIndex = getAllOrders.length;
  const newOrder = {
    id: lastIndex + 1,
    from,
    placedBy,
    weight,
    weightMetric,
    sentOn: new Date().toLocaleString(),
    deliveredOn: '',
    to,
    status: status.PLACED,
    currentLocation: '',
  };
  orders.push(newOrder);
  return [{
    id: lastIndex + 1,
    message: 'order created',
  }];
};
const cancelOrderById = (orderId) => {
  for (const order of orders) {
    if (order.id === orderId) {
      order.status = 'CANCELLED';
      return [{
        id: order.id,
        message: 'order cancelled',
      }];
    }
  }
  return [];
};
export {
  getAllOrders,
  getOrderByUserId,
  getOrderById,
  addNewOrder,
  cancelOrderById,
};
