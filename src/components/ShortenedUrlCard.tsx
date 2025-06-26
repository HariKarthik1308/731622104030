import React, { useState } from 'react';
import { Copy, ExternalLink, QrCode, Check, Eye } from 'lucide-react';
import { ShortenedUrl } from '../types';
import { copyToClipboard, formatDate } from '../utils/urlUtils';

interface ShortenedUrlCardProps {
  url: ShortenedUrl;
  onUrlClick: (id: string) => void;
}

export const ShortenedUrlCard: React.FC<ShortenedUrlCardProps> = ({ url, onUrlClick }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(url.shortUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUrlClick = () => {
    onUrlClick(url.id);
    window.open(url.originalUrl, '_blank');
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-500">Created {formatDate(url.createdAt)}</span>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600 mb-1">Short URL:</p>
              <button
                onClick={handleUrlClick}
                className="text-blue-600 hover:text-blue-800 font-medium text-lg break-all hover:underline transition-colors"
              >
                {url.shortUrl}
              </button>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Original URL:</p>
              <p className="text-gray-800 break-all text-sm">{url.originalUrl}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 md:ml-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2 sm:mb-0">
            <Eye className="h-4 w-4" />
            <span>{url.clicks} clicks</span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                copied 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
              }`}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            
            <button
              onClick={() => setShowQR(!showQR)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors border border-gray-200"
            >
              <QrCode className="h-4 w-4" />
            </button>
            
            <button
              onClick={handleUrlClick}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors border border-blue-200"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {showQR && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img 
                src={url.qrCode} 
                alt="QR Code" 
                className="w-32 h-32"
                loading="lazy"
              />
              <p className="text-xs text-gray-600 text-center mt-2">Scan to open URL</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};