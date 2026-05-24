import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../utils/common/Input";
import Button from "../utils/common/Button";
import AuthLayout from "../utils/common/AuthLayout";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleSignIn, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      notify();
    } else {
      const success = await handleSignIn(email, password);
      if (success) {
        toast.success("Sign In successful");
        navigate("/");
      } else {
        toast.error("Sign In failed");
      }
    }
  };

  const notify = () => toast.error("Please enter valid data");

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
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#7064e5] w-full justify-center py-2 rounded-xl text-white font-bold text-xl cursor-pointer"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
          <Link to="/signup" className="text-sm font-bold mt-4 block">
            Or SignUp instead
          </Link>
        </div>
      </AuthLayout>
    </form>
  );
};

export default SignIn;
