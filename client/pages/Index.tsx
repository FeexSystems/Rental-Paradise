import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import { ScrapedProperty, ScrapePropertiesResponse } from "@shared/api";

interface Property extends ScrapedProperty {
  isWishlisted?: boolean;
}

const mockProperties: Property[] = [
  {
    id: "1",
    title: "Stunning Ocean View Condo in Old Town",
    price: 285,
    rating: 4.9,
    reviews: 127,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
    image:
      "https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Mallory Square",
    amenities: ["Rooftop Terrace", "Sunset Views", "Luxury", "Elevator"],
    host: "Robert",
  },
];

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredProperties(mockProperties);
    } else {
      const filtered = mockProperties.filter(
        (property) =>
          property.title.toLowerCase().includes(query.toLowerCase()) ||
          property.location.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredProperties(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-ocean-50 to-tropical-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-screen">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://player.vimeo.com/external/397475655.sd.mp4?s=0f73990844fbf7d80b8b0fcaa9f7a05c88a22b67&profile_id=165&oauth2_token_id=57447761"
              type="video/mp4"
            />
            {/* Fallback for browsers that don't support video */}
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')`,
              }}
            />
          </video>
          {/* Ocean-themed overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-600/30 via-transparent to-ocean-900/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-ocean-500/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Discover
              <span className="text-primary block mt-2">Key West</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Find your perfect tropical getaway in paradise. Luxury rentals,
              stunning views, unforgettable experiences.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative flex items-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-2">
                <div className="flex-1 flex items-center space-x-4 px-4">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by location or property name..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="border-none shadow-none text-lg placeholder:text-muted-foreground focus-visible:ring-0"
                  />
                </div>
                <Button
                  size="lg"
                  className="rounded-xl px-8 bg-primary hover:bg-primary/90 shadow-lg"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-2xl font-bold text-foreground">200+</div>
                <div className="text-muted-foreground">Properties</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-2xl font-bold text-foreground">4.8★</div>
                <div className="text-muted-foreground">Average Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-2xl font-bold text-foreground">10K+</div>
                <div className="text-muted-foreground">Happy Guests</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked accommodations for an unforgettable Key West experience
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

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-ocean-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for Your Key West Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who've discovered their perfect getaway
            with us
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-xl px-8 py-3 text-lg shadow-xl hover:shadow-2xl"
          >
            Start Planning Your Trip
          </Button>
        </div>
      </div>
    </div>
  );
}
