import { requireAdmin } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

import { ApplicationsTable } from "./table";

export default async function AdminApplicationsPage() {
  await requireAdmin();
  const supabase = createServiceRoleClient();

  const { data } = await supabase
    .from("camp_applications")
    .select("id, applicant_name, email, status, submitted_at")
    .order("submitted_at", { ascending: false });

  const applications = data ?? [];

  return <ApplicationsTable initialApplications={applications} />;
}
