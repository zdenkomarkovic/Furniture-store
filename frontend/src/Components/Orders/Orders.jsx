import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderService from "../../services/OrderService";
import { storeAllOrders } from "../../store/orderSlice";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orderStore);
  console.log(orders);

  useEffect(() => {
    OrderService.allOrders()
      .then((res) => {
        dispatch(storeAllOrders(res.data));

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  });
  return (
    <div className="orders-wrapper">
      <div className="orders">
        <h3>Orders</h3>
        <table>
          <thead>
            <tr>
              <th>n</th>
              <th>Order from: </th>
              <th>Email: </th>
              <th>Phone: </th>
              <th>Address:</th>
              <th>Total Price:</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, i) => {
              return (
                <tr key={i} className="order-details">
                  <td>{i + 1}</td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>{order.phone}</td>
                  <td>
                    {order.address}, {order.city}, {order.country}
                  </td>
                  <td>{order.totalPrice}</td>
                  <td>
                    <button>Check</button>
                  </td>
                  <td>
                    <button>Print</button>
                  </td>
                  <td>
                    <button>See products</button>
                  </td>

                  <p></p>
                  <p></p>
                  <p></p>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
