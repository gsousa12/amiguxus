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

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  state: string;
}
