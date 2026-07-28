import styles from "./ActivityTimeline.module.css";

function ActivityTimeline({ projects }) {

  const activities = projects
    .slice(0, 5)
    .map((project) => ({
      id: project._id,
      title:
        project.status === "Completed"
          ? "Project Completed"
          : project.status === "Pending"
          ? "Project Pending"
          : "Project Updated",

      description: project.title,

      time: new Date(project.updatedAt).toLocaleString(),

      color:
        project.status === "Completed"
          ? "#16a34a"
          : project.status === "Pending"
          ? "#f59e0b"
          : "#2563eb",
    }));


  return (
    <div className={styles.card}>
      <h2>📅 Activity Timeline</h2>

      {activities.length === 0 ? (
        <p>No recent activities.</p>
      ) : (
        activities.map((item) => (
          <div key={item.id} className={styles.item}>
            <div
              className={styles.dot}
              style={{ background: item.color }}
            />

            <div className={styles.content}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <span>{item.time}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ActivityTimeline;