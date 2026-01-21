import prisma from '~/lib/prisma';
import { UserRepository } from './users.repository';
import { UserService } from './users.service';

export async function getUserService(request: Request) {
  const repo = new UserRepository(prisma);
  return new UserService(repo);
}
