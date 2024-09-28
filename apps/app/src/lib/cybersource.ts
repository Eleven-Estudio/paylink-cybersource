// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import crypto from "crypto";

/*
 * Merchant configuration properties are taken from Configuration module
 */

// common parameters
const AuthenticationType = "http_signature";
const RunEnvironment = "apitest.cybersource.com"; // TODO: make this configurable
const MerchantId = process.env.CYBERSORUCE_MERCHANT_ID;
const availableCards =
  process.env.NEXT_PUBLIC_CYBERSOURCE_CARDS_AVAILABLE?.split(",") || "ALL";

// http_signature parameters
const MerchantKeyId = process.env.CYBERSORUCE_API_KEY;
const MerchantSecretKey = process.env.CYBERSORUCE_API_SECRET;

// jwt parameters
const KeysDirectory = process.env.CYBERSOURCE_KEYS_DIRECTORY;
const KeyFileName = process.env.CYBERSOURCE_KEY_FILE_NAME;
const KeyAlias = process.env.CYBERSOURCE_KEY_ALIAS;
const KeyPass = process.env.CYBERSOURCE_KEY_PASS;

//meta key parameters
const UseMetaKey = false;
const PortfolioID = "";

// logging parameters
const EnableLog = true;
const LogFileName = "cybs";
const LogDirectory = "log";
const LogfileMaxSize = "5242880"; //10 MB In Bytes
const EnableMasking = true;

export const AVAILABLE_CARDS =
  process.env.NEXT_PUBLIC_CYBERSOURCE_CARDS_AVAILABLE?.split(",") ?? "ALL";
export const COUNTRIES_REQUIRED_STATE = ["US", "CA"];

/*
PEM Key file path for decoding JWE Response Enter the folder path where the .pem file is located.
It is optional property, require adding only during JWE decryption.
*/
// const PemFileDirectory = "Resource/NetworkTokenCert.pem";

// Constructor for Configuration
export const MerchantConfig = () => {
  const configObj = {
    authenticationType: AuthenticationType,
    runEnvironment: RunEnvironment,

    merchantID: MerchantId,
    merchantKeyId: MerchantKeyId,
    merchantsecretKey: MerchantSecretKey,
    availableCards: availableCards,

    keyAlias: KeyAlias,
    keyPass: KeyPass,
    keyFileName: KeyFileName,
    keysDirectory: KeysDirectory,

    useMetaKey: UseMetaKey,
    portfolioID: PortfolioID,
    pemFileDirectory: "",

    logConfiguration: {
      enableLog: EnableLog,
      logFileName: LogFileName,
      logDirectory: LogDirectory,
      logFileMaxSize: LogfileMaxSize,
      loggingLevel: "debug",
      enableMasking: EnableMasking,
    },
  };

  return configObj;
};

export const generateDigest = (payload: string) => {
  const buffer = Buffer.from(payload, "utf8");
  const hash = crypto.createHash("sha256");
  hash.update(buffer);
  const digest = hash.digest("base64");
  return digest;
};

export const getHttpSignature = ({
  resource,
  requestHost,
  payload,
  merchantId,
  merchantSecretKey,
  merchantKeyId,
  date,
  method,
}: {
  resource: string;
  requestHost: string;
  payload: string;
  merchantId: string;
  merchantSecretKey: string;
  merchantKeyId: string;
  date: string;
  method: "get" | "post";
}) => {
  let signatureHeader = "";
  let signatureValue = "";

  // KeyId is the key obtained from EBC
  signatureHeader += `keyid="${merchantKeyId}"`;
  // Algorithm should be always HmacSHA256 for http signature
  signatureHeader += ', algorithm="HmacSHA256"';

  if (method === "get") {
    const headersForGetMethod = "host date request-target v-c-merchant-id";
    signatureHeader += `, headers="${headersForGetMethod}"`;
  } else if (method === "post") {
    const headersForPostMethod =
      "host date request-target digest v-c-merchant-id";
    signatureHeader += `, headers="${headersForPostMethod}"`;
  }

  let signatureString = `host: ${requestHost}`;
  signatureString += `\ndate: ${date}`;
  signatureString += "\nrequest-target: ";

  if (method === "get") {
    const targetUrlForGet = `get ${resource}`;
    signatureString += `${targetUrlForGet}\n`;
  } else if (method === "post") {
    const digest = generateDigest(payload);
    const targetUrlForPost = `post ${resource}`;

    signatureString += `${targetUrlForPost}\n`;
    signatureString += `digest: SHA-256=${digest}\n`;
  }

  signatureString += `v-c-merchant-id: ${merchantId}`;

  const data = Buffer.from(signatureString, "utf8");

  // Decoding scecret key
  const key = Buffer.from(merchantSecretKey, "base64");

  signatureValue = crypto
    .createHmac("sha256", key)
    .update(data)
    .digest("base64");

  signatureHeader += `, signature="${signatureValue}"`;

  return signatureHeader;
};

export enum CardTypeCybersource {
  visa = "001",
  mastercard = "002",
  amex = "003",
  discover = "004",
  diners = "005",
  carte_blanche = "006",
  jcb = "007",
  enroute = "014",
  jal = "021",
  maestro = "042",
  delta = "001",
  visa_electron = "001",
  dankort = "034",
  cartes_bancaires = "036",
  carta_si = "037",
  encoded_account_number = "039",
  uatp = "040",
  hipercard = "050",
  aura = "051",
  elo = "054",
  carnet = "058",
  valuelink = "059",
  mada = "060",
  rupay = "061",
  unionpay = "062",
  korean_domestic = "065",
}

export const getCardTypeCybersource = (cardType: string) => {
  return CardTypeCybersource[cardType as keyof typeof CardTypeCybersource];
};

export const STATUS_CODES_CYBERSORUCE = {
  200: {
    AUTHORIZED: "AUTHORIZED",
    PARTIAL_AUTHORIZED: "PARTIAL_AUTHORIZED",
    AUTHORIZED_PENDING_REVIEW: "AUTHORIZED_PENDING_REVIEW",
    AUTHORIZED_RISK_DECLINED: "AUTHORIZED_RISK_DECLINED",
    PENDING_AUTHENTICATION: "PENDING_AUTHENTICATION",
    PENDING_REVIEW: "PENDING_REVIEW",
    DECLINED: "DECLINED",
    INVALID_REQUEST: "INVALID_REQUEST",
  },
  400: {
    INVALID_REQUEST: "INVALID_REQUEST",
  },
  500: {
    SERVER_ERROR: "SERVER_ERROR",
  },
};

export const REASONS_CODES_CYBERSORUCE = {
  200: {
    AVS_FAILED: "AVS_FAILED",
    CONTACT_PROCESSOR: "CONTACT_PROCESSOR",
    EXPIRED_CARD: "EXPIRED_CARD",
    PROCESSOR_DECLINED: "PROCESSOR_DECLINED",
    INSUFFICIENT_FUND: "INSUFFICIENT_FUND",
    STOLEN_LOST_CARD: "STOLEN_LOST_CARD",
    ISSUER_UNAVAILABLE: "ISSUER_UNAVAILABLE",
    UNAUTHORIZED_CARD: "UNAUTHORIZED_CARD",
    CVN_NOT_MATCH: "CVN_NOT_MATCH",
    EXCEEDS_CREDIT_LIMIT: "EXCEEDS_CREDIT_LIMIT",
    INVALID_CVN: "INVALID_CVN",
    DECLINED_CHECK: "DECLINED_CHECK",
    BLACKLISTED_CUSTOMER: "BLACKLISTED_CUSTOMER",
    SUSPENDED_ACCOUNT: "SUSPENDED_ACCOUNT",
    PAYMENT_REFUSED: "PAYMENT_REFUSED",
    CV_FAILED: "CV_FAILED",
    INVALID_ACCOUNT: "INVALID_ACCOUNT",
    GENERAL_DECLINE: "GENERAL_DECLINE",
    DECISION_PROFILE_REJECT: "DECISION_PROFILE_REJECT",
    SCORE_EXCEEDS_THRESHOLD: "SCORE_EXCEEDS_THRESHOLD",
    PENDING_AUTHENTICATION: "PENDING_AUTHENTICATION",
    ACH_VERIFICATION_FAILED: "ACH_VERIFICATION_FAILED",
    DECISION_PROFILE_REVIEW: "DECISION_PROFILE_REVIEW",
    CONSUMER_AUTHENTICATION_REQUIRED: "CONSUMER_AUTHENTICATION_REQUIRED",
    CONSUMER_AUTHENTICATION_FAILED: "CONSUMER_AUTHENTICATION_FAILED",
    ALLOWABLE_PIN_RETRIES_EXCEEDED: "ALLOWABLE_PIN_RETRIES_EXCEEDED",
    PROCESSOR_ERROR: "PROCESSOR_ERROR",
    CUSTOMER_WATCHLIST_MATCH: "CUSTOMER_WATCHLIST_MATCH",
    ADDRESS_COUNTRY_WATCHLIST_MATCH: "ADDRESS_COUNTRY_WATCHLIST_MATCH",
    EMAIL_COUNTRY_WATCHLIST_MATCH: "EMAIL_COUNTRY_WATCHLIST_MATCH",
    IP_COUNTRY_WATCHLIST_MATCH: "IP_COUNTRY_WATCHLIST_MATCH",
    INVALID_MERCHANT_CONFIGURATION: "INVALID_MERCHANT_CONFIGURATION",
  },
  400: {
    MISSING_FIELD: "MISSING_FIELD",
    INVALID_DATA: "INVALID_DATA",
    DUPLICATE_REQUEST: "DUPLICATE_REQUEST",
    INVALID_CARD: "INVALID_CARD",
    CARD_TYPE_NOT_ACCEPTED: "CARD_TYPE_NOT_ACCEPTED",
    INVALID_MERCHANT_CONFIGURATION: "INVALID_MERCHANT_CONFIGURATION",
    PROCESSOR_UNAVAILABLE: "PROCESSOR_UNAVAILABLE",
    INVALID_AMOUNT: "INVALID_AMOUNT",
    INVALID_CARD_TYPE: "INVALID_CARD_TYPE",
    INVALID_PAYMENT_ID: "INVALID_PAYMENT_ID",
    NOT_SUPPORTED: "NOT_SUPPORTED",
  },
  500: {
    SYSTEM_ERROR: "SYSTEM_ERROR",
    SERVER_TIMEOUT: "SERVER_TIMEOUT",
    SERVICE_TIMEOUT: "SERVICE_TIMEOUT",
  },
};
