import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="flex justify-between items-center  item-center">
      <div className="flex-1 space-y-5">
        <h2 className="text-6xl font-bold leading-20">
          You have give you child <span className="text-primary">good future</span>
        </h2>
        <p>Buy Every toy with up to 15% Discount</p>
        <button className="btn btn-primary ">Explore Products</button>
      </div>
      <div>
        <Image
          width={500}
          height={400}
          alt="Buy Every toy with up to 15% Discoun"
          src={"/hero.png"}
        ></Image>
      </div>
    </div>
  );
};

export default Banner;
