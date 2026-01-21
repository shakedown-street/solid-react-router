import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import type { CreateUserDTO } from '~/features/users/users.dto';
import { UserRepository } from '~/features/users/users.repository';
import { UserService } from '~/features/users/users.service';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: CreateUserDTO[] = [
  {
    username: 'admin',
    password: 'password',
  },
];

export async function main() {
  const userRepo = new UserRepository(prisma);
  const userService = new UserService(userRepo);

  for (const u of userData) {
    const existingUser = await userService.findUserById(1);
    if (!existingUser) {
      await userService.createUser(u);
    }
  }
}

main();
