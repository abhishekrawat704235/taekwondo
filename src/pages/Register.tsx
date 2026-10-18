import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  User, 
  Calendar, 
  Users, 
  Phone, 
  Mail, 
  BookOpen, 
  Award, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight 
} from 'lucide-react';
import { apiService, RegistrationPayload } from '../services/api';
import { PROGRAMS } from '../data/academyData';

const experienceLevels = [
  'Beginner (No prior martial arts experience)',
  'Previous Taekwondo (White to Green Belt)',
  'Intermediate (Blue to Red Belt)',
  'Black Belt Holder (Dan Transfer / Advanced)',
  'Other Martial Arts (Karate, Judo, Kung Fu, etc.)',
];

export const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationPayload>({
    studentName: '',
    age: '',
    parentGuardianName: '',
    phone: '',
    email: '',
    preferredClass: PROGRAMS[1].title, // default Junior Champions
    previousExperience: experienceLevels[0],
    address: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.studentName.trim() || formData.studentName.trim().length < 2) {
      errs.studentName = 'Please enter student full name (at least 2 characters).';
    }

    const ageNum = Number(formData.age);
    if (!formData.age || isNaN(ageNum) || ageNum < 3 || ageNum > 99) {
      errs.age = 'Please enter a valid age between 3 and 99.';
    }

    if (ageNum < 18 && (!formData.parentGuardianName || formData.parentGuardianName.trim().length < 2)) {
      errs.parentGuardianName = 'Parent or Guardian name is required for students under 18.';
    }

    const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid contact phone number (at least 7 digits).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.preferredClass.trim()) {
      errs.preferredClass = 'Please select a training program.';
    }

    if (!formData.previousExperience.trim()) {
      errs.previousExperience = 'Please select experience level.';
    }

    if (!formData.address.trim() || formData.address.trim().length < 5) {
      errs.address = 'Please provide a full residential address.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
      const res = await apiService.submitRegistration(formData);

      if (res.success) {
        setIsSuccess(true);
      } else {
        setServerError(res.message || 'Submission failed. Please check your data and try again.');
      }
    } catch (err: any) {
      setServerError(err.message || 'An unexpected error occurred while communicating with the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      studentName: '',
      age: '',
      parentGuardianName: '',
      phone: '',
      email: '',
      preferredClass: PROGRAMS[1].title,
      previousExperience: experienceLevels[0],
      address: '',
    });
    setErrors({});
    setIsSuccess(false);
  };

  const isMinor = Number(formData.age) > 0 && Number(formData.age) < 18;

  return (
    <div className="bg-neutral-50 py-12 lg:py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Official Enrollment Form</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Student Registration
          </h1>
          <p className="text-neutral-600 max-w-xl mx-auto mt-2 text-sm sm:text-base">
            Join the High Skill Taekwondo family. Complete the registration form below to secure your place in our martial arts academy.
          </p>
        </div>

        {/* Success Banner */}
        {isSuccess ? (
          <div className="bg-white rounded-2xl border border-emerald-200 shadow-xl p-8 sm:p-12 text-center animate-fade-in">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-2">
              Registration Received!
            </h2>
            <p className="text-neutral-600 max-w-md mx-auto text-sm sm:text-base mb-6">
              Thank you, <strong className="text-neutral-900">{formData.studentName}</strong>! Your registration has been securely stored in our academy database. Our master instructors will contact you at <strong className="text-neutral-900">{formData.phone}</strong>.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 max-w-lg mx-auto text-left text-sm mb-8 space-y-2">
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Student Name:</span>
                <span className="font-semibold text-neutral-900">{formData.studentName}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Selected Program:</span>
                <span className="font-semibold text-red-600">{formData.preferredClass}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Age:</span>
                <span className="font-semibold text-neutral-900">{formData.age} years old</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Status:</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800">
                  Pending Instructor Review
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={resetForm}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-sm"
              >
                Register Another Student
              </button>
              <Link
                to="/classes"
                className="w-full sm:w-auto px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold rounded-xl transition-colors"
              >
                View Class Schedule
              </Link>
            </div>
          </div>
        ) : (
          /* Registration Form Card */
          <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
            
            {/* Top red accent stripe */}
            <div className="h-2 bg-gradient-to-r from-red-600 via-neutral-900 to-red-600" />

            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
              
              {/* Server Error Alert */}
              {serverError && (
                <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded-r-lg flex items-start space-x-3 text-red-700 text-sm animate-fade-in">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Registration Error</p>
                    <p>{serverError}</p>
                  </div>
                </div>
              )}

              {/* Section 1: Student Information */}
              <div>
                <h3 className="text-base font-bold text-neutral-900 uppercase tracking-wider flex items-center space-x-2 pb-3 border-b border-neutral-200 mb-4">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>Student Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                  {/* Student Full Name */}
                  <div className="sm:col-span-8">
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
                        placeholder="e.g. Alex Morgan"
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
                  <div className="sm:col-span-4">
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
                        placeholder="e.g. 8"
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

                  {/* Parent/Guardian Name */}
                  <div className="sm:col-span-12">
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Parent / Guardian Name {isMinor ? <span className="text-red-600">* (Required for under 18)</span> : <span className="text-neutral-400 font-normal">(Optional for adults)</span>}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Users className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="parentGuardianName"
                        value={formData.parentGuardianName}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Morgan"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                          errors.parentGuardianName
                            ? 'border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400'
                            : 'border-neutral-300 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                        }`}
                      />
                    </div>
                    {errors.parentGuardianName && (
                      <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.parentGuardianName}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Contact Details */}
              <div className="pt-2">
                <h3 className="text-base font-bold text-neutral-900 uppercase tracking-wider flex items-center space-x-2 pb-3 border-b border-neutral-200 mb-4">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>Contact Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                        placeholder="e.g. (555) 234-5678"
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

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. contact@example.com"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400'
                            : 'border-neutral-300 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Residential Address <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 pt-3 pointer-events-none text-neutral-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={2}
                        placeholder="e.g. 456 Maple Street, Apt 3B, Sports City, SC 90210"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                          errors.address
                            ? 'border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400'
                            : 'border-neutral-300 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                        }`}
                      />
                    </div>
                    {errors.address && (
                      <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.address}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Training Preferences */}
              <div className="pt-2">
                <h3 className="text-base font-bold text-neutral-900 uppercase tracking-wider flex items-center space-x-2 pb-3 border-b border-neutral-200 mb-4">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                  <span>Program & Experience</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Preferred Training Class */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Preferred Training Class <span className="text-red-600">*</span>
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

                  {/* Previous Experience */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Previous Martial Arts Experience <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Award className="w-4 h-4" />
                      </div>
                      <select
                        name="previousExperience"
                        value={formData.previousExperience}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 bg-white"
                      >
                        {experienceLevels.map((lvl) => (
                          <option key={lvl} value={lvl}>
                            {lvl}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button & Assurance */}
              <div className="pt-6 border-t border-neutral-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-red-600/30 transition-all duration-200 flex items-center justify-center space-x-2 text-base cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Registration to Academy Database...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Registration</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-neutral-500 mt-3">
                  🔒 Your information is confidential and will only be used for academy enrollment communications.
                </p>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
