// types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Add the `id` field to the User type
  }

  interface Session {
    user: User;
  }
}
