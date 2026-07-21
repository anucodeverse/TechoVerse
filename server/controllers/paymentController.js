const Stripe = require("stripe");
const User = require("../models/User");

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing");
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


// ======================================
// Create Checkout Session
// ======================================

exports.createCheckoutSession = async (req, res) => {
  try {

    // Get logged-in user id
    const userId = req.user._id.toString();


    // Check user exists
    const user = await User.findById(userId);


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    // Prevent duplicate premium purchase
    if (user.isPremium) {
      return res.status(400).json({
        success: false,
        message: "You already have a Premium plan.",
      });
    }



    // Create Stripe Checkout Session
    const session =
      await stripe.checkout.sessions.create({

        payment_method_types: [
          "card"
        ],


        line_items: [

          {
            price_data: {

              currency: "usd",


              product_data: {

                name:
                  "TechoVerse Premium Plan",

                description:
                  "Unlimited projects, analytics and collaboration features",

              },


              unit_amount: 999,

            },


            quantity: 1,

          },

        ],


        mode: "payment",



        // Store user id in Stripe
        metadata: {

          userId: userId.toString(),

        },



        success_url:
          `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,



        cancel_url:
          `${process.env.CLIENT_URL}/payment-cancel`,


      });



    return res.status(200).json({

      success:true,

      url:session.url,

    });



  } catch(error) {


    console.error(
      "Stripe Checkout Error:",
      error
    );


    return res.status(500).json({

      success:false,

      message:
        "Checkout session creation failed",

    });


  }

};





// ======================================
// Verify Payment
// ======================================

exports.verifyPayment = async (req,res)=>{

  try {


    const {
      sessionId
    } = req.body;



    if(!sessionId){

      return res.status(400).json({

        success:false,

        message:
          "Session ID required",

      });

    }



    // Retrieve Stripe Session

    const session =
      await stripe.checkout.sessions.retrieve(
        sessionId
      );



    // Check payment status

    if(
      session.payment_status !== "paid"
    ){

      return res.status(400).json({

        success:false,

        message:
          "Payment not completed",

      });

    }



    // Compare users

    const paidUserId =
      session.metadata.userId.toString();



    const loggedUserId =
      req.user._id.toString();



    console.log(
      "Stripe User ID:",
      paidUserId
    );


    console.log(
      "Logged User ID:",
      loggedUserId
    );



    if(
      paidUserId !== loggedUserId
    ){

      return res.status(403).json({

        success:false,

        message:
          "Payment does not belong to this user",

      });

    }



    // Find user

    const user =
      await User.findById(
        req.user._id
      );



    if(!user){

      return res.status(404).json({

        success:false,

        message:
          "User not found",

      });

    }




    // Already premium

    if(user.isPremium){

      return res.status(200).json({

        success:true,

        message:
          "Already Premium",


        user:{

          id:user._id,

          name:user.name,

          email:user.email,

          isPremium:user.isPremium,

          plan:user.plan,

          paymentDate:user.paymentDate,

        },


      });

    }





    // Activate Premium

    user.isPremium = true;

    user.plan = "Premium";

    user.paymentDate = new Date();

    user.stripeSessionId =
      session.id;



    await user.save();





    return res.status(200).json({

      success:true,

      message:
        "Premium activated successfully",


      user:{

        id:user._id,

        name:user.name,

        email:user.email,

        isPremium:user.isPremium,

        plan:user.plan,

        paymentDate:user.paymentDate,

      },


    });



  }

  catch(error){


    console.error(
      "Verify Payment Error:",
      error
    );


    return res.status(500).json({

      success:false,

      message:
        "Payment verification failed",

    });


  }

};