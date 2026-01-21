import { Link } from 'react-router';
import { Button } from './ui/button';
import type { IUser } from '~/features/users/users.types';

export type NavProps = {
  user: IUser | null;
};

export default function Nav({ user }: NavProps) {
  return (
    <>
      <div className="border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-4">
            <Link className="text-primary text-xl font-bold" to="/">
              My Cool Project
            </Link>
            <div className="flex items-center gap-4">
              {user ? (
                <Button asChild size="sm">
                  <Link to="/auth/logout">Logout</Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="sm" variant="ghost">
                    <Link to="/auth/signup">Sign Up</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link to="/auth/login">Login</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
