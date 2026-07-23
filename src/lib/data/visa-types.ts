import type { DownloadableForm, VisaType } from "@/lib/types";

export const visaTypes: VisaType[] = [
  {
    slug: "tourist-multiple-entry",
    title: "Temporary Visitor (Tourism): Multiple Entry",
    shortTitle: "Tourist Visa (Multiple Entry)",
    summary:
      "Visit Japan several times as a temporary visitor for tourism.",
    description:
      "For applicants who wish to visit Japan several times as a temporary visitor for tourism. Each stay in Japan must be within 30 days, and applicants must satisfy one of the Embassy's recognized eligibility categories (frequent traveler, business traveler, financial capacity, and more).",
    notes: [
      "The period of each stay in Japan must be within 30 days.",
      "Applicants must satisfy one of the recognized eligibility categories on the Multiple-Entry Request Form (frequent traveler, regular employee of a qualifying enterprise, cultural/intellectual figure, or spouse/child of a Japanese national holding a long-term visa).",
      "Supporting proof of your eligibility category (e.g. used visas/entry stamps, employment certificate) must be submitted, otherwise the request will not be granted.",
      "A single or double-entry visa may be granted instead, depending on the result of the Embassy's examination.",
    ],
    requiredDocuments: [
      { name: "Passport", detail: "Ensure your passport is self-signed." },
      {
        name: "Visa Application Form",
        detail:
          "With applicant's signature. If underage or with disability, a parent may sign on the applicant's behalf.",
      },
      {
        name: "1x Photograph",
        detail:
          "Color photo taken within 6 months (4.5cm x 3.5cm, clear image, no background).",
      },
      { name: "1x Color Copy of Passport Bio Page", detail: "" },
      { name: "1x Color Copy of used Japan Visa, if any", detail: "" },
      {
        name: "Request Form for Multiple-Entry Visa",
        detail: "Must be filled out completely, stating your reason for applying.",
      },
      {
        name: "Birth Certificate",
        detail:
          "Issued by PSA within 1 year. Unnecessary if there is a used Japan visa on your passport. If not readable, submit a Local Civil Registrar copy; if late registration, submit a Baptismal Certificate and Form 137; if no PSA record exists, submit an LCR copy plus a PSA Negative Certificate.",
      },
      {
        name: "Marriage Certificate",
        detail:
          "Issued by PSA within 1 year, for married applicants only. Unnecessary if there is a used Japan visa on your passport. Same alternate-document rules as the Birth Certificate.",
      },
      {
        name: "Itinerary in Japan",
        detail:
          "Enter your schedule of entry and departure (with flight info if possible) and accommodation details. Booking is not necessary.",
      },
      {
        name: "Applicant's Bank Certificate",
        detail:
          "Must show the Average Daily Balance for the last six months; if not indicated, a bank statement covering six months of transactions must be submitted instead.",
      },
      {
        name: "Income Tax Return (ITR) Certificate",
        detail:
          "BIR Form 2316 signed by both employer and employee. Business owners must also submit proof of actual tax payment.",
      },
      {
        name: "Applicant's Employment Certificate",
        detail:
          "Must indicate period of employment, salary, and position. Business owners submit a DTI Certificate of Business Name Registration and Mayor's Permit; students submit a School ID or Certificate of Enrollment.",
      },
      {
        name: "Authorization Letter",
        detail:
          "Showing all names of passengers; signed by the head of the family, company, or tour company as applicable.",
      },
      {
        name: "Company ID Card",
        detail: "If the application is submitted by a designated company representative.",
      },
    ],
  },
  {
    slug: "tourist-single-entry",
    title: "Temporary Visitor Visa: Single Entry (Tourism)",
    shortTitle: "Tourist Visa (Single Entry)",
    summary:
      "For first-time or occasional visitors traveling to Japan for tourism, leisure, or short trips.",
    description:
      "For first-time or occasional visitors traveling to Japan for tourism, leisure, or short trips. This visa allows a single entry into Japan.",
    notes: [
      "Validity: single entry. The visa may be used for one trip to Japan.",
      "Duration: each stay in Japan may be up to 90 days.",
    ],
    requiredDocuments: [
      { name: "Passport", detail: "Ensure your passport is self-signed." },
      {
        name: "Visa Application Form",
        detail:
          "With applicant's signature. If underage or with disability, a parent may sign on the applicant's behalf.",
      },
      {
        name: "1x Photograph",
        detail:
          "Color photo taken within 6 months (4.5cm x 3.5cm, clear image, no background).",
      },
      { name: "1x Color Copy of Passport Bio Page", detail: "" },
      { name: "1x Color Copy of used Japan Visa, if any", detail: "" },
      {
        name: "Birth Certificate",
        detail:
          "Issued by PSA within 1 year. Unnecessary if there is a used Japan visa on your passport. If not readable, submit a Local Civil Registrar copy; if late registration, submit a Baptismal Certificate and Form 137; if no PSA record exists, submit an LCR copy plus a PSA Negative Certificate.",
      },
      {
        name: "Marriage Certificate",
        detail:
          "Issued by PSA within 1 year, for married applicants only. Unnecessary if there is a used Japan visa on your passport. Same alternate-document rules as the Birth Certificate.",
      },
      {
        name: "Itinerary in Japan",
        detail:
          "Enter your schedule of entry and departure (with flight info if possible) and accommodation details. Booking is not necessary.",
      },
      {
        name: "Applicant's Bank Certificate",
        detail:
          "Must show the Average Daily Balance for the last six months; if not indicated, a bank statement covering six months of transactions must be submitted instead.",
      },
      {
        name: "Income Tax Return (ITR) Certificate",
        detail:
          "BIR Form 2316 signed by both employer and employee. Business owners must also submit proof of actual tax payment.",
      },
      {
        name: "Applicant's Employment Certificate",
        detail:
          "Must indicate period of employment, salary, and position. Business owners submit a DTI Certificate of Business Name Registration and Mayor's Permit; students submit a School ID or Certificate of Enrollment.",
      },
      {
        name: "Authorization Letter",
        detail:
          "Showing all names of passengers; signed by the head of the family, company, or tour company as applicable.",
      },
      {
        name: "Company ID Card",
        detail: "If the application is submitted by a designated company representative.",
      },
    ],
  },
  {
    slug: "visiting-relatives",
    title: "Visiting Relatives: Single Entry",
    shortTitle: "Visiting Relatives (Within 3rd Degree)",
    summary:
      "For visiting relatives residing in Japan within the third degree of relationship.",
    description:
      "For applicants visiting relatives residing in Japan within the third degree of relationship. If your relative in Japan is beyond the third degree, use the Visiting Friends or Distant Relatives visa instead.",
    notes: [
      "Submit the relevant relatives' Birth/Marriage Certificates needed to prove the third-degree relationship between the applicant and the inviter.",
      "Additional documents apply depending on whether the applicant or the guarantor will shoulder travel expenses.",
    ],
    requiredDocuments: [
      { name: "Passport", detail: "Ensure your passport is self-signed." },
      {
        name: "Visa Application Form",
        detail:
          "With applicant's signature; a parent may sign for a minor or applicant with disability. Include relatives' Birth/Marriage Certificates proving the third-degree relationship.",
      },
      {
        name: "1x Photograph",
        detail:
          "Color photo taken within 6 months (4.5cm x 3.5cm, clear image, no background).",
      },
      { name: "1x Color Copy of Passport Bio Page", detail: "" },
      {
        name: "Birth Certificate",
        detail:
          "Issued by PSA within 1 year. Same alternate-document rules apply if not readable, late-registered, or no PSA record.",
      },
      {
        name: "Marriage Certificate",
        detail: "Issued by PSA within 1 year, for married applicants only. Same alternate-document rules apply.",
      },
      {
        name: "Applicant's Bank Certificate",
        detail:
          "Required if the applicant shoulders travel expenses. Must show the Average Daily Balance for the last six months, or a six-month bank statement.",
      },
      {
        name: "Applicant's Tax Payment Certificate",
        detail:
          "Required if the applicant shoulders travel expenses. BIR Form 2316 signed by employer and employee; business owners must also submit proof of actual tax payment.",
      },
      { name: "Invitation Letter from the Inviter", detail: "From Japan." },
      { name: "Itinerary in Japan", detail: "Full itinerary details required." },
      {
        name: "Residence Certificate (Jumin-hyo) of Inviter and Guarantor",
        detail:
          "Must describe all household members (except Individual Number and Jumin-hyo Code). If the inviter or spouse is Japanese, submit their Family Register (Koseki-tohon) instead.",
      },
      {
        name: "Guarantee Letter",
        detail: "Required if the guarantor shoulders travel expenses.",
      },
      {
        name: "Income or Tax Certificate",
        detail:
          "Required if the guarantor shoulders travel expenses. One of: Income Certificate (Shotoku-shomeisho), Tax Certificate (Nozei-shomeisho), or Bank Certificate. Final Tax Return Form and Withholding Tax Certificate are not accepted.",
      },
      {
        name: "Authorization Letter",
        detail:
          "Showing all names of passengers; signed by the head of the family, company, or tour company as applicable.",
      },
      {
        name: "Company ID Card",
        detail: "If submitted by a designated company representative.",
      },
    ],
  },
  {
    slug: "visiting-friends-distant-relatives",
    title: "Visiting Friends or Distant Relatives: Single Entry",
    shortTitle: "Visiting Friends / Distant Relatives",
    summary: "For visiting friends or relatives in Japan beyond the third degree of relationship.",
    description:
      "For applicants visiting friends or distant relatives in Japan beyond the third degree of relationship.",
    notes: [
      "If you have a previously used Japanese visa in your passport, the Birth and Marriage Certificate requirements are waived.",
      "Proof of relationship (photos, emails, remittance receipts, passport stamps, etc.) is required for friends; relatives beyond the third degree submit a Birth/Marriage Certificate or Family Register instead.",
    ],
    requiredDocuments: [
      { name: "Passport", detail: "Ensure your passport is self-signed." },
      {
        name: "Visa Application Form",
        detail: "With applicant's signature; a parent may sign for a minor or applicant with disability.",
      },
      {
        name: "1x Photograph",
        detail: "Color photo taken within 6 months (4.5cm x 3.5cm, clear image, no background).",
      },
      { name: "1x Color Copy of Passport Bio Page", detail: "" },
      { name: "1x Color Copy of used Japan Visa, if any", detail: "" },
      {
        name: "Birth Certificate",
        detail:
          "Issued by PSA within 1 year. Unnecessary if there is a used Japan visa on your passport. Same alternate-document rules apply.",
      },
      {
        name: "Marriage Certificate",
        detail:
          "Issued by PSA within 1 year, for married applicants only. Unnecessary if there is a used Japan visa on your passport. Same alternate-document rules apply.",
      },
      {
        name: "Applicant's Bank Certificate",
        detail: "Required if the applicant shoulders travel expenses. Average Daily Balance for the last six months, or a six-month bank statement.",
      },
      {
        name: "Income Tax Return Certificate",
        detail:
          "Required if the applicant shoulders travel expenses. BIR Form 2316 signed by employer and employee; business owners must also submit proof of actual tax payment.",
      },
      {
        name: "Invitation Letter from the Inviter",
        detail: "Must describe the relationship between applicant and inviter in detail.",
      },
      { name: "Itinerary in Japan", detail: "Full itinerary details required." },
      {
        name: "Residence Certificate (Jumin-hyo)",
        detail:
          "Must describe all household members (except Individual Number and Jumin-hyo Code). If the inviter/guarantor is not Japanese, submit a photocopy of their Residence Card (both sides) instead.",
      },
      {
        name: "Guarantee Letter",
        detail: "Required if the guarantor shoulders travel expenses.",
      },
      {
        name: "Income or Tax Certificate",
        detail:
          "Required if the guarantor shoulders travel expenses. One of: Income Certificate (Shotoku-shomeisho), Tax Certificate (Nozei-shomeisho), or Bank Certificate.",
      },
      {
        name: "Proof of Relationship",
        detail:
          "For friends: photos, emails, remittance/parcel receipts, or passport stamps from the friend's country. For relatives beyond the third degree: Birth Certificate, Marriage Certificate, or Family Register (Koseki-tohon).",
      },
      {
        name: "Authorization Letter",
        detail: "Showing all names of passengers; signed by the head of the family, company, or tour company as applicable.",
      },
      { name: "Company ID Card", detail: "If submitted by a designated company representative." },
    ],
  },
  {
    slug: "spouse-child-japanese-national",
    title: "Spouse or Child of Japanese National Residing in the Philippines",
    shortTitle: "Spouse/Child of Japanese National",
    summary:
      "For the spouse or child of a Japanese national residing in the Philippines, visiting Japan temporarily.",
    description:
      "To apply for this visa, the Japanese spouse or parent must hold a long-term visa in the Philippines valid for six months or more. This visa is not available if the Japanese spouse/parent is staying in the Philippines only as a temporary visitor.",
    notes: [
      "Even with a multiple-entry visa, you cannot stay in Japan for more than half of the year in total under 'Temporary Visitor' status. A long-term stay status is required for that.",
    ],
    requiredDocuments: [
      { name: "Passport", detail: "Ensure your passport is self-signed." },
      {
        name: "Visa Application Form",
        detail: "With applicant's signature; a parent may sign for a minor or applicant with disability.",
      },
      {
        name: "1x Photograph",
        detail: "Color photo taken within 6 months (4.5cm x 3.5cm, clear image, no background).",
      },
      { name: "1x Color Copy of Passport Bio Page", detail: "" },
      {
        name: "Birth Certificate",
        detail: "Issued by PSA within 1 year. Same alternate-document rules apply if not readable, late-registered, or no PSA record.",
      },
      {
        name: "Marriage Certificate",
        detail: "Issued by PSA within 1 year, for married applicants only. Same alternate-document rules apply.",
      },
      {
        name: "Photocopy of Alien Certificate of Registration Card",
        detail: "Of the Japanese spouse/parent.",
      },
      {
        name: "Photocopy of Japanese Passport",
        detail: "Identification page and valid Philippine visa, of the Japanese spouse/parent.",
      },
      {
        name: "Employment Certificate",
        detail: "Of the householder. If not possible, submit an explanation letter instead.",
      },
      {
        name: "Photocopy of Income Tax Return (BIR Form)",
        detail: "Of the householder. If not possible, submit a Bank Certificate instead.",
      },
      {
        name: "Request for Multiple-Entry Temporary Visitor Visa",
        detail: "Completed request form, if applying for a multiple-entry visa.",
      },
      {
        name: "Family Register (Koseki-tohon)",
        detail: "If applying for a multiple-entry visa.",
      },
      {
        name: "Authorization Letter",
        detail: "Showing all names of passengers; signed by the head of the family, company, or tour company as applicable.",
      },
      { name: "Company ID Card", detail: "If submitted by a designated company representative." },
    ],
  },
  {
    slug: "student-worker-dependent",
    title: "Student, Worker, and Dependent",
    shortTitle: "Student / Worker / Dependent",
    summary: "For applicants holding a Certificate of Eligibility as a student, worker, or dependent in Japan.",
    description:
      "For students, workers, and their dependents who have already obtained a Certificate of Eligibility (COE) from Japan Immigration.",
    notes: [
      "A photocopy of the Certificate of Eligibility is sufficient. The original is not required.",
      "If you received your Certificate of Eligibility by email, submit a photocopy of that email.",
    ],
    requiredDocuments: [
      { name: "Passport", detail: "Holder's signature required." },
      {
        name: "Visa Application Form",
        detail: "With applicant's signature; a parent may sign for a minor or applicant with disability.",
      },
      {
        name: "1x Photograph",
        detail: "Color photo taken within 6 months (4.5cm x 3.5cm, clear image, no background).",
      },
      { name: "1x Color Copy of Passport Bio Page", detail: "" },
      {
        name: "Certificate of Eligibility",
        detail:
          "Photocopy only, no original needed. If received by email from Japan Immigration, submit a photocopy of the email.",
      },
      {
        name: "Birth Certificate",
        detail:
          "Issued by PSA within 1 year. Required for COE holders of Spouse/Child of Japanese, Spouse/Child of Permanent Resident, Long-Term Resident, and Dependent categories. Same alternate-document rules apply.",
      },
      {
        name: "Marriage Certificate",
        detail:
          "Issued by PSA within 1 year, for married applicants only. Required for the same COE categories above. Same alternate-document rules apply.",
      },
      {
        name: "Authorization Letter",
        detail: "Showing all names of passengers; signed by the head of the family, company, or tour company as applicable.",
      },
      { name: "Company ID Card", detail: "If submitted by a designated company representative." },
    ],
  },
];

export function getVisaTypeBySlug(slug: string) {
  return visaTypes.find((visa) => visa.slug === slug);
}

// Applications store the visa's full title (as chosen from the "New
// Application" select), not its slug — this looks it back up for the
// document checklist.
export function getVisaTypeByTitle(title: string) {
  return visaTypes.find((visa) => visa.title === title);
}

export const multipleEntryCategories = [
  {
    title: "1. A Frequent Traveler to Japan",
    points: [
      "Has traveled to Japan within the last 3 years and has financial capability",
      "Has traveled to Japan and other G7 countries several times within the last 3 years",
      "Has sufficient financial capacity",
      "Is a spouse/child of a person with sufficient financial capacity",
      "Has traveled to Japan twice or more in the last 3 years (Indian passport holders only)",
    ],
  },
  {
    title: "2. A Regular Employee (and spouse/child) of a Qualifying Enterprise",
    points: [
      "A public (governmental) enterprise",
      "A private enterprise listed on the stock exchange (PSE or foreign)",
      "A member of the Japanese Chamber of Commerce and Industry in the Philippines",
      "A joint venture, subsidiary, or branch office of a listed private enterprise",
      "A private enterprise with constant transactions with a Japanese listed enterprise",
      "One of the 'Top 1,000 Philippine corporations' by gross revenue",
      "Has traveled to Japan on business and other G7 countries several times within the last 3 years",
    ],
  },
  {
    title: "3. A Cultural or Intellectual Figure (and spouse/child)",
    points: [
      "An artist, humanities specialist, or scientist with relevant accomplishments",
      "A lawyer, CPA, patent attorney, notary, or medical doctor with a recognized qualification",
      "An amateur sports player with relevant accomplishments",
      "A full-time professor, assistant professor, or lecturer",
      "An executive or director of a national/public research institution or museum",
      "A Diet member, Governor, Bishop, government official, or local assemblyman",
    ],
  },
  {
    title: "4. A Spouse/Child of a Japanese National in the Philippines",
    points: [
      "Holds a long-term visa (excluding Tourist Visa) and lives with the Japanese national",
      "Has traveled to Japan once or more",
    ],
  },
];

export const applicationGuidelines = [
  {
    title: "Application Timeline",
    points: [
      "Average processing time is 5–7 working days, but this may vary depending on VFS and Embassy timelines.",
      "If you don't have a confirmed travel date, we recommend submitting your documents at least 2–3 months before your intended departure.",
      "Early submission allows ample time for processing, resolving potential issues during verification, and ensuring you receive your visa result well before your trip.",
    ],
  },
  {
    title: "Computerized Forms Only",
    points: [
      "All application forms must be typed (computerized), including Page 2, Inviter/Guarantor information in Japan, and the date.",
      "If there is no inviter/guarantor in Japan, type N/A in the relevant fields. Do not leave them blank.",
      "Handwritten forms will not be accepted and must be resubmitted in computerized format.",
    ],
  },
  {
    title: "Multiple-Entry Visa Applications",
    points: [
      "Submit a computerized Multiple-Entry Request Form clearly stating your reason for applying.",
      "Tick the box for your chosen eligibility category on the Multiple-Entry application form.",
    ],
  },
  {
    title: "Paper Size Requirement",
    points: [
      "All forms and authorization letters must be printed on A4-size paper.",
      "VFS is strict about paper size compliance.",
    ],
  },
  {
    title: "Form Accuracy",
    points: ["No erasures or corrections are allowed on the application form."],
  },
  {
    title: "Authorization Letters",
    points: ["Applicants must submit two (2) sets of authorization letters."],
  },
];

export const downloadableForms: DownloadableForm[] = [
  {
    id: "visa-application-form",
    name: "Visa Application Form (Japan)",
    description: "The standard Japan visa application form, required for every visa type.",
    fileName: "visa-application-form.pdf",
    fileType: "PDF",
    fileSize: "267 KB",
  },
  {
    id: "multiple-entry-request-form",
    name: "Multiple-Entry Request Form",
    description: "Required when applying for a multiple-entry temporary visitor visa.",
    fileName: "multiple-entry-request-form.pdf",
    fileType: "PDF",
    fileSize: "297 KB",
  },
  {
    id: "authorization-letter",
    name: "Authorization Letter",
    description: "Authorizes Calestia to file your application and release your passport on your behalf.",
    fileName: "authorization-letter.pdf",
    fileType: "PDF",
    fileSize: "389 KB",
  },
  {
    id: "guarantee-letter",
    name: "Letter of Guarantee",
    description: "For guarantors covering an applicant's expenses and return travel.",
    fileName: "guarantee-letter.pdf",
    fileType: "PDF",
    fileSize: "239 KB",
  },
  {
    id: "itinerary-format",
    name: "Travel Itinerary Format",
    description: "Template for listing your day-by-day activity plan and accommodation in Japan.",
    fileName: "itinerary-format.pdf",
    fileType: "PDF",
    fileSize: "600 KB",
  },
];
