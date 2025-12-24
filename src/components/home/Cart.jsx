"use client";
import React, { useMemo, useState } from "react";
import CartItem from "../card/CartItem";
import Link from "next/link";

const Cart = ({ cartItem = [] }) => {
  const [items, setItems] = useState(cartItem);
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [items]
  );


  const removeItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item._id !== id));
  };
  const updateQuantity =  (id, q) => {
    setItems(prevItems => prevItems.map(item => item._id == id ? {...item, quantity: q} : item))
  };
  return (
  <div className="flex gap-6">
      {/* 🔹 LEFT: CART ITEMS */}
      <div className="w-2/3">
        <h2 className="text-4xl py-4 border-l-8 font-bold border-primary pl-8">
          My Cart
        </h2>

        <p className="mb-4">
          <span className="text-primary font-bold">
            {items.length}
          </span>{" "}
          Items Found in the Cart
        </p>

        {items.map((item) => (
          <CartItem
            key={item._id.toString()}
            item={item}
            removeItem={removeItem}
            updateQuantity={updateQuantity}
          />
        ))}
      </div>

      {/* 🔹 RIGHT: ORDER SUMMARY */}
      <div className="w-1/3 bg-base-100 shadow-md rounded-lg p-4 h-fit sticky top-4">
        <h3 className="text-xl font-bold mb-4 border-b pb-2">
          Order Summary
        </h3>

        {items.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <>
            {/* Items */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-500">
                      Qty: {item.quantity} × ৳{item.price}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ৳{item.quantity * item.price}
                  </p>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            {/* Totals */}
            <div className="flex justify-between font-semibold">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between text-lg font-bold mt-2">
              <span>Total Price</span>
              <span>৳{totalPrice}</span>
            </div>

            {/* Confirm Button */}
            <Link href="/checkout">
            <button                     
              className="btn btn-primary w-full mt-4"
              disabled={items.length === 0}
            >
              Confirm Order
            </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
