import type { NextAuthConfig } from "next-auth";
import { sql } from "@vercel/postgres";

interface User {
  email: string;
  password: string;
  role: string;
  // other user fields
}

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAccount = nextUrl.pathname.startsWith("/home_account");
      const isOnAccountselection = nextUrl.pathname.startsWith("/home_user");
      const isAdminPage = nextUrl.pathname.startsWith("/home_user/admin");

      if (isLoggedIn) {
        if (isAdminPage) {
          if (!auth?.user?.email) {
            return Response.redirect(new URL("/login", nextUrl));
          }
          const user = await getUser(auth.user.email);
          if (user?.role === "admin") {
            return true;
          } else {
            return Response.redirect(new URL("/login", nextUrl));
          }
        }
        if (isOnAccount || isOnAccountselection) {
          return true;
        }
        return Response.redirect(new URL("/home_user", nextUrl));
      }

      if (isOnAccount || isOnAccountselection) {
        return false; // Redirect unauthenticated users to login page
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
