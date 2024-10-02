export enum ErrorInformationDetailsReason {
  MISSING_FIELD = "MISSING_FIELD",
  INVALID_DATA = "INVALID_DATA",
}

export interface ErrorInformationDetails {
  field: string;
  reason: ErrorInformationDetailsReason;
}

// 500
export enum EnumPaymentStatus500 {
  SERVER_ERROR = "SERVER_ERROR",
}

export enum EnumPaymentReason500 {
  SYSTEM_ERROR = "SYSTEM_ERROR",
  SERVER_TIMEOUT = "SERVER_TIMEOUT",
  SERVICE_TIMEOUT = "SERVICE_TIMEOUT",
}

export interface PaymentError500 {
  submitTimeUtc: Date;
  status: EnumPaymentStatus500;
  reason: EnumPaymentReason500;
  message: string;
}
