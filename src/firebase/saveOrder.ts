import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./config";
import type{ CartItem, AppliedOffer } from "../types";

interface OrderData {
  items: CartItem[];
  subtotal: number;
  appliedOffers: AppliedOffer[];
  totalSavings: number;
  total: number;
}

export const saveOrderToFirestore = async (order: OrderData) => {
  try {
    await addDoc(collection(db, "orders"), {
      ...order,
      createdAt: Timestamp.now(),
    });
    console.log("Order saved to Firestore ✅");
  } catch (error) {
    console.error("Error saving order:", error);
  }
};