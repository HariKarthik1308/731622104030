import React, { useState, useMemo } from 'react';
import { Search, Clock, TrendingUp, Trash2 } from 'lucide-react';
import { ShortenedUrl } from '../types';
import { ShortenedUrlCard } from './ShortenedUrlCard';

interface UrlHistoryProps {
  urls: ShortenedUrl[];
  onUrlClick: (id: string) => void;
  onClearHistory: () => void;
}

export const UrlHistory: React.FC<UrlHistoryProps> = ({ urls, onUrlClick, onClearHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'clicks'>('date');

  const filteredAndSortedUrls = useMemo(() => {
    let filtered = urls.filter(url => 
      url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return b.clicks - a.clicks;
      }
    });
  }, [urls, searchTerm, sortBy]);

  if (urls.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">No URLs shortened yet</h3>
        <p className="text-gray-500">Your shortened URLs will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-gray-800">Your URLs</h2>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search URLs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'clicks')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
          >
            <option value="date">Sort by Date</option>
            <option value="clicks">Sort by Clicks</option>
          </select>
          
          <button
            onClick={onClearHistory}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAndSortedUrls.map((url) => (
          <ShortenedUrlCard
            key={url.id}
            url={url}
            onUrlClick={onUrlClick}
          />
        ))}
      </div>

      {filteredAndSortedUrls.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No URLs found matching your search</p>
        </div>
      )}
    </div>
  );
};