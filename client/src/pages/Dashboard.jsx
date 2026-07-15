import styles from "./Dashboard.module.css";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { user } = useAuth();

  const loginTime =
    localStorage.getItem("loginTime") || "Not Available";

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heading}>
            Welcome back, {user?.name}! 👋
          </h1>

          <p className={styles.subHeading}>
            Manage your account securely with TechoVerse.
          </p>
        </div>

        <div className={styles.cardContainer}>
          {/* Account Information */}

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              👤 Account Information
            </h2>

            <div className={styles.row}>
              <span className={styles.label}>Name</span>
              <span>{user?.name}</span>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>Email</span>
              <span>{user?.email}</span>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>User ID</span>

              <span>
                {user?.id?.slice(0, 8)}...
                {user?.id?.slice(-4)}
              </span>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>
                Login Time
              </span>

              <span>{loginTime}</span>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>
                Status
              </span>

              <span className={styles.status}>
                🟢 Authenticated
              </span>
            </div>
          </div>

          {/* Quick Overview */}

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              📊 Quick Overview
            </h2>

            <div className={styles.stats}>
              <div className={styles.statCard}>
                <h3>0</h3>
                <p>Projects</p>
              </div>

              <div className={styles.statCard}>
                <h3>0</h3>
                <p>Tasks</p>
              </div>

              <div className={styles.statCard}>
                <h3>0</h3>
                <p>Completed</p>
              </div>
            </div>

            <p className={styles.note}>
              Your workspace is ready.
              <br />
              Start creating projects in the next sprint.
            </p>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} TechoVerse.
        All rights reserved.
      </footer>
    </>
  );
}

export default Dashboard;