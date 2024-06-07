import { User } from "./user.model";

export interface Project {
  id: string;
  user: User;
  name: string;
  description: string;
}
