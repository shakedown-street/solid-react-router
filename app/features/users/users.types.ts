export interface IUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  firstName: string | null;
  lastName: string | null;
}

export const userSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  username: true,
  firstName: true,
  lastName: true,
};