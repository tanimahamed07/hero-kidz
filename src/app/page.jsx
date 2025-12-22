import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
import { Bentham } from "next/font/google";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-20">
      <section>
        <Banner></Banner>
      </section>
      <section className="">
        <Products />
      </section>
    </div>
  );
}
