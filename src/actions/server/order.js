"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { getCart } from "./cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";

const orderCollection = dbConnect(collections.ORDER);
const cartCollection = dbConnect(collections.CART)
export const createOrder = async (payload) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) {
    return { success: false };
  }
  const cart = await getCart();
  if (cart.length == 0) {
    return { success: false, message: "Cart is empty" };
  }
  const newOrder = {
    createdAt: new Date().toISOString(),
    items: cart,
    ...payload,
  };
  const result = await orderCollection.insertOne(newOrder);
  if(Boolean(result.insertedId)){
   const result = await clearCart();
   return result
  }
};

const clearCart = async () => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) {
    return { success: false };
  }
  const query = { email: user?.email };
  const result = await cartCollection.deleteMany(query);
  return result
};
