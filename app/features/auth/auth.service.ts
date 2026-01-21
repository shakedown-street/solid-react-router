import { createCookieSessionStorage } from 'react-router';
import type { LoginDTO } from './auth.dto';
import type { IUserRepository } from '../users/users.repository';

const SESSION_SECRET = process.env.SESSION_SECRET!;

if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not set');
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
});

const USER_SESSION_KEY = 'userId';

export class AuthService {
  constructor(private userRepo: IUserRepository) {}

  async login(data: LoginDTO) {
    const user = await this.userRepo.checkPassword(data.username, data.password);

    if (!user) {
      throw new Error('Invalid username or password');
    }

    return this.createSession(user.id);
  }

  async createSession(userId: number) {
    const session = await sessionStorage.getSession();
    session.set(USER_SESSION_KEY, userId);

    return await sessionStorage.commitSession(session);
  }

  async logout(request: Request) {
    const session = await this.getSession(request);
    return await sessionStorage.destroySession(session);
  }

  async getSession(request: Request) {
    const cookie = request.headers.get('Cookie');

    return sessionStorage.getSession(cookie);
  }

  async getUserId(request: Request) {
    const session = await this.getSession(request);
    const userId = session.get(USER_SESSION_KEY);

    if (!userId || typeof userId !== 'number') {
      return null;
    }

    return userId;
  }

  async getUser(request: Request) {
    const userId = await this.getUserId(request);

    if (!userId) {
      return null;
    }

    const user = await this.userRepo.read(userId);
    return user;
  }

  async requireUser(request: Request) {
    const user = await this.getUser(request);

    if (!user) {
      throw new Error('User not authenticated');
    }

    return user;
  }

  async requireAnonymous(request: Request) {
    const user = await this.getUser(request);

    if (user) {
      throw new Error('User is already authenticated');
    }
  }
}
