import { getUserService } from '~/features/users/users.factory.server';
import type { Route } from './+types/signup';
import { redirect } from 'react-router';
import { getAuthService } from '~/features/auth/auth.factory.server';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = formData.get('username') as string;
  const password1 = formData.get('password1') as string;
  const password2 = formData.get('password2') as string;

  if (password1 !== password2) {
    return { error: 'Passwords do not match' };
  }

  const userService = await getUserService(request);
  const newUser = await userService.create({ username, password: password1 });

  const authService = await getAuthService(request);
  const setCookie = await authService.createSession(newUser.id);

  return redirect('/', {
    headers: {
      'Set-Cookie': setCookie,
    },
  });
}

export default function SignupRoute({}: Route.ComponentProps) {
  return (
    <div className="container mx-auto mt-4 max-w-sm px-4">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" method="post">
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" required type="text" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="password1">Password</Label>
              <Input id="password1" name="password1" required type="password" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="password2">Password (Again)</Label>
              <Input id="password2" name="password2" required type="password" />
            </div>
            <Button type="submit">Sign Up</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
