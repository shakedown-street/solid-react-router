import { getAuthService } from '~/features/auth/auth.factory.server';
import type { Route } from './+types/logout';
import { redirect } from 'react-router';

export async function loader({ request }: Route.LoaderArgs) {
  const authService = await getAuthService(request);
  const setCookie = await authService.logout(request);

  return redirect('/', {
    headers: { 'Set-Cookie': setCookie },
  });
}
