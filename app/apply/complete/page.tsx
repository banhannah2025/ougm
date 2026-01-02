export default function ApplicationCompletePage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
        Camp Mercy Application
      </p>
      <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">Application submitted</h1>
      <div className="space-y-3 text-base text-muted-foreground">
        <p>
          Thank you. Your application has been sent to Camp Mercy staff. We will review and follow up
          with next steps. If you have questions, contact the Camp Mercy Coordinator.
        </p>
        <p>You will also receive confirmation at the contact details you provided if applicable.</p>
      </div>
    </main>
  );
}
