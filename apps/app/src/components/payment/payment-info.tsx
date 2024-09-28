"use client";

import { BUSINESS } from "@/business";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import CompanyInfo from "./company-info";
import ServiceInfo from "./service-info";

interface Props {
  title: string;
  amount: number;
  description: string;
  currency: "USD" | "GTQ";
}

const PaymentInfo = ({ title, amount, description, currency }: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <CompanyInfo name={BUSINESS.name} logo={BUSINESS.logo} />
        <ServiceInfo
          title={title}
          amount={amount}
          description={description}
          currency={currency}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentInfo;
