import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { createServiceRoleClient } from "@/lib/supabase/service-role";

export const proxy = clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const email = typeof sessionClaims?.email === "string" ? sessionClaims.email.toLowerCase() : undefined;

  // Allow unauthenticated access to public pages
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (!userId) {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/sign-in?redirect_url=/admin", req.url));
    }
    return NextResponse.next();
  }

  // Enforce allowlist
  if (!email) {
    return NextResponse.redirect(new URL("/access-denied", req.url));
  }

  const supabase = createServiceRoleClient();
  const { data: allowed } = await supabase
    .from("allowed_users")
    .select("email, role, roles")
    .eq("email", email)
    .maybeSingle();

  if (!allowed) {
    return NextResponse.redirect(new URL("/access-denied", req.url));
  }

  const roles = allowed.roles ?? (allowed.role ? [allowed.role] : []);

  // Ensure a profile record exists for the user
  await supabase
    .from("user_profiles")
    .upsert({
      clerk_user_id: userId,
      email,
      role: roles[0] ?? "admin",
      roles: roles.length ? roles : ["admin"],
    })
    .select()
    .maybeSingle();

  // Admin-only guard
  if (isAdminRoute && !roles.includes("admin")) {
    return NextResponse.redirect(new URL("/access-denied", req.url));
  }

  // Allow all other requests
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
