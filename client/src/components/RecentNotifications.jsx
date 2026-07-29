import { useEffect, useState } from "react";
import styles from "./RecentNotifications.module.css";


function RecentNotifications() {


  const [notifications, setNotifications] = useState([]);



  const loadNotifications = () => {


  const user =
    JSON.parse(
      localStorage.getItem("user")
    );



  if (!user?._id) {

    setNotifications([]);

    return;

  }



  const key =
    `notifications_${user._id}`;



  const savedNotifications =
    JSON.parse(
      localStorage.getItem(key)
    ) || [];



  setNotifications(
    savedNotifications.slice(0, 5)
  );


};





  useEffect(() => {


    // Load initially
    loadNotifications();



    // Same tab update
    const handleNotificationUpdate = () => {

      loadNotifications();

    };



    // Other tab update
    const handleStorageChange = () => {

      loadNotifications();

    };



    window.addEventListener(
      "notificationsUpdated",
      handleNotificationUpdate
    );



    window.addEventListener(
      "storage",
      handleStorageChange
    );





    return () => {


      window.removeEventListener(
        "notificationsUpdated",
        handleNotificationUpdate
      );



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
              notifications.map((item, index) => (


                <div

                  key={index}

                  className={styles.notification}

                >



                  <div className={styles.icon}>

                    🔵

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