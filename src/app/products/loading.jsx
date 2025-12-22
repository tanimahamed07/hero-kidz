import ProductCardSkeleton from '@/components/skeleton/ProductSkeleton';
import React from 'react';

const loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {[...Array(9)].map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default loading;
