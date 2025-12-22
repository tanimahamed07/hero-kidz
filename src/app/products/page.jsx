import ProductCard from "@/components/card/ProductsCard";
import Products from "@/components/home/Products";
import React from "react";

export const metadata = {
  title: "Hero Kidx",
  template: "%s | Hero Kidz",
};

const ProductPage = () => {
  return (
    <div>
      <Products></Products>
    </div>
  );
};

export default ProductPage;
