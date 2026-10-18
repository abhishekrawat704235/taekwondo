import React from 'react';
import { Camera } from 'lucide-react';
import { ImageGallery } from '../components/ImageGallery';

export const Gallery: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Academy Moments</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight">
            Photo Gallery
          </h1>
          <p className="text-neutral-600 mt-3 text-base sm:text-lg">
            Explore training sessions, Olympic sparring drills, belt promotion tests, and championship celebrations at High Skill Taekwondo Academy.
          </p>
        </div>

        {/* Gallery Component with Lightbox */}
        <ImageGallery />

      </div>
    </div>
  );
};
