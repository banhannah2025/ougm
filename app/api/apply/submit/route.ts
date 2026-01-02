import { NextResponse } from "next/server";

import { createServiceRoleClient } from "@/lib/supabase/service-role";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const application = body?.application;
    const submittedAt = body?.submittedAt || new Date().toISOString();

    if (!application || typeof application !== "object") {
      return NextResponse.json({ error: "Invalid application payload" }, { status: 400 });
    }

    const personalInfo = application.personalInfo || {};
    const first = (personalInfo.legalFirstName as string) || "";
    const middle = (personalInfo.legalMiddleName as string) || "";
    const last = (personalInfo.legalLastName as string) || "";
    const applicantName = [first, middle, last].filter(Boolean).join(" ").trim() || null;
    const email = ((personalInfo.email as string) || "").trim() || null;

    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("camp_applications").insert({
      applicant_name: applicantName,
      email,
      status: "new",
      data: application,
      submitted_at: submittedAt,
    });

    if (error) {
      console.error("Failed to save application", error);
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to submit application", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
