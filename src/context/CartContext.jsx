import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebaseInit";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { deleteDoc } from "firebase/firestore";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const addToCart = async (product) => {
    try {
      if (!user) {
        toast.error("Please sign in to add items to cart");
        return false;
      } else {
        // Add product to cart logic here
        const cartRef = doc(db, "userCarts", user.uid, "myCart", product.id);
        const cartDoc = await getDoc(cartRef);

        if (cartDoc.exists()) {
          // If product already in cart, update quantity
          const existingData = cartDoc.data();
          await updateDoc(cartRef, { quantity: existingData.quantity + 1 });
          toast.success("Product Added Successfully!");
        } else {
          // If product not in cart, add new entry
          await setDoc(cartRef, { ...product, quantity: 1 });
          toast.success("Increase product count!");
        }
        fetchCartItems();
        return true;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (product) => {
    try {
      const cartRef = doc(db, "userCarts", user.uid, "myCart", product.id);
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists()) {
        await deleteDoc(cartRef);
        toast.success("Product Removed Successfully!");
      }

      fetchCartItems();
      return true;
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const decreaseProductFromCart = async (product) => {
    try {
      const cartRef = doc(db, "userCarts", user.uid, "myCart", product.id);
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists()) {
        const existingData = cartDoc.data();
        if (existingData.quantity > 1) {
          await updateDoc(cartRef, { quantity: existingData.quantity - 1 });
        } else {
          await deleteDoc(cartRef);
        }
      }

      fetchCartItems();
      return true;
    } catch (error) {
      console.error("Error decreasing product from cart:", error);
    }
  };

  const fetchCartItems = async () => {
    if (!user) return;
    try {
      setCartLoading(true);
      const cartCollectionRef = collection(db, "userCarts", user.uid, "myCart");
      const cartSnapshot = await getDocs(cartCollectionRef);
      const items = cartSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        fetchCartItems,
        removeFromCart,
        decreaseProductFromCart,
        setCartItems,
        cartLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
