import { useState, useContext, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseInit";
import { AuthContext } from "../context/AuthContext";
import { GridLoader } from "react-spinners";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Fetch orders logic here
        const orderCollectionRef = collection(
          db,
          "userOrders",
          user.uid,
          "orders",
        );
        const snapshot = await getDocs(orderCollectionRef);
        const ordersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <GridLoader
            color="#7064e5"
            loading={true}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          {!orders.length ? (
            <h1 className="text-4xl font-bold text-center m-auto">
              No Orders Found!
            </h1>
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-4 text-center">
                Your Orders
              </h1>
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 mb-4 flex flex-col gap-4 justify-center items-center"
                >
                  <p className="mb-2 text-xl text-gray-600 font-semibold text-center">
                    Ordered on:-{" "}
                    {orders[0]?.createdAt?.toDate().toLocaleDateString()}
                  </p>
                  <table className="w-6/12 border-collapse">
                    <thead className="bg-gray-100">
                      <tr className="text-center mr-2">
                        <th className="px-4 py-2 border-b-2">Title</th>
                        <th className="px-4 py-2 border-b-2">Price</th>
                        <th className="px-4 py-2 border-b-2">Quantity</th>
                        <th className="px-4 py-2 border-b-2">Total Price</th>
                      </tr>
                    </thead>
                    <tbody className="gap-1">
                      {order.items.map((item) => (
                        <tr key={item.id} className="text-center">
                          <td className="p-2">{item.name}</td>
                          <td className="p-2">₹ {item.price.toFixed(2)}</td>
                          <td className="p-2">{item.quantity}</td>
                          <td className="p-2">
                            ₹ {(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-bold bg-gray-100">
                        <td colSpan="3" className="p-2 text-right">
                          Grand Total
                        </td>

                        <td className="p-2 text-center">
                          ₹ {order.totalPrice}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyOrders;
