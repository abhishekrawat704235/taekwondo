import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  LogOut, 
  Users, 
  Calendar, 
  MessageSquare, 
  Trash2, 
  RefreshCw, 
  AlertCircle, 
  Search,
  Eye,
  X
} from 'lucide-react';
import { apiService } from '../services/api';

type Tab = 'registrations' | 'bookings' | 'messages';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  
  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data State
  const [currentTab, setCurrentTab] = useState<Tab>('registrations');
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

  // Check auth token on mount
  useEffect(() => {
    const token = localStorage.getItem('tkd_admin_token');
    if (!token) {
      setIsAuthenticated(false);
      setAuthLoading(false);
      return;
    }

    apiService.verifyAuth().then((res) => {
      if (res.success && res.data?.valid) {
        setIsAuthenticated(true);
        loadAllData();
      } else {
        localStorage.removeItem('tkd_admin_token');
        setIsAuthenticated(false);
      }
      setAuthLoading(false);
    });
  }, []);

  const loadAllData = async () => {
    setIsLoadingData(true);
    try {
      const [regRes, bookRes, msgRes] = await Promise.all([
        apiService.getRegistrations(),
        apiService.getBookings(),
        apiService.getContactMessages(),
      ]);

      if (regRes.success) setRegistrations(regRes.data || []);
      if (bookRes.success) setBookings(bookRes.data || []);
      if (msgRes.success) setMessages(msgRes.data || []);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await apiService.adminLogin({ username, password });
      if (res.success && res.data?.token) {
        localStorage.setItem('tkd_admin_token', res.data.token);
        setIsAuthenticated(true);
        loadAllData();
      } else {
        setLoginError(res.message || 'Invalid credentials. Default: admin / admin123');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Connection error.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tkd_admin_token');
    setIsAuthenticated(false);
    setRegistrations([]);
    setBookings([]);
    setMessages([]);
  };

  // Status updates
  const handleUpdateRegStatus = async (id: string, status: string) => {
    const res = await apiService.updateRegistrationStatus(id, status);
    if (res.success) {
      setRegistrations((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
    }
  };

  const handleUpdateBookStatus = async (id: string, status: string) => {
    const res = await apiService.updateBookingStatus(id, status);
    if (res.success) {
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    }
  };

  const handleUpdateMsgStatus = async (id: string, status: string) => {
    const res = await apiService.updateContactStatus(id, status);
    if (res.success) {
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status } : m))
      );
    }
  };

  // Deletions with confirmation
  const handleDeleteRegistration = async (id: string, studentName: string) => {
    if (window.confirm(`Are you sure you want to delete the registration for "${studentName}"?`)) {
      const res = await apiService.deleteRegistration(id);
      if (res.success) {
        setRegistrations((prev) => prev.filter((r) => r._id !== id));
      }
    }
  };

  const handleDeleteBooking = async (id: string, studentName: string) => {
    if (window.confirm(`Are you sure you want to delete the trial booking for "${studentName}"?`)) {
      const res = await apiService.deleteBooking(id);
      if (res.success) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
      }
    }
  };

  const handleDeleteMessage = async (id: string, senderName: string) => {
    if (window.confirm(`Are you sure you want to delete the message from "${senderName}"?`)) {
      const res = await apiService.deleteContactMessage(id);
      if (res.success) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
      }
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">
        <RefreshCw className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  // If not authenticated, render Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-red-600/20 text-red-500 border border-red-600/40 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Academy Staff Portal</h1>
            <p className="text-xs text-neutral-400">
              High Skill Taekwondo Academy - Restricted Access
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-950/80 border border-red-800 rounded-xl text-red-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                Admin Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors text-sm shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Log In to Dashboard</span>
                )}
              </button>
            </div>

            <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-[11px] text-neutral-400 text-center">
              💡 Default credentials from <code className="text-neutral-200">.env</code>: <strong>admin</strong> / <strong>admin123</strong>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Filtered lists according to search query
  const query = searchQuery.toLowerCase().trim();

  const filteredRegistrations = registrations.filter(
    (r) =>
      r.studentName?.toLowerCase().includes(query) ||
      r.phone?.includes(query) ||
      r.preferredClass?.toLowerCase().includes(query)
  );

  const filteredBookings = bookings.filter(
    (b) =>
      b.studentName?.toLowerCase().includes(query) ||
      b.phone?.includes(query) ||
      b.preferredClass?.toLowerCase().includes(query)
  );

  const filteredMessages = messages.filter(
    (m) =>
      m.fullName?.toLowerCase().includes(query) ||
      m.email?.toLowerCase().includes(query) ||
      m.subject?.toLowerCase().includes(query)
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header & Actions */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-md">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                High Skill Taekwondo • Admin Portal
              </h1>
              <p className="text-xs text-neutral-400">
                Manage registrations, trial class bookings, and incoming contact messages.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={loadAllData}
              disabled={isLoadingData}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold rounded-lg border border-neutral-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin text-red-400' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-semibold rounded-lg border border-red-800 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div 
            onClick={() => setCurrentTab('registrations')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              currentTab === 'registrations'
                ? 'bg-neutral-900 border-red-500 ring-2 ring-red-500/20'
                : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Student Enrollments</span>
              <Users className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-3xl font-extrabold text-white mt-2">{registrations.length}</p>
            <p className="text-xs text-neutral-500 mt-1">Full registration submissions</p>
          </div>

          <div 
            onClick={() => setCurrentTab('bookings')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              currentTab === 'bookings'
                ? 'bg-neutral-900 border-red-500 ring-2 ring-red-500/20'
                : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Trial Class Bookings</span>
              <Calendar className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-extrabold text-white mt-2">{bookings.length}</p>
            <p className="text-xs text-neutral-500 mt-1">Scheduled trial students</p>
          </div>

          <div 
            onClick={() => setCurrentTab('messages')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              currentTab === 'messages'
                ? 'bg-neutral-900 border-red-500 ring-2 ring-red-500/20'
                : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Contact Inquiries</span>
              <MessageSquare className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-extrabold text-white mt-2">{messages.length}</p>
            <p className="text-xs text-neutral-500 mt-1">Direct website messages</p>
          </div>
        </div>

        {/* Tab Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-900 p-3 rounded-2xl border border-neutral-800">
          <div className="flex space-x-2 w-full sm:w-auto">
            <button
              onClick={() => setCurrentTab('registrations')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                currentTab === 'registrations'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              Registrations ({registrations.length})
            </button>
            <button
              onClick={() => setCurrentTab('bookings')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                currentTab === 'bookings'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              Trial Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setCurrentTab('messages')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                currentTab === 'messages'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              Messages ({messages.length})
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by name, phone, class..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600"
            />
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* TAB 1: REGISTRATIONS */}
          {currentTab === 'registrations' && (
            <div className="overflow-x-auto">
              {filteredRegistrations.length === 0 ? (
                <div className="p-12 text-center text-neutral-500 text-sm">
                  No registrations found. New registrations submitted on the website will appear here instantly.
                </div>
              ) : (
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-neutral-950 text-neutral-400 uppercase text-[11px] tracking-wider border-b border-neutral-800">
                    <tr>
                      <th className="py-3.5 px-4">Student & Age</th>
                      <th className="py-3.5 px-4">Parent / Guardian</th>
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-4">Program & Experience</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-neutral-300">
                    {filteredRegistrations.map((item) => (
                      <tr key={item._id} className="hover:bg-neutral-800/40 transition-colors">
                        <td className="py-4 px-4 font-semibold text-white">
                          <div>{item.studentName}</div>
                          <span className="text-xs text-neutral-400">{item.age} yrs old</span>
                        </td>
                        <td className="py-4 px-4 text-neutral-400">
                          {item.parentGuardianName || '— (Adult)'}
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-white font-mono text-xs">{item.phone}</div>
                          <div className="text-neutral-400 text-xs">{item.email}</div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-red-400 font-medium block">{item.preferredClass}</span>
                          <span className="text-[11px] text-neutral-400">{item.previousExperience}</span>
                        </td>
                        <td className="py-4 px-4 text-xs text-neutral-400 whitespace-nowrap">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={item.status || 'Pending'}
                            onChange={(e) => handleUpdateRegStatus(item._id, e.target.value)}
                            className="bg-neutral-950 text-xs rounded-lg px-2.5 py-1 border border-neutral-700 focus:outline-none focus:border-red-500 font-semibold"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedRecord(item)}
                            className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 rounded-md transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRegistration(item._id, item.studentName)}
                            className="p-1.5 text-neutral-400 hover:text-red-400 bg-neutral-800 rounded-md transition-colors"
                            title="Delete registration"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* TAB 2: TRIAL BOOKINGS */}
          {currentTab === 'bookings' && (
            <div className="overflow-x-auto">
              {filteredBookings.length === 0 ? (
                <div className="p-12 text-center text-neutral-500 text-sm">
                  No trial bookings found. Form submissions from "Book Free Trial" will appear here.
                </div>
              ) : (
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-neutral-950 text-neutral-400 uppercase text-[11px] tracking-wider border-b border-neutral-800">
                    <tr>
                      <th className="py-3.5 px-4">Student Name</th>
                      <th className="py-3.5 px-4">Phone</th>
                      <th className="py-3.5 px-4">Class</th>
                      <th className="py-3.5 px-4">Requested Date & Time</th>
                      <th className="py-3.5 px-4">Booked On</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-neutral-300">
                    {filteredBookings.map((b) => (
                      <tr key={b._id} className="hover:bg-neutral-800/40 transition-colors">
                        <td className="py-4 px-4 font-semibold text-white">
                          <div>{b.studentName}</div>
                          <span className="text-xs text-neutral-400">{b.age} years old</span>
                        </td>
                        <td className="py-4 px-4 font-mono text-xs text-neutral-200">
                          {b.phone}
                        </td>
                        <td className="py-4 px-4 text-red-400 font-medium">
                          {b.preferredClass}
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-white font-medium">{b.preferredDate}</div>
                          <div className="text-xs text-neutral-400">{b.preferredTime}</div>
                        </td>
                        <td className="py-4 px-4 text-xs text-neutral-400 whitespace-nowrap">
                          {new Date(b.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={b.status || 'Pending'}
                            onChange={(e) => handleUpdateBookStatus(b._id, e.target.value)}
                            className="bg-neutral-950 text-xs rounded-lg px-2.5 py-1 border border-neutral-700 focus:outline-none focus:border-red-500 font-semibold"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteBooking(b._id, b.studentName)}
                            className="p-1.5 text-neutral-400 hover:text-red-400 bg-neutral-800 rounded-md transition-colors"
                            title="Delete booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* TAB 3: CONTACT MESSAGES */}
          {currentTab === 'messages' && (
            <div className="overflow-x-auto">
              {filteredMessages.length === 0 ? (
                <div className="p-12 text-center text-neutral-500 text-sm">
                  No contact messages yet. Messages sent through the Contact Us form will appear here.
                </div>
              ) : (
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-neutral-950 text-neutral-400 uppercase text-[11px] tracking-wider border-b border-neutral-800">
                    <tr>
                      <th className="py-3.5 px-4">Sender & Contact</th>
                      <th className="py-3.5 px-4">Subject & Message</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-neutral-300">
                    {filteredMessages.map((m) => (
                      <tr key={m._id} className="hover:bg-neutral-800/40 transition-colors">
                        <td className="py-4 px-4 font-semibold text-white">
                          <div>{m.fullName}</div>
                          <div className="text-neutral-400 text-xs font-mono">{m.phone}</div>
                          <div className="text-neutral-500 text-xs">{m.email}</div>
                        </td>
                        <td className="py-4 px-4 max-w-md">
                          <div className="font-semibold text-white">{m.subject}</div>
                          <p className="text-neutral-400 text-xs mt-1 line-clamp-2">{m.message}</p>
                        </td>
                        <td className="py-4 px-4 text-xs text-neutral-400 whitespace-nowrap">
                          {new Date(m.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={m.status || 'Unread'}
                            onChange={(e) => handleUpdateMsgStatus(m._id, e.target.value)}
                            className="bg-neutral-950 text-xs rounded-lg px-2.5 py-1 border border-neutral-700 focus:outline-none focus:border-red-500 font-semibold"
                          >
                            <option value="Unread">Unread</option>
                            <option value="Read">Read</option>
                            <option value="Responded">Responded</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedRecord(m)}
                            className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 rounded-md transition-colors"
                            title="View complete message"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(m._id, m.fullName)}
                            className="p-1.5 text-neutral-400 hover:text-red-400 bg-neutral-800 rounded-md transition-colors"
                            title="Delete message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Record Inspection Modal */}
      {selectedRecord && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedRecord(null)}
        >
          <div 
            className="max-w-xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-lg font-bold text-white">Record Details</h3>
              <button 
                onClick={() => setSelectedRecord(null)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              {Object.entries(selectedRecord).map(([key, value]) => {
                if (key === '__v') return null;
                return (
                  <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-neutral-800/60">
                    <span className="text-neutral-400 font-mono text-xs uppercase">{key}:</span>
                    <span className="text-white font-medium text-xs sm:text-sm break-all">{String(value)}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
