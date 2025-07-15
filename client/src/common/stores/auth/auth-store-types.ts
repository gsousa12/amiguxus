type UserJwtPayload = {
  userId: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
};

export type AuthStateType = {
  isAuthenticated: boolean;
  user: UserJwtPayload | null;
  setAuthenticated: (value: boolean) => void;
  setUser: (user: UserJwtPayload | null) => void;
};
