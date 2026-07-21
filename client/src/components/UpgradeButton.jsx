import { createCheckoutSession } from "../services/paymentService";
import toast from "react-hot-toast";
import styles from "./UpgradeButton.module.css";

function UpgradeButton(){

  const handlePayment = async()=>{

    try{


      const data =
      await createCheckoutSession();



      if(data.success){

        // Redirect to Stripe Checkout

        window.location.href =
        data.url;

      }



    }
    catch(error){


      console.log(
        "Payment Error:",
        error
      );


      toast.error(
        error.response?.data?.message ||
        "Payment failed"
      );


    }


  };



  return(

    <button
  className={styles.upgradeBtn}
  onClick={handlePayment}
>
  🚀 Upgrade to Premium
</button>

  );


}


export default UpgradeButton;