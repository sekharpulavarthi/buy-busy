const Input = ({ type, id, value, placeholder, onChange }) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full px-3 py-3 border border-[rgb(112,100,229)] rounded-xl shadow-sm my-2"
    />
  );
};

export default Input;
