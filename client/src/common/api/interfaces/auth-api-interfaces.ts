export interface LoginRequest {
  email: string;
  password: string;
}

export interface getUserInformationResponse {
  id: string;
  full_name: string;
  email: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  state: string;
}
