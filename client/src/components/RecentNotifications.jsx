import { useEffect, useState } from "react";
import styles from "./RecentNotifications.module.css";


function RecentNotifications() {


  const [notifications, setNotifications] = useState([]);



  const loadNotifications = () => {

    const saved =
      JSON.parse(localStorage.getItem("notifications")) || [];


    setNotifications(
      [...saved]
        .reverse()
        .slice(0, 5)
    );

  };



  useEffect(() => {


    // Load initial notifications
    loadNotifications();



    // Listen for localStorage changes
    const handleStorageChange = () => {

      loadNotifications();

    };


    window.addEventListener(
      "storage",
      handleStorageChange
    );



    return () => {

      window.removeEventListener(
        "storage",
        handleStorageChange
      );

    };


  }, []);




  return (

    <div className={styles.card}>


      <div className={styles.header}>

        <h2>
          🔔 Recent Notifications
        </h2>

      </div>



      {
        notifications.length === 0 ?


        (

          <div className={styles.empty}>

            <div className={styles.emptyIcon}>
              🔔
            </div>

            <p>
              No notifications yet.
            </p>

          </div>

        )


        :


        (

          <div className={styles.list}>


            {
              notifications.map((item,index)=>(


                <div
                  key={item.id || index}
                  className={styles.notification}
                >


                  <div className={styles.icon}>

                    {
                      item.type === "success"
                      ?
                      "✅"

                      :

                      item.type === "warning"
                      ?
                      "⚠️"

                      :

                      item.type === "error"
                      ?
                      "❌"

                      :

                      "🔵"
                    }

                  </div>



                  <div className={styles.content}>


                    <p>
                      {item.message}
                    </p>



                    <span>
                      {item.time}
                    </span>


                  </div>


                </div>


              ))
            }


          </div>

        )

      }


    </div>

  );

}


export default RecentNotifications;