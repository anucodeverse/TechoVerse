import styles from "./ActivityTimeline.module.css";

function ActivityTimeline() {
  const activities = [
    {
      id: 1,
      title: "Project Created",
      description: "AI Expense Tracker",
      time: "2 mins ago",
      color: "#2563eb",
    },
    {
      id: 2,
      title: "AI Tasks Generated",
      description: "Generated 5 new tasks",
      time: "15 mins ago",
      color: "#16a34a",
    },
    {
      id: 3,
      title: "Project Updated",
      description: "Library Tool",
      time: "1 hour ago",
      color: "#f59e0b",
    },
    {
      id: 4,
      title: "Premium Activated",
      description: "Premium Subscription",
      time: "Today",
      color: "#9333ea",
    },
  ];

  return (
    <div className={styles.card}>
      <h2>📅 Activity Timeline</h2>

      {activities.map((item) => (
        <div key={item.id} className={styles.item}>
          <div
            className={styles.dot}
            style={{ background: item.color }}
          ></div>

          <div className={styles.content}>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <span>{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActivityTimeline;