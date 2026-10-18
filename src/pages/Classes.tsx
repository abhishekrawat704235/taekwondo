import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { PROGRAMS, WEEKLY_SCHEDULE } from '../data/academyData';

export const Classes: React.FC = () => {
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('All');

  const filteredDays = selectedDayFilter === 'All'
    ? WEEKLY_SCHEDULE
    : WEEKLY_SCHEDULE.filter((d) => d.day.includes(selectedDayFilter));

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-neutral-950 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-red-950 border border-red-600/50 text-red-400 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Curriculum & Schedule</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Taekwondo Classes & Timetable
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto mt-4 text-base sm:text-lg">
            Age-appropriate martial arts training structured for steady progression, high energy, and lifelong confidence.
          </p>
        </div>
      </section>

      {/* 2. Program Cards Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Training Tracks
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Find The Perfect Class For You or Your Child
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2">
              Every class is led by certified black belt masters in our fully equipped, shock-absorbing dojang.
            </p>
          </div>

          <div className="space-y-12">
            {PROGRAMS.map((prog, idx) => (
              <div
                key={prog.id}
                className={`bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-center ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Image */}
                <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto lg:h-full bg-neutral-950 overflow-hidden">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-bold border shadow-sm ${prog.badgeColor}`}>
                      {prog.ageGroup}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-7 p-6 sm:p-10 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-2xl font-extrabold text-neutral-900">{prog.title}</h3>
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                        Level: {prog.level}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-red-600" />
                      <span>{prog.scheduleSnippet}</span>
                    </div>
                  </div>

                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {prog.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start space-x-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-3">
                    <Link
                      to="/register"
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors"
                    >
                      Register for this Class
                    </Link>
                    <Link
                      to="/book-trial"
                      className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors"
                    >
                      Book Free Trial
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Master Weekly Schedule */}
      <section className="py-20 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Weekly Timetable
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Class Schedule Overview
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2">
              Classes run Monday through Saturday. Students typically train 2 to 3 days per week.
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {['All', 'Monday', 'Tuesday', 'Friday', 'Saturday'].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDayFilter(day)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    selectedDayFilter === day
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {day === 'All' ? 'All Days' : day}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredDays.map((sched, idx) => (
              <div
                key={idx}
                className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                  <h3 className="font-extrabold text-lg text-neutral-900 flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-red-600" />
                    <span>{sched.day}</span>
                  </h3>
                  <span className="text-xs font-mono text-neutral-500 bg-neutral-200/80 px-2.5 py-1 rounded-md">
                    {sched.classes.length} Sessions
                  </span>
                </div>

                <div className="space-y-3">
                  {sched.classes.map((cls, cIdx) => (
                    <div
                      key={cIdx}
                      className="bg-white p-4 rounded-xl border border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs hover:border-red-400 transition-colors"
                    >
                      <div>
                        <span className="font-bold text-neutral-900 text-sm block">
                          {cls.program}
                        </span>
                        <span className="text-xs text-neutral-500">{cls.ageLevel}</span>
                      </div>
                      <div className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md self-start sm:self-auto">
                        {cls.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-neutral-500">
              * Schedule subject to special belt grading events and tournament seminars.
            </p>
          </div>
        </div>
      </section>

      {/* 4. What to Expect in Your First Trial Class */}
      <section className="py-16 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-red-500 font-bold uppercase tracking-wider text-xs">
              First Time Visitor?
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              What To Expect In Your First Trial Class
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              We know starting something new can feel intimidating. Our masters take personal care of beginners:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left">
              <div className="p-5 bg-neutral-900 rounded-xl border border-neutral-800">
                <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-bold text-sm flex items-center justify-center mb-3">1</span>
                <h4 className="font-bold text-white text-sm">Wear Workout Clothes</h4>
                <p className="text-xs text-neutral-400 mt-1">Wear regular sweatpants/joggers and a t-shirt. No special uniform needed for your trial.</p>
              </div>
              <div className="p-5 bg-neutral-900 rounded-xl border border-neutral-800">
                <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-bold text-sm flex items-center justify-center mb-3">2</span>
                <h4 className="font-bold text-white text-sm">Meet Your Master</h4>
                <p className="text-xs text-neutral-400 mt-1">Arrive 10 minutes early so our head instructor can show you the dojang and bow-in etiquette.</p>
              </div>
              <div className="p-5 bg-neutral-900 rounded-xl border border-neutral-800">
                <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-bold text-sm flex items-center justify-center mb-3">3</span>
                <h4 className="font-bold text-white text-sm">Have Fun & Kick Pads!</h4>
                <p className="text-xs text-neutral-400 mt-1">Learn basic stances, balance, and your very first front and roundhouse target kicks.</p>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/book-trial"
                className="inline-flex items-center space-x-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-colors text-sm"
              >
                <span>Reserve Your Free Trial Class Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
