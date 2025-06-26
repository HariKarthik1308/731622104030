import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { UrlInput } from './components/UrlInput';
import { UrlHistory } from './components/UrlHistory';
import { StatsCard } from './components/StatsCard';
import { ShortenedUrl, UrlStats } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateShortCode, createShortUrl, generateQRCode } from './utils/urlUtils';

function App() {
  const [urls, setUrls] = useLocalStorage<ShortenedUrl[]>('shortened-urls', []);
  const [isLoading, setIsLoading] = useState(false);

  const stats: UrlStats = useMemo(() => {
    const totalUrls = urls.length;
    const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
    const topUrl = urls.reduce((max, url) => 
      url.clicks > (max?.clicks || 0) ? url : max, null as ShortenedUrl | null);

    return { totalUrls, totalClicks, topUrl };
  }, [urls]);

  const handleUrlSubmit = async (originalUrl: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const shortCode = generateShortCode();
    const shortUrl = createShortUrl(shortCode);
    const qrCode = generateQRCode(shortUrl);
    
    const newUrl: ShortenedUrl = {
      id: Date.now().toString(),
      originalUrl,
      shortCode,
      shortUrl,
      createdAt: new Date(),
      clicks: 0,
      qrCode
    };

    setUrls(prev => [newUrl, ...prev]);
    setIsLoading(false);
  };

  const handleUrlClick = (id: string) => {
    setUrls(prev => prev.map(url => 
      url.id === id ? { ...url, clicks: url.clicks + 1 } : url
    ));
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all URLs?')) {
      setUrls([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Shorten Your URLs
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Instantly</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform long, complex URLs into short, shareable links with just one click. 
            Track clicks, generate QR codes, and manage all your links in one place.
          </p>
        </div>

        <div className="mb-12">
          <UrlInput onSubmit={handleUrlSubmit} isLoading={isLoading} />
        </div>

        {urls.length > 0 && (
          <>
            <StatsCard stats={stats} />
            <UrlHistory 
              urls={urls} 
              onUrlClick={handleUrlClick}
              onClearHistory={handleClearHistory}
            />
          </>
        )}
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2025 QuickLink. Built with React & TypeScript.</p>
            <p className="text-sm">
              Secure, fast, and reliable URL shortening service.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;