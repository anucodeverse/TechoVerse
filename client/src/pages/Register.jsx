import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

import styles from "./Register.module.css";


function Register(){

const navigate = useNavigate();


const [formData,setFormData]=useState({

name:"",
email:"",
password:""

});


const [error,setError]=useState("");

const [success,setSuccess]=useState("");

const [loading,setLoading]=useState(false);



const handleChange=(e)=>{

setFormData({

...formData,

[e.target.name]:e.target.value

});

};



const handleSubmit=async(e)=>{

e.preventDefault();

setError("");
setSuccess("");


if(formData.password.length < 6){

setError(
"Password must contain minimum 6 characters"
);

return;

}


try{


setLoading(true);


const data =
await registerUser(formData);



setSuccess(
data.message ||
"Account created successfully"
);



setTimeout(()=>{

navigate("/login");

},1500);



}

catch(err){

setError(

err.response?.data?.message ||

"Registration failed"

);


}

finally{

setLoading(false);

}


};



return(

<div className={styles.container}>


{/* Branding Section */}

<div className={styles.brandSection}>


<h1>

 TechoVerse

</h1>


<h2>

Build Your Workspace

</h2>


<p>

Join thousands of developers managing projects smarter with AI-powered tools.

</p>



<div className={styles.features}>


<p>✓ Secure Authentication</p>

<p>✓ Project Analytics</p>

<p>✓ Premium Collaboration</p>


</div>


</div>




{/* Register Card */}


<div className={styles.card}>


<h1>

Create Account 

</h1>


<p className={styles.subtitle}>

Start your TechoVerse journey today

</p>




{
error &&

<p className={styles.error}>

{error}

</p>

}



{
success &&

<p className={styles.success}>

{success}

</p>

}





<form onSubmit={handleSubmit}>


<label>
Full Name
</label>


<input

type="text"

name="name"

placeholder="Enter your name"

value={formData.name}

onChange={handleChange}

className={styles.input}

required

/>





<label>
Email Address
</label>


<input

type="email"

name="email"

placeholder="Enter your email"

value={formData.email}

onChange={handleChange}

className={styles.input}

required

/>





<label>
Password
</label>


<input

type="password"

name="password"

placeholder="Create password"

value={formData.password}

onChange={handleChange}

className={styles.input}

required

/>





<button

disabled={loading}

className={styles.button}

>


{
loading

?

"Creating Account..."

:

"Create Account"

}


</button>


</form>





<p className={styles.loginText}>


Already have an account?


<Link to="/login">

Login

</Link>


</p>


</div>



</div>


);


}


export default Register;