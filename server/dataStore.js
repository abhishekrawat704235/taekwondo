import mongoose from 'mongoose';
import { Registration } from './models/Registration.js';
import { Booking } from './models/Booking.js';
import { ContactMessage } from './models/ContactMessage.js';
import { Admin } from './models/Admin.js';
import crypto from 'crypto';

// In-memory fallback containers for offline/testing mode
const memoryStore = {
  registrations: [],
  bookings: [],
  contactMessages: [],
  admins: [],
};

const isMongoActive = () => mongoose.connection.readyState === 1;

export const dataStore = {
  // ----------------- REGISTRATIONS -----------------
  async createRegistration(data) {
    if (isMongoActive()) {
      return await Registration.create(data);
    }
    const item = {
      _id: crypto.randomUUID(),
      ...data,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryStore.registrations.unshift(item);
    return item;
  },

  async getRegistrations() {
    if (isMongoActive()) {
      return await Registration.find().sort({ createdAt: -1 });
    }
    return [...memoryStore.registrations];
  },

  async updateRegistrationStatus(id, status) {
    if (isMongoActive()) {
      return await Registration.findByIdAndUpdate(id, { status }, { new: true });
    }
    const item = memoryStore.registrations.find((r) => r._id === id);
    if (item) {
      item.status = status;
      item.updatedAt = new Date().toISOString();
    }
    return item;
  },

  async deleteRegistration(id) {
    if (isMongoActive()) {
      return await Registration.findByIdAndDelete(id);
    }
    const index = memoryStore.registrations.findIndex((r) => r._id === id);
    if (index !== -1) {
      return memoryStore.registrations.splice(index, 1)[0];
    }
    return null;
  },

  // ----------------- BOOKINGS -----------------
  async createBooking(data) {
    if (isMongoActive()) {
      return await Booking.create(data);
    }
    const item = {
      _id: crypto.randomUUID(),
      ...data,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryStore.bookings.unshift(item);
    return item;
  },

  async getBookings() {
    if (isMongoActive()) {
      return await Booking.find().sort({ createdAt: -1 });
    }
    return [...memoryStore.bookings];
  },

  async updateBookingStatus(id, status) {
    if (isMongoActive()) {
      return await Booking.findByIdAndUpdate(id, { status }, { new: true });
    }
    const item = memoryStore.bookings.find((b) => b._id === id);
    if (item) {
      item.status = status;
      item.updatedAt = new Date().toISOString();
    }
    return item;
  },

  async deleteBooking(id) {
    if (isMongoActive()) {
      return await Booking.findByIdAndDelete(id);
    }
    const index = memoryStore.bookings.findIndex((b) => b._id === id);
    if (index !== -1) {
      return memoryStore.bookings.splice(index, 1)[0];
    }
    return null;
  },

  // ----------------- CONTACT MESSAGES -----------------
  async createContactMessage(data) {
    if (isMongoActive()) {
      return await ContactMessage.create(data);
    }
    const item = {
      _id: crypto.randomUUID(),
      ...data,
      status: 'Unread',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryStore.contactMessages.unshift(item);
    return item;
  },

  async getContactMessages() {
    if (isMongoActive()) {
      return await ContactMessage.find().sort({ createdAt: -1 });
    }
    return [...memoryStore.contactMessages];
  },

  async updateContactStatus(id, status) {
    if (isMongoActive()) {
      return await ContactMessage.findByIdAndUpdate(id, { status }, { new: true });
    }
    const item = memoryStore.contactMessages.find((m) => m._id === id);
    if (item) {
      item.status = status;
      item.updatedAt = new Date().toISOString();
    }
    return item;
  },

  async deleteContactMessage(id) {
    if (isMongoActive()) {
      return await ContactMessage.findByIdAndDelete(id);
    }
    const index = memoryStore.contactMessages.findIndex((m) => m._id === id);
    if (index !== -1) {
      return memoryStore.contactMessages.splice(index, 1)[0];
    }
    return null;
  },
};
