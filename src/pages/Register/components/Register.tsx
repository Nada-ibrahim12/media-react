import React from 'react'

export default function Register() {
  return (
    <div>
        <h1 className="text-center mb-4" style={{ color: "#2c3e50" }}>
          Create Account
        </h1>
        <form>
          <div className="name d-flex justify-content-between mb-4">
            <div className="form-group w-50 me-2">
              <label htmlFor="firstName" className="mb-2 text-muted">
                First Name
              </label>
              <input
                type="text"
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
              className="form-control rounded-3 border-0 shadow-sm"
              style={{ backgroundColor: "#f8f9fa" }}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="btn w-100 rounded-3 fw-bold"
            style={{
              backgroundColor: "#4e54c8",
              color: "white",
              padding: "12px 0",
              border: "none",
              boxShadow: "0 4px 6px rgba(78, 84, 200, 0.2)",
            }}
          >
            Register
          </button>
        </form>
      </div>
  );
}
