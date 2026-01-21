import prisma from '~/lib/prisma';
import { AuthService } from './auth.service';
import { UserRepository } from '../users/users.repository';

export async function getAuthService(request: Request) {
  const userRepo = new UserRepository(prisma);
  return new AuthService(userRepo);
}
