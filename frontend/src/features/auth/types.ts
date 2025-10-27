export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type UserRes = {
  success: boolean;
  message: string;
  user: User;
};
