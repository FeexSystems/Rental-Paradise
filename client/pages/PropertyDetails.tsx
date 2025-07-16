import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  ArrowLeft,
  MapPin,
  Users,
  Bed,
  Bath,
  Star,
  Wifi,
  Car,
  Waves,
  Coffee,
  Calendar as CalendarIcon,
  Shield,
  Phone,
  Mail,
  Share2,
  Heart,
  Camera,
  Play,
  CheckCircle,
  Dumbbell,
  UtensilsCrossed,
  Tv,
  Wind,
  Home,
  DollarSign,
} from "lucide-react";
import {
  getPropertyGallery,
  getImageFromPropertyData,
} from "@/lib/imageService";

interface PropertyData {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  location: string;
  address: string;
  amenities: string[];
  host: {
    name: string;
    image: string;
    rating: number;
    verified: boolean;
    joinedDate: string;
    responseRate: string;
    responseTime: string;
    phone: string;
    email: string;
  };
  rules: string[];
  nearbyAttractions: {
    name: string;
    distance: string;
    type: string;
  }[];
  reviews_detailed: {
    name: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

// Mock detailed property data - in real app this would come from API
const getPropertyData = (id: string): PropertyData => {
  const properties: { [key: string]: PropertyData } = {
    "1": {
      id: "1",
      title: "Stunning Ocean View Condo in Old Town",
      description:
        "Experience the magic of Key West from this beautifully appointed oceanfront condo. Located in the heart of historic Old Town, this stunning 2-bedroom, 2-bathroom retreat offers panoramic views of the crystal-clear waters and spectacular sunsets. The space features modern amenities, elegant furnishings, and a private balcony perfect for morning coffee or evening cocktails. Just steps away from Duval Street's vibrant nightlife, world-class restaurants, and historic attractions.",
      price: 285,
      rating: 4.9,
      reviews: 127,
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      location: "Old Town Key West",
      address: "123 Ocean Drive, Key West, FL 33040",
      amenities: [
        "Ocean Views",
        "Private Balcony",
        "Full Kitchen",
        "High-Speed WiFi",
        "Air Conditioning",
        "Cable TV",
        "Washer/Dryer",
        "Parking Space",
        "Beach Access",
        "Pool Access",
      ],
      host: {
        name: "Jonny E Jesse",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fb8336e2f6f8b45b2b66b34414a336021%2F4d326a7be5dd4660a0d52de1f83fc1d9?format=webp&width=800",
        rating: 4.95,
        verified: true,
        joinedDate: "2019",
        responseRate: "100%",
        responseTime: "Within an hour",
        phone: "+13122174976",
        email: "jonny@keywestrentals.com",
      },
      rules: [
        "Check-in after 4:00 PM",
        "Check-out before 11:00 AM",
        "No smoking anywhere on the property",
        "No pets allowed",
        "No parties or events",
        "Quiet hours: 10:00 PM - 8:00 AM",
      ],
      nearbyAttractions: [
        { name: "Mallory Square", distance: "0.3 miles", type: "Attraction" },
        { name: "Duval Street", distance: "0.2 miles", type: "Entertainment" },
        { name: "Hemingway House", distance: "0.5 miles", type: "Museum" },
        {
          name: "Key West Butterfly Conservatory",
          distance: "1.2 miles",
          type: "Attraction",
        },
        {
          name: "Fort Zachary Taylor Beach",
          distance: "2.1 miles",
          type: "Beach",
        },
      ],
      reviews_detailed: [
        {
          name: "Sarah M.",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
          rating: 5,
          date: "November 2023",
          comment:
            "Absolutely perfect location and stunning views! Jonny was incredibly responsive and helpful. The condo exceeded our expectations.",
        },
        {
          name: "Michael R.",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
          rating: 5,
          date: "October 2023",
          comment:
            "Amazing stay! The ocean views are breathtaking, especially at sunset. Walking distance to everything in Old Town.",
        },
        {
          name: "Emily K.",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
          rating: 5,
          date: "September 2023",
          comment:
            "This place is a gem! Clean, comfortable, and the host Jonny is fantastic. Would definitely stay here again.",
        },
      ],
    },
    "2": {
      id: "2",
      title: "Charming Historic Cottage Near Duval",
      description:
        "Step back in time in this beautifully restored 1920s Conch cottage. Located just two blocks from famous Duval Street, this authentic Key West home features original hardwood floors, tropical gardens, and vintage charm throughout. The cottage offers modern comforts while maintaining its historic character, including a fully equipped kitchen, cozy living areas, and a private garden with outdoor seating.",
      price: 195,
      rating: 4.8,
      reviews: 89,
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      location: "Historic District",
      address: "456 Southard Street, Key West, FL 33040",
      amenities: [
        "Historic Charm",
        "Private Garden",
        "Full Kitchen",
        "WiFi",
        "Air Conditioning",
        "Cable TV",
        "Walking Distance to Duval",
        "Bike Rental",
        "Outdoor Seating",
      ],
      host: {
        name: "Jonny E Jesse",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fb8336e2f6f8b45b2b66b34414a336021%2F4d326a7be5dd4660a0d52de1f83fc1d9?format=webp&width=800",
        rating: 4.95,
        verified: true,
        joinedDate: "2019",
        responseRate: "100%",
        responseTime: "Within an hour",
        phone: "+13122174976",
        email: "jonny@keywestrentals.com",
      },
      rules: [
        "Check-in after 3:00 PM",
        "Check-out before 11:00 AM",
        "No smoking inside",
        "No pets",
        "Respect the neighbors",
        "Quiet hours: 10:00 PM - 8:00 AM",
      ],
      nearbyAttractions: [
        { name: "Duval Street", distance: "0.2 miles", type: "Entertainment" },
        {
          name: "Key West Cemetery",
          distance: "0.4 miles",
          type: "Historic Site",
        },
        {
          name: "Truman Little White House",
          distance: "0.6 miles",
          type: "Museum",
        },
        { name: "Sunset Pier", distance: "0.8 miles", type: "Attraction" },
      ],
      reviews_detailed: [
        {
          name: "Jennifer L.",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
          rating: 5,
          date: "December 2023",
          comment:
            "Such a charming cottage! Perfect for a romantic getaway. Jonny was very accommodating and the location is ideal.",
        },
        {
          name: "David T.",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
          rating: 5,
          date: "November 2023",
          comment:
            "Loved the authentic Key West feel. Great host and perfect location for exploring the island.",
        },
      ],
    },
  };

  return properties[id] || properties["1"];
};

const getAmenityIcon = (amenity: string) => {
  const amenityLower = amenity.toLowerCase();
  if (amenityLower.includes("wifi") || amenityLower.includes("internet"))
    return <Wifi className="h-4 w-4" />;
  if (amenityLower.includes("parking") || amenityLower.includes("car"))
    return <Car className="h-4 w-4" />;
  if (
    amenityLower.includes("ocean") ||
    amenityLower.includes("beach") ||
    amenityLower.includes("pool")
  )
    return <Waves className="h-4 w-4" />;
  if (amenityLower.includes("kitchen") || amenityLower.includes("dining"))
    return <UtensilsCrossed className="h-4 w-4" />;
  if (amenityLower.includes("tv") || amenityLower.includes("cable"))
    return <Tv className="h-4 w-4" />;
  if (amenityLower.includes("air") || amenityLower.includes("conditioning"))
    return <Wind className="h-4 w-4" />;
  if (amenityLower.includes("gym") || amenityLower.includes("fitness"))
    return <Dumbbell className="h-4 w-4" />;
  return <Home className="h-4 w-4" />;
};

export default function PropertyDetails() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(2);

  const property = getPropertyData(id || "1");

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    );
    const subtotal = nights * property.price;
    const cleaningFee = 75;
    const serviceFee = subtotal * 0.14;
    const taxes = subtotal * 0.115;
    return subtotal + cleaningFee + serviceFee + taxes;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-ocean-50 to-tropical-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button variant="ghost" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
          </Link>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Property Title */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {property.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium">{property.rating}</span>
              <span className="mx-1">·</span>
              <span>{property.reviews} reviews</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-8 rounded-xl overflow-hidden">
          <div className="lg:row-span-2">
            <img
              src={property.images[selectedImage]}
              alt={property.title}
              className="w-full h-64 lg:h-96 object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setSelectedImage(0)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {property.images.slice(1, 5).map((image, index) => (
              <img
                key={index + 1}
                src={image}
                alt={`${property.title} ${index + 2}`}
                className="w-full h-32 lg:h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage(index + 1)}
              />
            ))}
          </div>
          {property.images.length > 5 && (
            <Button
              variant="outline"
              className="absolute bottom-4 right-4 bg-white/90 hover:bg-white"
            >
              <Camera className="h-4 w-4 mr-2" />
              Show all photos
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Info */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Hosted by {property.host.name}
                    </h2>
                    <div className="flex items-center space-x-4 text-muted-foreground mt-1">
                      <span>{property.guests} guests</span>
                      <span>·</span>
                      <span>
                        {property.bedrooms} bedroom
                        {property.bedrooms !== 1 ? "s" : ""}
                      </span>
                      <span>·</span>
                      <span>
                        {property.bathrooms} bath
                        {property.bathrooms !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={property.host.image}
                      alt={property.host.name}
                    />
                    <AvatarFallback>
                      {property.host.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="border-t pt-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>What this place offers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-2" />
                  {property.rating} · {property.reviews} reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {property.reviews_detailed.map((review, index) => (
                    <div key={index} className="flex space-x-4">
                      <Avatar>
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{review.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{review.name}</span>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-3 w-3 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {review.date}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Where you'll be</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="font-medium">{property.address}</p>
                  <p className="text-muted-foreground">{property.location}</p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Nearby Attractions</h4>
                  {property.nearbyAttractions.map((attraction, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium">{attraction.name}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {attraction.type}
                        </Badge>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        {attraction.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* House Rules */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>House Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {property.rules.map((rule, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rule}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-2xl font-bold">
                      ${property.price}
                    </span>
                    <span className="text-muted-foreground ml-1">night</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{property.rating}</span>
                    <span className="text-muted-foreground ml-1">
                      ({property.reviews})
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="checkin">Check-in</Label>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        onClick={() => {
                          /* Open calendar */
                        }}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkIn ? checkIn.toLocaleDateString() : "Add date"}
                      </Button>
                    </div>
                    <div>
                      <Label htmlFor="checkout">Check-out</Label>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        onClick={() => {
                          /* Open calendar */
                        }}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOut ? checkOut.toLocaleDateString() : "Add date"}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="guests">Guests</Label>
                    <select
                      className="w-full p-2 border border-input rounded-md"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} guest{num !== 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button className="w-full" size="lg">
                    Reserve
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    You won't be charged yet
                  </div>

                  {checkIn && checkOut && (
                    <div className="space-y-2 border-t pt-4">
                      <div className="flex justify-between">
                        <span>
                          ${property.price} x{" "}
                          {Math.ceil(
                            (checkOut.getTime() - checkIn.getTime()) /
                              (1000 * 60 * 60 * 24),
                          )}{" "}
                          nights
                        </span>
                        <span>
                          $
                          {property.price *
                            Math.ceil(
                              (checkOut.getTime() - checkIn.getTime()) /
                                (1000 * 60 * 60 * 24),
                            )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cleaning fee</span>
                        <span>$75</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service fee</span>
                        <span>
                          $
                          {Math.round(
                            property.price *
                              Math.ceil(
                                (checkOut.getTime() - checkIn.getTime()) /
                                  (1000 * 60 * 60 * 24),
                              ) *
                              0.14,
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes</span>
                        <span>
                          $
                          {Math.round(
                            property.price *
                              Math.ceil(
                                (checkOut.getTime() - checkIn.getTime()) /
                                  (1000 * 60 * 60 * 24),
                              ) *
                              0.115,
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-2">
                        <span>Total</span>
                        <span>${Math.round(calculateTotal())}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Host Contact */}
                <div className="border-t pt-6 mt-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar>
                      <AvatarImage
                        src={property.host.image}
                        alt={property.host.name}
                      />
                      <AvatarFallback>
                        {property.host.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{property.host.name}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm">{property.host.rating}</span>
                        {property.host.verified && (
                          <CheckCircle className="h-3 w-3 text-green-500 ml-2" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
