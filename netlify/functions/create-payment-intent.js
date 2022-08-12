// URL/.netlify/functions/create-payment-intent

// Use dotenv package to be able to access env variables
require("dotenv").config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  //   console.log(event);
  if (event.body) {
    const eventObject = JSON.parse(event.body);
    const { shippingFee, totalAmount } = eventObject;

    function calculateOrderAmount() {
      return shippingFee + totalAmount;
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }

  return {
    statusCode: 200,
    body: "Create payment intent",
  };
};
