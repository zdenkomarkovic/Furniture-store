const OrderModel = require('../../model/orderModel');

const allOrders = (req, res) => {
  OrderModel.find({})
    .then(orders => res.send(orders))
    .catch(err => res.send(err));
};
module.exports = allOrders;
