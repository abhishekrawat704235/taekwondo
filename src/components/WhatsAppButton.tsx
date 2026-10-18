import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';

export const WhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${encodeURIComponent(
    ACADEMY_INFO.whatsappMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      {/* Tooltip on hover */}
      {isHovered && (
        <div className="mr-3 bg-neutral-900 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-lg border border-neutral-700 whitespace-nowrap animate-fade-in hidden sm:block">
          Need help? Chat with us on WhatsApp!
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 relative group"
        aria-label="Chat with High Skill Taekwondo Academy on WhatsApp"
      >
        {/* Pulse ping effect */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
        
        <MessageSquare className="w-7 h-7 relative z-10 fill-current" />
      </a>
    </div>
  );
};
