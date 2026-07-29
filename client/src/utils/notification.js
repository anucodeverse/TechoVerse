export const addNotification = (notification) => {


  const user =
    JSON.parse(
      localStorage.getItem("user")
    );


  if (!user?._id) return;



  const key =
"notifications";



  const existing =
    JSON.parse(
      localStorage.getItem(key)
    ) || [];



  const updated = [

    {
      id: Date.now(),
      ...notification
    },

    ...existing

  ].slice(0,5);



  localStorage.setItem(
    key,
    JSON.stringify(updated)
  );



  // Refresh dashboard notification card
  window.dispatchEvent(
    new Event("notificationsUpdated")
  );


};