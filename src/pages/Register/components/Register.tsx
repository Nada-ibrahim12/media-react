import axios from "axios";
import Joi from "joi";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const validationError = validation();
    if (validationError) {
      const errorMessage =
        typeof validationError === "string"
          ? validationError
          : validationError.map((err: any) => err.message).join(", ");
      setError(errorMessage);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formData
      );
      console.log("Registration successful:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setLoading(false);
      navigate("/home");
    } catch (error: any) {
      console.error("Registration failed:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
      setLoading(false);
    }
  };

  const validation = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      return "Please fill in all fields";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    const schema = Joi.object({
      firstName: Joi.string().required().messages({
        "string.empty": "First name is required",
      }),
      lastName: Joi.string().required().messages({
        "string.empty": "Last name is required",
      }),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .messages({
          "string.email": "Please enter a valid email",
          "string.empty": "Email is required",
        }),
      password: Joi.string()
        .min(8)
        .max(30)
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$"
          )
        )
        .required()
        .messages({
          "string.base": "Password must be a string",
          "string.empty": "Password cannot be empty",
          "string.min": "Password must be at least {#limit} characters long",
          "string.max":
            "Password must be less than or equal to {#limit} characters",
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          "any.required": "Password is required",
        }),
      confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .messages({
          "any.only": "Passwords do not match",
          "string.empty": "Confirm Password is required",
        }),
    });
    
    const { error } = schema.validate(formData, { abortEarly: false });
    return error ? error.details : null;
  };

  React.useEffect(() => {
    if (error) {
      console.error("Validation errors:", error);
    }
  }, [error]);

  return (
    <div>
      <h1 className="text-center mb-4" style={{ color: "#2c3e50" }}>
        Create Account
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="name d-flex justify-content-between mb-4">
          <div className="form-group w-50 me-2">
            <label htmlFor="firstName" className="mb-2 text-muted">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              onChange={getData}
              value={formData.firstName}
              disabled={loading}
              className="form-control rounded-3 border-0 shadow-sm"
              style={{ backgroundColor: "#f8f9fa" }}
              placeholder="Enter your first name"
            />
          </div>
          <div className="form-group w-50 ms-2">
            <label htmlFor="lastName" className="mb-2 text-muted">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              onChange={getData}
              value={formData.lastName}
              disabled={loading}
              className="form-control rounded-3 border-0 shadow-sm"
              style={{ backgroundColor: "#f8f9fa" }}
              placeholder="Enter your last name"
            />
          </div>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="email" className="mb-2 text-muted">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={getData}
            value={formData.email}
            disabled={loading}
            className="form-control rounded-3 border-0 shadow-sm"
            style={{ backgroundColor: "#f8f9fa" }}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="password" className="mb-2 text-muted">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={getData}
            value={formData.password}
            disabled={loading}
            className="form-control rounded-3 border-0 shadow-sm"
            style={{ backgroundColor: "#f8f9fa" }}
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="confirmPassword" className="mb-2 text-muted">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            onChange={getData}
            value={formData.confirmPassword}
            disabled={loading}
            className="form-control rounded-3 border-0 shadow-sm"
            style={{ backgroundColor: "#f8f9fa" }}
            placeholder="Confirm your password"
          />
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn w-100 rounded-3 fw-bold"
          style={{
            backgroundColor: "#4e54c8",
            color: "white",
            padding: "12px 0",
            border: "none",
            boxShadow: "0 4px 6px rgba(78, 84, 200, 0.2)",
          }}
        >
          {loading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
        </button>
      </form>
    </div>
  );
}
