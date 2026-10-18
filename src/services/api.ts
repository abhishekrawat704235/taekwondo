/**
 * High Skill Taekwondo Academy - Frontend API Service
 * Handles all communications with the Node.js / Express backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface RegistrationPayload {
  studentName: string;
  age: number | string;
  parentGuardianName?: string;
  phone: string;
  email: string;
  preferredClass: string;
  previousExperience: string;
  address: string;
}

export interface ContactPayload {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface BookingPayload {
  studentName: string;
  age: number | string;
  phone: string;
  preferredClass: string;
  preferredDate: string;
  preferredTime: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: string[];
}

// Helper to make API requests with unified error handling
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  const token = localStorage.getItem('tkd_admin_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMsg = json?.error || json?.message || `Server returned error (${res.status})`;
      return {
        success: false,
        message: errorMsg,
        error: errorMsg,
        errors: json?.errors,
      };
    }

    return {
      success: true,
      message: json?.message || 'Operation successful',
      data: json?.data !== undefined ? json.data : json,
    };
  } catch (err: any) {
    console.error(`API Error on ${url}:`, err);
    return {
      success: false,
      message: 'Unable to connect to backend server. Please verify backend is running on port 5000.',
      error: err.message || 'Network error',
    };
  }
}

export const apiService = {
  // Public form submissions
  async submitRegistration(data: RegistrationPayload) {
    return request('/registrations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async submitContact(data: ContactPayload) {
    return request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async submitTrialBooking(data: BookingPayload) {
    return request('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Admin Authentication
  async adminLogin(credentials: { username: string; password: string }) {
    return request<{ token: string; username: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async verifyAuth() {
    return request<{ valid: boolean; username: string }>('/auth/verify', {
      method: 'GET',
    });
  },

  // Admin Dashboard Data Retrieval
  async getRegistrations() {
    return request<any[]>('/registrations', { method: 'GET' });
  },

  async updateRegistrationStatus(id: string, status: string) {
    return request(`/registrations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  async deleteRegistration(id: string) {
    return request(`/registrations/${id}`, { method: 'DELETE' });
  },

  async getBookings() {
    return request<any[]>('/bookings', { method: 'GET' });
  },

  async updateBookingStatus(id: string, status: string) {
    return request(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  async deleteBooking(id: string) {
    return request(`/bookings/${id}`, { method: 'DELETE' });
  },

  async getContactMessages() {
    return request<any[]>('/contact', { method: 'GET' });
  },

  async updateContactStatus(id: string, status: string) {
    return request(`/contact/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  async deleteContactMessage(id: string) {
    return request(`/contact/${id}`, { method: 'DELETE' });
  },
};
