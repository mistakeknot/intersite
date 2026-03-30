import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const isBypassRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/_astro/(.*)",
  "/favicon.ico",
]);

const ALLOWED_GITHUB_USERNAMES = ["mistakeknot"];

export const onRequest = clerkMiddleware((auth, context) => {
  if (isBypassRoute(context.request)) return;
  if (!isAdminRoute(context.request)) return;

  const { redirectToSignIn, userId, sessionClaims } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  // GitHub username allowlist
  const email = (sessionClaims as any)?.email as string | undefined;
  const allowedEmails = ["mk@generalsystemsventures.com"];
  if (email && !allowedEmails.includes(email)) {
    return new Response("Forbidden", { status: 403 });
  }
});
