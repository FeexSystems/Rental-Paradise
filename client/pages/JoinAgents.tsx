import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Users,
  Star,
  ArrowLeft,
  CheckCircle,
  DollarSign,
  Shield,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function JoinAgents() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "",
    agentType: "",
    licenseNumber: "",
    company: "",
    bio: "",
    agreeToTerms: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Agent application submitted:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-ocean-50 to-tropical-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/agents">
            <Button variant="ghost" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Agents
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Join Our Professional Network
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Become part of Key West's premier real estate and property
            management network
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <DollarSign className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Competitive Commission</h3>
              <p className="text-sm text-muted-foreground">
                Industry-leading commission structure with performance bonuses
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Full Support</h3>
              <p className="text-sm text-muted-foreground">
                Marketing support, training programs, and dedicated assistance
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Premium Network</h3>
              <p className="text-sm text-muted-foreground">
                Access to exclusive properties and high-value clients
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              Agent Application
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="agentType">Agent Type *</Label>
                  <select
                    id="agentType"
                    className="w-full p-2 border border-input rounded-md"
                    value={formData.agentType}
                    onChange={(e) =>
                      handleInputChange("agentType", e.target.value)
                    }
                    required
                  >
                    <option value="">Select type</option>
                    <option value="property-manager">Property Manager</option>
                    <option value="real-estate-agent">Real Estate Agent</option>
                    <option value="vendor">Service Vendor</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <select
                    id="experience"
                    className="w-full p-2 border border-input rounded-md"
                    value={formData.experience}
                    onChange={(e) =>
                      handleInputChange("experience", e.target.value)
                    }
                    required
                  >
                    <option value="">Select experience</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) =>
                      handleInputChange("licenseNumber", e.target.value)
                    }
                    placeholder="If applicable"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Current Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    placeholder="If applicable"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Professional Bio *</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Tell us about your background, expertise, and why you want to join our network..."
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange("agreeToTerms", checked === true)
                  }
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!formData.agreeToTerms}
              >
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-2">
            Questions about joining our network?
          </p>
          <Link
            to="tel:+13122174976"
            className="text-primary hover:underline font-medium"
          >
            Contact us at +1 (312) 217-4976
          </Link>
        </div>
      </div>
    </div>
  );
}
