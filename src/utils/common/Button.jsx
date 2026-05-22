const Button = ({ children }) => {
  return (
    <button className="bg-[#7064e5] w-full justify-center py-2 rounded-xl text-white font-bold text-xl cursor-pointer">
      {children}
    </button>
  );
};

export default Button;
