import express from 'express';
import { dataStore } from '../dataStore.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;

// POST /api/registrations - Public Student Registration
router.post('/', async (req, res) => {
  try {
    const {
      studentName,
      age,
      parentGuardianName,
      phone,
      email,
      preferredClass,
      previousExperience,
      address,
    } = req.body;

    const errors = [];

    if (!studentName || typeof studentName !== 'string' || studentName.trim().length < 2) {
      errors.push('Student full name must be at least 2 characters');
    }

    const parsedAge = Number(age);
    if (isNaN(parsedAge) || parsedAge < 3 || parsedAge > 99) {
      errors.push('Please enter a valid age between 3 and 99');
    }

    if (parsedAge < 18 && (!parentGuardianName || parentGuardianName.trim().length < 2)) {
      errors.push('Parent or Guardian name is required for students under 18');
    }

    if (!phone || !phoneRegex.test(phone.trim())) {
      errors.push('Please enter a valid contact phone number');
    }

    if (!email || !emailRegex.test(email.trim())) {
      errors.push('Please enter a valid email address');
    }

    if (!preferredClass || typeof preferredClass !== 'string' || !preferredClass.trim()) {
      errors.push('Preferred training class is required');
    }

    if (!previousExperience || typeof previousExperience !== 'string' || !previousExperience.trim()) {
      errors.push('Please select previous Taekwondo experience level');
    }

    if (!address || typeof address !== 'string' || address.trim().length < 5) {
      errors.push('Please provide a complete residential address');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors[0],
        errors,
      });
    }

    const newRegistration = await dataStore.createRegistration({
      studentName: studentName.trim(),
      age: parsedAge,
      parentGuardianName: parentGuardianName ? parentGuardianName.trim() : '',
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      preferredClass: preferredClass.trim(),
      previousExperience: previousExperience.trim(),
      address: address.trim(),
    });

    return res.status(201).json({
      success: true,
      message: 'Student registration submitted successfully! We will contact you soon.',
      data: newRegistration,
    });
  } catch (err) {
    console.error('Error creating registration:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to process registration on the server. Please try again.',
      error: err.message,
    });
  }
});

// GET /api/registrations - Protected: Get all registrations
router.get('/', requireAuth, async (req, res) => {
  try {
    const list = await dataStore.getRegistrations();
    return res.json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations',
      error: err.message,
    });
  }
});

// PATCH /api/registrations/:id/status - Protected: Update status
router.patch('/:id/status', requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Contacted', 'Enrolled', 'Archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const updated = await dataStore.updateRegistrationStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Registration record not found' });
    }

    return res.json({
      success: true,
      message: `Status updated to ${status}`,
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update status',
      error: err.message,
    });
  }
});

// DELETE /api/registrations/:id - Protected: Delete registration
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const deleted = await dataStore.deleteRegistration(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Registration record not found' });
    }
    return res.json({
      success: true,
      message: 'Registration record deleted successfully',
      data: deleted,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete registration',
      error: err.message,
    });
  }
});

export default router;
