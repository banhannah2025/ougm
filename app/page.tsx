import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-14 px-4 pb-16 sm:px-6 lg:px-8">
      <section
        id="overview"
        className="mt-6 flex flex-col gap-8 rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur sm:mt-0 sm:p-10"
      >
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy · Olympia Union Gospel Mission
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Safe, sober tiny homes where men rediscover stability, faith, and hope.
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            Camp Mercy is a five-unit village on OUGM property offering Program Members a
            clean and sober refuge. Residents meet weekly with counselors, address barriers
            like addiction and legal issues, and take steps toward employment and
            self-sufficiency.
          </p>
        </div>
        <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <a href="/apply">Camp Mercy Application</a>
          </Button>
          <Button size="lg" variant="accent" asChild>
            <a href="#support">Donate</a>
          </Button>
        </div>
      </section>

      <section id="history" className="flex flex-col gap-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            History of the Tiny House · Camp Mercy Project
          </h2>
          <span className="text-xs uppercase tracking-[0.15em] text-primary">Our Story</span>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm">
            <div className="flex flex-col gap-3">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Skip Steffen, Executive Director, long dreamed of creating an island of refuge
                in the sea of chaos that is life on the street. He envisioned a place where
                folks would be met with love and acceptance, with accountability for sobriety
                and behaviors. The Mission’s tiny houses represent the culmination of that dream.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                The tiny houses were built as part of a New Market, Youth Build school project
                funded by the Lacey, Olympia, and Gateway Rotary Clubs. When the pandemic hit in
                March 2020 the project paused with partially completed homes.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                The project needed a home and volunteers to finish what had been started, so the
                City helped move six tiny homes onto the Mission property. Jack Olsen, a Mission
                board member, coordinated help to put the final touches on each house so they
                would be ready to be lived in.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-transparent" />
            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 sm:gap-4">
              <div className="flex flex-col gap-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-muted">
                  <Image
                    src="/camp-mercy-images/image-1.png"
                    alt="Camp Mercy tiny house exterior"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Tiny homes moved to OUGM property and finished by volunteers.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-muted">
                  <Image
                    src="/camp-mercy-images/image-2.png"
                    alt="Counselor Jackie Smith with residents"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Counselor Jackie Smith walks with residents through sobriety and employment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="program"
        className="grid gap-8 rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
      >
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Tiny House · Camp Mercy Program
          </p>
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            A clean and sober refuge with a path forward
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            “Camp Mercy” provides Program Members respite, safety, and security in a clean and
            sober tiny house on OUGM property. It is a bridge away from the stresses and
            temptations of street life and toward a healthier future.
          </p>
          <div className="grid gap-3">
            {[
              "Weekly counseling to uncover obstacles and build a plan.",
              "Support addressing addiction, health, and legal needs.",
              "Guidance toward employment plus budgeting and financial skills.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl bg-muted/70 p-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              The Mission does not require a profession of faith to be admitted to Camp Mercy, but
              encourages participants to explore faith during counseling and church services.
            </p>
            <p>
              “They have to produce fruit from this program. Some will make it and some will not.
              The ones we are aiming for don’t belong on the streets, don’t like the streets, and
              aren’t safe on the streets,” shares counselor Jackie Smith.
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-muted/50 p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="relative flex flex-col gap-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-card shadow">
              <Image
                src="/camp-mercy-images/image-3.png"
                alt="Tiny houses at Camp Mercy"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="rounded-xl border border-border/60 bg-card/90 p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">Is Camp Mercy for you?</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {[
                  "Why am I living on the street?",
                  "Am I content with my life the way it has been?",
                  "Who controls my life — drugs and unhealthy habits, or God?",
                  "What obstacles are preventing me from changing?",
                ].map((question) => (
                  <li key={question} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="support"
        className="grid gap-6 rounded-3xl border border-border/70 bg-gradient-to-br from-card/90 via-card to-muted/70 p-6 shadow-sm sm:p-10 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Partner with Camp Mercy
          </p>
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Your generosity sustains safe housing, counseling, and next steps.
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Donations help maintain the tiny homes, fund counseling support, and provide resources
            like transportation, employment coaching, and essentials for residents working toward
            stability.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="accent">
              <a href="#support">Donate</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="mailto:info@ougm.org">Talk with OUGM</a>
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card/90 p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground">What your gift supports</h3>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            {[
              "Household upkeep and comfort in each tiny home.",
              "Counseling sessions and sober community support.",
              "Job readiness, budgeting help, and transportation to services.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="apply"
        className="flex flex-col gap-5 rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-10"
      >
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Ready to apply?
          </p>
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
            Take the next step toward safety and sobriety.
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Complete the Camp Mercy application to connect with our team and explore a spot in the
            village. We’ll reach out with next steps.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <a href="#apply">Camp Mercy Application</a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="#support">Donate to the Program</a>
          </Button>
        </div>
      </section>
    </main>
  );
}
