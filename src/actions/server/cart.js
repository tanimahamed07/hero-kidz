"use server";

import { authOptions } from "@/lib/authOption";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

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

export const getCart = cache(async () => {
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
});

export const deleteItemsFromCart = async (id) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) {
    return { success: false };
  }
  if (id.length != 24) {
    return { success: false };
  }
  const query = { _id: new ObjectId(id) };
  const result = await cartCollection.deleteOne(query);
  if (Boolean(result.deletedCount)) {
    revalidatePath("/cart");
  }
  return { success: Boolean(result.deletedCount) };
};

export const increaseItemDb = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) {
    return { success: false };
  }
  if (quantity > 10) {
    return { success: false, message: "Quantity cannot exceed 10" };
  }
  const query = { _id: new ObjectId(id) };
  const updatedData = { $inc: { quantity: 1 } };
  const result = await cartCollection.updateOne(query, updatedData);
  return { success: Boolean(result.modifiedCount) };
};
export const decreaseItemDb = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) {
    return { success: false };
  }
  if (quantity <= 1) {
    return { success: false, message: "quantity cannot be less than 1" };
  }
  const query = { _id: new ObjectId(id) };
  const updatedData = { $inc: { quantity: -1 } };
  const result = await cartCollection.updateOne(query, updatedData);
  return { success: Boolean(result.modifiedCount) };
};
