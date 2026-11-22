export type HRUser = {
  employeeId: string;
  name: string;
  email: string;
  photo: string | null;
  role: "HR";
  phoneNumber: string;
};

export type LoginResponse = {
  success: boolean;
  message?: string;
  data?: {
    employeeId?: string;
    name?: string;
    email?: string;
    photo?: string | null;
    role?: string;
    phoneNumber?: string;
    access_token?: string;
  };
  access_token?: string;
};

export type AuthContextValue = {
  user: HRUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
