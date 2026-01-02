export default function AccessDeniedPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-4 px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        Access Restricted
      </p>
      <h1 className="text-3xl font-semibold text-foreground">You can’t access this area yet.</h1>
      <p className="text-base text-muted-foreground">
        Your email isn’t on the approved list for Camp Mercy admin access. If you believe this is an
        error, contact an administrator to be added.
      </p>
    </main>
  );
}
