import { getSingleProduct } from "@/actions/server/product";
import Image from "next/image";
import React from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  const product = await getSingleProduct(id);
  const {
    title,
    bangla,
    image,
    price,
    discount,
    description,
    ratings,
    reviews,
    sold,
    info,
  } = product;
  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="card bg-base-100">
          <figure>
            <Image
              width={600}
              height={429}
              src={image}
              alt={title}
              className="w-full object-contain p-6"
            />
          </figure>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-500">{bangla}</p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <FaStar className="text-warning" />
            <span className="font-semibold">{ratings}</span>
            <span className="text-sm text-gray-500">({reviews} reviews)</span>
            <span className="text-sm text-green-600">• {sold} sold</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-primary">
              ৳{Number(discountedPrice)}
            </span>
            {discount > 0 && (
              <span className="line-through text-gray-400">৳{price}</span>
            )}
            {discount > 0 && (
              <span className="badge badge-error badge-outline">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 whitespace-pre-line">{description}</p>

          {/* Features */}
          {info?.length > 0 && (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {info.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}

          {/* Add to Cart */}
          <button className="btn btn-primary w-full mt-4">
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
