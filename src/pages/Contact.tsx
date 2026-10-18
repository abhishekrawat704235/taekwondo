import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ChevronDown, 
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { apiService, ContactPayload } from '../services/api';
import { ACADEMY_INFO, FAQS } from '../data/academyData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactPayload>({
    fullName: '',
    phone: '',
    email: '',
    subject: 'General Inquiry / Membership Question',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid contact phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Subject is required.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = 'Please enter a message (at least 5 characters).';
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
      const res = await apiService.submitContact(formData);
      if (res.success) {
        setIsSuccess(true);
      } else {
        setServerError(res.message || 'Failed to send message. Please try again.');
      }
    } catch (err: any) {
      setServerError(err.message || 'Unable to connect to academy server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      subject: 'General Inquiry / Membership Question',
      message: '',
    });
    setErrors({});
    setIsSuccess(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>We Are Here To Help</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight">
            Contact High Skill Taekwondo
          </h1>
          <p className="text-neutral-600 mt-3 text-base sm:text-lg">
            Have questions about our belt curriculum, age programs, or schedule? Send us a message, visit our dojang, or chat directly via WhatsApp.
          </p>
        </div>

        {/* Contact Info Cards & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Academy Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-white rounded-2xl shadow-md border border-neutral-200 p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-neutral-900 pb-3 border-b border-neutral-100 flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                <span>Dojang Headquarters</span>
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase text-neutral-500 tracking-wider">Academy Location</h3>
                    <p className="text-neutral-900 font-semibold text-sm mt-0.5">{ACADEMY_INFO.address}</p>
                    <p className="text-neutral-600 text-xs">{ACADEMY_INFO.cityStateZip}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase text-neutral-500 tracking-wider">Phone Call</h3>
                    <a href={`tel:${ACADEMY_INFO.phone}`} className="text-neutral-900 font-semibold text-sm mt-0.5 hover:text-red-600 transition-colors block">
                      {ACADEMY_INFO.phoneDisplay}
                    </a>
                    <p className="text-neutral-500 text-xs">Direct line to front desk & coaches</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase text-neutral-500 tracking-wider">Email Support</h3>
                    <a href={`mailto:${ACADEMY_INFO.email}`} className="text-neutral-900 font-semibold text-sm mt-0.5 hover:text-red-600 transition-colors block">
                      {ACADEMY_INFO.email}
                    </a>
                    <p className="text-neutral-500 text-xs">Responses within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase text-neutral-500 tracking-wider">Training Hours</h3>
                    <p className="text-neutral-900 text-xs font-semibold mt-0.5">{ACADEMY_INFO.operatingHours.weekdays}</p>
                    <p className="text-neutral-900 text-xs font-semibold">{ACADEMY_INFO.operatingHours.saturday}</p>
                    <p className="text-neutral-500 text-xs">{ACADEMY_INFO.operatingHours.sunday}</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Action Card */}
              <div className="pt-4 border-t border-neutral-100">
                <a
                  href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${encodeURIComponent(ACADEMY_INFO.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Chat With Us On WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Safety & Kukkiwon Badge */}
            <div className="bg-neutral-900 text-white rounded-2xl p-6 border border-neutral-800 space-y-3">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-6 h-6 text-red-500" />
                <h3 className="font-bold text-white text-base">Certified & Sanctioned</h3>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                All belt promotions and curriculum at High Skill Taekwondo Academy strictly adhere to the global regulations of Kukkiwon World Taekwondo Headquarters.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
              <div className="h-2 bg-red-600" />

              {isSuccess ? (
                <div className="p-8 sm:p-12 text-center animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-neutral-900 mb-2">Message Delivered!</h3>
                  <p className="text-neutral-600 max-w-md mx-auto text-sm sm:text-base mb-6">
                    Thank you, <strong className="text-neutral-900">{formData.fullName}</strong>. Your inquiry has been routed to our academy team. We will reach back via phone or email shortly.
                  </p>
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-sm text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
                  <div>
                    <h2 className="text-xl font-extrabold text-neutral-900">Send Us a Direct Message</h2>
                    <p className="text-neutral-500 text-xs sm:text-sm mt-1">
                      Fill out the form below and an instructor will respond promptly.
                    </p>
                  </div>

                  {serverError && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded-r-lg flex items-start space-x-3 text-red-700 text-sm animate-fade-in">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Error Sending Message</p>
                        <p>{serverError}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Michael Chen"
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                          errors.fullName
                            ? 'border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400'
                            : 'border-neutral-300 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. (555) 456-7890"
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                          errors.phone
                            ? 'border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400'
                            : 'border-neutral-300 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. name@example.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400'
                            : 'border-neutral-300 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Subject <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 bg-white"
                      >
                        <option value="General Inquiry / Membership Question">General Inquiry / Membership Question</option>
                        <option value="Kids & Little Tigers Program Question">Kids & Little Tigers Program Question</option>
                        <option value="Olympic Sparring & Tournament Team">Olympic Sparring & Tournament Team</option>
                        <option value="Adult Fitness & Self Defense">Adult Fitness & Self Defense</option>
                        <option value="Tuition & Schedule Inquiries">Tuition & Schedule Inquiries</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Your Message <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="How can we assist you with your martial arts goals?"
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                          errors.message
                            ? 'border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400'
                            : 'border-neutral-300 focus:border-red-600 focus:ring-2 focus:ring-red-100'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Send Message Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-red-600/30 transition-all duration-200 flex items-center justify-center space-x-2 text-base cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending Message to Academy...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="mt-20 pt-16 border-t border-neutral-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 text-sm mt-2">
              Common questions answered about joining High Skill Taekwondo Academy.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between text-neutral-900 font-bold text-sm sm:text-base hover:text-red-600 transition-colors"
                  >
                    <span className="flex items-center space-x-3">
                      <HelpCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-400 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'transform rotate-180 text-red-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
