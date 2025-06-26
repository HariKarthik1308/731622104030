export interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  createdAt: Date;
  clicks: number;
  qrCode?: string;
}

export interface UrlStats {
  totalUrls: number;
  totalClicks: number;
  topUrl: ShortenedUrl | null;
}