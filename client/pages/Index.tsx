import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Users,
  Bed,
  Bath,
  Star,
  Wifi,
  Car,
  Waves,
  Coffee,
  Play,
  TrendingUp,
  Building2,
  DollarSign,
  Calculator,
  PieChart,
  Target,
  ArrowRight,
} from "lucide-react";
import { ScrapedProperty, ScrapePropertiesResponse } from "@shared/api";
import { getImageFromPropertyData } from "@/lib/imageService";

interface Property extends ScrapedProperty {
  isWishlisted?: boolean;
}

// Generate mock properties with unique images
const generateMockProperties = (): Property[] => {
  const baseProperties = [
    {
      id: "1",
      title: "Stunning Ocean View Condo in Old Town",
      price: 285,
      rating: 4.9,
      reviews: 127,
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      location: "Old Town Key West",
      amenities: ["Wifi", "Ocean View", "Parking", "Kitchen"],
      host: "Sarah",
    },
    {
      id: "2",
      title: "Charming Historic Cottage Near Duval",
      price: 195,
      rating: 4.8,
      reviews: 89,
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      location: "Historic District",
      amenities: ["Wifi", "AC", "Historic Charm", "Walking Distance"],
      host: "Miguel",
    },
    {
      id: "3",
      title: "Tropical Paradise with Private Pool",
      price: 425,
      rating: 5.0,
      reviews: 43,
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      location: "Sunrise Shores",
      amenities: ["Private Pool", "Wifi", "BBQ", "Tropical Garden"],
      host: "Elena",
    },
    {
      id: "4",
      title: "Modern Waterfront Apartment",
      price: 345,
      rating: 4.7,
      reviews: 156,
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      location: "Key West Marina",
      amenities: ["Waterfront", "Modern", "Gym", "Concierge"],
      host: "David",
    },
    {
      id: "5",
      title: "Cozy Beach House Steps from Sand",
      price: 265,
      rating: 4.6,
      reviews: 78,
      guests: 5,
      bedrooms: 2,
      bathrooms: 1,
      location: "Smathers Beach",
      amenities: ["Beach Access", "Kayak", "Snorkel Gear", "Outdoor Shower"],
      host: "Amanda",
    },
    {
      id: "6",
      title: "Luxury Penthouse with Sunset Views",
      price: 595,
      rating: 4.9,
      reviews: 92,
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      location: "Mallory Square",
      amenities: ["Rooftop Terrace", "Sunset Views", "Luxury", "Elevator"],
      host: "Robert",
    },
  ];

  return baseProperties.map((property) => ({
    ...property,
    image: getImageFromPropertyData(property, "medium"),
    source: "mock",
  }));
};

const mockProperties: Property[] = generateMockProperties();

const getAmenityIcon = (amenity: string) => {
  switch (amenity.toLowerCase()) {
    case "wifi":
      return <Wifi className="h-4 w-4" />;
    case "parking":
    case "car":
      return <Car className="h-4 w-4" />;
    case "ocean view":
    case "waterfront":
    case "beach access":
      return <Waves className="h-4 w-4" />;
    default:
      return <Coffee className="h-4 w-4" />;
  }
};

export default function Index() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] =
    useState<Property[]>(mockProperties);
  const [scrapedProperties, setScrapedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [useRealTimeData, setUseRealTimeData] = useState(false);

  // Load scraped properties on component mount
  useEffect(() => {
    loadScrapedProperties();
  }, []);

  // Handle URL parameters for search and category
  useEffect(() => {
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    if (search) {
      setSearchQuery(search);
      handleSearch(search);
    } else if (category) {
      handleCategoryFilter(category);
    }
  }, [searchParams, useRealTimeData]);

  const loadScrapedProperties = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/scrape-properties");
      const data: ScrapePropertiesResponse = await response.json();

      if (data.success && data.properties.length > 0) {
        const properties: Property[] = data.properties.map((prop) => ({
          ...prop,
          rating: prop.rating || 4.5,
          reviews: prop.reviews || 50,
          guests: prop.guests || 2,
          bedrooms: prop.bedrooms || 1,
          bathrooms: prop.bathrooms || 1,
          host: prop.host || "Host",
          image: getImageFromPropertyData(prop, "medium"),
          isWishlisted: false,
        }));
        setScrapedProperties(properties);
        setUseRealTimeData(true);
        setFilteredProperties(properties);
      }
    } catch (error) {
      console.error("Failed to load scraped properties:", error);
      setFilteredProperties(mockProperties);
    } finally {
      setIsLoading(false);
    }
  };

  const currentProperties = useRealTimeData
    ? scrapedProperties
    : mockProperties;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredProperties(currentProperties);
    } else {
      const filtered = currentProperties.filter(
        (property) =>
          property.title.toLowerCase().includes(query.toLowerCase()) ||
          property.location.toLowerCase().includes(query.toLowerCase()) ||
          property.amenities.some((amenity) =>
            amenity.toLowerCase().includes(query.toLowerCase()),
          ),
      );
      setFilteredProperties(filtered);
    }
  };

  const handleCategoryFilter = (category: string) => {
    let filtered = currentProperties;

    switch (category.toLowerCase()) {
      case "luxury":
        filtered = currentProperties.filter(
          (property) =>
            property.price > 400 ||
            property.title.toLowerCase().includes("luxury") ||
            property.title.toLowerCase().includes("penthouse") ||
            property.amenities.some(
              (amenity) =>
                amenity.toLowerCase().includes("luxury") ||
                amenity.toLowerCase().includes("premium"),
            ),
        );
        break;
      case "waterfront":
        filtered = currentProperties.filter(
          (property) =>
            property.title.toLowerCase().includes("ocean") ||
            property.title.toLowerCase().includes("waterfront") ||
            property.title.toLowerCase().includes("beach") ||
            property.amenities.some(
              (amenity) =>
                amenity.toLowerCase().includes("ocean") ||
                amenity.toLowerCase().includes("waterfront") ||
                amenity.toLowerCase().includes("beach"),
            ),
        );
        break;
      default:
        filtered = currentProperties;
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-ocean-50 to-tropical-50">
      {/* Hero Section with Key West Real Estate Video */}
      <div className="relative overflow-hidden min-h-screen">
        {/* Key West Real Estate Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            {/* Key West Real Estate Videos - Updated with real Key West content */}
            <source
              src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9a1c1e4&profile_id=165"
              type="video/mp4"
            />
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
              type="video/mp4"
            />
            {/* Fallback to Key West themed background */}
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=2400')`,
              }}
            />
          </video>

          {/* Video Play Button Overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Button
              size="lg"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white rounded-full p-6"
            >
              <Play className="h-8 w-8" />
            </Button>
          </div>

          {/* Enhanced overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-600/30 via-transparent to-ocean-900/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-ocean-500/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              Discover
              <span className="text-coral-400 block mt-2">Key West Real Estate</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Premium investment opportunities in paradise. Luxury rentals, waterfront properties, and exceptional ROI potential.
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative flex items-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-2">
                <div className="flex-1 flex items-center space-x-4 px-4">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search properties, locations, or investment opportunities..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="border-none shadow-none text-lg placeholder:text-muted-foreground focus-visible:ring-0"
                  />
                </div>
                <Button
                  size="lg"
                  className="rounded-xl px-8 bg-primary hover:bg-primary/90 shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>

            {/* Investment Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-2xl font-bold text-white flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2" />
                  12.5%
                </div>
                <div className="text-white/80">Avg ROI</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-2xl font-bold text-white flex items-center">
                  <Building2 className="h-6 w-6 mr-2" />
                  200+
                </div>
                <div className="text-white/80">Properties</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-2xl font-bold text-white flex items-center">
                  <DollarSign className="h-6 w-6 mr-2" />
                  $385
                </div>
                <div className="text-white/80">Avg Nightly</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-2xl font-bold text-white">4.8★</div>
                <div className="text-white/80">Guest Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Investment Strategies Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Key Real Estate Investment Strategies & Their ROI Potential
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover proven investment strategies with exceptional ROI potential in Key West's thriving real estate market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* 1. Rental Properties (Long-Term Hold) */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Building2 className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-bold">Rental Properties (Long-Term Hold)</h3>
              </div>
              <div className="mb-4">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  8-12% Annual ROI
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Purchase residential or commercial properties to rent out for steady cash flow and long-term appreciation.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  Steady cash flow from rent
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  Property appreciation over time
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  Tax advantages like depreciation & mortgage interest deductions
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 2. Real Estate Investment Trusts (REITs) */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <PieChart className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold">Real Estate Investment Trusts (REITs)</h3>
              </div>
              <div className="mb-4">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  9.5% Average Returns
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Invest in companies that own or finance income-producing real estate with stock-like liquidity.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  Liquidity similar to stocks
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  Diversification across various property types
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  Dividend yields often exceeding 4%
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 3. Fix-and-Flip */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <DollarSign className="h-8 w-8 text-orange-600 mr-3" />
                <h3 className="text-xl font-bold">Fix & Flip</h3>
              </div>
              <div className="mb-4">
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                  20-30% Potential ROI
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Buy undervalued properties, renovate, and sell for quick capital gains with higher risk/reward profile.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-2"></div>
                  Quick capital gains
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-2"></div>
                  Opportunity to add value through renovations
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-2"></div>
                  Higher risk/reward profile
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 4. Short-Term Rentals (e.g., Airbnb) */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Waves className="h-8 w-8 text-ocean-600 mr-3" />
                <h3 className="text-xl font-bold">Short-Term Rentals (Airbnb)</h3>
              </div>
              <div className="mb-4">
                <Badge className="bg-ocean-100 text-ocean-800 border-ocean-200">
                  15-25% ROI Potential
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Rent properties on a short-term basis to travelers, especially profitable in Key West's tourist hotspots.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-ocean-600 rounded-full mr-2"></div>
                  Higher per-night rates
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-ocean-600 rounded-full mr-2"></div>
                  Flexibility in property use
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-ocean-600 rounded-full mr-2"></div>
                  Tourism market advantage in Key West
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 5. Real Estate Crowdfunding */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold">Real Estate Crowdfunding</h3>
              </div>
              <div className="mb-4">
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  8-12% Target Returns
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Pool funds with other investors to invest in real estate projects with lower capital requirements.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                  Lower capital requirement
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                  Access to larger or commercial projects
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                  Professional management
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 6. Opportunity Zones */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-coral-600 mr-3" />
                <h3 className="text-xl font-bold">Opportunity Zones</h3>
              </div>
              <div className="mb-4">
                <Badge className="bg-coral-100 text-coral-800 border-coral-200">
                  Tax Benefits + Long-term Gains
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Invest in designated low-income areas for significant tax incentives and long-term capital gains benefits.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-coral-600 rounded-full mr-2"></div>
                  Deferred or reduced capital gains taxes
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-coral-600 rounded-full mr-2"></div>
                  Potential for community impact
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-coral-600 rounded-full mr-2"></div>
                  Long-term growth potential
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* ROI Calculator Section */}
        <div className="bg-gradient-to-r from-primary to-ocean-600 rounded-3xl p-8 md:p-12 text-center text-white mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            📊 Calculate Your Investment ROI
          </h3>
          <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">
            Understanding ROI is essential to evaluate the profitability of your investments. Use our advanced calculator to analyze potential returns.
          </p>
          
          {/* ROI Formula Display */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-lg mx-auto">
            <h4 className="text-lg font-semibold mb-4">Basic ROI Formula:</h4>
            <div className="text-2xl font-mono">
              ROI = (Net Profit / Total Investment) × 100
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="text-lg font-semibold mb-2">Cost Method</h4>
              <p className="text-sm opacity-90">Considers total costs, including purchase price and improvements</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="text-lg font-semibold mb-2">Out-of-Pocket Method</h4>
              <p className="text-sm opacity-90">Focuses on actual cash invested, excluding financed amounts</p>
            </div>
          </div>

          <Link to="/investments">
            <Button
              size="lg"
              variant="secondary"
              className="rounded-xl px-8 py-3 text-lg shadow-xl hover:shadow-2xl"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Start Calculating ROI
            </Button>
          </Link>
        </div>

        {/* Benefits of Real Estate Investment */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">🌟 Benefits of Real Estate Investment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Consistent Cash Flow</h4>
                <p className="text-sm text-muted-foreground">Regular rental income provides financial stability and predictable returns.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Property Appreciation</h4>
                <p className="text-sm text-muted-foreground">Properties often increase in value over time, building long-term wealth.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Building2 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Tax Advantages</h4>
                <p className="text-sm text-muted-foreground">Deductions for depreciation, mortgage interest, and property expenses.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Investment Properties
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked properties with proven rental income and appreciation potential
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <Link key={property.id} to={`/property/${property.id}`}>
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-foreground border-0 shadow-md">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      {property.rating}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge
                      variant="secondary"
                      className="bg-primary/90 text-white border-0"
                    >
                      ${property.price}/night
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-green-600/90 text-white border-0">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      ROI Ready
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {property.guests} guests
                    </div>
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.bedrooms} bed
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.bathrooms} bath
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs border-primary/20 text-primary bg-primary/5"
                      >
                        {getAmenityIcon(amenity)}
                        <span className="ml-1">{amenity}</span>
                      </Badge>
                    ))}
                    {property.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{property.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Hosted by {property.host} • {property.reviews} reviews
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="text-muted-foreground text-lg">
              No properties found matching "{searchQuery}". Try a different
              search term.
            </div>
          </div>
        )}
      </div>

      {/* Final Thoughts CTA */}
      <div className="bg-gradient-to-r from-primary to-ocean-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🧭 Ready to Start Your Real Estate Investment Journey?
          </h2>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Real estate offers diverse investment opportunities, each with its own risk-reward profile. Whether you prefer hands-on management or passive income streams, there's a strategy to match your goals.
          </p>
          <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
            Always conduct thorough due diligence and consider consulting with financial advisors to tailor investments to your personal circumstances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/investments">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-xl px-8 py-3 text-lg shadow-xl hover:shadow-2xl"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Explore Investment Strategies
              </Button>
            </Link>
            <Link to="/agents">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-primary shadow-xl"
              >
                <Users className="h-5 w-5 mr-2" />
                Connect with Financial Advisors
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}