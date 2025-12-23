import { getCart } from "@/actions/server/cart";
import CartItem from "@/components/card/CartItem";

import React from "react";

const CartPage = async () => {
  const cartItems = await getCart();
  console.log('===========>', cartItems);
  return (
    <div>
      <div>
        <h2 className="text-4xl py-4 border-l-8 font-bold border-primary pl-8">
          My Cart
        </h2>
        <p>
          <span className="text-primary font-bold">{cartItems.length}</span>
          Items Found in the Cart
        </p>
      </div>
      <div>
        <div className="flex-3">
          {cartItems.map((item) => (
            <CartItem key={item._id.toString()} item={item}></CartItem>
          ))}
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default CartPage;
