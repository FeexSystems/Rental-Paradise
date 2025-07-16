import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  TrendingUp,
  DollarSign,
  Calculator,
  Building2,
  PieChart,
  BarChart3,
  Users,
  Calendar,
  Shield,
  Phone,
  Mail,
  Award,
  CheckCircle,
  ArrowUpRight,
  Target,
} from "lucide-react";

interface InvestmentMetrics {
  purchasePrice: number;
  downPayment: number;
  loanAmount: number;
  monthlyRent: number;
  expenses: number;
  annualIncome: number;
  annualExpenses: number;
  netIncome: number;
  cashFlow: number;
  roi: number;
  capRate: number;
  cashOnCashReturn: number;
}

const investmentOpportunities = [
  {
    id: "1",
    title: "Marina Bay Luxury Complex",
    type: "Apartment Complex",
    units: 42,
    price: "$12.8M",
    roi: "11.2%",
    capRate: "7.8%",
    location: "Key West Marina",
    image:
      "https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Prime marina-front property with high-end finishes and established rental history.",
    highlights: [
      "Waterfront location",
      "98% occupancy rate",
      "Professional management in place",
      "Recent renovations completed",
    ],
    investmentType: "Full Ownership",
    minimumInvestment: "$500K",
    projectedReturns: "8-12% annually",
  },
  {
    id: "2",
    title: "Old Town Heritage Properties",
    type: "Historic District",
    units: 18,
    price: "$8.5M",
    roi: "13.8%",
    capRate: "9.1%",
    location: "Historic Old Town",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Beautifully restored historic properties in the heart of Key West's most desirable area.",
    highlights: [
      "Historic designation",
      "Premium location",
      "Strong appreciation history",
      "Established guest base",
    ],
    investmentType: "Fractional Ownership",
    minimumInvestment: "$250K",
    projectedReturns: "10-15% annually",
  },
  {
    id: "3",
    title: "Sunset Key Resort Villas",
    type: "Luxury Villas",
    units: 12,
    price: "$15.2M",
    roi: "9.8%",
    capRate: "6.5%",
    location: "Sunset Key",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Ultra-luxury beachfront villas with private beach access and concierge services.",
    highlights: [
      "Private island location",
      "Ultra-luxury market",
      "Exclusive amenities",
      "High-end clientele",
    ],
    investmentType: "Private REIT",
    minimumInvestment: "$100K",
    projectedReturns: "7-10% annually",
  },
  {
    id: "4",
    title: "Duval Street Commercial Portfolio",
    type: "Commercial Real Estate",
    units: 8,
    price: "$6.2M",
    roi: "14.5%",
    capRate: "10.2%",
    location: "Duval Street",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Prime commercial properties on famous Duval Street with mixed-use potential.",
    highlights: [
      "High foot traffic area",
      "Triple net lease tenants",
      "Mixed-use zoning",
      "Tourist destination",
    ],
    investmentType: "Commercial Fund",
    minimumInvestment: "$150K",
    projectedReturns: "12-16% annually",
  },
  {
    id: "5",
    title: "Smathers Beach Resort Development",
    type: "New Development",
    units: 65,
    price: "$18.5M",
    roi: "12.8%",
    capRate: "8.9%",
    location: "Smathers Beach",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Brand new beachfront resort development with modern amenities and prime beach access.",
    highlights: [
      "New construction",
      "Direct beach access",
      "Modern amenities",
      "Pre-construction pricing",
    ],
    investmentType: "Development Fund",
    minimumInvestment: "$200K",
    projectedReturns: "15-20% upon completion",
  },
  {
    id: "6",
    title: "Key West Affordable Housing Initiative",
    type: "Community Development",
    units: 24,
    price: "$4.8M",
    roi: "9.5%",
    capRate: "7.2%",
    location: "Stock Island",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Community-focused affordable housing project with government incentives and stable returns.",
    highlights: [
      "Government backing",
      "Tax incentives",
      "Community impact",
      "Stable long-term returns",
    ],
    investmentType: "Impact Investment",
    minimumInvestment: "$75K",
    projectedReturns: "8-12% annually + tax benefits",
  },
];

const marketData = {
  averageROI: "11.5%",
  occupancyRate: "87%",
  averageNightly: "$385",
  marketGrowth: "8.2%",
  priceAppreciation: "6.8%",
};

export default function Investments() {
  const [purchasePrice, setPurchasePrice] = useState(1200000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [interestRate, setInterestRate] = useState(6.5);
  const [monthlyRent, setMonthlyRent] = useState(8500);
  const [monthlyExpenses, setMonthlyExpenses] = useState(3200);

  const calculateMetrics = (): InvestmentMetrics => {
    const downPayment = (purchasePrice * downPaymentPercent) / 100;
    const loanAmount = purchasePrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const loanTermMonths = 30 * 12;

    const monthlyPayment =
      (loanAmount *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, loanTermMonths))) /
      (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

    const totalMonthlyExpenses = monthlyExpenses + monthlyPayment;
    const cashFlow = monthlyRent - totalMonthlyExpenses;

    const annualIncome = monthlyRent * 12;
    const annualExpenses = totalMonthlyExpenses * 12;
    const netIncome = cashFlow * 12;

    const roi = (netIncome / downPayment) * 100;
    const capRate = (netIncome / purchasePrice) * 100;
    const cashOnCashReturn = (netIncome / downPayment) * 100;

    return {
      purchasePrice,
      downPayment,
      loanAmount,
      monthlyRent,
      expenses: totalMonthlyExpenses,
      annualIncome,
      annualExpenses,
      netIncome,
      cashFlow,
      roi,
      capRate,
      cashOnCashReturn,
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-ocean-50 to-tropical-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-ocean-500 to-ocean-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Investment Opportunities
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Build wealth through Key West real estate with proven returns and
              professional management
            </p>

            {/* Market Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-2xl font-bold">
                  {marketData.averageROI}
                </div>
                <div className="text-sm opacity-90">Average ROI</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-2xl font-bold">
                  {marketData.occupancyRate}
                </div>
                <div className="text-sm opacity-90">Occupancy Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-2xl font-bold">
                  {marketData.averageNightly}
                </div>
                <div className="text-sm opacity-90">Avg. Nightly Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-2xl font-bold">
                  {marketData.marketGrowth}
                </div>
                <div className="text-sm opacity-90">Annual Growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="calculator" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="calculator">ROI Calculator</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="market">Market Data</TabsTrigger>
            <TabsTrigger value="services">Our Services</TabsTrigger>
          </TabsList>

          {/* ROI Calculator */}
          <TabsContent value="calculator">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="h-5 w-5 mr-2 text-primary" />
                    Investment Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="purchase-price">
                      Purchase Price: ${purchasePrice.toLocaleString()}
                    </Label>
                    <Slider
                      id="purchase-price"
                      min={500000}
                      max={20000000}
                      step={50000}
                      value={[purchasePrice]}
                      onValueChange={(value) => setPurchasePrice(value[0])}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="down-payment">
                      Down Payment: {downPaymentPercent}%
                    </Label>
                    <Slider
                      id="down-payment"
                      min={10}
                      max={50}
                      step={5}
                      value={[downPaymentPercent]}
                      onValueChange={(value) => setDownPaymentPercent(value[0])}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="interest-rate">
                      Interest Rate: {interestRate}%
                    </Label>
                    <Slider
                      id="interest-rate"
                      min={3}
                      max={10}
                      step={0.1}
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="monthly-rent">
                      Monthly Rental Income: ${monthlyRent.toLocaleString()}
                    </Label>
                    <Slider
                      id="monthly-rent"
                      min={2000}
                      max={25000}
                      step={500}
                      value={[monthlyRent]}
                      onValueChange={(value) => setMonthlyRent(value[0])}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="monthly-expenses">
                      Monthly Expenses: ${monthlyExpenses.toLocaleString()}
                    </Label>
                    <Slider
                      id="monthly-expenses"
                      min={1000}
                      max={10000}
                      step={200}
                      value={[monthlyExpenses]}
                      onValueChange={(value) => setMonthlyExpenses(value[0])}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                    Investment Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {metrics.roi.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Annual ROI
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {metrics.capRate.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Cap Rate
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-accent/50 rounded-lg">
                      <span className="text-muted-foreground">
                        Down Payment:
                      </span>
                      <span className="font-medium">
                        ${metrics.downPayment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-accent/50 rounded-lg">
                      <span className="text-muted-foreground">
                        Monthly Cash Flow:
                      </span>
                      <span
                        className={`font-medium ${
                          metrics.cashFlow >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        ${metrics.cashFlow.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-accent/50 rounded-lg">
                      <span className="text-muted-foreground">
                        Annual Net Income:
                      </span>
                      <span className="font-medium text-primary">
                        ${metrics.netIncome.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-accent/50 rounded-lg">
                      <span className="text-muted-foreground">
                        Cash-on-Cash Return:
                      </span>
                      <span className="font-medium">
                        {metrics.cashOnCashReturn.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full" size="lg">
                      <Phone className="h-4 w-4 mr-2" />
                      Discuss This Investment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Investment Opportunities */}
          <TabsContent value="opportunities">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Current Investment Opportunities
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Exclusive access to premium Key West properties with proven
                  rental income and appreciation potential
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {investmentOpportunities.map((opportunity) => (
                  <Card
                    key={opportunity.id}
                    className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={opportunity.image}
                        alt={opportunity.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary/90 text-white border-0">
                          {opportunity.type}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-600/90 text-white border-0">
                          {opportunity.roi} ROI
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {opportunity.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm">
                        {opportunity.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Units
                          </div>
                          <div className="font-semibold">
                            {opportunity.units}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Price
                          </div>
                          <div className="font-semibold text-primary">
                            {opportunity.price}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Cap Rate
                          </div>
                          <div className="font-semibold">
                            {opportunity.capRate}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Location
                          </div>
                          <div className="font-semibold text-sm">
                            {opportunity.location}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Highlights</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {opportunity.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full">
                        <ArrowUpRight className="h-4 w-4 mr-2" />
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Market Data */}
          <TabsContent value="market">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Key West Market Analysis
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Data-driven insights into Key West's vacation rental market
                  performance and trends
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="text-center bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">
                      {marketData.priceAppreciation}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Annual Price Appreciation
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {marketData.averageNightly}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average Nightly Rate
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <Calendar className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {marketData.occupancyRate}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average Occupancy
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <PieChart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {marketData.averageROI}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average ROI
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Market Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-3">
                        Why Key West?
                      </h4>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start">
                          <Target className="h-4 w-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          Limited land availability drives consistent
                          appreciation
                        </li>
                        <li className="flex items-start">
                          <Target className="h-4 w-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          Year-round tourism ensures stable rental income
                        </li>
                        <li className="flex items-start">
                          <Target className="h-4 w-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          Strong regulatory framework protects investments
                        </li>
                        <li className="flex items-start">
                          <Target className="h-4 w-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          Premium destination attracts high-spending guests
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-3">
                        Investment Benefits
                      </h4>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start">
                          <Shield className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          Professional property management available
                        </li>
                        <li className="flex items-start">
                          <Shield className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          Tax advantages for vacation rental owners
                        </li>
                        <li className="flex items-start">
                          <Shield className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          Diversification in hospitality sector
                        </li>
                        <li className="flex items-start">
                          <Shield className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          Personal use benefits when not rented
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Our Services */}
          <TabsContent value="services">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Full-Service Investment Support
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  From acquisition to management, we provide comprehensive
                  services to maximize your investment returns
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="text-center bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <Building2 className="h-16 w-16 text-primary mx-auto mb-6" />
                    <h3 className="text-xl font-bold mb-4">
                      Property Acquisition
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-2 text-left">
                      <li>• Market analysis and property sourcing</li>
                      <li>• Due diligence and inspection coordination</li>
                      <li>• Financing assistance and negotiations</li>
                      <li>• Legal and closing support</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="text-center bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <Users className="h-16 w-16 text-green-600 mx-auto mb-6" />
                    <h3 className="text-xl font-bold mb-4">
                      Property Management
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-2 text-left">
                      <li>• Professional property management</li>
                      <li>• 24/7 guest services and support</li>
                      <li>• Maintenance and housekeeping</li>
                      <li>• Revenue optimization strategies</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="text-center bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <TrendingUp className="h-16 w-16 text-orange-600 mx-auto mb-6" />
                    <h3 className="text-xl font-bold mb-4">
                      Performance Monitoring
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-2 text-left">
                      <li>• Monthly financial reporting</li>
                      <li>• Performance benchmarking</li>
                      <li>• Market trend analysis</li>
                      <li>• Strategic recommendations</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-primary to-ocean-600 text-white border-0">
                <CardContent className="p-8 md:p-12 text-center">
                  <h3 className="text-3xl font-bold mb-4">
                    Ready to Start Investing?
                  </h3>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    Schedule a consultation with our investment specialists to
                    explore opportunities tailored to your goals and budget.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="rounded-xl px-8"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Schedule Consultation
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-xl px-8 border-white text-white hover:bg-white hover:text-primary"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Request Information
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
