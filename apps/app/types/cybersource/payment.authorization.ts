// https://developer.cybersource.com/api-reference-assets/index.html#payments_payments_process-a-payment

import type { ErrorInformationDetails } from "./payment.general";

// 200
export enum EnumPaymentAuthorizationStatus200 {
  AUTHORIZED = "AUTHORIZED",
  PARTIAL_AUTHORIZED = "PARTIAL_AUTHORIZED",
  AUTHORIZED_PENDING_REVIEW = "AUTHORIZED_PENDING_REVIEW",
  AUTHORIZED_RISK_DECLINED = "AUTHORIZED_RISK_DECLINED",
  PENDING_AUTHENTICATION = "PENDING_AUTHENTICATION",
  PENDING_REVIEW = "PENDING_REVIEW",
  DECLINED = "DECLINED",
  INVALID_REQUEST = "INVALID_REQUEST",
}

export enum EnumErrorInformationReason200 {
  AVS_FAILED = "AVS_FAILED",
  CONTACT_PROCESSOR = "CONTACT_PROCESSOR",
  EXPIRED_CARD = "EXPIRED_CARD",
  PROCESSOR_DECLINED = "PROCESSOR_DECLINED",
  INSUFFICIENT_FUND = "INSUFFICIENT_FUND",
  STOLEN_LOST_CARD = "STOLEN_LOST_CARD",
  ISSUER_UNAVAILABLE = "ISSUER_UNAVAILABLE",
  UNAUTHORIZED_CARD = "UNAUTHORIZED_CARD",
  CVN_NOT_MATCH = "CVN_NOT_MATCH",
  EXCEEDS_CREDIT_LIMIT = "EXCEEDS_CREDIT_LIMIT",
  INVALID_CVN = "INVALID_CVN",
  DECLINED_CHECK = "DECLINED_CHECK",
  BLACKLISTED_CUSTOMER = "BLACKLISTED_CUSTOMER",
  SUSPENDED_ACCOUNT = "SUSPENDED_ACCOUNT",
  PAYMENT_REFUSED = "PAYMENT_REFUSED",
  CV_FAILED = "CV_FAILED",
  INVALID_ACCOUNT = "INVALID_ACCOUNT",
  GENERAL_DECLINE = "GENERAL_DECLINE",
  DECISION_PROFILE_REJECT = "DECISION_PROFILE_REJECT",
  SCORE_EXCEEDS_THRESHOLD = "SCORE_EXCEEDS_THRESHOLD",
  PENDING_AUTHENTICATION = "PENDING_AUTHENTICATION",
  ACH_VERIFICATION_FAILED = "ACH_VERIFICATION_FAILED",
  DECISION_PROFILE_REVIEW = "DECISION_PROFILE_REVIEW",
  CONSUMER_AUTHENTICATION_REQUIRED = "CONSUMER_AUTHENTICATION_REQUIRED",
  CONSUMER_AUTHENTICATION_FAILED = "CONSUMER_AUTHENTICATION_FAILED",
  ALLOWABLE_PIN_RETRIES_EXCEEDED = "ALLOWABLE_PIN_RETRIES_EXCEEDED",
  PROCESSOR_ERROR = "PROCESSOR_ERROR",
  CUSTOMER_WATCHLIST_MATCH = "CUSTOMER_WATCHLIST_MATCH",
  ADDRESS_COUNTRY_WATCHLIST_MATCH = "ADDRESS_COUNTRY_WATCHLIST_MATCH",
  EMAIL_COUNTRY_WATCHLIST_MATCH = "EMAIL_COUNTRY_WATCHLIST_MATCH",
  IP_COUNTRY_WATCHLIST_MATCH = "IP_COUNTRY_WATCHLIST_MATCH",
  INVALID_MERCHANT_CONFIGURATION = "INVALID_MERCHANT_CONFIGURATION",
}

export interface PaymentAuthorizationSuccess {
  _links: Links;
  clientReferenceInformation: ClientReferenceInformation;
  consumerAuthenticationInformation: ConsumerAuthenticationInformation;
  id: string;
  orderInformation: OrderInformation;
  paymentAccountInformation: PaymentAccountInformation;
  paymentInformation: PaymentInformation;
  processorInformation: ProcessorInformation;
  reconciliationId: string;
  riskInformation: RiskInformation;
  status: EnumPaymentAuthorizationStatus200;
  errorInformation?: ErrorInformation;
  submitTimeUtc: Date;
}

export interface ErrorInformation {
  reason: EnumErrorInformationReason200;
  message: string;
  details: ErrorInformationDetails[];
}

export interface Links {
  authReversal: AuthReversal;
  self: AuthReversal;
  capture: AuthReversal;
}

export interface AuthReversal {
  method: string;
  href: string;
}

export interface ClientReferenceInformation {
  code: string;
}

export interface ConsumerAuthenticationInformation {
  token: string;
}

export interface OrderInformation {
  amountDetails: AmountDetails;
}

export interface AmountDetails {
  authorizedAmount: string;
  currency: string;
}

export interface PaymentAccountInformation {
  card: Card;
}

export interface Card {
  type: string;
}

export interface PaymentInformation {
  tokenizedCard: Card;
  scheme: string;
  bin: string;
  accountType: string;
  issuer: string;
  card: Card;
  binCountry: string;
}

export interface ProcessorInformation {
  systemTraceAuditNumber: string;
  approvalCode: string;
  cardVerification: CardVerification;
  merchantAdvice: Avs;
  networkTransactionId: string;
  retrievalReferenceNumber: string;
  consumerAuthenticationResponse: Avs;
  transactionId: string;
  responseCode: string;
  avs: Avs;
}

export interface Avs {
  code: string;
  codeRaw: string;
}

export interface CardVerification {
  resultCodeRaw: string;
  resultCode: string;
}

export interface RiskInformation {
  localTime: string;
  score: Score;
  infoCodes: InfoCodes;
  profile: Profile;
  casePriority: string;
}

export interface InfoCodes {
  address: string[];
  globalVelocity: string[];
  customerList: string[];
  velocity: string[];
  identityChange: string[];
}

export interface Profile {
  earlyDecision: string;
}

export interface Score {
  result: string;
  factorCodes: string[];
  modelUsed: string;
}

// 400
export enum EnumPaymentAuthorizationStatus400 {
  INVALID_REQUEST = "INVALID_REQUEST",
}

export enum EnumErrorInformationReason400 {
  MISSING_FIELD = "MISSING_FIELD",
  INVALID_DATA = "INVALID_DATA",
  DUPLICATE_REQUEST = "DUPLICATE_REQUEST",
  INVALID_CARD = "INVALID_CARD",
  CARD_TYPE_NOT_ACCEPTED = "CARD_TYPE_NOT_ACCEPTED",
  INVALID_MERCHANT_CONFIGURATION = "INVALID_MERCHANT_CONFIGURATION",
  PROCESSOR_UNAVAILABLE = "PROCESSOR_UNAVAILABLE",
  INVALID_AMOUNT = "INVALID_AMOUNT",
  INVALID_CARD_TYPE = "INVALID_CARD_TYPE",
  INVALID_PAYMENT_ID = "INVALID_PAYMENT_ID",
  NOT_SUPPORTED = "NOT_SUPPORTED",
}

export interface PaymentAuthorizationError400 {
  submitTimeUtc: Date;
  status: EnumPaymentAuthorizationStatus400;
  reason: EnumErrorInformationReason400;
  message: string;
  details: ErrorInformationDetails400[];
}

export interface ErrorInformationDetails400 extends ErrorInformationDetails {}
