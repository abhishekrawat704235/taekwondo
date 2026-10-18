import express from 'express';
import { dataStore } from '../dataStore.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;

// POST /api/contact - Public Contact Form
router.post('/', async (req, res) => {
  try {
    const { fullName, phone, email, subject, message } = req.body;

    const errors = [];

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      errors.push('Full name must be at least 2 characters');
    }

    if (!phone || !phoneRegex.test(phone.trim())) {
      errors.push('Please enter a valid phone number');
    }

    if (!email || !emailRegex.test(email.trim())) {
      errors.push('Please enter a valid email address');
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      errors.push('Subject is required');
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      errors.push('Message must be at least 5 characters');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors[0],
        errors,
      });
    }

    const newMessage = await dataStore.createContactMessage({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been sent to our instructors.',
      data: newMessage,
    });
  } catch (err) {
    console.error('Error creating contact message:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit contact message. Please try again.',
      error: err.message,
    });
  }
});

// GET /api/contact - Protected: Get all messages
router.get('/', requireAuth, async (req, res) => {
  try {
    const list = await dataStore.getContactMessages();
    return res.json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch contact messages',
      error: err.message,
    });
  }
});

// PATCH /api/contact/:id/status - Protected: Update status
router.patch('/:id/status', requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Unread', 'Read', 'Responded', 'Archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const updated = await dataStore.updateContactStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    return res.json({
      success: true,
      message: `Status updated to ${status}`,
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update message status',
      error: err.message,
    });
  }
});

// DELETE /api/contact/:id - Protected: Delete message
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const deleted = await dataStore.deleteContactMessage(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    return res.json({
      success: true,
      message: 'Message deleted successfully',
      data: deleted,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete message',
      error: err.message,
    });
  }
});

export default router;
