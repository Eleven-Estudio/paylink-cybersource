"use client";

import { generatePaymentAction } from "@/actions/checkout/generate-payment-action";
import type { checkoutSchema } from "@/actions/checkout/schema";
import { CODE_STATUS_LOCAL_PAYMENT } from "@/lib/errors";
import { Skeleton } from "@v1/ui/skeleton";
import { TypographyH4 } from "@v1/ui/typography";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";
import type { z } from "zod";
import FormPayment, { FormPaymentSkeleton } from "./form-payment";
import Powered from "./powered";

export const CheckoutFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Skeleton className="w-[170px] h-7" />
      <FormPaymentSkeleton />
      <Powered />
    </div>
  );
};

const CheckoutForm = ({ defaultCountry }: { defaultCountry: string }) => {
  const params = useParams();

  const [statusPayment, setStatusPayment] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  async function onSubmit(values: z.infer<typeof checkoutSchema>) {
    const result = await generatePaymentAction({
      ...values,
      link: (params?.link ?? "") as string,
    });

    if (result?.data?.code === CODE_STATUS_LOCAL_PAYMENT.PAYMENT_SUCCESS) {
      setStatusPayment({
        type: "success",
        message: "Payment successful",
      });
    }

    if (result?.data?.code === CODE_STATUS_LOCAL_PAYMENT.PAYMENT_ERROR) {
      setStatusPayment({
        type: "error",
        message: "Payment error",
      });
    }

    setTimeout(() => {
      setStatusPayment({
        type: null,
        message: "",
      });
    }, 2000);
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          key={"checkout-form"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4 w-full"
        >
          <TypographyH4 className="hidden checkout:block">
            Payment with card
          </TypographyH4>
          <FormPayment
            onSubmit={onSubmit}
            defaultValues={{ country: defaultCountry }}
          />
          <Powered />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default CheckoutForm;
