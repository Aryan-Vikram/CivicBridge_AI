import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LayoutDashboard, FilePlus2, ListChecks, Compass, GraduationCap, Bell, User, Settings,
  Users, ClipboardList, Beaker, FileBox, BarChart3, MessageSquare,
  Landmark as LandmarkIcon, Factory,
} from "lucide-react";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import { PublicLayout } from "./layouts/PublicLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import HowItWorks from "./pages/HowItWorks";
import Universities from "./pages/Universities";
import UniversityProfile from "./pages/UniversityProfile";
import Industry from "./pages/Industry";
import Impact from "./pages/Impact";
import About from "./pages/About";
import Report from "./pages/Report";
import AIMatchingPage from "./pages/AIMatchingPage";
import Track from "./pages/Track";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import { Privacy, Terms } from "./pages/Legal";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import CitizenDashboard from "./pages/citizen/Dashboard";
import CitizenProfile from "./pages/citizen/Profile";

import UniversityDashboard from "./pages/university/Dashboard";
import UniversityChallengeWorkspace from "./pages/university/ChallengeWorkspace";

import GovernmentDashboard from "./pages/government/Dashboard";
import IndustryDashboard from "./pages/industry/Dashboard";

const citizenLinks = [
  { to: "/citizen/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/report", label: "Report Problem", icon: FilePlus2 },
  { to: "/citizen/dashboard", label: "My Challenges", icon: ListChecks },
  { to: "/explore", label: "Explore Challenges", icon: Compass },
  { to: "/universities", label: "University Network", icon: GraduationCap },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/citizen/profile", label: "Profile", icon: User },
];

const universityLinks = [
  { to: "/university/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/university/dashboard", label: "Assigned Challenges", icon: ClipboardList },
  { to: "/university/dashboard", label: "Research Teams", icon: Users },
  { to: "/university/dashboard", label: "Solutions", icon: Beaker },
  { to: "/university/dashboard", label: "Documents", icon: FileBox },
  { to: "/notifications", label: "Messages", icon: MessageSquare },
  { to: "/citizen/profile", label: "Settings", icon: Settings },
];

const governmentLinks = [
  { to: "/government/dashboard", label: "Command Center", icon: LandmarkIcon, end: true },
  { to: "/explore", label: "All Challenges", icon: Compass },
  { to: "/universities", label: "Universities", icon: GraduationCap },
  { to: "/industry", label: "Industry Partners", icon: Factory },
  { to: "/government/dashboard", label: "Analytics", icon: BarChart3 },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

const industryLinks = [
  { to: "/industry/dashboard", label: "Opportunities", icon: LayoutDashboard, end: true },
  { to: "/explore", label: "Challenges", icon: Compass },
  { to: "/universities", label: "Universities", icon: GraduationCap },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/citizen/profile", label: "Settings", icon: Settings },
];

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public site */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/ai-matching" element={<AIMatchingPage />} />
              <Route path="/universities" element={<Universities />} />
              <Route path="/universities/:id" element={<UniversityProfile />} />
              <Route path="/industry" element={<Industry />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/report" element={<Report />} />
              <Route path="/track/:challengeId" element={<Track />} />
              <Route path="/notifications" element={<Notifications />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route path="/citizen/profile" element={<CitizenProfile />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Citizen dashboard */}
            <Route
              element={
                <ProtectedRoute role="citizen">
                  <DashboardLayout title="Citizen" links={citizenLinks} />
                </ProtectedRoute>
              }
            >
              <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
            </Route>

            {/* University dashboard */}
            <Route
              element={
                <ProtectedRoute role="university">
                  <DashboardLayout title="University" links={universityLinks} />
                </ProtectedRoute>
              }
            >
              <Route path="/university/dashboard" element={<UniversityDashboard />} />
              <Route path="/university/challenges/:id" element={<UniversityChallengeWorkspace />} />
            </Route>

            {/* Government dashboard */}
            <Route
              element={
                <ProtectedRoute role="government">
                  <DashboardLayout title="Government" links={governmentLinks} />
                </ProtectedRoute>
              }
            >
              <Route path="/government/dashboard" element={<GovernmentDashboard />} />
            </Route>

            {/* Industry dashboard */}
            <Route
              element={
                <ProtectedRoute role="industry">
                  <DashboardLayout title="Industry" links={industryLinks} />
                </ProtectedRoute>
              }
            >
              <Route path="/industry/dashboard" element={<IndustryDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
