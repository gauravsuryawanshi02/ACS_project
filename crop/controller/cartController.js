const Cart = require("../model/cartSchema");


// const getCart = (req, res) => {
//     const id =req.params.id;
//     //console.log(id);
//     Cart.find({customerid:id},{"name":1,"_id":0,"price":1,"quantity":1}).sort({ "createdAt": -1 }).
//         then(result => {
//             res.send(result);
//         }).catch(err => {
//             console.log(err);
//             res.send(err)
//         })
// }

const postCart = async (req, res) => {
    try {
        const user = new Cart(req.body);
        //saving data to database
        await user.save();
        res.status(201).send(user)
        console.log("working post");
    } catch (err) {
        console.log(err);
    }
}

const cartName = async (req, res) => {
    try {
        const name = req.params.name;
        const query = { "name": name }

        Cart.find(query)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.status(400).send("page not found");
            });
    } catch (err) {
        console.log(err);
    }
}

const deleteCart = (req, res) => {
    Cart.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send("not done");
        })
};
const billCart = async (req, res) => {
    try {
        const cartResponse = await Cart.find({ customerid: req.params.id },{"name":1,"_id":0,"price":1,"quantity":1,"createdAt": 1}).sort({ "createdAt": -1 });
        if (cartResponse) {
            var total = 0;
            for (var i =0; i<cartResponse.length; i++){
                total += cartResponse[i].price * cartResponse[i].quantity ;
            }
            //console.log(cartResponse)
            res.json(
                {'cart contain':cartResponse,
                 "Total Amount": total});
        }
        else{
            res.send('cart is empty');
        }
    }
    catch (err) {
        res.send(err);
    }
} 

module.exports = {
    //getCart,
    postCart,
    deleteCart,
    cartName,
    billCart
}