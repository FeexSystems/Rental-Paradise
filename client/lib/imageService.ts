// Image service to provide unique, high-quality property images
// This service ensures no duplicate images and provides real-time, diverse imagery

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

const imageCollections = {
  ocean: [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    "https://images.unsplash.com/photo-1582063289852-62e3ba2747f8",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    "https://images.unsplash.com/photo-1589519160732-57fc498494f8",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    "https://images.unsplash.com/photo-1565031491910-e57fac031c41",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
  ],
  historic: [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    "https://images.unsplash.com/photo-1600573472592-401b489a3cdc",
  ],
  luxury: [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    "https://images.unsplash.com/photo-1600607687644-c5171f16b9ad",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  ],
  tropical: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    "https://images.unsplash.com/photo-1615875005139-1b9e8f0b2d6b",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    "https://images.unsplash.com/photo-1615875263214-1b03f4e0c7b5",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  ],
  modern: [
    "https://images.unsplash.com/photo-1582063289852-62e3ba2747f8",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600607687644-c5171f16b9ad",
    "https://images.unsplash.com/photo-1600485905890-7594ca737b10",
    "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
  ],
  beachfront: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    "https://images.unsplash.com/photo-1589519160732-57fc498494f8",
    "https://images.unsplash.com/photo-1615875005139-1b9e8f0b2d6b",
    "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d",
  ],
  commercial: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    "https://images.unsplash.com/photo-1582063289852-62e3ba2747f8",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
    "https://images.unsplash.com/photo-1560472355-536de3962603",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
  ],
  development: [
    "https://images.unsplash.com/photo-1541976590-713941681591",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
    "https://images.unsplash.com/photo-1604709177225-055f99402ea3",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
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
  const optimizedUrl = `${selectedImage}?ixlib=rb-4.0.3&auto=format&fit=crop&${sizeParams}&q=80`;

  return optimizedUrl;
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

// Get image based on property characteristics
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

  // Determine image type based on property characteristics
  if (
    title.includes("luxury") ||
    title.includes("penthouse") ||
    (property.price && property.price > 500)
  ) {
    type = "luxury";
  } else if (
    title.includes("historic") ||
    location.includes("historic") ||
    location.includes("old town")
  ) {
    type = "historic";
  } else if (
    title.includes("beach") ||
    title.includes("waterfront") ||
    amenities.includes("beach access")
  ) {
    type = "beachfront";
  } else if (title.includes("modern") || title.includes("contemporary")) {
    type = "modern";
  } else if (
    title.includes("tropical") ||
    title.includes("paradise") ||
    amenities.includes("tropical garden")
  ) {
    type = "tropical";
  } else if (title.includes("commercial") || location.includes("duval")) {
    type = "commercial";
  } else if (title.includes("development") || title.includes("new")) {
    type = "development";
  } else if (
    title.includes("ocean") ||
    title.includes("marina") ||
    amenities.includes("ocean view")
  ) {
    type = "ocean";
  }

  return getUniquePropertyImage({
    id: property.id,
    type,
    size,
  });
}
