"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { getCart } from "./cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import { sendEmail } from "@/lib/sendEmail";
import { orderInvoiceTemplate } from "@/lib/orderInvoice";

const orderCollection = dbConnect(collections.ORDER);
const cartCollection = dbConnect(collections.CART);
export const createOrder = async (payload) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) {
    return { success: false };
  }
  const cart = await getCart();
  if (cart.length == 0) {
    return { success: false, message: "Cart is empty" };
  }
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const newOrder = {
    createdAt: new Date().toISOString(),
    items: cart,
    ...payload,
    totalPrice,
  };
  const result = await orderCollection.insertOne(newOrder);
  if (Boolean(result.insertedId)) {
    const orderId = result.insertedId.toString();

    // Clear the cart
    await clearCart();

    // Send email
    await sendEmail({
      to: user.email,
      subject: "Your Order Invoice - Hero Kidz",
      html: orderInvoiceTemplate({
        orderId,
        items: cart,
        totalPrice,
      }),
    });

    return { success: true, orderId };
  }

  return {
    success: Boolean(result.insertedId),
  };
};

const clearCart = async () => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) {
    return { success: false };
  }
  const query = { email: user?.email };
  const result = await cartCollection.deleteMany(query);
  return result;
};
