"use client";

import validCreditCard from "card-validator";

import { capturePaymentAction } from "@/actions/checkout/capture-payment-action";
import { checkoutSchema } from "@/actions/checkout/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@v1/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@v1/ui/form";
import { Input } from "@v1/ui/input";
import { Lucide } from "@v1/ui/lucide";
import { TypographyH4 } from "@v1/ui/typography";
import { cn } from "@v1/ui/utils";
import {
  type CreditCardType,
  DefaultCreditCardDelimiter,
  DefaultDateDelimiter,
  formatCreditCard,
  formatDate,
  getCreditCardType,
  registerCursorTracker,
  unformatCreditCard,
  unformatGeneral,
} from "cleave-zen";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import Logo from "../commons/logo";
import CardIcons from "./card-icons";

const CheckoutForm = () => {
  const params = useParams();
  const [status, setStatus] = useState<"loading" | "idle">("idle");
  const [ccNumber, setCcNumber] = useState("");
  const [ccExpiration, setCcExpiration] = useState("");
  const [type, setType] = useState<CreditCardType | null>(null);
  const [maxLenghtCvv, setMaxLenghtCvv] = useState(4);

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      "cc-number": "",
      "cc-expiration": "",
      "cc-cvv": "",
      "cc-name": "",
    },
  });

  const ccNumberRef = useRef<HTMLInputElement | null>(null);
  const ccExpirationRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // registerCursorTracker itself returns an unregister destructor
    // function so you can place it here for hook component unmount
    if (ccNumberRef.current) {
      registerCursorTracker({
        input: ccNumberRef.current,
        delimiter: DefaultCreditCardDelimiter,
      });
    }

    if (ccExpirationRef.current) {
      registerCursorTracker({
        input: ccExpirationRef.current,
        delimiter: DefaultDateDelimiter,
      });
    }
  }, []);

  async function onSubmit(values: z.infer<typeof checkoutSchema>) {
    setStatus("loading");
    const result = await capturePaymentAction({
      ...values,
      link: (params?.link ?? "") as string,
    });
    setStatus("idle");
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <TypographyH4 className="hidden checkout:block">
        Payment with credit card
      </TypographyH4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-500">Email</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="email"
                    className="rounded-lg"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cc-number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-500">
                  Credit card number
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      ref={ccNumberRef}
                      value={ccNumber}
                      placeholder="1234 1234 1234 1234"
                      onChange={(e) => {
                        const value = e.target.value;
                        const formatted = formatCreditCard(value);
                        const type = getCreditCardType(value);
                        const raw = unformatCreditCard(value);

                        const cardValidator = validCreditCard.number(raw);
                        if (!cardValidator.isPotentiallyValid) {
                          form.setError("cc-number", {
                            message: "Invalid credit card number",
                          });
                        } else {
                          const cvvLength = cardValidator.card?.code.size || 4;
                          form.setValue(
                            "cc-cvv",
                            form.getValues("cc-cvv")?.slice(0, cvvLength) || "",
                          );
                          setMaxLenghtCvv(cvvLength);
                          form.clearErrors("cc-number");
                        }

                        setCcNumber(formatted);
                        setType(type);

                        field.onChange(raw);
                      }}
                      autoComplete="cc-number"
                      className={cn([
                        "rounded-lg pr-[calc(12px+120px)]",
                        type === null && "pr-[calc(12px+120px)]",
                        type && "pr-3",
                      ])}
                    />
                    <CardIcons
                      type={type && ccNumber.length > 0 ? type : null}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="cc-expiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-500">
                    Expiration date
                  </FormLabel>
                  <FormControl>
                    <Input
                      ref={ccExpirationRef}
                      value={ccExpiration}
                      onChange={(e) => {
                        const value = e.target.value;
                        const formatted = formatDate(value, {
                          datePattern: ["m", "y"],
                        });

                        const cardValidator =
                          validCreditCard.expirationDate(formatted);

                        if (!cardValidator.isPotentiallyValid) {
                          form.setError("cc-expiration", {
                            message: "Invalid expiration date",
                          });
                        } else {
                          form.clearErrors("cc-expiration");
                        }

                        setCcExpiration(formatted);
                        field.onChange(formatted);
                      }}
                      placeholder="MM/YY"
                      autoComplete="cc-exp"
                      className="rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cc-cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-500">CVC</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123"
                      autoComplete="cc-csc"
                      className="rounded-lg"
                      maxLength={maxLenghtCvv}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="cc-name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-500">
                  Cardholder name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full name"
                    autoComplete="cc-name"
                    className="rounded-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full text-lg mt-3" type="submit" size="lg">
            {status === "loading" ? (
              <>
                <Lucide.Loader className="animate-spin mr-2 h-4 w-4" />
                Processing...
              </>
            ) : (
              "Pay"
            )}
          </Button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400">
            <span>Powered by </span>
            <Logo className="h-3 w-auto fill-neutral-400" />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
