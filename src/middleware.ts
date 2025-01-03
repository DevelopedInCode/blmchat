import { withAuth } from "next-auth/middleware";
import AppConfig from "@config";

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      const pathname = req.nextUrl.pathname;

      for (let pub of AppConfig.middleware.public_routes) {
        if (
          pub.pathname === pathname ||
          (pub.isParent && pathname.startsWith(pub.pathname))
        ) {
          return true;
        }
      }
      return !!token;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
});

export const config = {
  matcher: [
    /*
     * Match all pages except:
     * - API routes (/api/*)
     * - Static files in the public folder (/favicon.ico, etc.)
     * - Static Next.js files (_next/static/*, _next/image/*)
     * - Metadata files (/robots.txt, /sitemap.xml, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|public_bg).*)",
  ],
};
