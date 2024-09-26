import { BUSINESS } from "@/business";
import Payment from "@/components/payment/payment";
import React from "react";
import "./styles.css";
export const metadata = {
  title: {
    absolute: BUSINESS.name,
  },
};

const page = () => {
  return (
    <section className="checkout-container h-auto checkout:h-screen w-screen overflow-hidden flex items-start justify-center bg-white checkout:bg-neutral-50">
      <Payment />
    </section>
  );
};

export default page;
