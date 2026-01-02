"use server";

import { revalidatePath } from "next/cache";

import { createServiceRoleClient } from "@/lib/supabase/service-role";

export async function addAllowedUser(formData: FormData) {
  const email = (formData.get("email") as string)?.toLowerCase();
  const role = (formData.get("role") as string) || "admin";
  const rawRoles = (formData.get("roles") as string) || "";
  const note = (formData.get("note") as string) || null;

  if (!email) {
    throw new Error("Email is required");
  }

  const roles = Array.from(
    new Set(
      [role, ...rawRoles.split(",").map((r) => r.trim()).filter(Boolean)].map((r) =>
        r.toLowerCase(),
      ),
    ),
  );

  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("allowed_users")
    .upsert({ email, role: roles[0] ?? role, roles, note })
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/users");
}

export async function removeAllowedUser(email: string) {
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("allowed_users").delete().eq("email", email);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/admin/users");
}
