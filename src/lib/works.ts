export type Work = {
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
};

export const works: Work[] = [
  { slug: "armadale-office", title: "Armadale Office", category: "Commercial", year: "2025", image: "/assets/house-4.png" },
  { slug: "caufield-north", title: "Caufield North", category: "Multi-residential", year: "2025", image: "/assets/house-5.png" },
  { slug: "penthouse-vivace", title: "Penthouse Vivace", category: "Residential", year: "2024", image: "/assets/house-1.png" },
  { slug: "partington", title: "Partington", category: "Residential", year: "2024", image: "/assets/house-6.png" },
  { slug: "north-bay-house", title: "North Bay House", category: "Multi-residential", year: "2025", image: "/assets/house-3.png" },
  { slug: "riverside-estate", title: "Riverside Estate", category: "Residential", year: "2024", image: "/assets/house-2.png" },
  { slug: "the-grove", title: "The Grove", category: "Commercial", year: "2023", image: "/assets/house-7.png" },
  { slug: "stonewood-villa", title: "Stonewood Villa", category: "Residential", year: "2025", image: "/assets/house-1.png" },
  { slug: "lakeview-pavilion", title: "Lakeview Pavilion", category: "Multi-residential", year: "2024", image: "/assets/house-4.png" },
  { slug: "cedar-court", title: "Cedar Court", category: "Residential", year: "2023", image: "/assets/house-5.png" },
  { slug: "harbour-lofts", title: "Harbour Lofts", category: "Commercial", year: "2025", image: "/assets/house-3.png" },
];

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}
