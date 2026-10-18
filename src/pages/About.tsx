import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle } from 'lucide-react';
import { COACHES } from '../data/academyData';

const beltRanks = [
  { belt: 'White Belt', meaning: 'Innocence & Beginning', color: 'bg-white border-2 border-neutral-300 text-neutral-800' },
  { belt: 'Yellow Belt', meaning: 'The Earth & Seed taking root', color: 'bg-amber-300 text-amber-900 border border-amber-400' },
  { belt: 'Green Belt', meaning: 'The Plant growing & skills developing', color: 'bg-emerald-600 text-white' },
  { belt: 'Blue Belt', meaning: 'The Sky & reaching upward', color: 'bg-blue-600 text-white' },
  { belt: 'Red Belt', meaning: 'Danger & exercise of self-control', color: 'bg-red-600 text-white' },
  { belt: 'Black Belt (Dan)', meaning: 'Mastery, maturity & new beginning', color: 'bg-neutral-950 text-white border-2 border-red-600' },
];

export const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* 1. Header Banner */}
      <section className="bg-neutral-950 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="/images/home/poomsae-feature.svg"
            alt="Taekwondo Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-950 border border-red-600/50 text-red-400 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Our Heritage & Philosophy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            About High Skill Taekwondo Academy
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto mt-4 text-base sm:text-lg leading-relaxed">
            Dedicated to fostering martial arts excellence, mental fortitude, and positive character in every student through world-class Kukkiwon Taekwondo training.
          </p>
        </div>
      </section>

      {/* 2. Academy Mission & Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                Our Foundation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                Tradition Meets Olympic Athleticism
              </h2>
              <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                Taekwondo literally translates to <em>"The Way of the Foot and Fist."</em> Originating in Korea and celebrated as a premier global Olympic sport, it trains the body to be agile, flexible, and powerful while cultivating an indomitable mind.
              </p>
              <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                At High Skill Taekwondo Academy, we believe martial arts is not about violence—it is about self-mastery. Every punch, kick, block, and bow is practiced with deep intention, reinforcing courtesy, perseverance, and emotional control.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <h4 className="font-extrabold text-neutral-900 text-base">Kukkiwon Standard</h4>
                  <p className="text-xs text-neutral-500 mt-1">Official headquarters curriculum and international certification.</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <h4 className="font-extrabold text-neutral-900 text-base">Family Centered</h4>
                  <p className="text-xs text-neutral-500 mt-1">Encouraging atmosphere where siblings and parents train together.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-neutral-200">
                <img
                  src="/images/home/poomsae-feature.svg"
                  alt="Traditional Taekwondo Poomsae"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Instructors & Masters Profile Section */}
      <section className="py-20 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Leadership & Mentorship
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Meet Our Certified Masters
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-3">
              Our instructors are lifelong martial artists, passionate educators, and safety-certified coaches dedicated to student success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {COACHES.map((coach, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row group"
              >
                {/* Coach Photo Placeholder */}
                <div className="sm:w-2/5 relative bg-neutral-950 overflow-hidden aspect-[4/5] sm:aspect-auto">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-red-600 text-white">
                      {coach.role}
                    </span>
                  </div>
                </div>

                {/* Coach Bio */}
                <div className="sm:w-3/5 p-6 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-red-600 transition-colors">
                      {coach.name}
                    </h3>
                    <p className="text-xs font-bold text-red-600 uppercase tracking-wider mt-0.5">
                      {coach.rank}
                    </p>
                    <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                      {coach.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                      Credentials & Licenses:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-neutral-700">
                      {coach.certifications.map((cert, cIdx) => (
                        <li key={cIdx} className="flex items-center space-x-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Belt Pathway Progression Guide */}
      <section className="py-20 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              The Journey to Dan Rank
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
              The Belt Ranking Pathway
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-3">
              Each belt color represents a stage of growth—from a curious beginner (White) to mature mastery (Black Belt).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beltRanks.map((b, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`px-3 py-1 rounded-md text-xs font-bold shadow-sm ${b.color}`}>
                    {b.belt}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">Step {idx + 1}</span>
                </div>
                <h4 className="font-bold text-neutral-900 text-base">{b.meaning}</h4>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  Students advance through consistent class attendance, mastering fundamental stances, basic kicks, Poomsae forms, and sparring discipline.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Strip */}
      <section className="py-16 bg-neutral-950 text-white border-t-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-white">
            Ready to Begin Your Martial Arts Journey?
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base">
            Join High Skill Taekwondo Academy today. All ages and experience levels welcome.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/book-trial"
              className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-colors text-sm"
            >
              Book a Free Trial Session
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold rounded-xl transition-colors text-sm"
            >
              Contact Our Dojo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
