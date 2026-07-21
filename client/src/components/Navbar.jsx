import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { FaSignOutAlt } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import styles from "./Navbar.module.css";
function Navbar() {

  const {
    user,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const [loggingOut, setLoggingOut] = useState(false);




  // ==========================
  // Close Mobile Menu
  // ==========================

  useEffect(() => {

    setMenuOpen(false);

  }, [location.pathname]);




  // ==========================
  // User Initial
  // ==========================

  const userInitial =
    user?.name?.charAt(0).toUpperCase() || "U";




  // ==========================
  // Active Navigation
  // ==========================

  const isActive = (path) => {

    return location.pathname.startsWith(path);

  };




  // ==========================
  // Close Menu
  // ==========================

  const closeMenu = () => {

    setMenuOpen(false);

  };




  // ==========================
  // Logout
  // ==========================

  const handleLogout = () => {

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    setLoggingOut(true);

    logout();

    navigate("/login");

    setMenuOpen(false);

    setLoggingOut(false);

  };




  return (

    <nav
      className={styles.navbar}
      aria-label="Main navigation"
    >
          {/* ==========================
          Logo
      ========================== */}

     <Link
  to={user ? "/dashboard" : "/login"}
  className={styles.logo}
  onClick={closeMenu}
>

 

  <span className={styles.logoText}>
    TechoVerse
  </span>

</Link>




      {/* ==========================
          Mobile Menu Button
      ========================== */}

      <button
        className={styles.menuButton}
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        aria-controls="navbar-menu"
      >
        ☰
      </button>




      {/* ==========================
          Navigation Menu
      ========================== */}

      <div
        id="navbar-menu"
        className={`
          ${styles.rightSection}
          ${menuOpen ? styles.showMenu : ""}
        `}
      >

        {user ? (

          <>

            {/* Dashboard */}

            <Link
              to="/dashboard"
              className={`
                ${styles.link}
                ${isActive("/dashboard")
                  ? styles.activeLink
                  : ""
                }
              `}
              onClick={closeMenu}
            >
              Dashboard
            </Link>




            {/* Projects */}

            <Link
              to="/projects"
              className={`
                ${styles.link}
                ${isActive("/projects")
                  ? styles.activeLink
                  : ""
                }
              `}
              onClick={closeMenu}
            >
              Projects
            </Link>

            <Link
  to="/profile"
  className={`
    ${styles.link}
    ${isActive("/profile")
      ? styles.activeLink
      : ""
    }
  `}
  onClick={closeMenu}
>
  Profile
</Link>




            {/* Premium Badge */}

            {user.isPremium && (

              <span
                className={styles.premiumBadge}
                title="Premium Member"
              >
                👑 Premium
              </span>

            )}
                        {/* ==========================
                User Profile
            ========================== */}

           <Link
  to="/profile"
  className={styles.profile}
  onClick={closeMenu}
  title="View Profile"
>
  <div
    className={styles.avatar}
    title={user?.name}
  >
    {userInitial}
  </div>

  <div className={styles.userInfo}>

    <span className={styles.userName}>
      {user?.name || "User"}
    </span>

    {user?.isPremium && (
      <p className={styles.planText}>
        Premium Plan
      </p>
    )}

  </div>
</Link>




            {/* ==========================
                Logout Button
            ========================== */}

            <button
  className={styles.logoutButton}
  onClick={handleLogout}
  disabled={loggingOut}
>
  {loggingOut ? (
    "Logging out..."
  ) : (
    <>
      <FaSignOutAlt className={styles.logoutIcon} />
      <span>Logout</span>
    </>
  )}
</button>

          </>

        ) : (

          <>
                      {/* ==========================
                Guest Navigation
            ========================== */}

            <Link
              to="/login"
              className={styles.link}
              onClick={closeMenu}
            >
              Login
            </Link>

            <Link
              to="/register"
              className={styles.link}
              onClick={closeMenu}
            >
              Register
            </Link>

          </>

        )}

      </div>

    </nav>

  );

}

export default Navbar;