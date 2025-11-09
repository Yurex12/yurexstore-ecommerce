export type ApiResponseBase = {
  success: boolean;
  message: string;
};

export type ImagekitResponse = {
  signature: string;
  expire: number;
  token: string;
  publicKey: string;
};
