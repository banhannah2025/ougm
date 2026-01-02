import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export async function GET() {
  await requireAdmin();
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("camp_applications")
    .select("id, applicant_name, email, status, submitted_at")
    .order("submitted_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to load applications" }, { status: 500 });
  }

  return NextResponse.json({ data });
}
