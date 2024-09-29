import { Alert, AlertDescription } from "@v1/ui/alert";
import { Lucide } from "@v1/ui/lucide";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const ErrorMessage = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <motion.div
      key={"error-message"}
      id="error-message"
      ref={ref}
      initial={{ opacity: 0, y: 10, display: "none" }}
      animate={{ opacity: 1, y: 0, display: "block" }}
      exit={{ opacity: 0, y: 10, display: "none" }}
      transition={{ duration: 0.3 }}
    >
      <Alert variant="destructive" className="bg-red-50 border-none">
        <Lucide.CircleAlert className="w-4 h-4" />
        <AlertDescription className="text-sm text-neutral-800">
          There was an error processing your payment. Please try again later or
          with a different payment method.
        </AlertDescription>
      </Alert>
    </motion.div>
  );
});

ErrorMessage.displayName = "ErrorMessage";

export default ErrorMessage;
