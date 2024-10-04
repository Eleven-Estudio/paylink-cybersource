"use client";

import { checkoutSchema } from "@/actions/checkout/schema";
import countries from "@/data/countries-en.json";
import statesCA from "@/data/states-ca-en.json";
import statesUS from "@/data/states-us-en.json";
import { COUNTRIES_REQUIRED_STATE } from "@/lib/cybersource";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@v1/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@v1/ui/form";
import { Input } from "@v1/ui/input";
import { Label } from "@v1/ui/label";
import { Lucide } from "@v1/ui/lucide";
import { Select } from "@v1/ui/select";
import { Skeleton } from "@v1/ui/skeleton";
import { cn } from "@v1/ui/utils";
import validCreditCard from "card-validator";
import {
  type CreditCardType,
  DefaultCreditCardDelimiter,
  DefaultDateDelimiter,
  formatCreditCard,
  formatDate,
  getCreditCardType,
  registerCursorTracker,
  unformatCreditCard,
} from "cleave-zen";
import { AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import CardIcons from "./card-icons";
import ErrorMessage from "./error-message";

export const FormPaymentSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-3">
      <Skeleton className="w-full h-10 rounded-lg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Skeleton className="w-full h-10 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
      <div className="space-y-3">
        <Skeleton className="w-[97px] h-[17px] rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-full h-10 rounded-lg" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="w-[111px] h-[17px] rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-full h-10 rounded-lg" />
        </div>
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
      <Skeleton className="w-full h-10 rounded-lg mt-3" />
    </div>
  );
};

interface FormPaymentProps {
  defaultValues: Partial<z.infer<typeof checkoutSchema>>;
  onSubmit: (values: z.infer<typeof checkoutSchema>) => Promise<void>;
  status: "success" | "error" | null;
  messageError?: string;
}

const FormPayment = ({
  defaultValues,
  onSubmit,
  status: statusPayment,
  messageError = "",
}: FormPaymentProps) => {
  const [ccNumber, setCcNumber] = useState("");
  const [ccExpiration, setCcExpiration] = useState("");
  const [type, setType] = useState<CreditCardType | null>(null);
  const [maxLenghtCvv, setMaxLenghtCvv] = useState(4);
  const [status, setStatus] = useState<"loading" | "idle">("idle");

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      ...defaultValues,
      email: "",
      "cc-number": "",
      "cc-expiration": "",
      "cc-cvv": "",
      "cc-name": "",
      state: "",
      zip: "",
      name: "",
      lastName: "",
      address: "",
      city: "",
    },
  });

  const errorMessageRef = useRef<HTMLDivElement | null>(null);
  const ccNumberRef = useRef<HTMLInputElement | null>(null);
  const ccExpirationRef = useRef<HTMLInputElement | null>(null);
  const watchCountry = form.watch("country");

  const states = useMemo(() => {
    if (watchCountry === "US") return statesUS;
    if (watchCountry === "CA") return statesCA;
    return [];
  }, [watchCountry]);

  const { buttonText, buttonIcon, buttonClassname, disabled } = useMemo(() => {
    if (status === "loading") {
      return {
        buttonText: "Processing...",
        buttonIcon: <Lucide.Loader className="animate-spin h-4 w-4" />,
        disabled: true,
        buttonClassname: "",
      };
    }

    if (statusPayment === "error") {
      return {
        buttonText: "Try again",
        buttonIcon: <Lucide.RefreshCcw className="h-4 w-4" />,
        disabled: false,
        buttonClassname: "",
      };
    }

    return {
      buttonText: "Pay",
      buttonIcon: "",
      disabled: status !== "idle",
      buttonClassname: "",
    };
  }, [status]);

  const handleSubmitForm = async (values: z.infer<typeof checkoutSchema>) => {
    setStatus("loading");
    await onSubmit(values);
    setStatus("idle");
  };

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "country" && type === "change") {
        form.setValue("state", "");
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [form.watch]);

  useEffect(() => {
    if (statusPayment === "error") {
      setTimeout(() => {
        errorMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [statusPayment]);

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="grid grid-cols-1 gap-3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email"
                  autoComplete="email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="First name"
                    autoComplete="given-name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Last name"
                    autoComplete="family-name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-3">
          <Label className="text-neutral-500">Billing address</Label>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Address"
                    autoComplete="address-line1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="City"
                    autoComplete="address-level2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    className={cn([
                      "rounded-lg",
                      field.value === "" && "text-neutral-500",
                    ])}
                    {...field}
                    autoComplete="country"
                  >
                    <option value="" disabled hidden>
                      Select a country
                    </option>
                    {countries.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COUNTRIES_REQUIRED_STATE.includes(watchCountry) ? (
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        className={cn([
                          "rounded-lg",
                          field.value === "" && "text-neutral-500",
                        ])}
                        autoComplete="state"
                        {...field}
                      >
                        <option value="" disabled hidden>
                          State
                        </option>
                        {states.map((state) => (
                          <option key={state.value} value={state.value}>
                            {state.label}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="State (Optional)"
                        autoComplete="address-level2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={
                        COUNTRIES_REQUIRED_STATE.includes(watchCountry)
                          ? "Postal code"
                          : "Postal code (Optional)"
                      }
                      autoComplete="postal-code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-neutral-500">Card information</Label>
          <FormField
            control={form.control}
            name="cc-number"
            render={({ field }) => (
              <FormItem>
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
                        const cvvLength = cardValidator.card?.code.size || 4;
                        const cvvPrevValue =
                          form.getValues("cc-cvv")?.slice(0, cvvLength) || "";
                        form.setValue("cc-cvv", cvvPrevValue);

                        setMaxLenghtCvv(cvvLength);
                        setCcNumber(formatted);
                        setType(type);
                        form.clearErrors("cc-number");
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
                  <FormControl>
                    <Input
                      ref={ccExpirationRef}
                      value={ccExpiration}
                      onChange={(e) => {
                        const value = e.target.value;
                        const formatted = formatDate(value, {
                          datePattern: ["m", "y"],
                        });

                        setCcExpiration(formatted);
                        field.onChange(formatted);
                      }}
                      placeholder="MM/YY"
                      autoComplete="cc-exp"
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
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="CVC"
                      autoComplete="cc-csc"
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
                <FormControl>
                  <Input
                    placeholder="Full name on card"
                    autoComplete="cc-name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <AnimatePresence initial={false}>
          {messageError && (
            <ErrorMessage ref={errorMessageRef} message={messageError} />
          )}
        </AnimatePresence>

        <Button
          disabled={
            !form.formState.isDirty || form.formState.isSubmitting || disabled
          }
          className={cn([
            "w-full text-lg mt-3 flex items-center justify-center gap-2 disabled:cursor-not-allowed active:scale-[1.03] transition-all duration-300 relative disabled:pointer-events-auto",
            buttonClassname,
          ])}
          type="submit"
          size="lg"
        >
          {buttonText}
          <span className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none disabled:pointer-events-none">
            {buttonIcon}
          </span>
        </Button>
      </form>
    </Form>
  );
};

export default FormPayment;
