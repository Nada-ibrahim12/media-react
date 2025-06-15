import { Link } from "react-router-dom";

export default function Navbar({
  userData,
  logout,
}: {
  userData: any;
  logout: () => void;
}) {
  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-3 shadow-sm fixed-top"
      style={{
        height: "70px",
        zIndex: 1000,
        background: "linear-gradient(to right, #4e54c8, #8f94fb)",
      }}
    >
      <div className="container-fluid">
        <Link
          to={userData ? "/home" : "/"}
          className="navbar-brand fw-bold"
          style={{ color: "white", fontSize: "1.5rem" }}
        >
          Media
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style={{ borderColor: "rgba(255,255,255,0.5)" }}
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: "invert(1)" }}
          ></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex gap-3 align-items-center">
            {userData ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/home"
                    className="nav-link text-white fw-medium px-3 py-2 rounded-3"
                    style={{
                      transition: "all 0.3s ease",
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/upload"
                    className="nav-link text-white fw-medium px-3 py-2 rounded-3"
                    style={{ transition: "all 0.3s ease" }}
                  >
                    Upload
                  </Link>
                </li>
                <li className="nav-item">
                  <p
                    className="btn rounded-3 fw-bold px-4 py-2 mt-2"
                    onClick={logout}
                    style={{
                      backgroundColor: "white",
                      color: "#4e54c8",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    Logout
                  </p>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <p
                  className="btn rounded-3 fw-bold px-4 py-2 mt-2"
                  style={{
                    backgroundColor: "white",
                    color: "#4e54c8",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Register
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
