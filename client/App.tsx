import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import PropertyDetails from "./pages/PropertyDetails";
import Complexes from "./pages/Complexes";
import Agents from "./pages/Agents";
import Investments from "./pages/Investments";
import Login from "./pages/Login";
import Luxury from "./pages/Luxury";
import Waterfront from "./pages/Waterfront";
import ROICalculator from "./pages/ROICalculator";
import JoinAgents from "./pages/JoinAgents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/complexes" element={<Complexes />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/luxury" element={<Luxury />} />
            <Route path="/waterfront" element={<Waterfront />} />
            <Route path="/login" element={<Login />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
