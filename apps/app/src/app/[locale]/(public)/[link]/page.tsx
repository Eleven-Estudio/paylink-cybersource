import { BUSINESS } from "@/business";
import Payment from "@/components/payment/payment";
import { Suspense } from "react";
import "./styles.css";
import PaymentLoading from "@/components/payment/payment-loading";
export const metadata = {
  title: {
    absolute: BUSINESS.name,
  },
};

const page = async ({ params }: { params: { link: string } }) => {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <Payment link={params.link} />
    </Suspense>
  );
};

export default page;
