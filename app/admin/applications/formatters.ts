type Section = {
  title: string;
  rows: { label: string; value: any; visible?: (data: any) => boolean }[];
};

export function formatApplication(data: any) {
  const sections: Section[] = [
    {
      title: "Personal Information",
      rows: [
        { label: "Full name", value: joinName(data.personalInfo) },
        { label: "Email", value: data.personalInfo?.email },
        { label: "Phone", value: data.personalInfo?.contactPhone },
        { label: "SSN", value: data.personalInfo?.ssn },
        { label: "Date of birth", value: data.personalInfo?.dob },
        { label: "Place of birth", value: data.personalInfo?.placeOfBirth },
        { label: "Mailing address", value: data.personalInfo?.mailingAddress },
      ],
    },
    {
      title: "Emergency Contact",
      rows: [
        { label: "Name", value: data.emergencyContact?.emergencyContactName },
        { label: "Relationship", value: data.emergencyContact?.emergencyContactRelationship },
        { label: "Phone", value: data.emergencyContact?.emergencyContactPhone },
      ],
    },
    {
      title: "Referral & Application",
      rows: [
        { label: "How heard about Camp Mercy", value: data.referral?.heardAbout },
        { label: "Application date", value: data.referral?.applicationDate },
      ],
    },
    {
      title: "Employment",
      rows: [
        { label: "Currently employed", value: data.employment?.currentlyEmployed },
        { label: "Employer", value: data.employment?.currentEmployer },
        { label: "Employment type", value: data.employment?.employmentType },
        { label: "Able to work full time", value: data.employment?.ableToWorkFullTime },
        { label: "Reason unable to work full time", value: data.employment?.unableToWorkExplanation },
        { label: "Past work experience", value: data.employment?.pastWorkExperience },
        { label: "Needs training", value: data.employment?.needTraining },
        { label: "Training field", value: data.employment?.trainingField },
        { label: "Attended employment training", value: data.employment?.attendedEmploymentTraining },
        {
          label: "Employment training details",
          value: data.employment?.attendedEmploymentTrainingDetails,
        },
        {
          label: "Currently in education",
          value: data.employment?.currentEducationProgram,
        },
        {
          label: "Education program details",
          value: data.employment?.currentEducationProgramDetails,
        },
        { label: "Diploma/GED", value: data.employment?.hasDiplomaOrGed },
        { label: "Wants GED help", value: data.employment?.wantGedHelp },
        { label: "Highest grade completed", value: data.employment?.highestGradeCompleted },
      ],
    },
    {
      title: "Housing & Relationships",
      rows: [
        {
          label: "Relationship status",
          value: arrayOrValue(data.housingBackground?.relationshipStatus),
        },
        { label: "Domestic violence history", value: data.housingBackground?.domesticViolenceHistory },
        {
          label: "Domestic violence details",
          value: data.housingBackground?.domesticViolenceDetails,
          visible: () => data.housingBackground?.domesticViolenceHistory === "yes",
        },
        { label: "Veteran", value: data.housingBackground?.veteranStatus },
        { label: "Supportive family", value: data.housingBackground?.supportiveFamily },
        { label: "Current living circumstances", value: data.housingBackground?.currentLivingCircumstances },
        { label: "Currently homeless/how long", value: data.housingBackground?.currentlyHomelessDuration },
        { label: "Slept last 30 nights", value: data.housingBackground?.sleepLast30Nights },
        { label: "Housing subsidy", value: data.housingBackground?.housingSubsidy },
        { label: "Rental history", value: data.housingBackground?.rentalHistory },
        { label: "Paid utilities", value: data.housingBackground?.paidUtilities },
        { label: "Eviction history", value: data.housingBackground?.evictionHistory },
        { label: "Reason left previous housing", value: data.housingBackground?.reasonLeftPreviousHousing },
      ],
    },
    {
      title: "Financial",
      rows: [
        { label: "Income source", value: data.financial?.incomeSource },
        { label: "Income amounts", value: data.financial?.incomeAmounts },
        { label: "Other income details", value: data.financial?.otherIncomeDetails },
        { label: "Outstanding debts", value: data.financial?.outstandingDebts },
        { label: "Monthly bills", value: data.financial?.monthlyBills },
        { label: "Settlements", value: data.financial?.settlements },
        { label: "Settlement details", value: data.financial?.settlementDetails },
      ],
    },
    {
      title: "Children",
      rows: [
        { label: "Has children", value: data.children?.hasChildren },
        { label: "Child ages", value: data.children?.childAges },
        { label: "Pays child support", value: data.children?.paysChildSupport },
        { label: "Child support amount", value: data.children?.childSupportAmount },
      ],
    },
    {
      title: "Medical",
      rows: [
        { label: "Diagnoses", value: arrayOrValue(data.medical?.diagnoses) },
        { label: "Diagnosis explanation", value: data.medical?.diagnosisExplanation },
        { label: "Receiving psychiatric care", value: data.medical?.receivingPsychCare },
        { label: "Psych medications", value: data.medical?.psychiatricMeds },
        { label: "Substance use disorder", value: data.medical?.substanceUseDisorder },
        { label: "Substance use details", value: data.medical?.substanceUseDetails },
        { label: "Recovery programs", value: data.medical?.recoveryPrograms },
        { label: "Recovery program names", value: data.medical?.recoveryProgramNames },
        { label: "Substance free duration", value: data.medical?.substanceFreeDuration },
        { label: "Willing to enter recovery", value: data.medical?.willingToEnterRecovery },
        { label: "Medical history", value: data.medical?.medicalHistory },
        { label: "Receiving medical care", value: data.medical?.receivingMedicalCare },
        { label: "Medical history details", value: data.medical?.medicalHistoryDetails },
        { label: "Hospitalized for conditions", value: data.medical?.hospitalizedForConditions },
        { label: "Hospitalization details", value: data.medical?.hospitalizationDetails },
        { label: "Medication allergies", value: data.medical?.medAllergies },
        { label: "Allergy details", value: data.medical?.medAllergyDetails },
        { label: "Taking prescribed meds", value: data.medical?.takingPrescribedMeds },
        { label: "Prescribed med details", value: data.medical?.prescribedMedDetails },
        { label: "Receiving dental care", value: data.medical?.receivingDentalCare },
      ],
    },
    {
      title: "Social Life",
      rows: [
        { label: "Faith activities", value: data.socialLife?.faithActivities },
        { label: "Social/recreational", value: data.socialLife?.socialNetworks },
        { label: "Social details", value: data.socialLife?.socialNetworksDetails },
        { label: "Hobbies", value: data.socialLife?.hobbies },
        { label: "Physical activity", value: data.socialLife?.physicalActivity },
      ],
    },
    {
      title: "Legal",
      rows: [
        { label: "Settlements", value: data.legalIssues?.legalSettlements },
        { label: "Settlement details", value: data.legalIssues?.legalSettlementsDetails },
        { label: "Prior arrests/convictions/incarcerations", value: data.legalIssues?.priorArrests },
        { label: "Prior arrests details", value: data.legalIssues?.priorArrestsDetails },
        { label: "Prior arrests status", value: data.legalIssues?.priorArrestsStatus },
        { label: "Current legal issues", value: data.legalIssues?.currentLegalIssues },
        { label: "Charges and court dates", value: data.legalIssues?.chargesAndCourtDates },
        { label: "Legal representation", value: data.legalIssues?.legalRepresentation },
        { label: "Representation details", value: data.legalIssues?.legalRepresentationDetails },
        { label: "On probation", value: data.legalIssues?.onProbation },
        { label: "Probation officer contact", value: data.legalIssues?.probationOfficer },
        { label: "Probation terms", value: data.legalIssues?.probationTerms },
      ],
    },
    {
      title: "Daily Living",
      rows: [
        { label: "Difficulties", value: arrayOrValue(data.dailyLiving?.dailyLiving) },
        { label: "Other (daily living)", value: data.dailyLiving?.dailyLivingOther },
      ],
    },
    {
      title: "Acknowledgements",
      rows: [
        { label: "Work requirements", value: data.workRequirements?.ackWorkRequirements },
        { label: "Program fee", value: data.programFee?.ackOperationFee },
        { label: "Financial stability plan", value: data.financialStability?.ackFinancialPlan },
        { label: "Intake/duration", value: data.intakeDuration?.ackIntakeDuration },
        { label: "Expectations/rules", value: data.expectationsRules?.ackExpectations },
        { label: "Curfew/quiet times", value: data.curfewQuietTimes?.ackCurfewQuietTimes },
        { label: "Restricted items", value: data.restrictedItems?.ackRestrictedItems },
        { label: "Security of keys", value: data.securityKeys?.ackSecurityKeys },
        { label: "General safety", value: data.generalSafety?.ackGeneralSafety },
        { label: "Physical boundaries", value: data.physicalBoundaries?.ackPhysicalBoundaries },
        { label: "Overnight absence", value: data.overnightAbsence?.ackOvernightAbsence },
        { label: "Abandonment", value: data.abandonment?.ackAbandonment },
        { label: "Relationships/visitors", value: data.relationshipsVisitors?.ackRelationshipsVisitors },
        { label: "Smoking policy", value: data.smokingPolicy?.ackSmokingPolicy },
        { label: "Drug testing", value: data.drugTesting?.ackDrugTesting },
        { label: "Contract signature", value: data.contractAcknowledgement?.ackContractSignature },
      ],
    },
  ];

  return sections.map((section) => ({
    title: section.title,
    rows: section.rows
      .filter((row) => (row.visible ? row.visible(data) : true))
      .filter((row) => row.value !== undefined && row.value !== null && row.value !== ""),
  }));
}

function joinName(personalInfo: any) {
  const first = personalInfo?.legalFirstName || "";
  const middle = personalInfo?.legalMiddleName || "";
  const last = personalInfo?.legalLastName || "";
  return [first, middle, last].filter(Boolean).join(" ").trim();
}

function arrayOrValue(val: any) {
  if (Array.isArray(val)) return val.join(", ");
  return val;
}
