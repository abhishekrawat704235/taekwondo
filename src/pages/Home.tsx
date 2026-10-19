import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Award, 
  Users, 
  ChevronRight, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Camera
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { 
  PROGRAMS, 
  TAEKWONDO_TENETS, 
  GALLERY_ITEMS 
} from '../data/academyData';

export const Home: React.FC = () => {
  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Taekwondo Five Tenets Section */}
      <section className="bg-neutral-900 text-white py-14 border-y-2 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-red-500 font-bold uppercase tracking-widest text-xs">
              Ancient Martial Arts Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              The Five Tenets of Taekwondo
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-2">
              Every lesson at High Skill Academy instills these character foundations both inside the dojang and throughout everyday life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TAEKWONDO_TENETS.map((tenet, idx) => (
              <div
                key={idx}
                className="bg-neutral-950/80 p-5 rounded-xl border border-neutral-800 hover:border-red-600/60 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-sm mb-3 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  {idx + 1}
                </div>
                <h3 className="font-extrabold text-base text-white">{tenet.english}</h3>
                <p className="text-xs font-mono text-red-400 mt-0.5">{tenet.korean}</p>
                <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed">
                  {tenet.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Training Programs */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>World Taekwondo Standard</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Programs For Every Age & Skill Level
            </h2>
            <p className="text-neutral-600 mt-3 text-base sm:text-lg">
              Structured step-by-step curriculum designed to build strength, agility, self-defense, and razor-sharp concentration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROGRAMS.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                {/* Program Card Image */}
                <div className="relative aspect-[4/3] w-full bg-neutral-900 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${program.badgeColor}`}>
                      {program.ageGroup}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-red-600 transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                      {program.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2">
                      {program.highlights.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-neutral-600">
                          <CheckCircle className="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <Link
                      to="/book-trial"
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center space-x-1"
                    >
                      <span>Book Free Trial</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/register"
                      className="px-3 py-1.5 bg-neutral-900 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/classes"
              className="inline-flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-colors text-sm"
            >
              <span>View Full Weekly Schedule & Belts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Why High Skill Academy? */}
      <section className="py-20 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-red-600 font-bold uppercase tracking-wider text-xs">
                The High Skill Standard
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                More Than Just Kicking & Punching. We Build Resilient Leaders.
              </h2>
              <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                Founded on the time-tested discipline of Korean martial arts, High Skill Taekwondo Academy offers a safe, motivating dojang where every student is mentored by licensed masters.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm">Safety-First Training Facility</h4>
                    <p className="text-xs text-neutral-600 mt-0.5">High-impact shock absorbing mats, premium protective body armor, and sanitized training pads.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm">Internationally Certified Dan Belts</h4>
                    <p className="text-xs text-neutral-600 mt-0.5">Our Black Belt certificates are officially recognized worldwide by Kukkiwon World Taekwondo Headquarters.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm">Anti-Bullying & Respect</h4>
                    <p className="text-xs text-neutral-600 mt-0.5">Students learn de-escalation, self-confidence, posture, and verbal assertiveness to handle bullying peacefully.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-4">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-md"
                >
                  <span>Meet Our Instructors</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/book-trial"
                  className="inline-flex items-center text-neutral-700 hover:text-red-600 font-bold text-sm"
                >
                  Book Free Trial &rarr;
                </Link>
              </div>
            </div>

            {/* Visual Dojo Graphic */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-neutral-200">
                <img
                  src="public/images/home/8.jpeg"
                  alt="High Skill Taekwondo Academy Dojang"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Quote Card */}
              <div className="absolute -bottom-6 -left-6 bg-neutral-900 text-white p-5 rounded-2xl shadow-2xl border border-neutral-800 max-w-xs hidden sm:block">
                <div className="flex items-center space-x-1 text-amber-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-neutral-300 italic">
                  "High Skill Academy transformed our son's focus and confidence. The masters lead with patience and respect."
                </p>
                <span className="block text-[11px] text-red-400 font-semibold mt-2">— Academy Parent Feedback</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Photo Gallery Showcase Preview */}
      <section className="py-20 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-red-500 font-bold uppercase tracking-wider text-xs">
                Dojang In Action
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                Academy Photo Highlights
              </h2>
              <p className="text-neutral-400 text-sm mt-1">
                A glimpse into our sparring sessions, promotions, and junior drills.
              </p>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center space-x-2 text-red-500 hover:text-red-400 font-bold text-sm"
            >
              <Camera className="w-4 h-4" />
              <span>Open Full Interactive Gallery &rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLERY_ITEMS.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                to="/gallery"
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider block">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="py-16 bg-red-600 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <span className="bg-red-700/80 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                Start Today
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ready To Experience High Skill Taekwondo?
              </h2>
              <p className="text-red-100 text-sm sm:text-base leading-relaxed">
                Take the first step. Sign up for a free, zero-obligation trial session or complete your full student registration online today!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/book-trial"
                className="px-8 py-4 bg-neutral-950 hover:bg-neutral-900 text-white font-bold rounded-xl text-center shadow-xl transition-colors"
              >
                Book Free Trial Class
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 bg-white hover:bg-neutral-100 text-red-600 font-bold rounded-xl text-center shadow-xl transition-colors"
              >
                Register Online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
