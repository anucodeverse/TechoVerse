import { useEffect, useState } from "react";
import styles from "./RecentNotifications.module.css";


function RecentNotifications() {


  const [notifications, setNotifications] = useState([]);



  const getNotificationKey = () => {


    const user =
      JSON.parse(
        localStorage.getItem("user")
      );


    if (!user?._id) {

      return null;

    }


    return `notifications_${user._id}`;

  };




  const loadNotifications = () => {


    const key = getNotificationKey();



    if (!key) {

      setNotifications([]);

      return;

    }



    const savedNotifications =
      JSON.parse(
        localStorage.getItem(key)
      ) || [];



    setNotifications(

      [...savedNotifications]
        .slice(0, 5)

    );

  };





  useEffect(() => {


    // Initial load
    loadNotifications();



    // Same tab update
    const handleNotificationUpdate = () => {

      loadNotifications();

    };



    // Multiple tabs update
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
              notifications.map((item)=>(


                <div
                  key={item.id}
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