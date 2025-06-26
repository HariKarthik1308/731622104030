import React from 'react';
import { BarChart3, Link, MousePointer, TrendingUp } from 'lucide-react';
import { UrlStats } from '../types';

interface StatsCardProps {
  stats: UrlStats;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Link className="h-6 w-6" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{stats.totalUrls}</p>
            <p className="text-blue-100 text-sm">Total URLs</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <MousePointer className="h-6 w-6" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{stats.totalClicks}</p>
            <p className="text-purple-100 text-sm">Total Clicks</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">
              {stats.topUrl ? stats.topUrl.clicks : 0}
            </p>
            <p className="text-green-100 text-sm">Top URL Clicks</p>
          </div>
        </div>
      </div>
    </div>
  );
};