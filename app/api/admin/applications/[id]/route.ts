import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  await requireAdmin();
  if (!id) return NextResponse.json({ error: "Missing application id" }, { status: 400 });
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("camp_applications").select("*").eq("id", id).maybeSingle();
  if (error || !data) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }
  return NextResponse.json({ data });
}

export async function PATCH(req: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  await requireAdmin();
  const supabase = createServiceRoleClient();
  const { action } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing application id" }, { status: 400 });
  }
  if (!action || !["archive", "transfer"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const status = action === "archive" ? "archived" : "transferred";
  const { error } = await supabase
    .from("camp_applications")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Failed to update application", error);
    return NextResponse.json(
      { error: "Failed to update application", details: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, status });
}

export async function DELETE(_req: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  await requireAdmin();
  const supabase = createServiceRoleClient();
  if (!id) {
    return NextResponse.json({ error: "Missing application id" }, { status: 400 });
  }
  const { error } = await supabase.from("camp_applications").delete().eq("id", id);
  if (error) {
    console.error("Failed to delete application", error);
    return NextResponse.json(
      { error: "Failed to delete application", details: error.message },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
