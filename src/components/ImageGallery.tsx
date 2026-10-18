import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Info } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/academyData';

const categories = ['All', 'Training', 'Sparring', 'Graduation', 'Tournaments', 'Kids'] as const;
type Category = (typeof categories)[number];

export const ImageGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredItems: GalleryItem[] = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const showNext = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
  }, [selectedImageIndex, filteredItems.length]);

  const showPrev = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + filteredItems.length) % filteredItems.length);
  }, [selectedImageIndex, filteredItems.length]);

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, showNext, showPrev]);

  const currentItem = selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null;

  return (
    <div className="w-full">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedImageIndex(null);
            }}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20 scale-105'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openLightbox(index)}
            className="group relative bg-neutral-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-neutral-200 hover:border-red-500 transform hover:-translate-y-1"
          >
            {/* Image Box */}
            <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-950 relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-neutral-900/80 text-white backdrop-blur-sm border border-neutral-700/50">
                  {item.category}
                </span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Title & Caption */}
            <div className="p-4 bg-white border-t border-neutral-100">
              <h3 className="font-bold text-neutral-900 text-base group-hover:text-red-600 transition-colors line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* How to replace photos guide note */}
      <div className="mt-12 bg-neutral-50 border border-neutral-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-neutral-900">Want to add your real academy photos?</h4>
            <p className="text-xs text-neutral-600">
              Drop your images into <code className="bg-neutral-200 px-1.5 py-0.5 rounded text-neutral-800">public/images/gallery/</code> or configure titles in <code className="bg-neutral-200 px-1.5 py-0.5 rounded text-neutral-800">src/data/academyData.ts</code>.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-500">
          <Info className="w-4 h-4 text-neutral-400" />
          <span>Click any photo to view full-size</span>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImageIndex !== null && currentItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-neutral-900/80 hover:bg-red-600 p-2.5 rounded-full transition-colors z-50"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-neutral-900/80 hover:bg-red-600 p-3 rounded-full transition-colors z-50 shadow-lg"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-neutral-900/80 hover:bg-red-600 p-3 rounded-full transition-colors z-50 shadow-lg"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div 
            className="max-w-4xl w-full bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Lightbox Image */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="max-h-full max-w-full object-contain"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-md uppercase tracking-wider">
                {currentItem.category}
              </span>
            </div>

            {/* Bottom info banner */}
            <div className="p-5 sm:p-6 bg-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white">
              <div>
                <h3 className="text-xl font-bold text-white">{currentItem.title}</h3>
                <p className="text-sm text-neutral-400 mt-1">{currentItem.description}</p>
              </div>
              <div className="text-xs font-mono text-neutral-400 bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700 whitespace-nowrap self-start sm:self-auto">
                Photo {selectedImageIndex + 1} of {filteredItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
