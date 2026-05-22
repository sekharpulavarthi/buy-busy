import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../utils/common/AuthLayout";
import Input from "../utils/common/Input";
import Button from "../utils/common/Button";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
            <Button>Sign Up</Button>
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
