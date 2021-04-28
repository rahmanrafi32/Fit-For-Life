import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import SimpleCard from "./SimpleCard/SimpleCard";
const stripePromise = loadStripe(
  "pk_test_51IfmMKJL7pJ44CieIxi9ZKvp25JamhAay4deqQsHceZd0I7HTmDYLEzZa7I9nzXKK7fXxuHCBYZ1yAduvSG9Ws6K00lL0a4C2k"
);
const Payment = ({payment}) => {
  return (
    <Elements stripe={stripePromise}>
        <div>
            <h3>Pay for the course</h3>
        </div>
        <SimpleCard payment ={payment}/>
    </Elements>
  );
};

export default Payment;
