import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import { AuthContext } from "../context/AuthContext";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseInit";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, setCartItems, cartLoading } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handlePurchase = async () => {
    try {
      setLoading(true);
      const ordersCollectionRef = collection(
        db,
        "userOrders",
        user.uid,
        "orders",
      );

      await addDoc(ordersCollectionRef, {
        items: cartItems,
        totalPrice: cartItems.reduce(
          (acc, curr) => acc + curr.price * curr.quantity,
          0,
        ),
        createdAt: new Date(),
      });

      for (const item of cartItems) {
        const cartRef = doc(db, "userCarts", user.uid, "myCart", item.id);
        await deleteDoc(cartRef);
      }
      setLoading(false);

      setCartItems([]);
      navigate("/myorders");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      {cartLoading ? (
        <div className="flex justify-center items-center h-full">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      ) : (
        <div className="flex mt-10">
          {!cartItems.length ? (
            <h1 className="text-4xl font-bold text-center m-auto">
              Cart is Empty!
            </h1>
          ) : (
            <>
              <div className="h-[calc(100vh-80px)] flex flex-col gap-6 p-6 mt-10 sticky shrink-0">
                <h1>
                  Total Price:- ₹
                  {cartItems.reduce(
                    (acc, curr) => acc + curr.price * curr.quantity,
                    0,
                  )}
                  /-
                </h1>
                <button
                  onClick={() => handlePurchase()}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                  {loading ? "Purchasing" : "Purchase"}
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-wrap gap-6">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} product={item} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
