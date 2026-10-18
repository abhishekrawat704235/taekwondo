import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Award,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface HeroProps {
  onOpenTrial?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrial }) => {
  return (
    <section className="relative bg-neutral-950 text-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Background with Dark Martial Arts Theme & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/home/abhi.jpeg`}
          alt="High Skill Taekwondo Training Dojang"
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
      </div>

      {/* Decorative Red Glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 space-y-6">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-600/50 text-red-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Official Kukkiwon Standard Martial Arts</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              DISCIPLINE • FOCUS <br />
              <span className="text-red-600 drop-shadow-sm">
                HIGH SKILL
              </span>{" "}
              TAEKWONDO
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed">
              Empowering students of all ages through authentic martial arts
              training. Build rock-solid confidence, physical fitness, practical
              self-defense, and championship character.
            </p>

            {/* Feature Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-neutral-300">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span>Programs for Kids (4+), Teens & Adults</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span>Olympic Sparring & Poomsae Forms</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span>Anti-Bullying & Self-Confidence Training</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span>Certified Kukkiwon Black Belt Instructors</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/book-trial"
                onClick={onOpenTrial}
                className="inline-flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-red-600/30 transition-all duration-200 active:scale-95 text-center"
              >
                <span>Book a Free Trial Class</span>
                <ChevronRight className="w-5 h-5" />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center space-x-2 bg-neutral-900/90 hover:bg-neutral-800 text-white border-2 border-neutral-700 hover:border-neutral-500 font-bold text-base px-7 py-4 rounded-xl transition-all duration-200 active:scale-95 text-center backdrop-blur-sm"
              >
                <span>Student Registration</span>
              </Link>

              <Link
                to="/classes"
                className="inline-flex items-center justify-center text-neutral-300 hover:text-white font-semibold text-sm px-4 py-3 transition-colors text-center"
              >
                <span>View Class Schedule &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Quick Highlight Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-neutral-900/90 border border-neutral-800 p-6 rounded-2xl shadow-2xl backdrop-blur-md space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      High Skill Dojo
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Excellence in Martial Arts
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-neutral-800 text-red-400 rounded-md border border-neutral-700">
                  ESTABLISHED
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800/80">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                    <span>NEXT TRIAL SESSION</span>
                    <span className="text-emerald-400 font-medium">
                      Spots Open
                    </span>
                  </div>
                  <p className="font-semibold text-white">
                    This Saturday @ 10:00 AM
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    Beginners welcome. Uniform provided upon enrollment.
                  </p>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-red-950/40 border border-red-900/40 rounded-xl">
                  <Award className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-xs text-neutral-300">
                    <strong className="text-white">100% Certified:</strong> All
                    Dan rankings directly registered with Kukkiwon Headquarters.
                  </p>
                </div>
              </div>

              <Link
                to="/book-trial"
                className="w-full block text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                Claim Free Trial Spot
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-16 pt-10 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-neutral-900/40 rounded-xl border border-neutral-800/50">
            <span className="block text-3xl sm:text-4xl font-extrabold text-white">
              100+
            </span>
            <span className="text-xs sm:text-sm text-neutral-400 uppercase tracking-wider font-medium mt-1 block">
              Black Belts Certified
            </span>
          </div>
          <div className="p-4 bg-neutral-900/40 rounded-xl border border-neutral-800/50">
            <span className="block text-3xl sm:text-4xl font-extrabold text-red-500">
              20+
            </span>
            <span className="text-xs sm:text-sm text-neutral-400 uppercase tracking-wider font-medium mt-1 block">
              Years of Dedication
            </span>
          </div>
          <div className="p-4 bg-neutral-900/40 rounded-xl border border-neutral-800/50">
            <span className="block text-3xl sm:text-4xl font-extrabold text-white">
              4 to 65+
            </span>
            <span className="text-xs sm:text-sm text-neutral-400 uppercase tracking-wider font-medium mt-1 block">
              Ages Welcomed
            </span>
          </div>
          <div className="p-4 bg-neutral-900/40 rounded-xl border border-neutral-800/50">
            <span className="block text-3xl sm:text-4xl font-extrabold text-red-500">
              5-Star
            </span>
            <span className="text-xs sm:text-sm text-neutral-400 uppercase tracking-wider font-medium mt-1 block">
              Family Atmosphere
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
