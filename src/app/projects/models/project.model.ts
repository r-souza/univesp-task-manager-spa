export class Project {
  id!: number;
  name!: string;
  description?: string;
  // tslint:disable-next-line: variable-name
  created_at?: Date;
  // tslint:disable-next-line: variable-name
  updated_at?: Date;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
