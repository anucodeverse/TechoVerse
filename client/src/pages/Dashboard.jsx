import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { user } = useAuth();

  const loginTime = new Date().toLocaleString();

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.heading}>
             Welcome back, {user?.name}! 👋</h1>
          <p style={styles.subHeading}>
            Manage your account securely with TechoVerse.
          </p>
        </div>

        <div style={styles.cardContainer}>
          {/* Account Information */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>👤 Account Information</h2>

            <div style={styles.row}>
              <span style={styles.label}>Name</span>
              <span>{user?.name}</span>
            </div>

            <div style={styles.row}>
              <span style={styles.label}>Email</span>
              <span>{user?.email}</span>
            </div>

            <div style={styles.row}>
              <span style={styles.label}>User ID</span>
              <span>{user?.id?.slice(0,8)}...{user?.id?.slice(-4)}</span>
            </div>

            <div style={styles.row}>
              <span style={styles.label}>Login Time</span>
              <span>{loginTime}</span>
            </div>

            <div style={styles.row}>
              <span style={styles.label}>Status</span>

              <span style={styles.status}>
                🟢 Authenticated
              </span>
           
            </div>
          </div>

          {/* Quick Overview */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>📊 Quick Overview</h2>

            <div style={styles.stats}>
              <div style={styles.statCard}>
                <h3>0</h3>
                <p>Projects</p>
              </div>

              <div style={styles.statCard}>
                <h3>0</h3>
                <p>Tasks</p>
              </div>

              <div style={styles.statCard}>
                <h3>0</h3>
                <p>Completed</p>
              </div>
            </div>

            <p style={styles.note}>
              Your workspace is ready.
              <br />
              Start creating projects in the next sprint.
            </p>
          </div>
        </div>
      </div>
      <footer style={styles.footer}>
  © {new Date().getFullYear()} TechoVerse. All rights reserved.
</footer>
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right,#eef2ff,#f8fafc)",
    padding: "40px",
  },

  header: {
    textAlign: "center",
    marginBottom: "35px",
  },

  heading: {
    fontSize: "38px",
    color: "#1e3a8a",
    marginBottom: "10px",
  },

  subHeading: {
    color: "#6b7280",
    fontSize: "18px",
  },

  cardContainer: {
    display: "flex",
    gap: "30px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  card: {
    width: "480px",
    background: "#fff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },

  cardTitle: {
    color: "#2563eb",
    marginBottom: "25px",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "10px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 0",
    borderBottom: "1px solid #f1f5f9",
    fontSize: "16px",
  },

  label: {
    fontWeight: "600",
    color: "#374151",
  },

  status: {
    color: "#16a34a",
    background: "#dcfce7",
    padding: "5px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
  },

  stats: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },

  statCard: {
    width: "120px",
    textAlign: "center",
    background: "#eff6ff",
    padding: "20px",
    borderRadius: "10px",
  },

  note: {
    marginTop: "30px",
    color: "#6b7280",
    textAlign: "center",
    lineHeight: "1.7",
  },
  footer: {
  marginTop: "40px",
  textAlign: "center",
  color: "#6b7280",
  fontSize: "14px",
},
};

export default Dashboard;