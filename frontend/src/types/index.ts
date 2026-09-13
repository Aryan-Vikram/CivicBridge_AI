export type Role = "citizen" | "university" | "government" | "industry" | "admin";

export type Category =
  | "Water Management"
  | "Health"
  | "Education"
  | "Infrastructure"
  | "Agriculture"
  | "Environment"
  | "Waste Management"
  | "Public Safety";

export type Severity = "Low" | "Medium" | "High" | "Critical";

export type ChallengeStatus =
  | "Submitted"
  | "AI Verified"
  | "University Assigned"
  | "University Accepted"
  | "Team Formed"
  | "Research"
  | "Solution Proposed"
  | "Prototype Testing"
  | "Government Review"
  | "Field Pilot"
  | "Implementation"
  | "Impact Verification"
  | "Completed";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarInitials: string;
  organization?: string;
}

export interface EvidenceItem {
  id: string;
  type: "photo" | "video" | "pdf" | "document";
  name: string;
  url: string;
  uploadedAt: string;
  verified: boolean;
}

export interface AIAnalysis {
  category: Category;
  severity: Severity;
  priorityScore: number; // out of 10
  estimatedAffected: number;
  similarChallengeCount: number;
  requiredExpertise: string[];
  confidence: number; // 0-1
  reasoning: string[];
}

export interface MatchReason {
  label: string;
  positive: boolean;
}

export interface UniversityMatch {
  universityId: string;
  matchScore: number; // 0-100
  reasons: MatchReason[];
  breakdown: {
    expertise: number;
    pastPerformance: number;
    infrastructure: number;
    facultyAvailability: number;
    proximity: number;
    workload: number;
  };
}

export interface Faculty {
  id: string;
  name: string;
  title: string;
  department: string;
  specialization: string[];
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  district: string;
  lat: number;
  lng: number;
  civicScore: number;
  completedChallenges: number;
  successRate: number;
  avgCompletionDays: number;
  departments: string[];
  topExpertise: string[];
  faculty: Faculty[];
  labs: string[];
  currentWorkload: number; // 0-100 percentage
  activeProjects: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  organization: string;
  progressPercent: number;
  evidenceUrls?: string[];
  documentUrls?: string[];
  status: "completed" | "in-progress" | "upcoming";
}

export interface ResearchTeamMember {
  name: string;
  role: "Faculty Mentor" | "Student Lead" | "Researcher" | "Domain Expert";
}

export interface IndustryOpportunity {
  id: string;
  title: string;
  challengeId: string;
  universityId: string;
  needType: "Manufacturing Partner" | "Funding" | "Technology" | "Deployment" | "Mentorship" | "Scaling";
  estimatedCost: string;
  description: string;
}

export interface Challenge {
  id: string;
  displayId: string;
  title: string;
  description: string;
  location: string;
  district: string;
  lat: number;
  lng: number;
  category: Category;
  severity: Severity;
  priorityScore: number;
  affectedCitizens: number;
  status: ChallengeStatus;
  progress: number;
  evidence: EvidenceItem[];
  aiAnalysis: AIAnalysis;
  similarChallengeIds: string[];
  assignedUniversityId?: string;
  assignedDepartment?: string;
  facultyMentor?: string;
  researchTeam?: ResearchTeamMember[];
  milestones: Milestone[];
  createdAt: string;
  updatedAt: string;
  submittedBy: string;
  verified: boolean;
}

export interface NotificationItemType {
  id: string;
  message: string;
  type: "success" | "info" | "warning";
  timestamp: string;
  read: boolean;
  challengeId?: string;
}
