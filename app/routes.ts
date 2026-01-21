import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/index.tsx'),
  route('/auth/login', 'routes/login.tsx'),
  route('/auth/signup', 'routes/signup.tsx'),
  route('/auth/logout', 'routes/logout.tsx'),
] satisfies RouteConfig;
