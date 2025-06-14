import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Register from "./components/Register";
import Login from "./components/Login";

export default function Welcome() {
  const [active, setActive] = useState<"register" | "login">("register");

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)",
        paddingTop: "40px",
      }}
    >
      <div
        className="shadow-lg rounded-4 overflow-hidden d-flex"
        style={{ width: "800px", height: "600px" }}
      >
        <motion.div
          animate={{ flex: active === "register" ? 8 : 2 }}
          transition={{ duration: 0.6 }}
          className="d-flex flex-column p-4"
          style={{
            backgroundColor: "#ffffff",
            cursor: "pointer",
            overflow: "hidden",
          }}
          onClick={() => setActive("register")}
        >
          <h2 className="mb-3">Register</h2>
          <AnimatePresence>
            {active === "register" && (
              <motion.div
                key="registerForm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-grow-1 overflow-auto"
              >
                <Register />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          animate={{ flex: active === "login" ? 6 : 4 }}
          transition={{ duration: 0.6 }}
          className="d-flex flex-column p-4 text-white"
          style={{
            background: "linear-gradient(to right, #4e54c8, #8f94fb)",
            cursor: "pointer",
            overflow: "hidden",
          }}
          onClick={() => setActive("login")}
        >
          <h2 className="mb-3">Login</h2>
          <AnimatePresence>
            {active === "login" && (
              <motion.div
                key="loginForm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-grow-1 overflow-auto"
              >
                <Login />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
