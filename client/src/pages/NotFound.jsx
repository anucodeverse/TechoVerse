import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";


function NotFound(){

  return (

    <div className={styles.container}>


      <h1>
        404
      </h1>


      <h2>
        Page Not Found
      </h2>


      <p>
        Sorry, the page you are looking for
        does not exist.
      </p>



      <div className={styles.buttons}>


        <Link to="/dashboard">
          Go Dashboard
        </Link>



        <Link to="/login">
          Go Login
        </Link>


      </div>


    </div>

  );

}


export default NotFound;