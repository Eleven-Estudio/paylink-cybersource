import { CheckoutFormSkeleton } from "@/components/payment/checkout-form";
import { CompanyInfoSkeleton } from "@/components/payment/company-info";
import { ServiceInfoSkeleton } from "@/components/payment/service-info";

const Loading = () => {
  return (
    <div className="max-w-[920px] w-full mx-auto z-10 checkout:pt-[65px] px-4">
      <div className="flex flex-col checkout:flex-row justify-between w-full">
        <div className="flex flex-col checkout:max-w-[380px] w-full fade-in-right-bottom">
          <CompanyInfoSkeleton />
          <ServiceInfoSkeleton />
        </div>

        {/* Checkout Form Skeleton */}
        <div className="px-4 py-4 mt-12 checkout:mt-0 checkout:p-0 sm:max-w-[380px] mx-auto checkout:mx-0 w-full fade-in-right">
          <CheckoutFormSkeleton />
        </div>
      </div>
    </div>
  );
};

export default Loading;
