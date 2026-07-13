import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <Link
        to={user ? "/dashboard" : "/login"}
        style={styles.logo}
      >
        🚀 TechoVerse
      </Link>

      {/* Right Section */}
      <div style={styles.rightSection}>
        {user ? (
          <>
          
             

            <span style={styles.userName}>
                   👋 Hi, {user?.name}
            </span>

            <button
              style={styles.logoutButton}
              onClick={handleLogout}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#b91c1c")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#dc2626")
              }
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                ...styles.link,
                ...(location.pathname === "/login"
                  ? styles.activeLink
                  : {}),
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                ...styles.link,
                ...(location.pathname === "/register"
                  ? styles.activeLink
                  : {}),
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
  position: "sticky",
  top: 0,
  zIndex: 1000,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 50px",
  background: "linear-gradient(90deg,#2563eb,#1d4ed8)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
},

  logo: {
  textDecoration: "none",
  color: "#fff",
  fontSize: "32px",
  fontWeight: "700",
  letterSpacing: "0.5px",
},


 rightSection: {
  display: "flex",
  alignItems: "center",
  gap: "20px",
},

userName: {
  color: "#e5e7eb",
  fontSize: "17px",
  fontWeight: "500",
},

  logoutButton: {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "10px 22px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "15px",
  transition: "0.3s ease",
},
};

export default Navbar;