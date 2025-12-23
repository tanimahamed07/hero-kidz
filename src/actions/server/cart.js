"use server";

import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";

const { collections, dbConnect } = require("@/lib/dbConnect");

const cartCollection = dbConnect(collections.CART);

export const handleCart = async ({ product, inc = true }) => {
  const { user } = (await getServerSession(authOptions)) || {};
  console.log("------------->", user);

  if (!user) {
    return { success: false };
  }

  const query = { email: user?.email, productId: product?._id };
  const isAdded = await cartCollection.findOne(query);

  if (isAdded) {
    const updatedData = {
      $inc: {
        quantity: inc ? 1 : -1,
      },
    };
    const result = await cartCollection.updateOne(query, updatedData);
    return { success: Boolean(result.modifiedCount) };
  } else {
    const newData = {
      productId: product?._id,
      email: user?.email,
      title: product.title,
      quantity: 1,
      image: product.image,
      price: product.price - (product.price * product.discount) / 100,
      userName: user?.name,
    };
    const result = await cartCollection.insertOne(newData);
    console.log(result);
    return { success: result.acknowledged };
  }
};

export const getCart = async () => {
  const user = (await getServerSession(authOptions)) || {};

  if (!user) {
    return [];
  }

  const query = { email: user?.user?.email };
  const result = await cartCollection.find(query).toArray();

  // Convert MongoDB documents to plain objects
  return result.map((item) => ({
    _id: item._id.toString(), // Convert ObjectId to string
    productId: item.productId,
    email: item.email,
    title: item.title,
    quantity: item.quantity,
    image: item.image,
    price: item.price,
    userName: item.userName,
    // Add any other fields you need
  }));
};
