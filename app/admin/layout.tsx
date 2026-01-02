import type { ReactNode } from "react";
import Link from "next/link";

import { requireAdmin } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/applications", label: "Applications" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { user, roles } = await requireAdmin();
  const name = user.firstName || user.username || user.id;
  const roleLabel = Array.isArray(roles) ? roles.join(", ") : "admin";

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Camp Mercy Admin</p>
          <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Signed in as {name} · {roleLabel}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline">
            <Link href="/">Back to site</Link>
          </Button>
        </div>
      </header>

      <nav className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg border border-border/70 px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <main className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-sm sm:p-8">
        {children}
      </main>
    </div>
  );
}
