import React from 'react'
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      
        <h1 className="text-center mb-4 text-white">Welcome Back</h1>
        <form>
          <div className="form-group mb-4">
            <label htmlFor="email" className="mb-2 text-white">
              Email
            </label>
            <input
              type="text"
              className="form-control rounded-3 border-0 shadow-sm"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="mb-2 text-white">
              Password
            </label>
            <input
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
            Login
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
