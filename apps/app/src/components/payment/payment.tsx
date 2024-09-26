import { BUSINESS } from "@/business";
import { registerView } from "@v1/supabase/mutations";
import { getLink } from "@v1/supabase/queries";
import CheckoutForm from "./checkout-form";
import CompanyInfo from "./company-info";
import LinkWrong from "./link-wrong";
import ServiceInfo from "./service-info";

const Payment = async ({ link }: { link: string }) => {
  const data = await getLink(link);
  await registerView(link);

  if (!data) return <LinkWrong />;

  return (
    <div className="max-w-[920px] w-full mx-auto z-10 checkout:pt-[65px] px-4">
      <div className="flex flex-col checkout:flex-row justify-between w-full">
        <div className="flex flex-col checkout:max-w-[380px]">
          <CompanyInfo name={BUSINESS.name} logo={BUSINESS.logo} />
          <ServiceInfo
            title={data?.title}
            amount={data?.amount}
            description={data?.description}
            currency={data?.currency}
          />
        </div>
        <div className="px-4 py-4 mt-12 checkout:mt-0 checkout:p-0 sm:max-w-[380px] mx-auto checkout:mx-0 w-full">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
};

export default Payment;
