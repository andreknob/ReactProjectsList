export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IProject {
  id: number;
  name: string;
  description: string;
  ownerId: number;
}
