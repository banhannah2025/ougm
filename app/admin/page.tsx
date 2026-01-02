import Link from "next/link";

import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/auth";

const cards = [
  {
    title: "Content",
    description: "Edit homepage copy, imagery references, and CTAs.",
    href: "/admin/content",
  },
  {
    title: "Users",
    description: "Manage who can sign in (allowlist) and roles.",
    href: "/admin/users",
  },
  {
    title: "Applications",
    description: "Review Camp Mercy applications (future intake flow).",
    href: "/admin/applications",
  },
];

export default async function AdminHomePage() {
  const { user } = await requireAdmin();
  const name = user.firstName || user.username || "Admin";

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">Welcome back, {name}</h2>
        <p className="text-sm text-muted-foreground">
          Start with content updates or update who can access the dashboard.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.href}
            className="flex flex-col gap-3 rounded-xl border border-border/70 bg-background/60 p-4"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </div>
            <Button asChild size="sm">
              <Link href={card.href}>Open</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
