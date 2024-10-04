import { AVAILABLE_CARDS } from "@/lib/cybersource";
import { cn } from "@v1/ui/utils";
import type { CreditCardType } from "cleave-zen";
import { AnimatePresence, motion } from "framer-motion";

interface CardIconsProps {
  type: CreditCardType | null;
}

const staticImages = ["visa", "mastercard", "amex"] as CreditCardType[];
const dynamicImages = ["discover", "jcb", "diners"] as CreditCardType[];

const isCardAvailable = (card: string) =>
  AVAILABLE_CARDS === "ALL" || AVAILABLE_CARDS?.includes(card);

const availableStaticImages = staticImages.filter(isCardAvailable);
const availableDynamicImages = dynamicImages
  .filter(isCardAvailable)
  .slice(0, 3);

function CardIcon({ name, className }: { name: string; className?: string }) {
  return (
    <motion.img
      src={`/cards/${name}.svg`}
      alt={name}
      className={cn(className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    />
  );
}

// Max 3 dynamic images
function DynamicCardIcons() {
  if (availableDynamicImages.length > 1) {
    return (
      <div className="w-[24px] h-[16px] overflow-hidden card-ext-container">
        {availableDynamicImages.map((image, index) => (
          <CardIcon
            key={image}
            name={image}
            className={`card-ext-img card-ext-img-${index + 1}`}
          />
        ))}
      </div>
    );
  }

  if (availableDynamicImages.length === 1)
    return <CardIcon name={availableDynamicImages[0] as string} />;

  return null;
}

function CardIcons({ type }: CardIconsProps) {
  const allAvailableImages = [
    ...availableStaticImages,
    ...availableDynamicImages,
  ];

  const shouldShowAllIcons =
    type === null || !allAvailableImages.includes(type);

  if (allAvailableImages.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="flex gap-1 justify-end absolute right-0 top-1/2 -translate-y-1/2 mr-2 pointer-events-none">
        {shouldShowAllIcons && (
          <>
            {availableStaticImages.map((image) => (
              <CardIcon key={image} name={image} />
            ))}
            <DynamicCardIcons />
          </>
        )}

        {type && availableStaticImages.includes(type) && (
          <CardIcon name={type} />
        )}
      </div>
    </AnimatePresence>
  );
}

export default CardIcons;
