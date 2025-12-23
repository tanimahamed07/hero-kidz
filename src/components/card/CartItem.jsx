"use client";

import Image from "next/image";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const { image, title, quantity, price } = item;

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
              className="btn btn-sm btn-outline"
              onClick={() => onDecrease(item)}
            >
              <FaMinus />
            </button>

            <span className="font-semibold w-6 text-center">{quantity}</span>

            <button
              className="btn btn-sm btn-outline"
              onClick={() => onIncrease(item)}
            >
              <FaPlus />
            </button>
          </div>

          {/* Remove */}
          <button
            className="btn btn-sm btn-error btn-outline"
            onClick={() => onRemove(item)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
