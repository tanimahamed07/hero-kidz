"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const CartButton = ({ product }) => {

  const isLogin = false;
  const router = useRouter();
  console.log(router);
  const path = usePathname();
  const add2Cart = () => {
    if (isLogin) alert(product._id);
    else {
      router.push(`/login?callbackUrl=${path}`);
    }
  };
  return (
    <button onClick={add2Cart} className="btn btn-primary btn-sm mt-3 w-full">
      <FaShoppingCart />
      Add to Cart
    </button>
  );
};

export default CartButton;
