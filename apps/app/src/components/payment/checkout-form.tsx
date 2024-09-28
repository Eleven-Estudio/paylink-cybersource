"use client";

import { generatePaymentAction } from "@/actions/checkout/generate-payment-action";
import { checkoutSchema } from "@/actions/checkout/schema";
import countries from "@/data/countires-en.json";
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
  FormLabel,
  FormMessage,
} from "@v1/ui/form";
import { Input } from "@v1/ui/input";
import { Label } from "@v1/ui/label";
import { Lucide } from "@v1/ui/lucide";
import { Select } from "@v1/ui/select";
import { TypographyH4 } from "@v1/ui/typography";
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
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import Logo from "../commons/logo";
import CardIcons from "./card-icons";

const CheckoutForm = ({ defaultCountry }: { defaultCountry: string }) => {
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
      country: defaultCountry,
      state: "",
      zip: "",
      name: "",
      lastName: "",
      address: "",
      city: "",
    },
  });

  const ccNumberRef = useRef<HTMLInputElement | null>(null);
  const ccExpirationRef = useRef<HTMLInputElement | null>(null);
  const watchCountry = form.watch("country");

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
    const result = await generatePaymentAction({
      ...values,
      link: (params?.link ?? "") as string,
    });
    console.log("result", result);
    setStatus("idle");
  }

  const states = useMemo(() => {
    if (watchCountry === "US") return statesUS;
    if (watchCountry === "CA") return statesCA;
    return [];
  }, [watchCountry]);

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

  return (
    <div className="flex flex-col gap-4 w-full">
      <TypographyH4 className="hidden checkout:block">
        Payment with card
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
                <FormControl>
                  <Input
                    placeholder="Email"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First name"
                      className="rounded-lg"
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
                      className="rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                        placeholder="Card number"
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
                            const cvvLength =
                              cardValidator.card?.code.size || 4;
                            form.setValue(
                              "cc-cvv",
                              form.getValues("cc-cvv")?.slice(0, cvvLength) ||
                                "",
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
                        placeholder="Expiration date (MM/YY)"
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
                    <FormControl>
                      <Input
                        placeholder="CVC"
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
                  <FormControl>
                    <Input
                      placeholder="Full name on card"
                      autoComplete="cc-name"
                      className="rounded-lg"
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
                      className="rounded-lg"
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
                      className="rounded-lg"
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
                            Select a state
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
                          placeholder="State / Region (Optional)"
                          className="rounded-lg"
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
                            ? "Zip code"
                            : "Zip code (Optional)"
                        }
                        className="rounded-lg"
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

          <Button
            disabled={status === "loading"}
            className="w-full text-lg mt-3"
            type="submit"
            size="lg"
          >
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
