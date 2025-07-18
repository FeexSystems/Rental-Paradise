import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, DollarSign, TrendingUp, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ROICalculator() {
  const [formData, setFormData] = useState({
    purchasePrice: "",
    downPayment: "",
    monthlyRent: "",
    monthlyExpenses: "",
    appreciationRate: "3",
  });

  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateROI = () => {
    const purchasePrice = parseFloat(formData.purchasePrice) || 0;
    const downPayment = parseFloat(formData.downPayment) || 0;
    const monthlyRent = parseFloat(formData.monthlyRent) || 0;
    const monthlyExpenses = parseFloat(formData.monthlyExpenses) || 0;
    const appreciationRate = parseFloat(formData.appreciationRate) || 3;

    const netCashFlow = (monthlyRent - monthlyExpenses) * 12;
    const cashOnCash = (netCashFlow / downPayment) * 100;
    const capRate = (netCashFlow / purchasePrice) * 100;
    const futureValue = purchasePrice * Math.pow(1 + appreciationRate / 100, 5);
    const totalReturn =
      ((futureValue - purchasePrice + netCashFlow * 5) / downPayment) * 100;

    setResults({
      netCashFlow,
      cashOnCash,
      capRate,
      futureValue,
      totalReturn,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-ocean-50 to-tropical-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/investments">
            <Button variant="ghost" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Investments
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            ROI Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculate your potential return on investment for Key West rental
            properties
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Investment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="purchasePrice">Purchase Price ($)</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  placeholder="500000"
                  value={formData.purchasePrice}
                  onChange={(e) =>
                    handleInputChange("purchasePrice", e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor="downPayment">Down Payment ($)</Label>
                <Input
                  id="downPayment"
                  type="number"
                  placeholder="100000"
                  value={formData.downPayment}
                  onChange={(e) =>
                    handleInputChange("downPayment", e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor="monthlyRent">Monthly Rent ($)</Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  placeholder="3500"
                  value={formData.monthlyRent}
                  onChange={(e) =>
                    handleInputChange("monthlyRent", e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor="monthlyExpenses">Monthly Expenses ($)</Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  placeholder="1200"
                  value={formData.monthlyExpenses}
                  onChange={(e) =>
                    handleInputChange("monthlyExpenses", e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor="appreciationRate">
                  Annual Appreciation Rate (%)
                </Label>
                <Input
                  id="appreciationRate"
                  type="number"
                  step="0.1"
                  placeholder="3.0"
                  value={formData.appreciationRate}
                  onChange={(e) =>
                    handleInputChange("appreciationRate", e.target.value)
                  }
                />
              </div>

              <Button onClick={calculateROI} className="w-full" size="lg">
                Calculate ROI
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Investment Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        ${results.netCashFlow.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Annual Cash Flow
                      </div>
                    </div>

                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {results.cashOnCash.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Cash-on-Cash Return
                      </div>
                    </div>

                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {results.capRate.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Cap Rate
                      </div>
                    </div>

                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {results.totalReturn.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        5-Year Total Return
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold">
                      Projected 5-Year Value
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      ${results.futureValue.toLocaleString()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your investment details to see ROI calculations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
