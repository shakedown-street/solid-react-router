import type { CreateUserDTO, UpdateUserDTO } from './users.dto';
import { userSelect, type IUser } from './users.types';
import { PrismaClient } from 'generated/prisma/client';
import bcrypt from 'bcrypt';

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<IUser>;
  read(id: number): Promise<IUser | null>;
  list(): Promise<IUser[]>;
  update(id: number, data: UpdateUserDTO): Promise<IUser>;
  checkPassword(username: string, password: string): Promise<IUser | null>;
}

export class UserRepository implements IUserRepository {
  constructor(private db: PrismaClient) {}

  async create(data: CreateUserDTO): Promise<IUser> {
    const passwordHash = await bcrypt.hash(data.password, 12);

    return this.db.user.create({
      data: {
        username: data.username,
        passwordHash,
      },
      select: userSelect,
    });
  }

  async read(id: number): Promise<IUser | null> {
    return this.db.user.findUnique({
      where: { id },
      select: userSelect,
    });
  }

  async list(): Promise<IUser[]> {
    return this.db.user.findMany({
      select: userSelect,
    });
  }

  async update(id: number, data: UpdateUserDTO): Promise<IUser> {
    return this.db.user.update({
      where: { id },
      data,
      select: userSelect,
    });
  }

  async checkPassword(username: string, password: string): Promise<IUser | null> {
    const user = await this.db.user.findUnique({
      where: { username },
    });

    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return null;
    }

    const { passwordHash, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
