export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type UserData = {
  success: boolean;
  message: string;
  user: User;
};
