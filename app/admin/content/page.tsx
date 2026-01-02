import { requireAdmin } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

import { deleteSection, upsertSection } from "./actions";
import { Button } from "@/components/ui/button";

const defaultSections: Record<
  string,
  { title: string; body: string; image_url?: string | null }
> = {
  "home-hero": {
    title: "Safe, sober tiny homes where men rediscover stability, faith, and hope.",
    body:
      "Camp Mercy is a five-unit village on OUGM property offering Program Members a clean and sober refuge. Residents meet weekly with counselors, address barriers like addiction and legal issues, and take steps toward employment and self-sufficiency.",
  },
  "home-history": {
    title: "History of the Tiny House · Camp Mercy Project",
    body:
      "Skip Steffen, Executive Director, long dreamed of creating an island of refuge that is life on the street. He envisioned a place where folks would be met with love and acceptance, with accountability for sobriety and behaviors. The Mission’s tiny houses represent the culmination of that dream.",
  },
  "home-program": {
    title: "A clean and sober refuge with a path forward",
    body:
      "“Camp Mercy” provides Program Members respite, safety, and security in a clean and sober tiny house on OUGM property. It is a bridge away from the stresses and temptations of street life and toward a healthier future.",
  },
  "home-support": {
    title: "Your generosity sustains safe housing, counseling, and next steps.",
    body:
      "Donations help maintain the tiny homes, fund counseling support, and provide resources like transportation, employment coaching, and essentials for residents working toward stability.",
  },
};

export default async function AdminContentPage() {
  await requireAdmin();
  const supabase = createServiceRoleClient();

  const { data: sections = [] } = await supabase
    .from("page_sections")
    .select("slug, title, body, image_url")
    .order("slug");

  const existingSlugs = (sections ?? []).map((s) => s.slug);
  const allSlugs = Array.from(
    new Set([...existingSlugs, ...Object.keys(defaultSections)])
  ).sort();

  const bySlug = Object.fromEntries((sections ?? []).map((s) => [s.slug, s]));

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">Homepage content</h2>
        <p className="text-sm text-muted-foreground">
          Edit text and imagery for homepage sections. Existing content pre-populates; you can add or remove sections as needed.
        </p>
      </div>

      <AddSectionForm />

      <div className="grid gap-6">
        {allSlugs.map((slug) => (
          <SectionForm
            key={slug}
            slug={slug}
            data={bySlug[slug]}
            fallback={defaultSections[slug]}
          />
        ))}
      </div>
    </div>
  );
}

function AddSectionForm() {
  return (
    <form
      action={upsertSection}
      className="grid gap-3 rounded-xl border border-dashed border-border/70 bg-background/40 p-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-primary">Add Section</p>
          <h3 className="text-lg font-semibold text-foreground">Create a new homepage section</h3>
        </div>
        <Button type="submit" size="sm">
          Save
        </Button>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium text-foreground">Slug (unique)</label>
        <input
          type="text"
          name="slug"
          required
          placeholder="home-new-section"
          className="w-full rounded-lg border border-border/70 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium text-foreground">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Section title"
          className="w-full rounded-lg border border-border/70 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium text-foreground">Body</label>
        <textarea
          name="body"
          rows={3}
          placeholder="Section body content"
          className="w-full rounded-lg border border-border/70 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium text-foreground">Image URL (optional)</label>
        <input
          type="text"
          name="imageUrl"
          placeholder="/camp-mercy-images/image-1.png"
          className="w-full rounded-lg border border-border/70 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </form>
  );
}

function SectionForm({
  slug,
  data,
  fallback,
}: {
  slug: string;
  data?: { title: string | null; body: string | null; image_url: string | null };
  fallback?: { title: string; body: string; image_url?: string | null };
}) {
  return (
    <div className="grid gap-3 rounded-xl border border-border/70 bg-background/60 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-primary">Section</p>
          <h3 className="text-lg font-semibold text-foreground">{slug}</h3>
        </div>
        <form action={deleteSection}>
          <input type="hidden" name="slug" value={slug} />
          <Button type="submit" variant="outline" size="sm" className="text-destructive">
            Delete
          </Button>
        </form>
      </div>

      <form action={upsertSection} className="grid gap-3">
        <input type="hidden" name="slug" value={slug} />
        <div className="grid gap-2">
          <label className="text-sm font-medium text-foreground">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={data?.title ?? fallback?.title ?? ""}
            className="w-full rounded-lg border border-border/70 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-foreground">Body</label>
          <textarea
            name="body"
            defaultValue={data?.body ?? fallback?.body ?? ""}
            rows={4}
            className="w-full rounded-lg border border-border/70 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-foreground">Image URL (optional)</label>
          <input
            type="text"
            name="imageUrl"
            defaultValue={data?.image_url ?? fallback?.image_url ?? ""}
            placeholder="/camp-mercy-images/image-1.png"
            className="w-full rounded-lg border border-border/70 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" size="sm">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
