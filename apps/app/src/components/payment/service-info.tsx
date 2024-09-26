import { TypographyH1, TypographyH2 } from "@v1/ui/typography";
import React from "react";

interface Props {
  title: string;
  description?: string;
  amount: number;
  currency: "USD" | "GTQ";
}

const ServiceInfo = ({ title, description, amount, currency }: Props) => {
  const formatAmount = new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currencyDisplay: "symbol",
  }).format(amount);

  return (
    <div className="flex flex-col pt-[72px] checkout:pt-10 text-center checkout:text-left w-full">
      <TypographyH1 className="font-semibold text-lg lg:text-lg text-neutral-500">
        {title}
      </TypographyH1>
      {description && (
        <p className="text-neutral-400 text-base text-pretty max-w-[45ch] mx-auto checkout:mx-0 block line-clamp-3 mt-1">
          {description}
        </p>
      )}
      <span className="text-3xl font-semibold mt-4">{formatAmount}</span>
    </div>
  );
};

export default ServiceInfo;
