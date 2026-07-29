import styles from "./ActivityTimeline.module.css";
import { FaHistory } from "react-icons/fa";


function ActivityTimeline({ projects = [] }) {


  const getTimeAgo = (date) => {

    const seconds =
      Math.floor(
        (new Date() - new Date(date)) / 1000
      );


    if (seconds < 60) {
      return "Just now";
    }


    const minutes =
      Math.floor(seconds / 60);


    if (minutes < 60) {
      return `${minutes} min ago`;
    }


    const hours =
      Math.floor(minutes / 60);


    if (hours < 24) {
      return `${hours} hours ago`;
    }


    const days =
      Math.floor(hours / 24);


    if (days === 1) {
      return "Yesterday";
    }


    return `${days} days ago`;

  };



  const activities = [...projects]
    .sort(
      (a, b) =>
        new Date(b.updatedAt) -
        new Date(a.updatedAt)
    )
    .slice(0, 5)
    .map((project) => {


      let type = "updated";
      let title = "Project Updated";


      if (project.status === "Completed") {

        type = "completed";
        title = "Project Completed";

      }


      else if (project.status === "Pending") {

        type = "pending";
        title = "Project Pending";

      }



      return {

        id: project._id,

        type,

        title,

        description:
          project.title,

        time:
          getTimeAgo(project.updatedAt)

      };


    });



  return (

    <div className={styles.card}>


      <h2>

        <FaHistory />

        <span>
          Activity Timeline
        </span>

      </h2>



      {
        activities.length === 0

        ?

        (

          <p className={styles.empty}>
            No recent activities.
          </p>

        )


        :

        (

          <div className={styles.timeline}>


            {
              activities.map((item) => (

                <div
                  key={item.id}
                  className={styles.item}
                >


                  <div
                    className={`${styles.dot} ${styles[item.type]}`}
                  />



                  <div className={styles.content}>


                    <h4>
                      {item.title}
                    </h4>



                    <p>
                      {item.description}
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


export default ActivityTimeline;