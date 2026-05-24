import { TbLogin } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between py-6 px-16 items-center shadow">
      <h1 className="text-2xl font-bold text-[#7064e5]">Busy Buy</h1>
      <div className="flex gap-4">
        <Link to="/" className="flex items-center gap-1">
          <FaHome />
          <span className="text-[#7064e5] text-lg font-bold">Home</span>
        </Link>
        <Link to="/signin" className="flex items-center gap-1">
          <TbLogin />
          <span className="text-[#7064e5] text-lg font-bold">SignIn</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
