import { checkoutSchema } from "@/actions/checkout/schema";
import {
  MerchantConfig,
  generateDigest,
  getCardTypeCybersource,
  getHttpSignature,
} from "@/lib/cybersource";
import { CODE_STATUS_LOCAL_PAYMENT } from "@/lib/errors";
import type {
  PaymentAuthorizationError400,
  PaymentAuthorizationSuccess,
} from "@/types/cybersource/payment.authorization";
import type {
  CapturePaymentError400,
  CapturePaymentResponse,
} from "@/types/cybersource/payment.capture";
import type { PaymentError500 } from "@/types/cybersource/payment.general";
import { getLinkPublic } from "@v1/supabase/server-queries";
import axios from "axios";
import { getCreditCardType } from "cleave-zen";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

const ENDPOINT_AUTHORIZE_PAYMENT = "/pts/v2/payments";
const ENDPOINT_CAPTURE_PAYMENT_WITH_ID = (id: string) =>
  `/pts/v2/payments/${id}/captures`;

export async function POST(req: Request) {
  const {
    link,
    ccNumber,
    ccCvv,
    ccExpiration,
    email,
    ccName,
    country,
    state,
    zip,
    city,
    address,
    name,
    lastName,
  } = await req.json();

  const validate = checkoutSchema.safeParse({
    link,
    "cc-number": ccNumber,
    "cc-cvv": ccCvv,
    "cc-expiration": ccExpiration,
    email,
    "cc-name": ccName,
    country,
    state,
    zip,
    city,
    address,
    name,
    lastName,
  });

  if (!validate.success) {
    return NextResponse.json(
      {
        code: CODE_STATUS_LOCAL_PAYMENT.MISSING_REQUIRED_FIELDS,
      },
      { status: 400 },
    );
  }

  const dataLink = await getLinkPublic(link);

  if (!dataLink) {
    return NextResponse.json(
      {
        code: CODE_STATUS_LOCAL_PAYMENT.LINK_NOT_FOUND,
      },
      { status: 404 },
    );
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
        firstName: name,
        lastName: lastName,
        address1: address,
        postalCode: zip,
        locality: city,
        administrativeArea: state,
        country: country,
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

  const payloadCapture = {
    clientReferenceInformation: {
      code: clientCodeId,
    },
    orderInformation: {
      amountDetails: {
        totalAmount: dataLink.amount.toString(),
        currency: dataLink.currency,
      },
    },
  };

  const merchantConfig = MerchantConfig();
  const digestAuthorize = generateDigest(JSON.stringify(payload));
  const date = new Date(Date.now()).toUTCString();
  const httpSignatureAuthorize = getHttpSignature({
    resource: ENDPOINT_AUTHORIZE_PAYMENT,
    requestHost: merchantConfig.runEnvironment,
    payload: JSON.stringify(payload),
    merchantId: merchantConfig.merchantID ?? "",
    merchantKeyId: merchantConfig.merchantKeyId ?? "",
    merchantSecretKey: merchantConfig.merchantsecretKey ?? "",
    date,
    method: "post",
  });

  let authorizePaymentId = "";

  try {
    const authorizePaymentRes = await axios.post<PaymentAuthorizationSuccess>(
      `https://${merchantConfig.runEnvironment}${ENDPOINT_AUTHORIZE_PAYMENT}`,
      payload,
      {
        headers: {
          digest: `SHA-256=${digestAuthorize}`,
          "v-c-merchant-id": merchantConfig.merchantID,
          date: date,
          host: merchantConfig.runEnvironment,
          signature: httpSignatureAuthorize,
          "Content-Type": "application/json;charset=utf-8",
          "User-Agent": "Mozilla/5.0",
        },
      },
    );

    authorizePaymentId = authorizePaymentRes.data.reconciliationId;

    if (authorizePaymentRes.data.errorInformation?.reason) {
      return NextResponse.json(
        {
          code: CODE_STATUS_LOCAL_PAYMENT.PAYMENT_ERROR,
          data: authorizePaymentRes.data,
        },
        { status: 400 },
      );
    }

    console.log("AUTHORIZE PAYMENT RESPONSE", authorizePaymentRes.data);
  } catch (error) {
    let code = "";
    let statusRequest = 400;
    console.log("AUTHORIZE PAYMENT ERROR", error);

    if (axios.isAxiosError(error)) {
      if (error.status && error.status >= 400) {
        const errorData = error.response?.data as PaymentAuthorizationError400;

        code = CODE_STATUS_LOCAL_PAYMENT.PAYMENT_ERROR;
        statusRequest = error.status;
      }

      if (error.status && error.status >= 500) {
        const errorData = error.response?.data as PaymentError500;

        code = CODE_STATUS_LOCAL_PAYMENT.PAYMENT_ERROR;
        statusRequest = error.status;
      }
    }

    return NextResponse.json(
      {
        code,
      },
      { status: statusRequest },
    );
  }

  // CAPTURE PAYMENT
  const digestCapture = generateDigest(JSON.stringify(payloadCapture));
  const httpSignatureCapture = getHttpSignature({
    resource: ENDPOINT_CAPTURE_PAYMENT_WITH_ID(authorizePaymentId),
    requestHost: merchantConfig.runEnvironment,
    payload: JSON.stringify(payloadCapture),
    merchantId: merchantConfig.merchantID ?? "",
    merchantKeyId: merchantConfig.merchantKeyId ?? "",
    merchantSecretKey: merchantConfig.merchantsecretKey ?? "",
    date,
    method: "post",
  });
  try {
    const capturePaymentRes = await axios.post<CapturePaymentResponse>(
      `https://${merchantConfig.runEnvironment}${ENDPOINT_CAPTURE_PAYMENT_WITH_ID(
        authorizePaymentId,
      )}`,
      payloadCapture,
      {
        headers: {
          digest: `SHA-256=${digestCapture}`,
          "v-c-merchant-id": merchantConfig.merchantID,
          date: date,
          host: merchantConfig.runEnvironment,
          signature: httpSignatureCapture,
          "Content-Type": "application/json;charset=utf-8",
          "User-Agent": "Mozilla/5.0",
        },
      },
    );

    console.log("CAPTURE PAYMENT RESPONSE", capturePaymentRes.data);

    return NextResponse.json({
      code: CODE_STATUS_LOCAL_PAYMENT.PAYMENT_SUCCESS,
    });
  } catch (error) {
    let code = "";
    let statusRequest = 400;

    if (axios.isAxiosError(error)) {
      console.log("CAPTURE PAYMENT ERROR", error);
      if (error.status && error.status >= 400) {
        const errorData = error.response?.data as CapturePaymentError400;
        code = CODE_STATUS_LOCAL_PAYMENT.PAYMENT_ERROR;
        statusRequest = error.status;
      }

      if (error.status && error.status >= 500) {
        const errorData = error.response?.data as PaymentError500;
        code = CODE_STATUS_LOCAL_PAYMENT.PAYMENT_ERROR;
        statusRequest = error.status;
      }
    }

    return NextResponse.json(
      {
        code,
      },
      { status: statusRequest },
    );
  }
}
