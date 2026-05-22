const AuthLayout = ({ children, title }) => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="bg-white rounded shadow">
        <h1 className="text-4xl font-bold mb-10">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
