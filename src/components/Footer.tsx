import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ArrowUp,
  Lock,
  FileText,
  Calendar,
} from "lucide-react";
import { ACADEMY_INFO } from "../data/academyData";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t-4 border-red-600 relative overflow-hidden">
      {/* Background Accent Element */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none select-none">
        <Shield className="w-96 h-96 text-white translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: About Academy */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="High Skill Taekwondo Academy logo"
                className="h-12 w-12 object-contain"
              />
              <div>
                
              </div>
              <div>
                <span className="block text-xl font-extrabold text-white tracking-tight">
                  HIGH SKILL
                </span>
                <span className="block text-xs uppercase tracking-widest text-red-500 font-semibold">
                  Taekwondo Academy
                </span>
              </div>
            </div>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              Empowering students of all ages through authentic martial arts
              training. Building self-discipline, focus, physical fitness, and
              Olympic sparring excellence.
            </p>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
              <p className="text-xs text-neutral-400">
                <span className="text-white font-semibold block mb-0.5">
                  Official Affiliation:
                </span>
                {ACADEMY_INFO.affiliation}
              </p>
            </div>
          </div>

          {/* Col 2: Navigation & Forms */}
          <div>
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-5 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Quick Navigation</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-red-400 transition-colors flex items-center space-x-2"
                >
                  <span className="text-red-500 text-xs">›</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-red-400 transition-colors flex items-center space-x-2"
                >
                  <span className="text-red-500 text-xs">›</span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/classes"
                  className="hover:text-red-400 transition-colors flex items-center space-x-2"
                >
                  <span className="text-red-500 text-xs">›</span>
                  <span>Classes & Schedule</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="hover:text-red-400 transition-colors flex items-center space-x-2"
                >
                  <span className="text-red-500 text-xs">›</span>
                  <span>Photo Gallery</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/achievements"
                  className="hover:text-red-400 transition-colors flex items-center space-x-2"
                >
                  <span className="text-red-500 text-xs">›</span>
                  <span>Achievements & Honors</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-red-400 transition-colors flex items-center space-x-2"
                >
                  <span className="text-red-500 text-xs">›</span>
                  <span>Contact Dojo</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-neutral-900">
                <Link
                  to="/register"
                  className="text-red-400 hover:text-red-300 font-semibold transition-colors flex items-center space-x-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Student Registration Form</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/book-trial"
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center space-x-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Free Trial Class</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Training Hours */}
          <div>
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-5 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Training Hours</span>
            </h4>
            <div className="space-y-3 text-sm text-neutral-300">
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="block text-white font-medium">
                    Monday – Friday Morning{" "}
                  </span>
                  <p className="text-sm text-neutral-400 whitespace-pre-line">
                    {ACADEMY_INFO.operatingHours.weekdays}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-sm block text-white font-medium">
                    Monday – Friday Evening{" "}
                  </span>
                  <p className="text-sm text-neutral-400 whitespace-pre-line">
                    {ACADEMY_INFO.operatingHours.saturday}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-neutral-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-sm block text-neutral-300 font-medium">
                    Saturday or Sunday
                  </span>
                  <span className="text-neutral-400 text-xs">
                    {ACADEMY_INFO.operatingHours.sunday}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & WhatsApp */}
          <div>
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-5 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Contact Dojo</span>
            </h4>
            <div className="space-y-3.5 text-sm text-neutral-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-neutral-200">
                    {ACADEMY_INFO.address}
                  </span>
                  <span className="block text-neutral-400 text-xs">
                    {ACADEMY_INFO.cityStateZip}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <a
                  href={`tel:${ACADEMY_INFO.phone}`}
                  className="hover:text-red-400 transition-colors"
                >
                  {ACADEMY_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <a
                  href={`mailto:${ACADEMY_INFO.email}`}
                  className="hover:text-red-400 transition-colors text-xs sm:text-sm"
                >
                  {ACADEMY_INFO.email}
                </a>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="mt-5">
              <a
                href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${encodeURIComponent(ACADEMY_INFO.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg w-full justify-center transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>
            © {new Date().getFullYear()} {ACADEMY_INFO.name}. All rights
            reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              to="/admin"
              className="text-neutral-400 hover:text-white flex items-center space-x-1"
            >
              <Lock className="w-3 h-3 text-red-500" />
              <span>Owner Admin Portal</span>
            </Link>
            <button
              onClick={scrollToTop}
              className="p-2 bg-neutral-900 hover:bg-red-600 text-white rounded-lg transition-colors border border-neutral-800"
              title="Scroll to Top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
