import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const SimpleCard = ({payment}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setError] = useState(null);
  const [paymentSuccess, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setSuccess(null)
    } else {
      setSuccess(paymentMethod.id);
      setError(null);
      payment(paymentMethod.id);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button className="btn btn-info mt-5" type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
      <br/>
      <div>
        {paymentError && <p className="text-danger">{paymentError}</p>}
        {paymentSuccess && <p className="text-success">Payment Successful</p>}
      </div>
    </div>
  );
};

export default SimpleCard;
