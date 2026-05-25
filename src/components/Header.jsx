import { TbLogin } from "react-icons/tb";
import { FaHome, FaCartArrowDown, FaShoppingBasket } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut, getAuth } from "firebase/auth";

const Header = () => {
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex justify-between py-6 px-16 items-center shadow">
      <Link to="/" className="flex items-center gap-1">
        <h1 className="text-2xl font-bold text-[#7064e5]">Busy Buy</h1>
      </Link>
      <div className="flex gap-10 flex-wrap">
        <Link to="/" className="flex items-center gap-1">
          <FaHome className="text-2xl" />
          <span className="text-[#7064e5] text-lg font-bold">Home</span>
        </Link>
        {user && (
          <Link to="/myorders" className="flex items-center gap-1">
            <FaShoppingBasket className="text-2xl" />
            <span className="text-[#7064e5] text-lg font-bold">My orders</span>
          </Link>
        )}
        {user && (
          <Link to="/cart" className="flex items-center gap-1">
            <FaCartArrowDown className="text-2xl" />
            <span className="text-[#7064e5] text-lg font-bold">Cart</span>
          </Link>
        )}
        {!user ? (
          <Link to="/signin" className="flex items-center gap-1">
            <TbLogin className="text-2xl" />
            <span className="text-[#7064e5] text-lg font-bold">SignIn</span>
          </Link>
        ) : (
          <Link
            to="/signin"
            className="flex items-center gap-1"
            onClick={handleLogout}
          >
            <IoLogOut className="text-2xl" />
            <span className="text-[#7064e5] text-lg font-bold">Logout</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
