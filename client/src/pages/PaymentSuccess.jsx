import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import styles from "./Payment.module.css";

import {
  verifyPayment,
} from "../services/paymentService";

import {
  getProfile,
} from "../services/authService";

import {
  useAuth,
} from "../context/AuthContext";



function PaymentSuccess() {


  const [searchParams] =
    useSearchParams();


  const {
    updateUser,
  } = useAuth();



  const sessionId =
    searchParams.get("session_id");



  const [status, setStatus] =
    useState(
      "Verifying payment..."
    );


  const [success, setSuccess] =
    useState(false);


  const [loading, setLoading] =
    useState(true);


  const [verified, setVerified] =
    useState(false);





  useEffect(() => {


    if (!sessionId) {

      setStatus(
        "Invalid payment session"
      );

      setLoading(false);

      return;

    }



    if (verified) return;



    const verify = async () => {


      try {


        setVerified(true);



        // Verify Stripe Payment

        const paymentResponse =
          await verifyPayment(
            sessionId
          );



        console.log(
          "Payment Verification:",
          paymentResponse
        );



        if (
          paymentResponse.success
        ) {



          // Get updated user data

          const profile =
            await getProfile();



          console.log(
            "Profile:",
            profile
          );



          updateUser(
            profile.user
          );



          setSuccess(true);


          setStatus(
            "Premium activated successfully!"
          );



        }

        else {


          setStatus(
            "Payment verification failed"
          );


        }




      }

      catch(error) {


        console.error(
          "Payment verification error:",
          error
        );



        setStatus(

          error.response?.data?.message ||

          "Payment verification failed"

        );


      }


      finally {


        setLoading(false);


      }


    };



    verify();



  }, [
    sessionId,
    verified,
    updateUser
  ]);







  return (


    <div
      className={styles.container}
    >


      <div
        className={styles.card}
      >



        {

          loading

          ?

          (

            <h1>
              ⏳ Processing Payment
            </h1>

          )


          :

          success

          ?

          (

            <h1>
              🎉 Payment Successful
            </h1>

          )


          :

          (

            <h1>
              ❌ Payment Failed
            </h1>

          )


        }




        <p>
          {status}
        </p>





        {

          success &&

          (

            <Link

              to="/dashboard"

              className={styles.button}

            >

              Go To Dashboard

            </Link>

          )

        }



      </div>


    </div>


  );

}


export default PaymentSuccess;