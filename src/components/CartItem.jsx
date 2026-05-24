import Button from "../utils/common/Button";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const CartItem = ({ product }) => {
  const { name, description, price, image, id, quantity } = product;
  const [loading, setLoading] = useState(false);

  const { removeFromCart, decreaseProductFromCart, addToCart } = useContext(
    CartContext,
  );

  const removeProductFromCart = async (product) => {
    setLoading(true);
    await removeFromCart(product);
    setLoading(false);
  };

  return (
    <div
      key={id}
      className="w-64  rounded-xl shadow-2xl bg-gray-150 p-4  hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
    >
      <img src={image} alt={name} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <div className="group relative inline-block w-48">
        <p className="text-gray-700 mb-2 truncate cursor-help">{description}</p>
        <div className="absolute bottom-full left-1/2 z-10 hidden -translate-x-1/2 mb-2 w-max max-w-xs p-2 bg-gray-800 text-white text-sm rounded shadow-lg group-hover:block">
          {description}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">₹ {price}</p>
        <div className="flex items-center gap-3">
          <button onClick={() => decreaseProductFromCart(product)}>
            <FaMinusCircle className="cursor-pointer text-xl" />
          </button>
          <p className="text-xl font-semibold">{quantity}</p>
          <button onClick={() => addToCart(product)}>
            <FaPlusCircle className="cursor-pointer text-xl" />
          </button>
        </div>
      </div>
      <div className="mt-4 mb-4">
        <Button
          onClick={() => removeProductFromCart(product)}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 w-full justify-center py-2 rounded-xl text-white font-bold text-xl cursor-pointer"
        >
          {loading ? "Removing" : "Remove from Cart"}
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
