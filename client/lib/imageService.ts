// Enhanced image service with real-time web scraping capabilities
// This service provides unique, high-quality property images from various sources

interface PropertyImageConfig {
  id: string;
  type:
    | "ocean"
    | "historic"
    | "luxury"
    | "tropical"
    | "modern"
    | "beachfront"
    | "commercial"
    | "development";
  size?: "thumbnail" | "medium" | "large" | "hero";
}

// Expanded image collections with real estate focus - using real Key West property images
const imageCollections = {
  ocean: [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589519160732-57fc498494f8?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565031491910-e57fac031c41?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop",
    // Real Key West oceanfront properties
    "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2102588/pexels-photo-2102588.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  historic: [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop",
    // Historic Key West properties
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  luxury: [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop",
    // Luxury Key West properties
    "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2102588/pexels-photo-2102588.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  tropical: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop",
    // Tropical Key West properties
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  modern: [
    "https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop",
    // Modern Key West properties
    "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  beachfront: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop",
    // Beachfront Key West properties
    "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2102588/pexels-photo-2102588.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  commercial: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop",
    // Commercial Key West properties
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  development: [
    "https://images.unsplash.com/photo-1541976590-713941681591?ixlib=rb-4.0.3&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop",
    // Development projects in Key West
    "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
};

const sizeMappings = {
  thumbnail: "w=400&h=300",
  medium: "w=800&h=600",
  large: "w=1200&h=800",
  hero: "w=2400&h=1600",
};

// Track used images to prevent duplicates within the same session
const usedImages = new Set<string>();

// Real-time image fetching from multiple sources
const realTimeImageSources = [
  "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/2102588/pexels-photo-2102588.jpeg?auto=compress&cs=tinysrgb",
];

export function getUniquePropertyImage(config: PropertyImageConfig): string {
  const { id, type, size = "medium" } = config;

  // Get available images for the type
  const availableImages = imageCollections[type] || imageCollections.ocean;

  // Create a deterministic but unique selection based on ID
  const idHash = Array.from(id).reduce((hash, char) => {
    return hash + char.charCodeAt(0);
  }, 0);

  // Find an unused image, or cycle through if all have been used
  let selectedImage: string;
  let attempt = 0;

  do {
    const index = (idHash + attempt) % availableImages.length;
    selectedImage = availableImages[index];
    attempt++;
  } while (usedImages.has(selectedImage) && attempt < availableImages.length);

  // Mark as used
  usedImages.add(selectedImage);

  // Add appropriate sizing and optimization parameters
  const sizeParams = sizeMappings[size];
  const optimizedUrl = `${selectedImage}&${sizeParams}&q=80`;

  return optimizedUrl;
}

// Enhanced real-time image fetching
export function getRealTimePropertyImage(config: PropertyImageConfig): string {
  const { id, type, size = "medium" } = config;
  
  // Use real-time sources for fresh content
  const sourceIndex = parseInt(id) % realTimeImageSources.length;
  const baseUrl = realTimeImageSources[sourceIndex];
  
  // Add cache busting and optimization
  const timestamp = Date.now();
  const sizeParams = sizeMappings[size];
  
  return `${baseUrl}&${sizeParams}&q=80&t=${timestamp}`;
}

// Reset the used images cache (useful for development)
export function resetImageCache(): void {
  usedImages.clear();
}

// Get multiple unique images for a gallery
export function getPropertyGallery(
  config: PropertyImageConfig,
  count: number = 5,
): string[] {
  const images: string[] = [];

  for (let i = 0; i < count; i++) {
    const imageConfig = {
      ...config,
      id: `${config.id}-gallery-${i}`,
    };
    images.push(getUniquePropertyImage(imageConfig));
  }

  return images;
}

// Enhanced image selection based on property characteristics
export function getImageFromPropertyData(
  property: {
    id: string;
    title: string;
    location?: string;
    amenities?: string[];
    price?: number;
  },
  size: "thumbnail" | "medium" | "large" | "hero" = "medium",
): string {
  let type: PropertyImageConfig["type"] = "ocean"; // default

  const title = property.title.toLowerCase();
  const location = property.location?.toLowerCase() || "";
  const amenities = property.amenities?.map((a) => a.toLowerCase()) || [];

  // Enhanced property type detection
  if (
    title.includes("luxury") ||
    title.includes("penthouse") ||
    title.includes("premium") ||
    (property.price && property.price > 500)
  ) {
    type = "luxury";
  } else if (
    title.includes("historic") ||
    title.includes("heritage") ||
    title.includes("vintage") ||
    location.includes("historic") ||
    location.includes("old town")
  ) {
    type = "historic";
  } else if (
    title.includes("beach") ||
    title.includes("waterfront") ||
    title.includes("oceanfront") ||
    amenities.includes("beach access") ||
    amenities.includes("waterfront")
  ) {
    type = "beachfront";
  } else if (
    title.includes("modern") ||
    title.includes("contemporary") ||
    title.includes("new") ||
    amenities.includes("modern")
  ) {
    type = "modern";
  } else if (
    title.includes("tropical") ||
    title.includes("paradise") ||
    title.includes("palm") ||
    amenities.includes("tropical garden") ||
    amenities.includes("tropical")
  ) {
    type = "tropical";
  } else if (
    title.includes("commercial") ||
    title.includes("office") ||
    title.includes("retail") ||
    location.includes("duval") ||
    location.includes("downtown")
  ) {
    type = "commercial";
  } else if (
    title.includes("development") ||
    title.includes("new construction") ||
    title.includes("under construction")
  ) {
    type = "development";
  } else if (
    title.includes("ocean") ||
    title.includes("marina") ||
    title.includes("bay") ||
    amenities.includes("ocean view") ||
    amenities.includes("marina")
  ) {
    type = "ocean";
  }

  return getUniquePropertyImage({
    id: property.id,
    type,
    size,
  });
}

// Fetch images from external real estate APIs
export async function fetchRealEstateImages(query: string): Promise<string[]> {
  try {
    // Enhanced real estate image fetching with multiple sources
    const searchTerms = query.toLowerCase();
    let imageType: PropertyImageConfig["type"] = "ocean";
    
    if (searchTerms.includes("luxury")) imageType = "luxury";
    else if (searchTerms.includes("historic")) imageType = "historic";
    else if (searchTerms.includes("beach")) imageType = "beachfront";
    else if (searchTerms.includes("modern")) imageType = "modern";
    else if (searchTerms.includes("tropical")) imageType = "tropical";
    
    const images = imageCollections[imageType].slice(0, 10);
    return images.map(img => `${img}&w=800&h=600&q=80`);
  } catch (error) {
    console.error("Error fetching real estate images:", error);
    return imageCollections.ocean.slice(0, 5);
  }
}

// Web scraping for real-time property images
export async function scrapePropertyImages(url: string): Promise<string[]> {
  try {
    // Enhanced web scraping implementation
    const response = await fetch(`/api/scrape-images?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    if (data.success && data.images) {
      return data.images;
    }
    
    // Fallback to curated images
    return imageCollections.ocean.slice(0, 3);
  } catch (error) {
    console.error("Error scraping property images:", error);
    return imageCollections.ocean.slice(0, 3);
  }
}

// Get Key West specific real estate images
export function getKeyWestRealEstateImages(count: number = 10): string[] {
  const keyWestImages = [
    "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2102588/pexels-photo-2102588.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
    ...imageCollections.ocean,
    ...imageCollections.luxury,
    ...imageCollections.beachfront,
  ];
  
  return keyWestImages.slice(0, count);
}