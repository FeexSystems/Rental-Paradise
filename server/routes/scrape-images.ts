import { RequestHandler } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

interface ScrapedImage {
  url: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
}

// Enhanced headers to avoid bot detection
const getAxiosConfig = () => ({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate",
    Connection: "keep-alive",
    "Upgrade-Insecure-Requests": "1",
  },
  timeout: 10000,
});

// Function to scrape images from real estate websites
async function scrapeRealEstateImages(url: string): Promise<ScrapedImage[]> {
  try {
    const response = await axios.get(url, getAxiosConfig());
    const $ = cheerio.load(response.data);
    const images: ScrapedImage[] = [];

    // Look for property images with various selectors
    const imageSelectors = [
      'img[src*="property"]',
      'img[src*="real-estate"]',
      'img[src*="house"]',
      'img[src*="home"]',
      'img[alt*="property"]',
      'img[alt*="real estate"]',
      'img[alt*="house"]',
      'img[alt*="home"]',
      '.property-image img',
      '.listing-image img',
      '.gallery img',
      '.photo img',
      '[class*="property"] img',
      '[class*="listing"] img',
      '[class*="gallery"] img',
    ];

    imageSelectors.forEach(selector => {
      $(selector).each((index, element) => {
        const $img = $(element);
        const src = $img.attr('src') || $img.attr('data-src');
        const alt = $img.attr('alt') || '';
        const title = $img.attr('title') || '';
        
        if (src && src.startsWith('http')) {
          images.push({
            url: src,
            alt,
            title,
            width: parseInt($img.attr('width') || '0'),
            height: parseInt($img.attr('height') || '0'),
          });
        }
      });
    });

    // Remove duplicates and filter out small images
    const uniqueImages = images
      .filter((img, index, self) => 
        self.findIndex(i => i.url === img.url) === index
      )
      .filter(img => 
        !img.url.includes('logo') && 
        !img.url.includes('icon') &&
        (img.width === 0 || img.width > 200) &&
        (img.height === 0 || img.height > 150)
      );

    return uniqueImages.slice(0, 20); // Limit to 20 images
  } catch (error) {
    console.error("Error scraping images:", error);
    return [];
  }
}

// Function to get Key West real estate images from multiple sources
async function getKeyWestRealEstateImages(): Promise<ScrapedImage[]> {
  const keyWestSources = [
    "https://www.realtor.com/realestateandhomes-search/Key-West_FL",
    "https://www.zillow.com/key-west-fl/",
    "https://www.trulia.com/FL/Key_West/",
  ];

  const allImages: ScrapedImage[] = [];

  for (const source of keyWestSources) {
    try {
      const images = await scrapeRealEstateImages(source);
      allImages.push(...images);
    } catch (error) {
      console.error(`Error scraping ${source}:`, error);
    }
  }

  // Add curated Key West real estate images as fallback
  const curatedImages: ScrapedImage[] = [
    {
      url: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Key West Oceanfront Property",
      title: "Luxury Oceanfront Home in Key West"
    },
    {
      url: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Key West Historic Home",
      title: "Historic Key West Cottage"
    },
    {
      url: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Key West Luxury Villa",
      title: "Modern Luxury Villa in Key West"
    },
    {
      url: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Key West Beachfront Property",
      title: "Beachfront Property with Ocean Views"
    },
    {
      url: "https://images.pexels.com/photos/2102588/pexels-photo-2102588.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Key West Investment Property",
      title: "Prime Investment Property in Key West"
    },
    {
      url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Key West Tropical Home",
      title: "Tropical Paradise Home"
    },
    {
      url: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Key West Waterfront Condo",
      title: "Waterfront Condominium"
    },
  ];

  allImages.push(...curatedImages);

  // Remove duplicates and return
  return allImages.filter((img, index, self) => 
    self.findIndex(i => i.url === img.url) === index
  );
}

export const scrapeImages: RequestHandler = async (req, res) => {
  try {
    const { url, type = "keywest" } = req.query;
    let images: ScrapedImage[] = [];

    if (type === "keywest" || !url) {
      // Get Key West specific real estate images
      images = await getKeyWestRealEstateImages();
    } else if (typeof url === "string") {
      // Scrape images from specific URL
      images = await scrapeRealEstateImages(url);
    }

    res.json({
      success: true,
      count: images.length,
      images: images.map(img => img.url),
      imageData: images,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in scrapeImages:", error);
    res.status(500).json({
      success: false,
      error: "Failed to scrape images",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};