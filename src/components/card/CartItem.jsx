"use client";

import {
  decreaseItemDb,
  deleteItemsFromCart,
  increaseItemDb,
} from "@/actions/server/cart";
import Image from "next/image";
import { useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const CartItem = ({ item, removeItem, updateQuantity }) => {
  const { image, title, quantity, price, _id } = item;
  console.log(price);
  const [loading, setLoading] = useState(false);
  const handleDeleteCart = async () => {
    setLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteItemsFromCart(_id);
        if (result.success) {
          removeItem(_id);
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Oops! Something went wrong",
            icon: "error",
          });
        }
        setLoading(false);
      }
    });
  };
  const onIncrease = async () => {
    setLoading(true);
    const result = await increaseItemDb(_id, quantity);
    if (result.success) {
      updateQuantity(_id, quantity + 1);
      setLoading(false);
    }
  };
  const onDecrease = async () => {
    setLoading(true);
    if (quantity <= 1) return;
    const result = await decreaseItemDb(_id, quantity - 1);
    if (result.success) {
      updateQuantity(_id, quantity - 1);
      setLoading(false);
    }
  };

  return (
    <div className="card card-side bg-base-100 shadow-md p-4 mb-4">
      {/* Image */}
      <figure className="w-24 h-24 relative">
        <Image src={image} alt={title} fill className="object-cover rounded" />
      </figure>

      {/* Content */}
      <div className="card-body p-4 w-full">
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4">
          {/* Info */}
          <div>
            <h2 className="font-semibold text-lg">{title}</h2>
            <p className="text-sm text-gray-500">
              Price: <span className="font-medium">৳{price}</span>
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              disabled={quantity === 1 || loading}
              className="btn btn-sm btn-outline"
              onClick={() => onDecrease(item)}
            >
              <FaMinus />
            </button>

            <span className="font-semibold w-6 text-center">{quantity}</span>

            <button
              disabled={quantity === 10 || loading}
              className="btn btn-sm btn-outline"
              onClick={() => onIncrease(item)}
            >
              <FaPlus />
            </button>
          </div>

          {/* Remove */}
          <button
            className="btn btn-sm btn-error btn-outline"
            onClick={() => handleDeleteCart(item)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
