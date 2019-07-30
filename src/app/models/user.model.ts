export interface IUser {
  username: string;
  password: string;
  userType: number;
  email: string;
  name: string;
  lastName: string;
  tel: string;
  age: number;
}

export class User implements IUser {
  username: string;
  password: string;
  userType: number;
  email: string;
  name: string;
  lastName: string;
  tel: string;
  age: number;
 constructor() {}
}