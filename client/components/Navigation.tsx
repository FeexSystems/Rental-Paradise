import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  Building2,
  Users,
  TrendingUp,
  Menu,
  Phone,
  Mail,
  MapPin,
  Star,
  Search,
  Heart,
  User,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    {
      title: "Properties",
      href: "/",
      icon: Home,
      submenu: [
        {
          title: "All Rentals",
          href: "/",
          description: "Browse all available properties",
        },
        {
          title: "Apartment Complexes",
          href: "/complexes",
          description: "Multi-unit apartment buildings",
        },
        {
          title: "Luxury Homes",
          href: "/luxury",
          description: "Premium vacation rentals",
        },
        {
          title: "Waterfront",
          href: "/waterfront",
          description: "Ocean and bay view properties",
        },
      ],
    },
    {
      title: "Complexes",
      href: "/complexes",
      icon: Building2,
      submenu: [
        {
          title: "10+ Units",
          href: "/complexes?size=medium",
          description: "Mid-size apartment complexes",
        },
        {
          title: "50+ Units",
          href: "/complexes?size=large",
          description: "Large apartment communities",
        },
        {
          title: "Luxury Complexes",
          href: "/complexes?type=luxury",
          description: "Premium apartment communities",
        },
        {
          title: "Investment Opportunities",
          href: "/investments",
          description: "Purchase opportunities",
        },
      ],
    },
    {
      title: "Agents",
      href: "/agents",
      icon: Users,
      submenu: [
        {
          title: "Property Managers",
          href: "/agents?type=managers",
          description: "Professional property management",
        },
        {
          title: "Real Estate Agents",
          href: "/agents?type=realtors",
          description: "Licensed real estate professionals",
        },
        {
          title: "Vendors",
          href: "/agents?type=vendors",
          description: "Service providers and contractors",
        },
        {
          title: "Become an Agent",
          href: "/agents/join",
          description: "Join our professional network",
        },
      ],
    },
    {
      title: "Investments",
      href: "/investments",
      icon: TrendingUp,
      submenu: [
        {
          title: "ROI Calculator",
          href: "/investments/calculator",
          description: "Calculate potential returns",
        },
        {
          title: "Market Analysis",
          href: "/investments/market",
          description: "Key West market insights",
        },
        {
          title: "Financing Options",
          href: "/investments/financing",
          description: "Investment financing solutions",
        },
        {
          title: "Success Stories",
          href: "/investments/stories",
          description: "Investor testimonials",
        },
      ],
    },
  ];

  const NavItem = ({
    item,
    mobile = false,
  }: {
    item: any;
    mobile?: boolean;
  }) => {
    const isActive = location.pathname === item.href;

    if (mobile) {
      return (
        <div className="space-y-2">
          <Link
            to={item.href}
            className={cn(
              "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-accent",
            )}
            onClick={() => setIsMobileOpen(false)}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.title}</span>
          </Link>
          {item.submenu && (
            <div className="ml-8 space-y-1">
              {item.submenu.map((subItem: any) => (
                <Link
                  key={subItem.href}
                  to={subItem.href}
                  className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger
          className={cn(
            "bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50",
            isActive && "text-primary",
          )}
        >
          <item.icon className="h-4 w-4 mr-2" />
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="grid gap-3 p-6 w-[400px]">
            <div className="row-span-3">
              <NavigationMenuLink asChild>
                <Link
                  to={item.href}
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-ocean-400 to-primary p-6 no-underline outline-none focus:shadow-md"
                >
                  <item.icon className="h-6 w-6 text-white" />
                  <div className="mb-2 mt-4 text-lg font-medium text-white">
                    {item.title}
                  </div>
                  <p className="text-sm leading-tight text-white/90">
                    Explore our {item.title.toLowerCase()} section
                  </p>
                </Link>
              </NavigationMenuLink>
            </div>
            <div className="grid gap-2">
              {item.submenu?.map((subItem: any) => (
                <NavigationMenuLink key={subItem.href} asChild>
                  <Link
                    to={subItem.href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      {subItem.title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {subItem.description}
                    </p>
                  </Link>
                </NavigationMenuLink>
              ))}
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-ocean-600 rounded-xl">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">KeyWest</h1>
              <p className="text-xs text-muted-foreground">Rental Paradise</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavItem key={item.href} item={item} />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Search className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <User className="h-4 w-4" />
              </Button>
            </div>

            <Button className="hidden sm:flex bg-primary hover:bg-primary/90">
              <Phone className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline">+1 (312) 217-4976</span>
              <span className="lg:hidden">Contact</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center space-x-2 mb-8">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-ocean-600 rounded-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      KeyWest
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Rental Paradise
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {navigationItems.map((item) => (
                    <NavItem key={item.href} item={item} mobile />
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t">
                  <div className="space-y-4">
                    <Button className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      +1 (312) 217-4976
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Search className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <User className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
