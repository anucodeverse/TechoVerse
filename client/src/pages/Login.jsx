import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import styles from "./Login.module.css";


function Login() {


  const navigate = useNavigate();

  const { login } = useAuth();



  const [formData,setFormData] = useState({

    email:"",
    password:""

  });



  const [error,setError] = useState("");

  const [loading,setLoading] = useState(false);

  const [showPassword,setShowPassword] = useState(false);





  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };







  const handleSubmit = async(e)=>{


    e.preventDefault();

    setError("");



    try{


      setLoading(true);



      const data =
      await loginUser(formData);




      localStorage.setItem(
        "loginTime",
        new Date().toLocaleString()
      );



      login(
        data.user,
        data.token
      );



      navigate("/dashboard");



    }


    catch(err){


      setError(

        err.response?.data?.message ||

        "Invalid email or password"

      );


    }


    finally{


      setLoading(false);


    }


  };






return(


<div className={styles.container}>


  {/* =========================
      Brand Section
  ========================== */}


  <div className={styles.brandSection}>


    



    <h1>

      TechoVerse

    </h1>



    <h2>

      Manage Projects Smarter

    </h2>



    <p>

      AI-powered project management platform
      designed for modern developers.

    </p>





    <div className={styles.features}>


      <div>

        <FaShieldAlt/>

        <span>
          Secure Authentication
        </span>

      </div>



      <div>

        <FaChartLine/>

        <span>
          Smart Analytics
        </span>

      </div>




      <div>

        <FaUsers/>

        <span>
          Team Collaboration
        </span>

      </div>



    </div>


  </div>







  {/* =========================
      Login Card
  ========================== */}



  <div className={styles.card}>


    <h1>

      Welcome Back 👋

    </h1>



    <p className={styles.subtitle}>

      Sign in to continue your workspace

    </p>





    {
      error &&

      <div className={styles.error}>

        ⚠ {error}

      </div>

    }





    <form onSubmit={handleSubmit}>


      <label>

        Email Address

      </label>



      <input

        type="email"

        name="email"

        placeholder="Enter your email"

        value={formData.email}

        onChange={handleChange}

        autoComplete="email"

        className={styles.input}

        required

      />






      <label>

        Password

      </label>



      <div className={styles.passwordContainer}>


        <input


          type={
            showPassword
            ?
            "text"
            :
            "password"
          }


          name="password"


          placeholder="Enter your password"


          value={formData.password}


          onChange={handleChange}


          autoComplete="current-password"


          className={styles.passwordInput}


          required


        />





        <button

          type="button"

          className={styles.eye}

          aria-label="Show password"

          onClick={()=>setShowPassword(!showPassword)}

        >


          {

          showPassword

          ?

          <FaEyeSlash/>

          :

          <FaEye/>

          }


        </button>



      </div>







      <button

        type="submit"

        disabled={loading}

        className={styles.button}

      >


        {

        loading

        ?

        "Signing In..."

        :

        "Sign In"

        }


      </button>




    </form>








    <p className={styles.registerText}>


      Don't have an account?


      <Link to="/register">

        Create Account

      </Link>


    </p>





  </div>



</div>


);


}


export default Login;