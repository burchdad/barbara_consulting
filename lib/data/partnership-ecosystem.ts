export type PartnershipContact = {
  name: string;
  organization: string;
};

export const keyAdvisors: PartnershipContact[] = [
  { name: "Keith Wilson", organization: "USDA" },
  { name: "Schuyler Eldridge", organization: "former ASPR HCA" },
  { name: "Diane Frasier", organization: "former NIH HCA" },
  { name: "Torreon Creekmore", organization: "NGA, IARPA, ODNI" },
  { name: "Calvin Mitchell", organization: "former Dept. of Education HCA" },
  { name: "Lonnie Chin", organization: "FAA" },
  { name: "Guy Torres", organization: "former IRS CPO" },
  { name: "Karlos Morgan", organization: "DHS" },
];

export const keyTechnologists: PartnershipContact[] = [
  { name: "Torreon Creekmore", organization: "C-more Consulting" },
  { name: "Bill Pratt", organization: "Gov-IT Works, former CTO DHS" },
  { name: "Royce Allen", organization: "former CIO, Dept. of Commerce" },
  { name: "Darryl Peek", organization: "Elastic, former Sr. Program Director DHS" },
  { name: "Avery Muse", organization: "The Muse Group, former Deputy CIO, HHS OIT" },
  { name: "Jose Arrieta", organization: "Navy Board of Advisors" },
  { name: "Jamie Gracia", organization: "Wolverine Group, former Dept. of State Industry Liaison" },
];

export const ecosystemChannels = [
  {
    title: "Advisory Access",
    body: "Senior acquisition, HCA, CPO, and federal mission advisors help shape practical routes into agency requirements, bid positioning, and procurement readiness.",
  },
  {
    title: "Technology Bench",
    body: "Experienced CIO, CTO, cybersecurity, data, search, and systems leaders strengthen the technical perspective behind modernization opportunities.",
  },
  {
    title: "Teaming Ecosystem",
    body: "Partner and advisory relationships help GMTS align the right delivery capacity, past-performance context, and technical credibility for larger opportunities.",
  },
];

export const positioningSignals = [
  "Federal acquisition perspective",
  "Former HCA and CPO insight",
  "CIO and CTO modernization guidance",
  "DHS, USDA, FAA, IRS, Navy, and State experience",
  "Search, data, cybersecurity, and systems leadership",
  "Bid readiness and partner alignment",
];
