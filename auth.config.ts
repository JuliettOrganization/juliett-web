import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAccount = nextUrl.pathname.startsWith('/home_account');
      const isOnAccountselection = nextUrl.pathname.startsWith('/home_user');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      if (isOnAccount || isOnAccountselection || isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/home_user', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;