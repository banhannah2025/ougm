import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

import { createServiceRoleClient } from "@/lib/supabase/service-role";

export async function GET() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ role: null }, { status: 401 });
  }

  const email = user.emailAddresses[0]?.emailAddress?.toLowerCase();
  if (!email) {
    return NextResponse.json({ role: null }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const { data: allowed, error } = await supabase
    .from("allowed_users")
    .select("role, roles")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ role: null }, { status: 500 });
  }

  if (!allowed) {
    return NextResponse.json({ role: null }, { status: 403 });
  }

  const roles = allowed.roles ?? (allowed.role ? [allowed.role] : []);
  return NextResponse.json({ roles });
}
