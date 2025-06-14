import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const getData = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const validationError = validation();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }
    axios
      .post("http://localhost:3000/auth/login", formData)
      .then((response) => {
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError("Login failed. Please check your credentials.");
        setLoading(false);
      });
  };
  console.log(error);
  const validation = () => {
    if (!formData.email || !formData.password) {
      return "Please fill in all fields";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Please enter a valid email address";
    }
    return null;
  };

  return (
    <div>
      <h1 className="text-center mb-4 text-white">Welcome Back</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="email" className="mb-2 text-white">
            Email
          </label>
          <input
            name="email"
            onChange={getData}
            type="email"
            className="form-control rounded-3 border-0 shadow-sm"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="password" className="mb-2 text-white">
            Password
          </label>
          <input
            name="password"
            onChange={getData}
            type="password"
            className="form-control rounded-3 border-0 shadow-sm"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="btn w-100 rounded-3 fw-bold"
          style={{
            backgroundColor: "white",
            color: "#4e54c8",
            padding: "12px 0",
            border: "none",
            boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)",
          }}
        >
          {loading  ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
        </button>
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-white opacity-75">
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
}
