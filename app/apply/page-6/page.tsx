"use client";

import { StepForm } from "@/components/apply/StepForm";

const expectations = [
  "Prospective Program Members of Camp Mercy must have a picture ID. (The Mission will help individuals obtain an ID.) and pass a background check",
  "If you are on medications, you must take them as prescribed by your healthcare provider. Compliance in these matters is mandatory. Camp Coordinator reserves the right to audit prescription medication use versus prescribed dosage to check for compliance. If you participate in programs such as mental health, chemical dependency treatment, and/or homeless housing assistance, you must abide by their conditions, and must actively remain aware of the payment arrangements.",
  "There must be respect for the Camp Coordinator, Mission Staff other Program Members, Residents, and Mission guests. Respectful tone is when communicating with other individuals is required. If a situation arises, it is not appropriate to raise your voice and have an argument on site. If a conflict can't be resolved with respectful dialogue the Camp Mercy Coordinator or staff will help that process go to standard for the best interest of all involved. What is a  disrespectful tone will determined by the Camp Coordinator and communicated with any individual needing guidance. Respect the private property rights of others, businesses owners in the downtown Olympia area and our neighbors. Trespassing or loitering on property off site to the Mission is grounds for dismissal from the Program.",
  "Any ongoing disputes between Program Members that cannot be resolved should be brought to the attention of Management. Fighting, threatening, or intimidation of others will not be tolerated.",
  "Committing any illegal acts or or off, the premises will not be tolerated. This includes but is not limited to: theft or destruction of another's money, personal property or business property of the Mission or neighbors; domestic violence; physical or verbal abuse towards Program Members, any sexual advances towards mission guests, volunteers and staff. Camp Staff, visitors and neighbors; or trafficking drugs or stolen items. Borrowing, selling, or sharing of prescription medications will not be tolerated.",
  "If a resident has a car, before it is driven it must be legally registered and minimum insurance required by law must be active, along with of course a valid drivers license. This is to avoid further legal violations and fines in the future. Violation of any of the aforementioned may result in immediate eviction. Your car must have a Authorized Camp Mercy Resident Notice on your dashboard. Your car must be parked outside of the Camp Mercy gate away from the garbage containers.",
  "Program Members are encouraged to contact Camp Staff and / or emergency personnel if they feel like they or someone else is in danger. Mission Staff are to be notified immediately if this type of situation occurs.",
  "The Tiny Houses and surrounding areas must be kept organized, neat and clean at all times. Camp Coordinator will be the ultimate decision makers about what constitutes \"neat and clean.\" A weekly chore list is given in the welcome packet. There will be house checks to insure your tiny house is taken care of in the area of cleanliness. We want to ensure that the tiny house you are in is in good condition for the next resident and that they will last as long as possible. Please treat your tiny house and surrounding area with respect.",
  "Because the shared living space is limited, you must keep your belongings to a minimum that can be stored in the Tiny House. Program Members are encouraged to store bicycles in their Tiny House. However, outside storage is acceptable for one and only one bicycle. Camp Coordinator has the right to ask you to remove any unauthorized items and / or limit the number of personal items you can have. Laundry may not be hung to dry outside the Tiny Houses. Program Members may not store personal belongings outside the Tiny Houses, except for one bicycle, or in the common use area. Program members agree to participate in maintaining the common use areas of Camp Mercy.",
  "The Tiny Houses are the Property of the Mission. No modifications may be made without the permission of Mission Staff. Program Members will be responsible for any new damage not noted on the initial inspection form.",
  "The Olympia Union Gospel Mission is not responsible for Resident's personal property in cases of theft or damage.",
  'There shall be no "Campfires" in Camp Mercy, or any other open flame. At its option, the Mission may provide Program Members access to a barbecue approved for residential or commercial use.',
  "Program Members are discouraged from brining food into the Tiny Houses unless it will be consumed within an hour. Any food not being eaten within an hour must be stored in a container with a tight lid. (The Mission reserves the right to ban consumption or storage of all food in the Tiny Houses if rodents are attracted to the area.) If food that is not stored in a container when a house check is done the results will be marked down on the house check report.",
  "Attire and Dress. Dress appropriately for casual public places. Please wear at least a shirt, blouse, pants and shoes. Clothing with violent, sexual or drug themes is not permitted. Program Members are expected to remain neat, clean and wear clean clothes.",
  "Program Members must observe confidentiality of names or stories related to other Program Members.",
  "Feelings should be expressed appropriately; throwing objects, yelling, profanity, etc. , will not be tolerated. Be respectful of all Mission Staff, neighbors and their property.",
  "The volume of music and other noise producing activities must consider the right of other Program Members and Mission neighbors to the peaceful enjoyment of their surroundings. Be respectful of others. Mission Staff reserve the right to request that the volume of music or other noise producing activities be reduced. Volume levels shall not exceed limits set forth in OMC 18.40.080.14.",
];

export default function ExpectationsRulesCard() {
  const stepId = "expectationsRules";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Expectations and Rules for Camp Mercy</h1>
        </header>

        <ol className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
          {expectations.map((item, idx) => (
            <li key={item} className="flex gap-3 rounded-xl border border-border/50 bg-background/60 p-3">
              <span className="text-base font-semibold text-primary">{idx + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-5"
          nextHref="/apply/page-7"
          validate={(data) =>
            !data.ackExpectations
              ? "Please acknowledge the expectations and rules."
              : null
          }
        >
          {({ stepData }) => (
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name="ackExpectations"
                  required
                  defaultChecked={Boolean(stepData.ackExpectations)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>
                  I understand the expectations and rules of the camp mercy program and agree to follow them as
                  mandatory.
                </span>
              </label>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
