"use client"
import { BiSolidErrorAlt } from "react-icons/bi";
import Link from "next/link";
import React from "react";

const error = () => {
  return (
    <div className="flex space-y-3 flex-col min-h-screen justify-center items-center">
      <BiSolidErrorAlt size={100} className="text-primary" />
      <h2 className="text-3xl">Page Not Found</h2>
      <Link href={"/"} className="btn btn-primary btn-outline">
        Go to Home
      </Link>
    </div>
  );
};

export default error;
