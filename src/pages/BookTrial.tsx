import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  User, 
  Calendar, 
  Phone, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { apiService, BookingPayload } from '../services/api';
import { PROGRAMS, ACADEMY_INFO } from '../data/academyData';

const timeSlots = [
  '4:15 PM – 5:00 PM (Little Tigers / Kids)',
  '5:15 PM – 6:15 PM (Junior Champions)',
  '6:30 PM – 7:45 PM (Teens & Adults)',
  '10:00 AM – 11:00 AM (Saturday All Belts)',
  '11:15 AM – 12:30 PM (Saturday Teens & Adults)',
];

export const BookTrial: React.FC = () => {
  // Tomorrow's date formatted as YYYY-MM-DD for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState<BookingPayload>({
    studentName: '',
    age: '',
    phone: '',
    preferredClass: PROGRAMS[1].title,
    preferredDate: minDateString,
    preferredTime: timeSlots[1],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.studentName.trim() || formData.studentName.trim().length < 2) {
      errs.studentName = 'Please enter student name (at least 2 characters).';
    }

    const ageNum = Number(formData.age);
    if (!formData.age || isNaN(ageNum) || ageNum < 3 || ageNum > 99) {
      errs.age = 'Please enter a valid age between 3 and 99.';
    }

    const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number (at least 7 digits).';
    }

    if (!formData.preferredClass.trim()) {
      errs.preferredClass = 'Please select a class.';
    }

    if (!formData.preferredDate.trim()) {
      errs.preferredDate = 'Please select a trial date.';
    }

    if (!formData.preferredTime.trim()) {
      errs.preferredTime = 'Please select a time slot.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await apiService.submitTrialBooking(formData);

      if (res.success) {
        setIsSuccess(true);
      } else {
        setServerError(res.message || 'Failed to book trial. Please verify information.');
      }
    } catch (err: any) {
      setServerError(err.message || 'Network error connecting to academy server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      studentName: '',
      age: '',
      phone: '',
      preferredClass: PROGRAMS[1].title,
      preferredDate: minDateString,
      preferredTime: timeSlots[1],
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div className="bg-neutral-50 py-12 lg:py-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Free • No Obligation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Book a Free Trial Class
          </h1>
          <p className="text-neutral-600 max-w-lg mx-auto mt-2 text-sm sm:text-base">
            Experience our supportive atmosphere and high-energy martial arts drills firsthand. Reserve your trial session below.
          </p>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="bg-white rounded-2xl border border-emerald-200 shadow-xl p-8 sm:p-12 text-center animate-fade-in">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-2">
              Trial Class Booked!
            </h2>
            <p className="text-neutral-600 max-w-md mx-auto text-sm sm:text-base mb-6">
              We look forward to meeting <strong className="text-neutral-900">{formData.studentName}</strong>! A confirmation has been stored in our system, and our head instructor will call <strong className="text-neutral-900">{formData.phone}</strong> with preparation tips.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 max-w-md mx-auto text-left text-sm mb-8 space-y-2">
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Student Name:</span>
                <span className="font-semibold text-neutral-900">{formData.studentName}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Class:</span>
                <span className="font-semibold text-red-600">{formData.preferredClass}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Date:</span>
                <span className="font-semibold text-neutral-900">{formData.preferredDate}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Time Slot:</span>
                <span className="font-semibold text-neutral-900">{formData.preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Dojo Location:</span>
                <span className="font-semibold text-neutral-900">{ACADEMY_INFO.address}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={resetForm}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-sm"
              >
                Book Another Trial
              </button>
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold rounded-xl transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          /* Booking Form Card */
          <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-600 via-neutral-900 to-red-600" />

            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
              
              {/* Server Error Alert */}
              {serverError && (
                <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded-r-lg flex items-start space-x-3 text-red-700 text-sm animate-fade-in">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Booking Error</p>
                    <p>{serverError}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Student Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Student Full Name <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="e.g. Jordan Smith"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                        errors.studentName
                          ? 'border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400'
                          : 'border-neutral-300 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                      }`}
                    />
                  </div>
                  {errors.studentName && (
                    <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.studentName}</span>
                    </p>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Student Age <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g. 7"
                      min="3"
                      max="99"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                        errors.age
                          ? 'border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400'
                          : 'border-neutral-300 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                      }`}
                    />
                  </div>
                  {errors.age && (
                    <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.age}</span>
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. (555) 123-4567"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                        errors.phone
                          ? 'border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400'
                          : 'border-neutral-300 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Preferred Class */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Preferred Class <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <select
                      name="preferredClass"
                      value={formData.preferredClass}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 bg-white"
                    >
                      {PROGRAMS.map((prog) => (
                        <option key={prog.id} value={prog.title}>
                          {prog.title} ({prog.ageGroup})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Preferred Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    min={minDateString}
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 bg-white"
                  />
                  {errors.preferredDate && (
                    <p className="text-xs text-red-600 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                {/* Preferred Time */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Preferred Time Slot <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 bg-white"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>

              {/* Notice */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs text-neutral-600 space-y-1">
                <p className="font-semibold text-neutral-900 flex items-center space-x-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-600" />
                  <span>What to wear to your trial class:</span>
                </p>
                <p>Comfortable athletic clothes (t-shirt and joggers). We train barefoot on sanitized mats. Uniform is provided when enrolling.</p>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-neutral-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-red-600/30 transition-all duration-200 flex items-center justify-center space-x-2 text-base cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Booking Your Free Trial...</span>
                    </>
                  ) : (
                    <>
                      <span>Book Trial Class</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
