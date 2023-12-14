const { Schema, model } = require('mongoose');

const ArticleSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  eMoneyNum: { type: Number, required: true },
  eMoneyPin: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  products: {
    type: [ArticleSchema],
    validate: {
      validator: product => {
        return product.length > 0;
      },
      message: 'Not allowed 0 products!',
    },
  },
  createdAt: { type: Date, default: () => new Date().getTime() },
});

const OrderModel = model('orders', OrderSchema);
module.exports = OrderModel;
