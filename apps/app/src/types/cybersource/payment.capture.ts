// https://developer.cybersource.com/api-reference-assets/index.html#payments_payments_process-a-payment

import type { ErrorInformationDetails } from "./payment.general";

// 200
export enum EnumCapturePaymentStatus200 {
  PENDING = "PENDING",
  TRANSMITTED = "TRANSMITTED", // (Only for Online Capture enabled merchants)
}

export interface CapturePaymentResponse {
  _links: Links;
  clientReferenceInformation: ClientReferenceInformation;
  id: string;
  orderInformation: OrderInformation;
  reconciliationId: string;
  status: EnumCapturePaymentStatus200;
  submitTimeUtc: Date;
}

export interface Links {
  void: Self;
  self: Self;
}

export interface Self {
  method: string;
  href: string;
}

export interface ClientReferenceInformation {
  code: string;
}

export interface OrderInformation {
  amountDetails: AmountDetails;
}

export interface AmountDetails {
  totalAmount: string;
  currency: string;
}

// 400
export enum EnumCapturePaymentStatus400 {
  INVALID_REQUEST = "INVALID_REQUEST",
}

export enum EnumCapturePaymentReason400 {
  MISSING_FIELD = "MISSING_FIELD",
  INVALID_DATA = "INVALID_DATA",
  DUPLICATE_REQUEST = "DUPLICATE_REQUEST",
  INVALID_MERCHANT_CONFIGURATION = "INVALID_MERCHANT_CONFIGURATION",
  EXCEEDS_AUTH_AMOUNT = "EXCEEDS_AUTH_AMOUNT",
  AUTH_ALREADY_REVERSED = "AUTH_ALREADY_REVERSED",
  TRANSACTION_ALREADY_SETTLED = "TRANSACTION_ALREADY_SETTLED",
  INVALID_AMOUNT = "INVALID_AMOUNT",
  MISSING_AUTH = "MISSING_AUTH",
  TRANSACTION_ALREADY_REVERSED_OR_SETTLED = "TRANSACTION_ALREADY_REVERSED_OR_SETTLED",
  NOT_SUPPORTED = "NOT_SUPPORTED",
}

export interface CapturePaymentError400 {
  submitTimeUtc: Date;
  status: EnumCapturePaymentStatus400;
  reason: EnumCapturePaymentReason400;
  message: string;
  details: ErrorInformationDetails400[];
}

export interface ErrorInformationDetails400 extends ErrorInformationDetails {}
