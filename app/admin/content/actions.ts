"use server";

import { revalidatePath } from "next/cache";

import { createServiceRoleClient } from "@/lib/supabase/service-role";

export async function upsertSection(formData: FormData) {
  const slug = (formData.get("slug") as string) || "home-hero";
  const title = (formData.get("title") as string) || "";
  const body = (formData.get("body") as string) || "";
  const imageUrl = (formData.get("imageUrl") as string) || null;

  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("page_sections")
    .upsert({ slug, title, body, image_url: imageUrl })
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin/content");
}

export async function deleteSection(formData: FormData) {
  const slug = (formData.get("slug") as string) || "";
  if (!slug) throw new Error("Missing slug");

  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("page_sections").delete().eq("slug", slug);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/content");
}
