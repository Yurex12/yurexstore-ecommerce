export type User = {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  signUpMethod: 'EMAIL' | 'SOCIAL';
  createdAt: Date;
};

export type UserData = {
  success: boolean;
  message: string;
  user: User;
};
export type UsersData = {
  success: boolean;
  message: string;
  users: User[];
};
