import { getAuthService } from '~/features/auth/auth.factory.server';
import type { Route } from './+types/login';
import { redirect } from 'react-router';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const authService = await getAuthService(request);
  const setCookie = await authService.login({ username, password });

  return redirect('/', {
    headers: {
      'Set-Cookie': setCookie,
    },
  });
}

export default function LoginRoute({}: Route.ComponentProps) {
  return (
    <div className="container mx-auto mt-4 max-w-sm px-4">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" method="post">
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" required type="text" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" required type="password" />
            </div>
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
