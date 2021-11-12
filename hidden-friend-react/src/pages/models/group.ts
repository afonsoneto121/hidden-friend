import { User } from "./user";

export interface Group {
  _id: string,
  name: string,
  description: string,
  admin: User,
  private: boolean,
  users: User[],
  matches: Map<string, string>,
  expand?: boolean,
}