import { getCart } from "@/actions/server/cart";
import CheckOut from "@/components/home/CheckOut";
import React from "react";

const CheckOutPage = async () => {
  const cartItems = await getCart();
    const formattedItems = cartItems.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  return (
    <div>
      <div>
        <h2 className="text-4xl py-4 border-l-8 font-bold border-primary pl-8">
          Check Out Page
        </h2>

        <p className="mb-4">
          <span className="text-primary font-bold">{formattedItems.length}</span> Items
          Found in the Cart
        </p>
      </div>
      <CheckOut cartItem={formattedItems}></CheckOut>
    </div>
  );
};

export default CheckOutPage;
