export interface LoginRequest {
  email: string;
  password: string;
}

export interface getUserInformationResponse {
  userId: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
}
