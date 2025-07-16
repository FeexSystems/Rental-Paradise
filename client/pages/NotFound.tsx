import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Search,
  MapPin,
  Building2,
  Users,
  TrendingUp,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  Star,
  Compass,
  RefreshCw,
} from "lucide-react";

export default function NotFound() {
  const popularLinks = [
    {
      icon: Home,
      title: "Browse Properties",
      description: "Explore our featured vacation rentals",
      href: "/",
    },
    {
      icon: Building2,
      title: "Apartment Complexes",
      description: "Multi-unit investment opportunities",
      href: "/complexes",
    },
    {
      icon: Users,
      title: "Professional Agents",
      description: "Connect with property managers",
      href: "/agents",
    },
    {
      icon: TrendingUp,
      title: "Investment Portal",
      description: "Calculate ROI and explore deals",
      href: "/investments",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-ocean-50 to-tropical-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          {/* 404 Animation */}
          <div className="relative mb-8">
            <div className="text-9xl md:text-[200px] font-bold text-primary/20 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-8 shadow-xl">
                <MapPin className="h-16 w-16 text-primary animate-bounce" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Looks like you've wandered off the beaten path in Key West. Don't
            worry - let's get you back to paradise!
          </p>

          {/* Quick Search */}
          <Card className="max-w-md mx-auto mb-12 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Search</h3>
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search properties..." className="pl-10" />
                </div>
                <Button>Search</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Destinations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularLinks.map((link, index) => (
              <Link key={index} to={link.href}>
                <Card className="group hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-lg cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <link.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {link.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <Card className="bg-gradient-to-r from-primary to-ocean-600 text-white border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Our Key West experts are here to help you find the perfect rental
              or investment opportunity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="rounded-xl px-8">
                <Phone className="h-5 w-5 mr-2" />
                Call +1 (312) 217-4976
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-8 border-white text-white hover:bg-white hover:text-primary"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email Support
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link to="/">
            <Button size="lg" className="rounded-xl px-8">
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
