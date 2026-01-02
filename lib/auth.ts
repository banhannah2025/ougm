import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { createServiceRoleClient } from "@/lib/supabase/service-role";

export async function requireAdmin() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in?redirect_url=/admin");
  }

  const email = user.emailAddresses[0]?.emailAddress?.toLowerCase();
  if (!email) {
    redirect("/access-denied");
  }

  const supabase = createServiceRoleClient();
  const { data: allowed, error } = await supabase
    .from("allowed_users")
    .select("email, role, roles")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Failed to check allowed_users", error);
    redirect("/access-denied");
  }

  const roles = allowed?.roles ?? (allowed?.role ? [allowed.role] : []);

  if (!allowed || !roles.includes("admin")) {
    redirect("/access-denied");
  }

  return {
    user,
    email,
    roles,
  };
}
