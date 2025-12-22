import Logo from "@/components/layouts/Logo";
import Link from "next/link";
import React from "react";
import { BiSolidErrorAlt } from "react-icons/bi";

const loading = () => {
  return (
    <div className="flex space-y-3 flex-col min-h-screen justify-center items-center">
        <h2 className="text-5xl font-bold animate-pulse">Loading...</h2>
        <div className="animate-ping">
      <Logo></Logo>

        </div>
    </div>
  );
};

export default loading;
