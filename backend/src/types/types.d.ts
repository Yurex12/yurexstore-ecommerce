// type ROLE = 'USER' | 'ADMIN';

type USER = {
  userId: string;
};

declare namespace Express {
  export interface Request {
    user: USER;
  }
}
