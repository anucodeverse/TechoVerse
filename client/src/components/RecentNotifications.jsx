import { useEffect, useState } from "react";
import styles from "./RecentNotifications.module.css";

function RecentNotifications() {

  const [notifications, setNotifications] = useState([]);

  const loadNotifications = () => {

    const saved =
      JSON.parse(localStorage.getItem("notifications")) || [];

    setNotifications(saved);

  };

  useEffect(() => {

    // Load immediately
    loadNotifications();

    // Refresh every second
    const interval = setInterval(() => {
      loadNotifications();
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className={styles.card}>

      <h2>🔔 Recent Notifications</h2>

      {

        notifications.length === 0 ?

        (

          <p>No notifications yet.</p>

        )

        :

        (

          notifications.map((item, index) => (

            <div
              key={index}
              className={styles.notification}
            >

              <div className={styles.icon}>
                🔵
              </div>

              <div>

                <p>{item.message}</p>

                <span>{item.time}</span>

              </div>

            </div>

          ))

        )

      }

    </div>

  );

}

export default RecentNotifications;