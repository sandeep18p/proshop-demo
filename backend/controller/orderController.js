import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc Create new order
//@route POST /api/order
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  }   = req.body;
   if(orderItems && orderItems.length === 0){
    //iska matlab orderitem hai aur iska value 0 hai tab ye run hoga
 res.status(400);
 throw new Error('No order items');
   }else{
     const order = new Order({
        orderItems: orderItems.map((x)=>({
         ...x,
         product: x._id,
         _id: undefined
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
     });
     const createdOrder =await order.save();

     res.status(201).json(createdOrder);
   }
});

//@desc Get logged in uder orders
//@route Get /api/order/myroders
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.status(200).json(orders);
});

//@desc Get order by ID
//@route GET /api/order/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user','name email');

  if(order){
    res.status(200).json(order);
  }else{
    res.status(404);
    throw new Error('Order not found');
  }

});

// isPaid is false by default in orderModel but we will change that as we need it
//@desc Update order to paid
//@route PUT /api/order/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(order){
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult={
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }
      const updatedOrder = await order.save();
      req.status(200).json(updatedOrder);
    }else{
     res.status(404);
     throw new Error('Order not found');
    }
});

//@desc Update order to deliver as an admin
//@route PUT /api/order/:id/deliver
//@access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id);
   if(order){
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
   }else{
    res.status(404);
    throw new Error('Order not found');
   }
});

//@desc Get all orders as an admin
//@route GET /api/orders
//@access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    console.log(' no no no')
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders);
});

export {
    getMyOrders,
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
};
