import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Shield, ArrowRight, Lock } from "lucide-react";
import { ACADEMY_INFO } from "../data/academyData";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Classes", path: "/classes" },
  { name: "Gallery", path: "/gallery" },
  { name: "Achievements", path: "/achievements" },
  { name: "Contact Us", path: "/contact" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs transition-all duration-200">
      {/* Top micro bar for phone & affiliation */}
      <div className="bg-neutral-950 text-neutral-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            <span>{ACADEMY_INFO.affiliation}</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${ACADEMY_INFO.phone}`}
              className="flex items-center space-x-1 text-white hover:text-red-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>Call: {ACADEMY_INFO.phoneDisplay}</span>
            </a>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <Link
              to="/admin"
              className="hidden sm:flex items-center space-x-1 text-neutral-400 hover:text-white transition-colors"
              title="Academy Staff Portal"
            >
              <Lock className="w-3 h-3 text-red-500" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Academy Name */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center space-x-3 group"
          >
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="High Skill Taekwondo Academy logo"
              className="h-12 w-12 object-contain"
            />
            <div>
            
              <span className="block text-[10px] sm:text-xs uppercase tracking-widest font-bold text-red-600 mt-1">
                Taekwondo Academy
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 relative ${
                    isActive
                      ? "text-red-600 bg-red-50/80 font-bold"
                      : "text-neutral-700 hover:text-red-600 hover:bg-neutral-50"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-red-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/register"
              className="text-xs font-bold text-neutral-800 hover:text-red-600 px-3 py-2 rounded-lg transition-colors border border-neutral-200 hover:border-red-600"
            >
              Register
            </Link>
            <Link
              to="/book-trial"
              className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
            >
              <span>Book Free Trial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="p-2.5 rounded-lg text-neutral-700 hover:text-red-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-red-600"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 shadow-xl animate-fade-in">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                    isActive
                      ? "text-red-600 bg-red-50 font-bold border-l-4 border-red-600"
                      : "text-neutral-800 hover:bg-neutral-100 hover:text-red-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-neutral-100 space-y-2.5">
              <Link
                to="/book-trial"
                onClick={closeMenu}
                className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-colors text-sm"
              >
                <span>Book Free Trial Class</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="w-full flex items-center justify-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-colors text-sm"
              >
                <span>Student Registration Form</span>
              </Link>
              <Link
                to="/admin"
                onClick={closeMenu}
                className="w-full flex items-center justify-center space-x-1.5 text-xs text-neutral-500 hover:text-neutral-900 py-2"
              >
                <Lock className="w-3 h-3 text-red-500" />
                <span>Staff Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
