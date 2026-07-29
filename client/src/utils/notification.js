export const addNotification = (notification) => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );


  if (!user?._id) return;


  const key =
    `notifications_${user._id}`;


  const oldNotifications =
    JSON.parse(
      localStorage.getItem(key)
    ) || [];



  const updatedNotifications = [

    {
      id: Date.now(),
      ...notification
    },

    ...oldNotifications

  ].slice(0,5);



  localStorage.setItem(
    key,
    JSON.stringify(updatedNotifications)
  );

};