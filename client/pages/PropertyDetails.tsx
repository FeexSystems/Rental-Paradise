import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Calendar,
  Shield,
} from "lucide-react";

export default function PropertyDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-ocean-50 to-tropical-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </Link>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center py-16">
            <div className="mb-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Property #{id}
              </Badge>
            </div>
            <CardTitle className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Property Details Page
            </CardTitle>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              This is a placeholder for the property details page. The full
              implementation will include image galleries, detailed amenities,
              booking calendar, and reviews.
            </p>
          </CardHeader>
          <CardContent className="pb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <Calendar className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Booking Calendar
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Interactive date selection and availability
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-accent/5 rounded-2xl border border-accent/10">
                <Star className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Reviews & Ratings
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Guest reviews and host ratings
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-secondary/20 rounded-2xl border border-secondary/30">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Secure Booking
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Protected payments and cancellation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
