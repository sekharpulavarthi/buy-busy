import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../utils/common/Input";
import Button from "../utils/common/Button";
import AuthLayout from "../utils/common/AuthLayout";
import { toast, ToastContainer } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    notify();
  };

  const notify = () => toast("Please enter valid data!");

  return (
    <form onSubmit={handleSubmit}>
      <AuthLayout title="Sign In">
        <div className="mb-4 max-w-sm">
          <Input
            type="email"
            id="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            id="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-2">
            <Button>Sign In</Button>
          </div>
          <Link to="/signup" className="text-sm font-bold mt-4 block">
            Or SignUp instead
          </Link>
        </div>
      </AuthLayout>
      <ToastContainer />
    </form>
  );
};

export default SignIn;
