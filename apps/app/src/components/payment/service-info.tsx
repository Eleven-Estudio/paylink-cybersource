import React from "react";

interface Props {
  title: string;
  description?: string;
  amount: number;
  currency: "USD" | "GTQ";
}

const ServiceInfo = ({ title, description, amount, currency }: Props) => {
  const formatAmount = new Intl.NumberFormat("es", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currencyDisplay: "symbol",
  }).format(amount);

  return (
    <div className="flex flex-col pt-[72px] checkout:pt-10 text-center checkout:text-left w-full">
      <span className="font-medium text-lg text-neutral-500">{title}</span>
      <span className="text-3xl font-semibold">{formatAmount}</span>
    </div>
  );
};

export default ServiceInfo;
