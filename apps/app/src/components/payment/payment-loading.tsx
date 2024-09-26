import { Skeleton } from "@v1/ui/skeleton";

const PaymentLoading = () => {
  return (
    <section className="checkout-container h-auto checkout:h-screen w-screen overflow-hidden flex items-start justify-center bg-white checkout:bg-neutral-50">
      <div className="max-w-[920px] w-full mx-auto z-10 checkout:pt-[65px] px-4">
        <div className="flex flex-col checkout:flex-row justify-between w-full">
          <div className="flex flex-col checkout:max-w-[380px]">
            {/* Company Info Skeleton */}
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-32 h-4" />
            </div>

            {/* Service Info Skeleton */}
            <div className="flex flex-col pt-[72px] checkout:pt-10 w-full">
              <Skeleton className="w-3/4 h-6 mb-2" />
              <Skeleton className="w-full h-4 mb-1" />
              <Skeleton className="w-2/3 h-4 mb-4" />
              <Skeleton className="w-1/2 h-8" />
            </div>
          </div>

          {/* Checkout Form Skeleton */}
          <div className="px-4 py-4 mt-12 checkout:mt-0 checkout:p-0 sm:max-w-[380px] mx-auto checkout:mx-0 w-full">
            <Skeleton className="w-full h-8 mb-4" />
            <div className="grid grid-cols-1 gap-3">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="w-1/4 h-4" />
                  <Skeleton className="w-full h-10 rounded-lg" />
                </div>
              ))}
            </div>
            <Skeleton className="w-full h-12 mt-6 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentLoading;
