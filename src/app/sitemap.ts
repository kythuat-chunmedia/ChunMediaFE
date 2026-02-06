import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Revalidate mỗi 1 giờ
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let entries: MetadataRoute.Sitemap = [];

  try {
    // Fetch từ Backend API
    const response = await fetch(`${API_URL}/api/public/sitemap`, {
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const data = await response.json();

      entries = data.map((item: any) => ({
        url: item.loc.startsWith("http") ? item.loc : `${BASE_URL}${item.loc}`,
        lastModified: item.lastMod ? new Date(item.lastMod) : new Date(),
        changeFrequency: item.changeFreq as
          | "always"
          | "hourly"
          | "daily"
          | "weekly"
          | "monthly"
          | "yearly"
          | "never",
        priority: parseFloat(item.priority),
      }));
    }
  } catch (error) {
    console.error("Error fetching sitemap:", error);

    // Fallback static pages nếu API lỗi
    entries = [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
    ];
  }

  return entries;
}