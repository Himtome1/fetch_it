// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      driver?: boolean;
      user?: boolean;
      email?: string;
      name?: string;
      image?: string;
    }
  }

  interface User {
    driver?: boolean;
    user?: boolean;
  }

  interface JWT {
    driver?: boolean;
    user?: boolean;
  }
}
