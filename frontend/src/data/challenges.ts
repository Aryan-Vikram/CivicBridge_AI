import type { Challenge } from "../types";

const now = new Date();
const daysAgo = (n: number) => new Date(now.getTime() - n * 86400000).toISOString();

export const challenges: Challenge[] = [
  {
    id: "c-10452",
    displayId: "CB-JH-2026-10452",
    title: "Water Contamination in Village Well",
    description:
      "The primary drinking water well serving Barwadih village has become contaminated following industrial discharge from a nearby processing unit. Residents report a foul odour, discoloration, and rising cases of stomach illness among children.",
    location: "Barwadih Village, Ranchi",
    district: "Ranchi",
    lat: 23.32,
    lng: 85.38,
    category: "Water Management",
    severity: "High",
    priorityScore: 8.7,
    affectedCitizens: 850,
    status: "Prototype Testing",
    progress: 64,
    evidence: [
      { id: "e1", type: "photo", name: "well_water_sample.jpg", url: "", uploadedAt: daysAgo(46), verified: true },
      { id: "e2", type: "video", name: "resident_testimony.mp4", url: "", uploadedAt: daysAgo(46), verified: true },
      { id: "e3", type: "pdf", name: "local_clinic_report.pdf", url: "", uploadedAt: daysAgo(44), verified: true },
    ],
    aiAnalysis: {
      category: "Water Management",
      severity: "High",
      priorityScore: 8.7,
      estimatedAffected: 850,
      similarChallengeCount: 7,
      requiredExpertise: ["Environmental Engineering", "Civil Engineering", "Water Resources", "Chemistry"],
      confidence: 0.94,
      reasoning: [
        "Contamination markers described match industrial discharge patterns",
        "Reported symptoms consistent with waterborne illness",
        "Population density in radius indicates high-severity classification",
        "Clinic report corroborates health impact claims",
      ],
    },
    similarChallengeIds: ["c-2", "c-3"],
    assignedUniversityId: "u-bitm",
    assignedDepartment: "Environmental Engineering",
    facultyMentor: "Dr. A. Sharma",
    researchTeam: [
      { name: "Dr. A. Sharma", role: "Faculty Mentor" },
      { name: "Priya Nandy", role: "Student Lead" },
      { name: "Rohit Kachhap", role: "Researcher" },
      { name: "Dr. S. Iqbal (Chemistry)", role: "Domain Expert" },
    ],
    milestones: [
      { id: "m1", title: "Problem Submitted", description: "Citizen report filed with photo and video evidence.", date: daysAgo(46), organization: "Citizen", progressPercent: 5, status: "completed" },
      { id: "m2", title: "AI Verified", description: "AI cross-checked evidence and classified as Water Management, High severity.", date: daysAgo(45), organization: "CivicBridge AI", progressPercent: 12, status: "completed" },
      { id: "m3", title: "University Assigned", description: "BIT Mesra matched at 94% based on expertise and lab infrastructure.", date: daysAgo(44), organization: "CivicBridge AI", progressPercent: 20, status: "completed" },
      { id: "m4", title: "University Accepted", description: "Environmental Engineering department accepted the challenge.", date: daysAgo(42), organization: "BIT Mesra", progressPercent: 28, status: "completed" },
      { id: "m5", title: "Team Formed", description: "4-member research team assembled under Dr. A. Sharma.", date: daysAgo(40), organization: "BIT Mesra", progressPercent: 36, status: "completed" },
      { id: "m6", title: "Research Completed", description: "Water samples analysed from 6 locations; heavy metal traces confirmed.", date: daysAgo(28), organization: "BIT Mesra", progressPercent: 48, status: "completed" },
      { id: "m7", title: "Solution Proposed", description: "Low-cost multi-stage filtration unit proposed for community deployment.", date: daysAgo(20), organization: "BIT Mesra", progressPercent: 56, status: "completed" },
      { id: "m8", title: "Prototype Testing", description: "Filtration prototype under controlled testing across 6 sample points.", date: daysAgo(3), organization: "BIT Mesra", progressPercent: 64, evidenceUrls: ["filtration_test_results.jpg"], status: "in-progress" },
      { id: "m9", title: "Government Review", description: "Pending review for field pilot approval.", date: "", organization: "Govt. of Jharkhand", progressPercent: 72, status: "upcoming" },
      { id: "m10", title: "Field Pilot", description: "Pilot deployment across 50 households.", date: "", organization: "BIT Mesra + Govt.", progressPercent: 82, status: "upcoming" },
      { id: "m11", title: "Implementation", description: "Full village-wide rollout.", date: "", organization: "Govt. of Jharkhand", progressPercent: 92, status: "upcoming" },
      { id: "m12", title: "Impact Verification", description: "Post-implementation health and water quality audit.", date: "", organization: "CivicBridge AI", progressPercent: 97, status: "upcoming" },
      { id: "m13", title: "Completed", description: "Challenge closed with verified impact.", date: "", organization: "CivicBridge AI", progressPercent: 100, status: "upcoming" },
    ],
    createdAt: daysAgo(46),
    updatedAt: daysAgo(3),
    submittedBy: "Citizen · Ranchi",
    verified: true,
  },
  {
    id: "c-2",
    displayId: "CB-JH-2026-10298",
    title: "Flooded Rural Road Cuts Off School Access During Monsoon",
    description:
      "The only approach road to Government Middle School, Ormanjhi gets submerged every monsoon, forcing over 200 students to miss classes for weeks at a stretch.",
    location: "Ormanjhi, Ranchi",
    district: "Ranchi",
    lat: 23.53,
    lng: 85.42,
    category: "Infrastructure",
    severity: "High",
    priorityScore: 8.1,
    affectedCitizens: 620,
    status: "Research",
    progress: 38,
    evidence: [{ id: "e4", type: "photo", name: "flooded_road.jpg", url: "", uploadedAt: daysAgo(30), verified: true }],
    aiAnalysis: {
      category: "Infrastructure",
      severity: "High",
      priorityScore: 8.1,
      estimatedAffected: 620,
      similarChallengeCount: 3,
      requiredExpertise: ["Civil Engineering", "Hydrology", "Rural Infrastructure"],
      confidence: 0.91,
      reasoning: ["Recurring seasonal pattern confirmed across 3 years of reports", "School attendance directly impacted", "Drainage design deficiency identified from imagery"],
    },
    similarChallengeIds: [],
    assignedUniversityId: "u-nitjsr",
    assignedDepartment: "Civil Engineering",
    facultyMentor: "Dr. K. Oraon",
    researchTeam: [{ name: "Dr. K. Oraon", role: "Faculty Mentor" }, { name: "Ankita Mahato", role: "Student Lead" }],
    milestones: [
      { id: "m1", title: "Problem Submitted", description: "Reported with photo evidence of submerged road.", date: daysAgo(30), organization: "Citizen", progressPercent: 10, status: "completed" },
      { id: "m2", title: "AI Verified", description: "Classified as Infrastructure, High severity.", date: daysAgo(29), organization: "CivicBridge AI", progressPercent: 20, status: "completed" },
      { id: "m3", title: "University Assigned", description: "NIT Jamshedpur matched for drainage & rural infrastructure expertise.", date: daysAgo(27), organization: "CivicBridge AI", progressPercent: 30, status: "completed" },
      { id: "m4", title: "Research Started", description: "Topographic survey of the stretch underway.", date: daysAgo(15), organization: "NIT Jamshedpur", progressPercent: 38, status: "in-progress" },
    ],
    createdAt: daysAgo(30),
    updatedAt: daysAgo(15),
    submittedBy: "Citizen · Ranchi",
    verified: true,
  },
  {
    id: "c-3",
    displayId: "CB-JH-2026-10301",
    title: "Groundwater Depletion Threatens Irrigation in Ormanjhi Belt",
    description:
      "Borewell yields across 8 villages in the Ormanjhi belt have dropped sharply over two years, threatening the rabi crop cycle for over 400 farming households.",
    location: "Ormanjhi Belt, Ranchi",
    district: "Ranchi",
    lat: 23.55,
    lng: 85.44,
    category: "Agriculture",
    severity: "Medium",
    priorityScore: 6.9,
    affectedCitizens: 1600,
    status: "University Accepted",
    progress: 22,
    evidence: [{ id: "e5", type: "document", name: "borewell_yield_log.pdf", url: "", uploadedAt: daysAgo(20), verified: true }],
    aiAnalysis: {
      category: "Agriculture",
      severity: "Medium",
      priorityScore: 6.9,
      estimatedAffected: 1600,
      similarChallengeCount: 2,
      requiredExpertise: ["Groundwater Systems", "Irrigation Planning", "Agriculture Sciences"],
      confidence: 0.88,
      reasoning: ["Multi-year borewell data confirms declining trend", "Large downstream farming population affected"],
    },
    similarChallengeIds: [],
    assignedUniversityId: "u-ism",
    assignedDepartment: "Environmental Science",
    facultyMentor: "Dr. P. Verma",
    milestones: [
      { id: "m1", title: "Problem Submitted", description: "Borewell yield logs submitted by farmer collective.", date: daysAgo(20), organization: "Citizen", progressPercent: 10, status: "completed" },
      { id: "m2", title: "AI Verified", description: "Classified Agriculture, Medium severity.", date: daysAgo(19), organization: "CivicBridge AI", progressPercent: 18, status: "completed" },
      { id: "m3", title: "University Accepted", description: "IIT (ISM) Dhanbad accepted for groundwater modelling.", date: daysAgo(10), organization: "IIT (ISM) Dhanbad", progressPercent: 22, status: "in-progress" },
    ],
    createdAt: daysAgo(20),
    updatedAt: daysAgo(10),
    submittedBy: "Farmer Collective · Ranchi",
    verified: true,
  },
];

interface Seed {
  title: string;
  description: string;
  location: string;
  district: string;
  lat: number;
  lng: number;
  category: Challenge["category"];
  severity: Challenge["severity"];
  affected: number;
  status: Challenge["status"];
  universityId?: string;
  expertise: string[];
}

const seeds: Seed[] = [
  { title: "Broken Bridge Cuts Off School Connectivity", description: "The footbridge linking Kharsidih hamlet to the nearest school collapsed after last year's floods, forcing children to wade through a stream.", location: "Kharsidih, Bokaro", district: "Bokaro", lat: 23.66, lng: 86.0, category: "Infrastructure", severity: "Critical", affected: 340, status: "University Assigned", universityId: "u-nitjsr", expertise: ["Structural Engineering", "Civil Engineering"] },
  { title: "Waste Dumping Near Residential Colony", description: "An unregulated dumping site behind Ashok Nagar has expanded into residential lanes, drawing complaints of foul smell and rodent infestation.", location: "Ashok Nagar, Dhanbad", district: "Dhanbad", lat: 23.8, lng: 86.45, category: "Waste Management", severity: "Medium", affected: 950, status: "Submitted", expertise: ["Environmental Engineering", "Urban Planning"] },
  { title: "Frequent Transformer Failures in Industrial Belt", description: "Repeated transformer burnouts near the Adityapur industrial belt are causing multi-day power outages affecting small manufacturing units.", location: "Adityapur, Jamshedpur", district: "Jamshedpur", lat: 22.79, lng: 86.15, category: "Infrastructure", severity: "High", affected: 1200, status: "Research", universityId: "u-nitjsr", expertise: ["Electrical Engineering", "Power Systems"] },
  { title: "Chronic Medicine Shortage at Primary Health Centre", description: "The PHC serving Netarhat block has reported stockouts of essential medicines for three consecutive months, affecting chronic-care patients.", location: "Netarhat, Latehar", district: "Latehar", lat: 23.47, lng: 84.27, category: "Health", severity: "High", affected: 2100, status: "University Assigned", universityId: "u-cuj", expertise: ["Public Health", "Supply Chain Analytics"] },
  { title: "Unsafe Drinking Water in Government School", description: "Students at Government Upper Primary School, Bundu have reported illness after consuming water from an unfiltered hand pump on campus.", location: "Bundu, Ranchi", district: "Ranchi", lat: 23.17, lng: 85.58, category: "Health", severity: "High", affected: 310, status: "Team Formed", universityId: "u-bitm", expertise: ["Water Management", "Public Health"] },
  { title: "Drainage Failure Damaging Standing Crops", description: "Poor field drainage near Chandil is waterlogging paddy fields after every heavy rain, damaging crops for over 150 farmers.", location: "Chandil, Saraikela", district: "Saraikela-Kharsawan", lat: 22.95, lng: 86.05, category: "Agriculture", severity: "Medium", affected: 680, status: "Solution Proposed", universityId: "u-vbu", expertise: ["Agriculture Sciences", "Civil Engineering"] },
  { title: "Rural Street Lighting Gap Raises Safety Concerns", description: "Absence of street lighting along a 3km stretch near Angara has led to increased reports of unsafe evening commutes, especially for women.", location: "Angara, Ranchi", district: "Ranchi", lat: 23.28, lng: 85.55, category: "Public Safety", severity: "Medium", affected: 890, status: "Submitted", expertise: ["Electrical Engineering", "Urban Design"] },
  { title: "Sewage Overflow Near Market Area", description: "An overwhelmed sewage line near Bartand market has been overflowing for weeks, contaminating nearby stormwater drains.", location: "Bartand, Dhanbad", district: "Dhanbad", lat: 23.77, lng: 86.41, category: "Waste Management", severity: "High", affected: 1400, status: "University Accepted", universityId: "u-ism", expertise: ["Environmental Engineering", "Urban Infrastructure"] },
  { title: "Deteriorating Air Quality Near Industrial Zone", description: "Residents near the Jamadoba industrial cluster report worsening respiratory symptoms coinciding with rising particulate levels.", location: "Jamadoba, Dhanbad", district: "Dhanbad", lat: 23.75, lng: 86.4, category: "Environment", severity: "Critical", affected: 3200, status: "Research", universityId: "u-ism", expertise: ["Environmental Science", "Air Quality Monitoring"] },
  { title: "Overflowing Bins in Smart Waste Collection Pilot", description: "A newly deployed smart-bin pilot in Bariatu is malfunctioning, with sensors failing to trigger timely pickups.", location: "Bariatu, Ranchi", district: "Ranchi", lat: 23.39, lng: 85.31, category: "Waste Management", severity: "Low", affected: 480, status: "Prototype Testing", universityId: "u-bitm", expertise: ["IoT Systems", "Waste Management"] },
  { title: "Groundwater Table Falling in Peri-Urban Belt", description: "Borewells around Ratu are running dry earlier each year as urban expansion outpaces recharge planning.", location: "Ratu, Ranchi", district: "Ranchi", lat: 23.35, lng: 85.22, category: "Environment", severity: "Medium", affected: 2050, status: "University Assigned", universityId: "u-ism", expertise: ["Groundwater Systems", "Urban Planning"] },
  { title: "Limited Public Transport Access for Rural Workers", description: "Daily wage workers in Chas report losing income due to unreliable bus connectivity to the industrial estate.", location: "Chas, Bokaro", district: "Bokaro", lat: 23.64, lng: 86.16, category: "Infrastructure", severity: "Medium", affected: 1750, status: "Submitted", expertise: ["Transport Planning", "Urban Design"] },
  { title: "Contaminated Pond Water Used for Household Needs", description: "A village pond near Madhupur used for washing and cattle is showing signs of algal contamination linked to nearby fertilizer runoff.", location: "Madhupur, Deoghar", district: "Deoghar", lat: 24.26, lng: 86.64, category: "Water Management", severity: "High", affected: 730, status: "University Accepted", universityId: "u-bitm", expertise: ["Water Resources", "Chemistry"] },
  { title: "School Building Structural Cracks After Tremors", description: "Minor tremors last month have widened structural cracks in a government school building in Hazaribagh, raising safety concerns.", location: "Hazaribagh Town", district: "Hazaribagh", lat: 23.99, lng: 85.36, category: "Infrastructure", severity: "Critical", affected: 410, status: "University Assigned", universityId: "u-vbu", expertise: ["Structural Engineering"] },
  { title: "Crop Loss From Unseasonal Hailstorm", description: "A hailstorm damaged standing vegetable crops across Giridih block, affecting the income of over 300 smallholder farmers.", location: "Giridih Block", district: "Giridih", lat: 24.19, lng: 86.3, category: "Agriculture", severity: "Medium", affected: 900, status: "Submitted", expertise: ["Agriculture Sciences", "Crop Insurance Analytics"] },
  { title: "Open Manholes Pose Safety Risk on Main Road", description: "Several uncovered manholes on the Dumka-Jarmundi road have caused accidents, particularly at night.", location: "Dumka Town", district: "Dumka", lat: 24.27, lng: 87.25, category: "Public Safety", severity: "High", affected: 560, status: "Research", universityId: "u-xiss", expertise: ["Urban Infrastructure", "Public Safety Engineering"] },
  { title: "Delayed Immunisation Coverage in Remote Hamlets", description: "Remote hamlets around Simdega report low child immunisation coverage due to inconsistent outreach visits.", location: "Simdega District", district: "Simdega", lat: 22.62, lng: 84.51, category: "Health", severity: "High", affected: 1280, status: "Team Formed", universityId: "u-cuj", expertise: ["Public Health", "Rural Outreach Logistics"] },
];

let counter = 10500;
for (const s of seeds) {
  counter += 7;
  const university = s.universityId;
  const priority = s.severity === "Critical" ? 9.1 : s.severity === "High" ? 8.0 : s.severity === "Medium" ? 6.4 : 4.2;
  const created = daysAgo(Math.floor(Math.random() * 60) + 3);
  challenges.push({
    id: `c-${counter}`,
    displayId: `CB-JH-2026-${counter}`,
    title: s.title,
    description: s.description,
    location: s.location,
    district: s.district,
    lat: s.lat,
    lng: s.lng,
    category: s.category,
    severity: s.severity,
    priorityScore: priority,
    affectedCitizens: s.affected,
    status: s.status,
    progress:
      s.status === "Submitted" ? 8 :
      s.status === "University Assigned" ? 22 :
      s.status === "University Accepted" ? 30 :
      s.status === "Team Formed" ? 38 :
      s.status === "Research" ? 48 :
      s.status === "Solution Proposed" ? 58 :
      s.status === "Prototype Testing" ? 66 : 30,
    evidence: [{ id: `e-${counter}`, type: "photo", name: "evidence_01.jpg", url: "", uploadedAt: created, verified: true }],
    aiAnalysis: {
      category: s.category,
      severity: s.severity,
      priorityScore: priority,
      estimatedAffected: s.affected,
      similarChallengeCount: Math.floor(Math.random() * 5),
      requiredExpertise: s.expertise,
      confidence: 0.82 + Math.random() * 0.14,
      reasoning: [
        "Evidence and description consistent with stated category",
        "Population impact estimated from location density data",
        "Severity classification based on health/safety risk indicators",
      ],
    },
    similarChallengeIds: [],
    assignedUniversityId: university,
    assignedDepartment: university ? s.expertise[0] : undefined,
    milestones: [
      { id: "m1", title: "Problem Submitted", description: "Citizen report filed with supporting evidence.", date: created, organization: "Citizen", progressPercent: 8, status: "completed" },
      { id: "m2", title: "AI Verified", description: `Classified as ${s.category}, ${s.severity} severity.`, date: created, organization: "CivicBridge AI", progressPercent: 16, status: university ? "completed" : "in-progress" },
      ...(university ? [{ id: "m3", title: "University Assigned", description: "Matched with a suitable institution based on expertise and capacity.", date: created, organization: "CivicBridge AI", progressPercent: 24, status: "completed" as const }] : []),
    ],
    createdAt: created,
    updatedAt: created,
    submittedBy: `Citizen · ${s.district}`,
    verified: true,
  });
}

export function getChallengeById(id: string) {
  return challenges.find((c) => c.id === id || c.displayId === id);
}
