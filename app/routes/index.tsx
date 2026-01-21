import { getUserService } from '~/features/users/users.factory.server';
import type { Route } from './+types/index';
import { getAuthService } from '~/features/auth/auth.factory.server';

export async function loader({ request }: Route.LoaderArgs) {
  const authService = await getAuthService(request);
  const user = await authService.getUser(request);

  const userService = await getUserService(request);
  const users = await userService.list();

  return {
    user,
    users,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { user, users } = loaderData;

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold">Home</h1>
        {user ? <p>Welcome back, {user.username}!</p> : null}
        <h4 className="text-lg font-bold">Users</h4>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul className="ml-4 list-disc">
            {users.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
