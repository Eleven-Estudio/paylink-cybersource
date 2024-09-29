"use client";

import { TypographyH4 } from "@v1/ui/typography";
import { motion } from "framer-motion";
import CheckIcon from "./check-icon";
import Powered from "./powered";

const SuccessMessage = () => {
  return (
    <motion.div
      key="success-message"
      className="w-full flex flex-col gap-4 items-center justify-center"
      initial={{ display: "none" }}
      animate={{ display: "flex" }}
      exit={{ display: "none" }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <CheckIcon className="w-[115px] h-[115px]" />
      <TypographyH4 className="text-center">
        Thanks for your payment
      </TypographyH4>
      <Powered className="fade-in" />
    </motion.div>
  );
};

export default SuccessMessage;
