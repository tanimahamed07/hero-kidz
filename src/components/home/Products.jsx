import React from "react";
// import products from "@/data/toys.json";
import ProductCard from "../card/ProductsCard";
import { getProducts } from "@/actions/server/product";
const Products = async () => {
  const products = (await getProducts()) || [];
  // console.log('home',products)
  return (
    <div>
      <h2 className="text-center text-4xl font-bold mb-10">Our Products</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.title} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Products;
