import { Link } from "react-router-dom";
import { FaUserCircle, FaUserShield } from "react-icons/fa";
import { MdEmail, MdVerified } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

import styles from "./Profile.module.css";

function Profile() {
  const { user } = useAuth();

 const createdAt = user?.createdAt
  ? new Date(user.createdAt).toLocaleDateString()
  : "Not Available";

  return (
    <>
      <Navbar />

      <div className={styles.container}>

        <div className={styles.header}>

          <div className={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1>My Profile</h1>
            <p>Manage your TechoVerse account information.</p>
          </div>

        </div>

        <div className={styles.grid}>

          <div className={styles.card}>

            <h2>
              <FaUserCircle />
              Personal Information
            </h2>

            <div className={styles.info}>

              <p>
                <strong>Name</strong>
                <span>{user?.name}</span>
              </p>

              <p>
                <strong>Email</strong>
                <span>{user?.email}</span>
              </p>

              <p>
                <strong>Role</strong>
                <span>User</span>
              </p>

              <p>
                <strong>Created At</strong>
                <span>{createdAt}</span>
              </p>

            </div>

          </div>

          <div className={styles.card}>

            <h2>
              <FaUserShield />
              Account Status
            </h2>

            <div className={styles.info}>

              <p>
                <strong>Subscription</strong>
                <span className={styles.premium}>Premium</span>
              </p>

              <p>
                <strong>Status</strong>
                <span className={styles.success}>
                  <MdVerified />
                  Authenticated
                </span>
              </p>

              <p>
                <strong>Security</strong>
                <span className={styles.success}>
                  <BsShieldCheck />
                  JWT Protected
                </span>
              </p>

            </div>

          </div>

        </div>

        <div className={styles.actions}>

          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>

          <Link to="/projects">
            <button>Projects</button>
          </Link>

        </div>

      </div>
    </>
  );
}

export default Profile;