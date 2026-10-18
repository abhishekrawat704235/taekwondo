import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Award, Medal, Star } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/academyData';

const danPromotions = [
  { rank: '1st Poom / Junior Black Belt', candidates: '14 Students Promoted', exam: 'Comprehensive Forms, Sparring & Board Breaking' },
  { rank: '1st Dan Adult Black Belt', candidates: '9 Students Promoted', exam: 'Self-Defense Escapes, Olympic Sparring & Thesis' },
  { rank: '2nd Dan Black Belt', candidates: '5 Instructors Promoted', exam: 'Advanced Poomsae, Demonstration & Mentorship' },
  { rank: '3rd Dan Black Belt', candidates: '2 Senior Coaches Promoted', exam: 'Mastery of Traditional Curriculum & Leadership' },
];

export const Achievements: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Header */}
      <section className="bg-neutral-950 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-red-950 border border-red-600/50 text-red-400 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Honors & Milestones</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Academy Achievements
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto mt-4 text-base sm:text-lg">
            Celebrating the hard work, tournament medals, and character milestones of our students and coaching staff.
          </p>
        </div>
      </section>

      {/* 2. Major Tournament & Award Showcases */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Hall of Honors
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Championship Podiums & Recognition
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2">
              Recognizing athletic dedication across state, regional, and national martial arts events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ACHIEVEMENTS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-neutral-900/90 text-amber-400 text-xs font-bold rounded-md backdrop-blur-sm border border-amber-500/30 flex items-center space-x-1.5">
                      <Medal className="w-3.5 h-3.5" />
                      <span>{item.badge}</span>
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="px-2.5 py-1 bg-red-600 text-white text-[11px] font-bold rounded">
                      {item.year}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] uppercase font-bold text-red-600 tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Dan Promotions & Black Belt Roster */}
      <section className="py-20 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Kukkiwon Dan Honor Roll
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Black Belt Dan Promotions
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2">
              Earning a Black Belt requires years of perseverance, intense physical testing, and embodying the five tenets of Taekwondo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {danPromotions.map((p, idx) => (
              <div
                key={idx}
                className="bg-neutral-900 text-white p-6 rounded-2xl border border-neutral-800 space-y-4 hover:border-red-600 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-base">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-white">{p.rank}</h4>
                  <p className="text-xs font-bold text-amber-400 mt-1">{p.candidates}</p>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed border-t border-neutral-800 pt-3">
                  {p.exam}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Student of the Month & Character Award */}
      <section className="py-16 bg-neutral-950 text-white border-t-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-16 h-16 bg-red-600/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-red-600/40">
            <Star className="w-8 h-8 fill-current" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Will You Be Our Next Black Belt Champion?
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base">
            Every champion was once a beginner who refused to quit. Start your journey with High Skill Taekwondo Academy today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/book-trial"
              className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-colors text-sm"
            >
              Book a Free Trial Class
            </Link>
            <Link
              to="/register"
              className="px-8 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl transition-colors text-sm"
            >
              Online Student Registration
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
