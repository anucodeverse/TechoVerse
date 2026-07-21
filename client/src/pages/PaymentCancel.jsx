import { Link } from "react-router-dom";
import styles from "./Payment.module.css";


function PaymentCancel(){

return (

<div className={styles.container}>


<div className={styles.card}>


<h1>
❌ Payment Cancelled
</h1>


<p>
Your payment was cancelled.
You can try again anytime.
</p>



<Link
to="/dashboard"
className={styles.button}
>

Back To Dashboard

</Link>



</div>


</div>

);


}


export default PaymentCancel;