import express from 'express';
import { dataStore } from '../dataStore.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;

// POST /api/bookings - Public Trial Class Booking
router.post('/', async (req, res) => {
  try {
    const {
      studentName,
      age,
      phone,
      preferredClass,
      preferredDate,
      preferredTime,
    } = req.body;

    const errors = [];

    if (!studentName || typeof studentName !== 'string' || studentName.trim().length < 2) {
      errors.push('Student name must be at least 2 characters');
    }

    const parsedAge = Number(age);
    if (isNaN(parsedAge) || parsedAge < 3 || parsedAge > 99) {
      errors.push('Please enter a valid age between 3 and 99');
    }

    if (!phone || !phoneRegex.test(phone.trim())) {
      errors.push('Please enter a valid phone number');
    }

    if (!preferredClass || typeof preferredClass !== 'string' || !preferredClass.trim()) {
      errors.push('Preferred class selection is required');
    }

    if (!preferredDate || typeof preferredDate !== 'string' || !preferredDate.trim()) {
      errors.push('Preferred trial date is required');
    }

    if (!preferredTime || typeof preferredTime !== 'string' || !preferredTime.trim()) {
      errors.push('Preferred trial time is required');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors[0],
        errors,
      });
    }

    const newBooking = await dataStore.createBooking({
      studentName: studentName.trim(),
      age: parsedAge,
      phone: phone.trim(),
      preferredClass: preferredClass.trim(),
      preferredDate: preferredDate.trim(),
      preferredTime: preferredTime.trim(),
    });

    return res.status(201).json({
      success: true,
      message: 'Trial class booked successfully! We look forward to seeing you.',
      data: newBooking,
    });
  } catch (err) {
    console.error('Error creating booking:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to save trial booking. Please try again.',
      error: err.message,
    });
  }
});

// GET /api/bookings - Protected: Get all bookings
router.get('/', requireAuth, async (req, res) => {
  try {
    const list = await dataStore.getBookings();
    return res.json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: err.message,
    });
  }
});

// PATCH /api/bookings/:id/status - Protected: Update status
router.patch('/:id/status', requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const updated = await dataStore.updateBookingStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Booking record not found' });
    }

    return res.json({
      success: true,
      message: `Status updated to ${status}`,
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update booking status',
      error: err.message,
    });
  }
});

// DELETE /api/bookings/:id - Protected: Delete booking
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const deleted = await dataStore.deleteBooking(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Booking record not found' });
    }
    return res.json({
      success: true,
      message: 'Booking record deleted successfully',
      data: deleted,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete booking',
      error: err.message,
    });
  }
});

export default router;
