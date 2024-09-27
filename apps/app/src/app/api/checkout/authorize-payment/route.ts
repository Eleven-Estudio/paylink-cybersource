import { checkoutSchema } from "@/actions/checkout/schema";
import {
  MerchantConfig,
  generateDigest,
  getCardTypeCybersource,
  getHttpSignature,
} from "@/lib/cybersource";
import { logger } from "@v1/logger";
import { getLink } from "@v1/supabase/queries";
import axios from "axios";
import { getCreditCardType } from "cleave-zen";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

const ENDPOINT_AUTHORIZE_PAYMENT = "/pts/v2/payments";

export async function POST(req: Request) {
  const { link, ccNumber, ccCvv, ccExpiration, email, ccName } =
    await req.json();

  const validate = checkoutSchema.safeParse({
    link,
    "cc-number": ccNumber,
    "cc-cvv": ccCvv,
    "cc-expiration": ccExpiration,
    email,
    "cc-name": ccName,
  });

  if (!validate.success) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  const dataLink = await getLink(link);

  if (!dataLink) {
    return NextResponse.json({ message: "Link not found" }, { status: 404 });
  }

  const clientCodeId = nanoid();
  const [month, year] = ccExpiration.split("/");
  const fullYear =
    year.length === 2 ? `20${year}` : year.length === 3 ? `2${year}` : year;

  const commerceIndicator = "internet";

  const payload = {
    clientReferenceInformation: {
      code: clientCodeId,
    },
    processingInformation: {
      commerceIndicator,
    },
    orderInformation: {
      billTo: {
        // firstName: ccName,
        lastName: ccName,
        address1: "201 S. Division St.",
        postalCode: "48104-2201",
        locality: "Ann Arbor",
        // administrativeArea: "MI",
        country: "US",
        // phoneNumber: "999999999",
        email,
      },
      amountDetails: {
        totalAmount: dataLink.amount.toString(),
        currency: dataLink.currency,
      },
    },
    paymentInformation: {
      card: {
        expirationYear: fullYear,
        number: ccNumber,
        securityCode: ccCvv,
        expirationMonth: month,
        type: getCardTypeCybersource(getCreditCardType(ccNumber)),
      },
    },
  };

  const merchantConfig = MerchantConfig();
  const digest = generateDigest(JSON.stringify(payload));

  const date = new Date(Date.now()).toUTCString();
  const httpSignature = getHttpSignature({
    resource: ENDPOINT_AUTHORIZE_PAYMENT,
    requestHost: merchantConfig.runEnvironment,
    payload: JSON.stringify(payload),
    merchantId: merchantConfig.merchantID ?? "",
    merchantKeyId: merchantConfig.merchantKeyId ?? "",
    merchantSecretKey: merchantConfig.merchantsecretKey ?? "",
    date,
    method: "post",
  });

  const res = await axios.post(
    `https://${merchantConfig.runEnvironment}${ENDPOINT_AUTHORIZE_PAYMENT}`,
    payload,
    {
      headers: {
        digest: `SHA-256=${digest}`,
        "v-c-merchant-id": merchantConfig.merchantID,
        date: date,
        host: merchantConfig.runEnvironment,
        signature: httpSignature,
        "Content-Type": "application/json;charset=utf-8",
        "User-Agent": "Mozilla/5.0",
      },
    },
  );

  console.log("res", res.data);

  if (res.status === 200) {
    return NextResponse.json({ message: "Payment Created" }, { status: 201 });
  }

  return NextResponse.json({ message: "Payment Failed" }, { status: 400 });
}
