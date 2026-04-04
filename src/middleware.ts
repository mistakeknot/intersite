import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const isBypassRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/_astro/(.*)",
  "/favicon.ico",
]);

const ALLOWED_GITHUB_USERNAMES = (process.env.INTERSITE_AUTH_USERNAMES || "").split(",").filter(Boolean);
const allowedEmails = (process.env.INTERSITE_AUTH_EMAILS || "").split(",").filter(Boolean);

export const onRequest = clerkMiddleware((auth, context) => {
  if (isBypassRoute(context.request)) return;
  if (!isAdminRoute(context.request)) return;

  // If no allowlists configured, admin is open
  if (ALLOWED_GITHUB_USERNAMES.length === 0 && allowedEmails.length === 0) return;

  const { redirectToSignIn, userId, sessionClaims } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const email = (sessionClaims as any)?.email as string | undefined;
  if (allowedEmails.length > 0 && email && !allowedEmails.includes(email)) {
    return new Response("Forbidden", { status: 403 });
  }
});
