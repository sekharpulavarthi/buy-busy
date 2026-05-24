import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../utils/common/AuthLayout";
import Input from "../utils/common/Input";
import Button from "../utils/common/Button";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { handleSignUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      notify();
    } else {
      const success = await handleSignUp(email, password);
      if (success) {
        toast.success("Sign Up successful");
        navigate("/");
      } else {
        toast.error("Sign Up failed");
      }
    }
  };

  const notify = () => toast.error("Please enter valid data");
  return (
    <form onSubmit={handleSubmit}>
      <AuthLayout title="Sign Up">
        <div className="mb-4 max-w-sm">
          <Input
            type="text"
            id="text"
            value={name}
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
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
            <Button
              className="bg-[#7064e5] w-full justify-center py-2 rounded-xl text-white font-bold text-xl cursor-pointer"
              onClick={handleSubmit}
              disabled={false}
            >
              Sign Up
            </Button>
          </div>
          <Link to="/signin" className="text-sm font-bold mt-4 block">
            Or SignIn instead
          </Link>
        </div>
      </AuthLayout>
    </form>
  );
};

export default SignUp;
