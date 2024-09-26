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
    <section className="checkout-container h-auto checkout:h-screen w-screen overflow-hidden flex items-start justify-center bg-white checkout:bg-neutral-50">
      <Suspense fallback={<PaymentLoading />}>
        <Payment link={params.link} />
      </Suspense>
    </section>
  );
};

export default page;
