const Stripe = require('stripe');
const express = require('express');
const payment = express();
const port = 5555;
payment.use(express.json());
const stripe = Stripe('sk_test_51J8KWwSBF1iS8Oifzf8IUuUXtJsvTPMyr2eDsBtyKMiC27pVsYTYWUbKcuVMRWnnZyFzFc4XQIKUkSJ7wz7bcUKm00FBtTZmnk');
payment.use(express.json());

payment.post('/payment', async (req, res) => {
    try {
        console.log(req.body); 
        const am = req.body.amount*100;
        const email = req.body.email;
        await stripe.charges.create({
            amount: am,
            currency: "inr",
            source: "tok_mastercard",
            metadata: { 'order_id': '6565' }
        }, function (err, result) {
            console.log(result.amount/100);
            //console.log(err);
            res.send(`payment succesfull for ${email} of ${result.amount/100}rs transaction id is ${result.balance_transaction} you can check receipt at ${result.receipt_url}`);
        })
       
    } catch (err) {
        console.log(err);
    }
})

payment.listen(port, () => {
    console.log("connected to server");
})