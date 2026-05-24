import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import { AuthContext } from "../context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseInit";

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  const { user } = useContext(AuthContext);

  const handlePurchase = async () => {
    try {
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
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="flex mt-10">
      <div className="h-[calc(100vh-80px)] flex flex-col gap-6 p-6 mt-10 sticky shrink-0">
        <h1>
          Total Price:- ₹
          {cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}
          /-
        </h1>
        <button
          onClick={() => handlePurchase()}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Purchase
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-wrap gap-6">
          {cartItems.map((item) => (
            <CartItem key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
