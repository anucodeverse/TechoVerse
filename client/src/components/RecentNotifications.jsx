import styles from "./RecentNotifications.module.css";

function RecentNotifications() {

  const notifications = [

    {
      id:1,
      message:"New project created successfully",
      time:"5 mins ago"
    },

    {
      id:2,
      message:"Premium plan activated",
      time:"Today"
    },

    {
      id:3,
      message:"AI generated project tasks",
      time:"Today"
    },

    {
      id:4,
      message:"Profile updated",
      time:"Yesterday"
    }

  ];

  return(

<div className={styles.card}>

<h2>🔔 Recent Notifications</h2>

{

notifications.map(item=>(

<div key={item.id} className={styles.notification}>

<div className={styles.icon}>🔵</div>

<div>

<p>{item.message}</p>

<span>{item.time}</span>

</div>

</div>

))

}

</div>

);

}

export default RecentNotifications;