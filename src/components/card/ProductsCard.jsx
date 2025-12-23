import Image from "next/image";
import Link from "next/link";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import CartButton from "../buttons/CartButton";

const ProductCard = ({ product }) => {
  // console.log(product)
  const { title, image, price, discount, ratings, reviews, sold, _id } =
    product || {};

  const discountedPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
      {/* Image */}
      <figure className="relative h-48">
        <Image src={image} alt={title} fill className="object-cover" />
        {discount > 0 && (
          <span className="badge badge-error absolute top-2 left-2">
            -{discount}%
          </span>
        )}
      </figure>

      {/* Body */}
      <div className="card-body p-4">
        {/* Title */}
        <h2 className="card-title text-base line-clamp-2">{title}</h2>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 text-sm">
          <FaStar className="text-yellow-400" />
          <span>{ratings}</span>
          <span className="text-gray-400">({reviews} reviews)</span>
        </div>

        {/* Sold */}
        <p className="text-sm text-gray-500">Sold: {sold}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-primary">
            ৳{discountedPrice}
          </span>
          {discount > 0 && (
            <span className="text-sm line-through text-gray-400">৳{price}</span>
          )}
        </div>

        {/* Button */}
        <Link
          href={`/products/${_id}`}
          className="btn btn-outline btn-sm mt-3 w-full"
        >
          View Details
        </Link>
       <CartButton product={product}></CartButton>
      </div>
    </div>
  );
};

export default ProductCard;
