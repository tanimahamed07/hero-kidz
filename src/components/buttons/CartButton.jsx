"use client";
import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";

const CartButton = ({ product }) => {

  const session = useSession()
  const isLogin = session?.status == 'authenticated'
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  // console.log(router);
  const path = usePathname();
  const add2Cart =async () => {
    setIsLoading(true)
    if (isLogin){
    const result = await  handleCart({product, inc: true});
    if(result.success){
      Swal.fire('Added to Cart', product?.title, 'success')
    }else{
      Swal.fire('Opps Something Wrong Happen', 'error')
    }
    setIsLoading(false)
    }
    else {
      router.push(`/login?callbackUrl=${path}`);
      setIsLoading(false)
    }
  };
  return (
    <button
    disabled = {session.status == 'loading' || isLoading}
     onClick={add2Cart} className="btn btn-primary btn-sm mt-3 w-full">
      <FaShoppingCart />
      Add to Cart
    </button>
  );
};

export default CartButton;
