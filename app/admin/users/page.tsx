import { requireAdmin } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

import { addAllowedUser, removeAllowedUser } from "./actions";
import { Button } from "@/components/ui/button";

export default async function AdminUsersPage() {
  await requireAdmin();
  const supabase = createServiceRoleClient();

  const { data } = await supabase
    .from("allowed_users")
    .select("email, role, roles, note")
    .order("email");
  const allowed = data ?? [];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">Allowed users</h2>
        <p className="text-sm text-muted-foreground">
          Only emails on this list can sign up or sign in. Add admins first.
        </p>
      </div>

      <form action={addAllowedUser} className="grid gap-3 rounded-xl border border-border/70 p-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-foreground">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-lg border border-border/70 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="user@example.com"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-foreground">Role</label>
          <select
            name="role"
            className="w-full rounded-lg border border-border/70 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            defaultValue="admin"
          >
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-foreground">Additional roles (comma separated)</label>
          <input
            type="text"
            name="roles"
            className="w-full rounded-lg border border-border/70 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="program_participant, case_worker"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-foreground">Note (optional)</label>
          <input
            type="text"
            name="note"
            className="w-full rounded-lg border border-border/70 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="Context for this user"
          />
        </div>
        <Button type="submit" className="w-fit">
          Add / Update
        </Button>
      </form>

      <div className="overflow-hidden rounded-xl border border-border/70">
        <table className="min-w-full divide-y divide-border/70 text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Roles</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Note</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {allowed.map((user) => (
              <tr key={user.email}>
                <td className="px-4 py-3 text-foreground">{user.email}</td>
                <td className="px-4 py-3 capitalize text-muted-foreground">
                  {(user.roles && user.roles.length ? user.roles : [user.role]).join(", ")}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{user.note}</td>
                <td className="px-4 py-3 text-right">
                  <form action={removeAllowedUser.bind(null, user.email)}>
                    <Button type="submit" variant="ghost" size="sm">
                      Remove
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
            {allowed.length === 0 && (
              <tr>
                <td className="px-4 py-3 text-muted-foreground" colSpan={4}>
                  No allowed users yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
