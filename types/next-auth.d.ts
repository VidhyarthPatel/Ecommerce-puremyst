// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;      // added
      name: string;
      email: string;
      image?: string;
    };
  }
}
