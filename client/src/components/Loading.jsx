import styles from "./Loading.module.css";


function Loading({text="Loading..."}) {


  return (

    <div className={styles.container}>


      <div className={styles.spinner}></div>


      <p>
        {text}
      </p>


    </div>

  );

}


export default Loading;