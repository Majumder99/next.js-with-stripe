import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import Image from "next/image";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function PreviewPage() {
  const router = useRouter();
  const { success, canceled } = router.query;
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    // const query = new URLSearchParams(window.location.search);
    if (success !== undefined || canceled !== undefined) {
      if (success) {
        console.log("Order placed! You will receive an email confirmation.");
      }

      if (canceled) {
        console.log(
          "Order canceled -- continue to shop around and checkout when you’re ready."
        );
      }
    }
  }, [success, canceled]);

  return (
    <form action="/api/checkout_sessions" method="POST">
      <section>
        <div>
          <Image
            src="https://lactantia.ca/wp-content/uploads/2023/01/lactosefree.jpg"
            alt="none"
            width={150}
            height={150}
          />
        </div>
        <h2>Milk cartoon</h2>
        <button
          type="submit"
          role="link"
          style={{ fontSize: "20px", padding: "5px" }}
        >
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 400px;
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>
  );
}
