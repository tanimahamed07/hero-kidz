"use client";

import { createOrder } from "@/actions/server/order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import Swal from "sweetalert2";

const CheckOut = ({ cartItem = [] }) => {
  const router = useRouter();
  const session = useSession();
  const [loading, setLoading] = useState(false);

  const totalPrice = useMemo(
    () => cartItem.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [cartItem]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      instruction: form.instruction.value,
    };

    const result = await createOrder(payload);
    console.log(result)
    if (result) {
      Swal.fire("success", "Order placed successfully", "success");
      router.push("/");
    } else {
      Swal.fire("Error", result.message || "Failed to place order", "error");
      router.push("/cart");
    }
  };

  if (session.status === "loading") {
    return <p>Loading ....</p>;
  }

  return (
    <div className="flex gap-8 mx-auto">
      {/* 🔹 LEFT: CHECKOUT FORM */}
      <form
        onSubmit={handleSubmit}
        className="w-2/3 bg-base-100 shadow-md rounded-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        {/* Customer Info */}
        <div>
          <h3 className="font-semibold mb-2">Customer Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              readOnly
              value={session?.data?.user?.name}
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
            <input
              required
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
            <input
              required
              value={session?.data?.user?.email}
              readOnly
              name="email"
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full col-span-2"
            />
          </div>
        </div>

        {/* Shipping Address */}
        {/* Shipping Address */}
        <div>
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              name="address"
              placeholder="Address Address"
              className="input input-bordered w-full col-span-2"
            />
          </div>
        </div>

        {/* Order Instruction */}
        <div>
          <h3 className="font-semibold mb-2">Order Instruction</h3>
          <textarea
            name="instruction"
            placeholder="Any special instruction? (e.g. call before delivery)"
            className="textarea textarea-bordered w-full"
            rows={3}
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading || cartItem.length === 0}
        >
          {loading
            ? "Checkout with cash on delivery..."
            : "Checkout with cash on delivery"}
        </button>
      </form>

      {/* 🔹 RIGHT: ORDER SUMMARY */}
      <div className="w-1/3 bg-base-100 shadow-md rounded-lg p-6 h-fit sticky top-6">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>

        {cartItem.length === 0 ? (
          <p className="text-gray-500">No items in cart</p>
        ) : (
          <>
            <div className="space-y-3 text-sm">
              {cartItem.map((item) => (
                <div key={item._id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-500">
                      {item.quantity} × ৳{item.price}
                    </p>
                  </div>
                  <p className="font-semibold">৳{item.quantity * item.price}</p>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>৳{totalPrice}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckOut;
