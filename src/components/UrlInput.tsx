import React, { useState } from 'react';
import { Link, AlertCircle, Zap } from 'lucide-react';
import { isValidUrl } from '../utils/urlUtils';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (must start with http:// or https://)');
      return;
    }

    setError('');
    onSubmit(url);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    
    if (error && value.trim() && isValidUrl(value)) {
      setError('');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Link className="h-5 w-5 text-gray-400" />
          </div>
          
          <input
            type="url"
            value={url}
            onChange={handleUrlChange}
            placeholder="Enter your long URL here..."
            className={`w-full pl-12 pr-4 py-4 text-lg border-2 rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
              error 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
            }`}
            disabled={isLoading}
          />
          
          {error && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Shortening...</span>
            </div>
          ) : (
            <>
              <Zap className="h-5 w-5" />
              <span>Shorten URL</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};