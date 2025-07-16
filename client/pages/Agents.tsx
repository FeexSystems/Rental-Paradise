import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Star,
  Phone,
  Mail,
  MapPin,
  Users,
  Building2,
  Wrench,
  Award,
  Calendar,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  type: "manager" | "realtor" | "vendor";
  title: string;
  company: string;
  rating: number;
  reviews: number;
  image: string;
  location: string;
  specialties: string[];
  experience: string;
  contact: {
    phone: string;
    email: string;
  };
  description: string;
  certifications?: string[];
  recentProjects?: string[];
  pricing?: string;
}

const agents: Agent[] = [
  {
    id: "1",
    name: "Sarah Martinez",
    type: "manager",
    title: "Senior Property Manager",
    company: "Key West Property Solutions",
    rating: 4.9,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Old Town Key West",
    specialties: ["Luxury Properties", "Vacation Rentals", "HOA Management"],
    experience: "8+ years",
    contact: {
      phone: "(305) 555-0123",
      email: "sarah@kwpropertysolutions.com",
    },
    description:
      "Specializing in high-end vacation rental management with a focus on maximizing revenue and guest satisfaction.",
    certifications: ["CPM", "RMP", "Florida Real Estate License"],
    recentProjects: [
      "Ocean Breeze Complex",
      "Mallory Square Condos",
      "Sunset Key Villas",
    ],
  },
  {
    id: "2",
    name: "Miguel Rodriguez",
    type: "realtor",
    title: "Licensed Real Estate Broker",
    company: "Tropical Realty Group",
    rating: 4.8,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Key West",
    specialties: [
      "Investment Properties",
      "Multi-Unit Buildings",
      "Commercial Real Estate",
    ],
    experience: "12+ years",
    contact: {
      phone: "(305) 555-0456",
      email: "miguel@tropicalrealty.com",
    },
    description:
      "Expert in Key West investment properties with extensive knowledge of market trends and ROI optimization.",
    certifications: ["Florida Broker License", "CCIM", "CRS"],
    recentProjects: [
      "$15M Marina Bay Complex Sale",
      "Duval Street Commercial",
      "Historic District Renovations",
    ],
  },
  {
    id: "3",
    name: "Elena Davis",
    type: "vendor",
    title: "Property Maintenance Specialist",
    company: "Island Maintenance Pro",
    rating: 4.7,
    reviews: 203,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Key West Area",
    specialties: [
      "HVAC Systems",
      "Plumbing",
      "Emergency Repairs",
      "Preventive Maintenance",
    ],
    experience: "15+ years",
    contact: {
      phone: "(305) 555-0789",
      email: "elena@islandmaintenance.com",
    },
    description:
      "24/7 emergency maintenance and repair services for vacation rental properties throughout Key West.",
    certifications: ["Licensed Contractor", "HVAC Certified", "EPA Certified"],
    pricing: "$85-150/hour + parts",
  },
  {
    id: "4",
    name: "David Thompson",
    type: "manager",
    title: "Vacation Rental Manager",
    company: "Paradise Property Management",
    rating: 4.6,
    reviews: 142,
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Stock Island",
    specialties: ["Revenue Optimization", "Guest Relations", "Marketing"],
    experience: "6+ years",
    contact: {
      phone: "(305) 555-0321",
      email: "david@paradisepm.com",
    },
    description:
      "Focused on maximizing rental income through strategic pricing and exceptional guest experiences.",
    certifications: ["RMP", "Marketing Certification"],
    recentProjects: [
      "Increased client revenue by 35%",
      "500+ 5-star reviews",
      "98% occupancy rate",
    ],
  },
  {
    id: "5",
    name: "Amanda Chen",
    type: "vendor",
    title: "Interior Design Consultant",
    company: "Coastal Design Studio",
    rating: 4.9,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Key West",
    specialties: [
      "Vacation Rental Staging",
      "Tropical Design",
      "Space Optimization",
    ],
    experience: "10+ years",
    contact: {
      phone: "(305) 555-0654",
      email: "amanda@coastaldesign.com",
    },
    description:
      "Transforming vacation rentals into stunning, bookable spaces that command premium rates.",
    certifications: ["NCIDQ", "ASID Member"],
    pricing: "$500-2000/room",
  },
  {
    id: "6",
    name: "Robert Wilson",
    type: "realtor",
    title: "Investment Property Specialist",
    company: "Keys Investment Realty",
    rating: 4.7,
    reviews: 167,
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Key West",
    specialties: ["Multi-Family Properties", "ROI Analysis", "1031 Exchanges"],
    experience: "20+ years",
    contact: {
      phone: "(305) 555-0987",
      email: "robert@keysinvestment.com",
    },
    description:
      "Helping investors build wealth through strategic Key West real estate acquisitions.",
    certifications: ["CCIM", "CRS", "Florida Broker License"],
    recentProjects: [
      "$50M in sales last year",
      "80+ investment properties sold",
      "Average 12% ROI for clients",
    ],
  },
];

export default function Agents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredAgents, setFilteredAgents] = useState(agents);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterAgents(query, activeTab);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    filterAgents(searchQuery, tab);
  };

  const filterAgents = (query: string, tab: string) => {
    let filtered = agents;

    // Filter by type
    if (tab !== "all") {
      filtered = filtered.filter((agent) => agent.type === tab);
    }

    // Filter by search query
    if (query.trim()) {
      filtered = filtered.filter(
        (agent) =>
          agent.name.toLowerCase().includes(query.toLowerCase()) ||
          agent.company.toLowerCase().includes(query.toLowerCase()) ||
          agent.specialties.some((specialty) =>
            specialty.toLowerCase().includes(query.toLowerCase()),
          ),
      );
    }

    setFilteredAgents(filtered);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "manager":
        return <Building2 className="h-4 w-4" />;
      case "realtor":
        return <Users className="h-4 w-4" />;
      case "vendor":
        return <Wrench className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "manager":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "realtor":
        return "bg-green-100 text-green-700 border-green-200";
      case "vendor":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-ocean-50 to-tropical-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-ocean-500 to-ocean-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Network
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Connect with verified property managers, real estate
              professionals, and trusted service providers
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative flex items-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-2">
                <div className="flex-1 flex items-center space-x-4 px-4">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, company, or specialty..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="border-none shadow-none text-lg text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
                  />
                </div>
                <Button
                  size="lg"
                  className="rounded-xl px-8 bg-primary hover:bg-primary/90"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="manager">Managers</TabsTrigger>
            <TabsTrigger value="realtor">Realtors</TabsTrigger>
            <TabsTrigger value="vendor">Vendors</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgents.map((agent) => (
            <Card
              key={agent.id}
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <Badge
                        className={`text-xs ${getTypeColor(agent.type)}`}
                        variant="outline"
                      >
                        {getTypeIcon(agent.type)}
                        <span className="ml-1 capitalize">{agent.type}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {agent.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {agent.company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{agent.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({agent.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {agent.location}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {agent.description}
                </p>

                {/* Specialties */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {agent.specialties.slice(0, 3).map((specialty, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {specialty}
                      </Badge>
                    ))}
                    {agent.specialties.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{agent.specialties.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Experience and Pricing */}
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="ml-1 font-medium">{agent.experience}</span>
                  </div>
                  {agent.pricing && (
                    <div>
                      <span className="text-muted-foreground">Rate:</span>
                      <span className="ml-1 font-medium text-primary">
                        {agent.pricing}
                      </span>
                    </div>
                  )}
                </div>

                {/* Certifications */}
                {agent.certifications && (
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      Certifications
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {agent.certifications.map((cert, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs border-green-200 text-green-700 bg-green-50"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Projects */}
                {agent.recentProjects && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Recent Highlights
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {agent.recentProjects
                        .slice(0, 2)
                        .map((project, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {project}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Contact Buttons */}
                <div className="flex space-x-2 pt-4">
                  <Button size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-16">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <div className="text-muted-foreground text-lg">
              No agents found matching your criteria. Try adjusting your search.
            </div>
          </div>
        )}

        {/* Join Network CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary to-ocean-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Professional Network
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Expand your business by connecting with property owners and managers
            in Key West's thriving vacation rental market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="rounded-xl px-8">
              <Users className="h-5 w-5 mr-2" />
              Apply as Agent
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl px-8 border-white text-white hover:bg-white hover:text-primary"
            >
              <Wrench className="h-5 w-5 mr-2" />
              Register as Vendor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
