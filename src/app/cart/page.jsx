import { getCart } from "@/actions/server/cart";
import Cart from "@/components/home/Cart";

import React from "react";

const CartPage = async () => {
  const cartItems = await getCart();
  const formattedItems = cartItems.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));
  return (
    <div>
      <Cart cartItem={formattedItems}></Cart>
    </div>
  );
};

export default CartPage;
