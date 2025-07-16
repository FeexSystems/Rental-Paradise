import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  MapPin,
  Building2,
  Users,
  Bed,
  Bath,
  Star,
  Play,
  Camera,
  Calendar,
  Phone,
  Mail,
  DollarSign,
  TrendingUp,
  Car,
  Wifi,
  Waves,
  Shield,
  Coffee,
  Dumbbell,
} from "lucide-react";

interface ApartmentComplex {
  id: string;
  name: string;
  description: string;
  totalUnits: number;
  availableUnits: number;
  priceRange: {
    min: number;
    max: number;
  };
  rating: number;
  reviews: number;
  images: string[];
  virtualTourUrl?: string;
  location: string;
  address: string;
  amenities: string[];
  unitTypes: {
    type: string;
    count: number;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
  }[];
  contact: {
    manager: string;
    phone: string;
    email: string;
  };
  investmentInfo?: {
    roi: string;
    capRate: string;
    purchasePrice: string;
  };
}

const apartmentComplexes: ApartmentComplex[] = [
  {
    id: "1",
    name: "Ocean Breeze Luxury Complex",
    description:
      "Premier 50-unit oceanfront apartment complex featuring modern amenities, stunning views, and world-class service in the heart of Key West.",
    totalUnits: 50,
    availableUnits: 12,
    priceRange: { min: 285, max: 850 },
    rating: 4.9,
    reviews: 342,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    virtualTourUrl: "https://example.com/virtual-tour-1",
    location: "Old Town Key West",
    address: "123 Ocean Drive, Key West, FL 33040",
    amenities: [
      "Ocean Views",
      "Private Beach",
      "Pool & Spa",
      "Fitness Center",
      "Concierge",
      "Valet Parking",
      "Rooftop Lounge",
      "24/7 Security",
    ],
    unitTypes: [
      {
        type: "Studio",
        count: 10,
        price: 285,
        bedrooms: 0,
        bathrooms: 1,
        sqft: 450,
      },
      {
        type: "1 Bedroom",
        count: 20,
        price: 425,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 650,
      },
      {
        type: "2 Bedroom",
        count: 15,
        price: 625,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 900,
      },
      {
        type: "Penthouse",
        count: 5,
        price: 850,
        bedrooms: 3,
        bathrooms: 2.5,
        sqft: 1200,
      },
    ],
    contact: {
      manager: "Sarah Martinez",
      phone: "(305) 555-0123",
      email: "sarah@oceanbreeze.com",
    },
    investmentInfo: {
      roi: "12.5%",
      capRate: "8.2%",
      purchasePrice: "$15.2M",
    },
  },
  {
    id: "2",
    name: "Tropical Gardens Residences",
    description:
      "Beautiful 35-unit garden-style apartment complex with lush landscaping and resort-style amenities in a peaceful Key West setting.",
    totalUnits: 35,
    availableUnits: 8,
    priceRange: { min: 195, max: 485 },
    rating: 4.7,
    reviews: 198,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    virtualTourUrl: "https://example.com/virtual-tour-2",
    location: "Truman Annex",
    address: "456 Tropical Way, Key West, FL 33040",
    amenities: [
      "Tropical Gardens",
      "Swimming Pool",
      "BBQ Area",
      "Parking",
      "Pet Friendly",
      "Laundry",
    ],
    unitTypes: [
      {
        type: "1 Bedroom",
        count: 20,
        price: 195,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 550,
      },
      {
        type: "2 Bedroom",
        count: 15,
        price: 485,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 850,
      },
    ],
    contact: {
      manager: "Miguel Rodriguez",
      phone: "(305) 555-0456",
      email: "miguel@tropicalgardens.com",
    },
    investmentInfo: {
      roi: "10.8%",
      capRate: "7.5%",
      purchasePrice: "$8.9M",
    },
  },
  {
    id: "3",
    name: "Marina Bay Towers",
    description:
      "Modern 42-unit high-rise apartment complex with marina access, luxury finishes, and panoramic water views.",
    totalUnits: 42,
    availableUnits: 6,
    priceRange: { min: 345, max: 795 },
    rating: 4.8,
    reviews: 156,
    images: [
      "https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    virtualTourUrl: "https://example.com/virtual-tour-3",
    location: "Key West Marina",
    address: "789 Marina Boulevard, Key West, FL 33040",
    amenities: [
      "Marina Access",
      "Gym",
      "Rooftop Deck",
      "Concierge",
      "Storage",
      "High-Speed WiFi",
    ],
    unitTypes: [
      {
        type: "1 Bedroom",
        count: 18,
        price: 345,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 700,
      },
      {
        type: "2 Bedroom",
        count: 20,
        price: 595,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1000,
      },
      {
        type: "3 Bedroom",
        count: 4,
        price: 795,
        bedrooms: 3,
        bathrooms: 2.5,
        sqft: 1350,
      },
    ],
    contact: {
      manager: "Elena Davis",
      phone: "(305) 555-0789",
      email: "elena@marinabay.com",
    },
    investmentInfo: {
      roi: "11.2%",
      capRate: "7.8%",
      purchasePrice: "$12.8M",
    },
  },
];

const getAmenityIcon = (amenity: string) => {
  const amenityLower = amenity.toLowerCase();
  if (amenityLower.includes("pool") || amenityLower.includes("spa"))
    return <Waves className="h-4 w-4" />;
  if (amenityLower.includes("gym") || amenityLower.includes("fitness"))
    return <Dumbbell className="h-4 w-4" />;
  if (amenityLower.includes("parking") || amenityLower.includes("valet"))
    return <Car className="h-4 w-4" />;
  if (amenityLower.includes("wifi") || amenityLower.includes("internet"))
    return <Wifi className="h-4 w-4" />;
  if (
    amenityLower.includes("ocean") ||
    amenityLower.includes("beach") ||
    amenityLower.includes("marina")
  )
    return <Waves className="h-4 w-4" />;
  if (amenityLower.includes("security") || amenityLower.includes("concierge"))
    return <Shield className="h-4 w-4" />;
  return <Coffee className="h-4 w-4" />;
};

export default function Complexes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredComplexes, setFilteredComplexes] =
    useState(apartmentComplexes);
  const [selectedComplex, setSelectedComplex] =
    useState<ApartmentComplex | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredComplexes(apartmentComplexes);
    } else {
      const filtered = apartmentComplexes.filter(
        (complex) =>
          complex.name.toLowerCase().includes(query.toLowerCase()) ||
          complex.location.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredComplexes(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-ocean-50 to-tropical-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-ocean-500 to-ocean-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Apartment Complexes
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Discover premium multi-unit properties with exceptional amenities
              and investment opportunities
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative flex items-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-2">
                <div className="flex-1 flex items-center space-x-4 px-4">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search complexes by name or location..."
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

      {/* Complexes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-8">
          {filteredComplexes.map((complex) => (
            <Card
              key={complex.id}
              className="overflow-hidden border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
            >
              <div className="lg:flex">
                {/* Image Gallery */}
                <div className="lg:w-2/5 relative">
                  <div className="aspect-[4/3] lg:h-80 relative overflow-hidden">
                    <img
                      src={complex.images[0]}
                      alt={complex.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                    {/* Virtual Tour Button */}
                    {complex.virtualTourUrl && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="absolute top-4 left-4 bg-black/70 hover:bg-black/90 text-white"
                            size="sm"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Virtual Tour
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>
                              {complex.name} - Virtual Tour
                            </DialogTitle>
                          </DialogHeader>
                          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <Play className="h-16 w-16 text-primary mx-auto mb-4" />
                              <p className="text-lg font-medium">
                                Interactive Virtual Tour
                              </p>
                              <p className="text-muted-foreground">
                                Click to start 360° property exploration
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-foreground border-0">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {complex.rating}
                      </Badge>
                    </div>

                    {/* Unit Count */}
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-primary/90 text-white border-0">
                        <Building2 className="h-3 w-3 mr-1" />
                        {complex.totalUnits} Units
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="lg:w-3/5 p-6 lg:p-8">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {complex.location}
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {complex.name}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {complex.description}
                  </p>

                  {/* Price Range */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-primary">
                        ${complex.priceRange.min}-${complex.priceRange.max}
                      </span>
                      <span className="text-muted-foreground ml-1">/night</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        Available Units
                      </div>
                      <div className="text-lg font-semibold text-foreground">
                        {complex.availableUnits}
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {complex.amenities.slice(0, 4).map((amenity, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs border-primary/20 text-primary bg-primary/5"
                      >
                        {getAmenityIcon(amenity)}
                        <span className="ml-1">{amenity}</span>
                      </Badge>
                    ))}
                    {complex.amenities.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{complex.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="flex-1"
                          onClick={() => setSelectedComplex(complex)}
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                        {selectedComplex && (
                          <div>
                            <DialogHeader>
                              <DialogTitle className="text-2xl">
                                {selectedComplex.name}
                              </DialogTitle>
                            </DialogHeader>

                            <Tabs defaultValue="overview" className="mt-6">
                              <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="overview">
                                  Overview
                                </TabsTrigger>
                                <TabsTrigger value="units">Units</TabsTrigger>
                                <TabsTrigger value="amenities">
                                  Amenities
                                </TabsTrigger>
                                <TabsTrigger value="investment">
                                  Investment
                                </TabsTrigger>
                              </TabsList>

                              <TabsContent value="overview" className="mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="text-lg font-semibold mb-3">
                                      Property Details
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span>Total Units:</span>
                                        <span className="font-medium">
                                          {selectedComplex.totalUnits}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Available:</span>
                                        <span className="font-medium text-green-600">
                                          {selectedComplex.availableUnits}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Rating:</span>
                                        <span className="font-medium">
                                          {selectedComplex.rating}/5.0 (
                                          {selectedComplex.reviews} reviews)
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Address:</span>
                                        <span className="font-medium text-right">
                                          {selectedComplex.address}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="text-lg font-semibold mb-3">
                                      Contact Information
                                    </h4>
                                    <div className="space-y-3">
                                      <div className="flex items-center space-x-3">
                                        <Users className="h-4 w-4 text-primary" />
                                        <span className="text-sm">
                                          {selectedComplex.contact.manager}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-3">
                                        <Phone className="h-4 w-4 text-primary" />
                                        <span className="text-sm">
                                          {selectedComplex.contact.phone}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-3">
                                        <Mail className="h-4 w-4 text-primary" />
                                        <span className="text-sm">
                                          {selectedComplex.contact.email}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-6">
                                  <h4 className="text-lg font-semibold mb-3">
                                    Description
                                  </h4>
                                  <p className="text-muted-foreground">
                                    {selectedComplex.description}
                                  </p>
                                </div>
                              </TabsContent>

                              <TabsContent value="units" className="mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {selectedComplex.unitTypes.map(
                                    (unit, index) => (
                                      <Card key={index} className="p-4">
                                        <div className="flex justify-between items-start mb-3">
                                          <h5 className="font-semibold">
                                            {unit.type}
                                          </h5>
                                          <Badge variant="secondary">
                                            {unit.count} available
                                          </Badge>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                          <div className="flex justify-between">
                                            <span>Price:</span>
                                            <span className="font-medium text-primary">
                                              ${unit.price}/night
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Bedrooms:</span>
                                            <span>{unit.bedrooms}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Bathrooms:</span>
                                            <span>{unit.bathrooms}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Square Feet:</span>
                                            <span>{unit.sqft} sq ft</span>
                                          </div>
                                        </div>
                                      </Card>
                                    ),
                                  )}
                                </div>
                              </TabsContent>

                              <TabsContent value="amenities" className="mt-6">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  {selectedComplex.amenities.map(
                                    (amenity, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center space-x-3 p-3 bg-accent/10 rounded-lg"
                                      >
                                        {getAmenityIcon(amenity)}
                                        <span className="text-sm font-medium">
                                          {amenity}
                                        </span>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </TabsContent>

                              <TabsContent value="investment" className="mt-6">
                                {selectedComplex.investmentInfo && (
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Card className="p-6 text-center">
                                      <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                                      <div className="text-2xl font-bold text-primary">
                                        {selectedComplex.investmentInfo.roi}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        Annual ROI
                                      </div>
                                    </Card>
                                    <Card className="p-6 text-center">
                                      <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-3" />
                                      <div className="text-2xl font-bold text-green-600">
                                        {selectedComplex.investmentInfo.capRate}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        Cap Rate
                                      </div>
                                    </Card>
                                    <Card className="p-6 text-center">
                                      <Building2 className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                                      <div className="text-2xl font-bold text-orange-600">
                                        {
                                          selectedComplex.investmentInfo
                                            .purchasePrice
                                        }
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        Purchase Price
                                      </div>
                                    </Card>
                                  </div>
                                )}
                              </TabsContent>
                            </Tabs>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {filteredComplexes.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <div className="text-muted-foreground text-lg">
              No complexes found matching "{searchQuery}". Try a different
              search term.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
