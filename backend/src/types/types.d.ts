type ROLE = 'USER' | 'ADMIN';

type USER = {
  userId: string;
  role: ROLE;
};

declare namespace Express {
  export interface Request {
    user: USER;
  }
}
