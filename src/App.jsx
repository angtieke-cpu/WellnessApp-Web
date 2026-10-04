import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Pages */

import WelcomeScreen from "./pages/WelcomeScreen";

import LoginScreen from "./pages/LoginScreen";
import OTPScreen from "./pages/OTPScreen";

import RegistrationScreen from "./pages/RegistrationScreen";
import RegisterOTPScreen from "./pages/RegisterOTPScreen";

import StartJourney from "./pages/StartJourney";

import HomeDashboard from "./pages/HomeDashboard";
import PeriodCalendar from "./pages/PeriodCalendar";
import AIChat from "./pages/AIChat";
import Profile from "./pages/Profile";
import Log from "./pages/Log";

import TermsScreen from "./pages/TermsScreen";
import PrivacyScreen from "./pages/PrivacyScreen";
import HerSolaceDownload from "./pages/HerSolaceDownload";
import HomePage from "./pages/HomePage";

export default function App() {

return (

<BrowserRouter>

<Routes>

{/* Default */}

<Route path="/" element={<Navigate to="/welcome" />} />

{/* Auth */}

<Route path="/welcome" element={<WelcomeScreen />} />

<Route path="/home" element={<HomePage />} />  

<Route path="/login" element={<LoginScreen />} />

<Route path="/otp" element={<OTPScreen />} />

<Route path="/register" element={<RegistrationScreen />} />

<Route path="/register-otp" element={<RegisterOTPScreen />} />

{/* Onboarding */}

<Route path="/start-journey" element={<StartJourney />} />

{/* Main App */}

<Route path="/home" element={<HomeDashboard />} />

<Route path="/calendar" element={<PeriodCalendar />} />

<Route path="/ai" element={<AIChat />} />

<Route path="/log" element={<Log />} />

<Route path="/profile" element={<Profile />} />

{/* Legal */}

<Route path="/terms" element={<TermsScreen />} />

<Route path="/privacy" element={<PrivacyScreen />} />

<Route path="/download" element={<HerSolaceDownload />} />  

{/* Catch unknown routes */}

<Route path="*" element={<Navigate to="/welcome" />} />

</Routes>

</BrowserRouter>

);

}
