import {
    Elements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "../CheckoutForm/CheckoutForm";




const stripePromise = loadStripe("pk_test_51IiPf4BoxW5lL76mBxZ9iS1xkh8Lj1Z7M8wrKv2gEgkriPpJfXINBvP708Wl3U5g3iINgZJzIYFJ90eFryC53UAE00IxPALmyN");

const ProcessPayment = ({ handlePayment }) => {
    return (

        <Elements stripe={stripePromise} >
            <CheckoutForm handlePayment={handlePayment} />
        </Elements>

    );
};

export default ProcessPayment;
