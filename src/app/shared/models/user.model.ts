export class User {
  id!: number;
  name!: string;
  email!: string;
  // tslint:disable-next-line: variable-name
  email_verified_at?: Date;
  disabled?: boolean;
  admin?: boolean;
  // tslint:disable-next-line: variable-name
  created_at?: Date;
  // tslint:disable-next-line: variable-name
  updated_at?: Date;
}
