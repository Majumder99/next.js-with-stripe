const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1MZYwoSEaBuYOG544qrkCTD5",
            quantity: 1,
          },
        ],
        // "Invalid payment_method_types[0]: must be one of card, acss_debit, affirm, afterpay_clearpay, alipay, au_becs_debit, bacs_debit, bancontact, blik, boleto, customer_balance, eps, fpx, giropay, grabpay, ideal, klarna, konbini, oxxo, p24, paynow, pix, promptpay, sepa_debit, sofort, us_bank_account, or wechat_pay"
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      console.log({ err });
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    console.log({ err: "error happens" });
  }
}
