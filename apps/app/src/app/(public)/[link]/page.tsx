import { BUSINESS } from "@/business";
import CheckoutForm from "@/components/payment/checkout-form";
import CompanyInfo from "@/components/payment/company-info";
import ServiceInfo from "@/components/payment/service-info";
import { CODE_STATUS_LOCAL_PAYMENT } from "@/lib/errors";
import { registerView } from "@v1/supabase/mutations";
import { getLink } from "@v1/supabase/queries";
import { headers } from "next/headers";

export const metadata = {
  title: {
    absolute: BUSINESS.name,
  },
};

const page = async ({ params }: { params: { link: string } }) => {
  // Create fake call to promise with 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const country = headers().get("x-vercel-ip-country") || "US";
  const data = await getLink(params.link);
  await registerView(params.link);

  if (!data) throw Error(CODE_STATUS_LOCAL_PAYMENT.LINK_NOT_FOUND);
  // if (!data) return notFound();

  return (
    <div className="max-w-[920px] w-full mx-auto z-10 checkout:pt-[65px] px-1 sm:px-4 transition-all duration-300 payment-container">
      <div className="flex flex-col checkout:flex-row justify-between w-full">
        <div className="flex flex-col checkout:max-w-[380px] fade-in">
          <CompanyInfo name={BUSINESS.name} logo={BUSINESS.logo} />
          <ServiceInfo
            title={data.title}
            amount={data.amount}
            description={data?.description}
            currency={data.currency}
          />
        </div>
        <div className="px-4 py-4 mt-12 checkout:mt-0 checkout:p-0 sm:max-w-[380px] mx-auto checkout:mx-0 w-full fade-in">
          <CheckoutForm defaultCountry={country} />
        </div>
      </div>
    </div>
  );
};

export default page;
