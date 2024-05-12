export interface User {
  _id: number;
  email: string;
  name: string;
  address: string;
  nickname: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
}
