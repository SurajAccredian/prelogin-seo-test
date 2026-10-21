// Official identity of each program's institute, keyed by the normalized `university_name`
// used in programs/*.json. Used for Course schema `provider`. Names not listed here get
// a provider with just the name (no url), never accredian.com.
export const INSTITUTES = {
  "iim visakhapatnam": { type: "CollegeOrUniversity", url: "https://www.iimv.ac.in" },
  "iim tiruchirappalli": { type: "CollegeOrUniversity", url: "https://www.iimtrichy.ac.in" },
  "iim lucknow": { type: "CollegeOrUniversity", url: "https://www.iiml.ac.in" },
  "iim ranchi": { type: "CollegeOrUniversity", url: "https://www.iimranchi.ac.in" },
  "iim amritsar": { type: "CollegeOrUniversity", url: "https://www.iimamritsar.ac.in" },
  "iim kashipur": { type: "CollegeOrUniversity", url: "https://www.iimkashipur.ac.in" },
  "iim sirmaur": { type: "CollegeOrUniversity", url: "https://www.iimsirmaur.ac.in" },
  "iim bodh gaya": { type: "CollegeOrUniversity", url: "https://www.iimbg.ac.in" },
  xlri: { type: "CollegeOrUniversity", url: "https://www.xlri.ac.in" },
  "xlri | delhi-ncr": { type: "CollegeOrUniversity", url: "https://www.xlri.ac.in" },
  "sp jain school of global management": { type: "CollegeOrUniversity", url: "https://www.spjain.org" },
  "department of entrepreneurship and management, iit hyderabad": { type: "CollegeOrUniversity", url: "https://iith.ac.in" },
  "i3c-iit jammu": { type: "EducationalOrganization", url: "https://www.iitjammu.ac.in" },
  "e&ict academy iit guwahati": { type: "EducationalOrganization", url: "https://eict.iitg.ac.in" },
  "e&ict academy iit kanpur": { type: "EducationalOrganization", url: "https://eicta.iitk.ac.in" },
  "iitm pravartak": { type: "EducationalOrganization", url: "https://www.iitm.ac.in/research-park/iitm-pravartak" },
};

export const getInstitute = (universityName) =>
  INSTITUTES[String(universityName || "").trim().toLowerCase()] || null;
