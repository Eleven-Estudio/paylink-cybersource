import type { CreditCardType } from "cleave-zen";
import React from "react";

interface Props {
  type: CreditCardType | null;
}

const CardIcons = ({ type }: Props) => {
  const images = ["visa", "mastercard", "amex", "discover", "jcb", "diners"];

  return (
    <div className="flex gap-1 justify-end absolute right-0 top-1/2 -translate-y-1/2 mr-2 pointer-events-none">
      {(type === null || !images.includes(type)) && (
        <>
          <img src="/cards/visa.svg" alt="Visa" />
          <img src="/cards/mastercard.svg" alt="Mastercard" />
          <img src="/cards/amex.svg" alt="Amex" />
          <div className="w-[24px] h-[16px] overflow-hidden card-ext-container">
            <img
              src="/cards/discover.svg"
              alt="Discover"
              className="card-ext-img card-ext-img-1"
            />
            <img
              src="/cards/jcb.svg"
              alt="JCB"
              className="card-ext-img card-ext-img-2"
            />
            <img
              src="/cards/diners.svg"
              alt="Diners Club"
              className="card-ext-img card-ext-img-3"
            />
          </div>
        </>
      )}
      {type && images.includes(type) && (
        <img src={`/cards/${type}.svg`} alt={type} />
      )}
    </div>
  );
};

export default CardIcons;
