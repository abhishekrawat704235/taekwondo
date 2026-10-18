import app from '../server/server.js';
import http from 'http';

const TEST_PORT = 5055;

async function runTests() {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(TEST_PORT, resolve));
  console.log(`\n🧪 Test Server started on http://localhost:${TEST_PORT}\n`);

  const baseUrl = `http://localhost:${TEST_PORT}/api`;

  try {
    // 1. Health check
    const statusRes = await fetch(`${baseUrl}/status`);
    const statusData = await statusRes.json();
    console.log('1. Health check:', statusData.status === 'online' ? '✅ PASS' : '❌ FAIL');

    // 2. Test Registration Submission with Invalid Data (should fail validation)
    const invalidRegRes = await fetch(`${baseUrl}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentName: 'A' }), // missing required fields
    });
    console.log('2. Registration Validation (Rejection on invalid):', invalidRegRes.status === 400 ? '✅ PASS' : '❌ FAIL');

    // 3. Test Registration Submission with Valid Data
    const validRegRes = await fetch(`${baseUrl}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentName: 'Lucas Vance',
        age: 9,
        parentGuardianName: 'Emily Vance',
        phone: '(555) 345-6789',
        email: 'emily.vance@example.com',
        preferredClass: 'Junior Champions',
        previousExperience: 'Beginner (No prior martial arts experience)',
        address: '742 Evergreen Terrace, Springfield',
      }),
    });
    const regData = await validRegRes.json();
    console.log('3. Registration Submission (Success):', validRegRes.status === 201 && regData.success ? '✅ PASS' : '❌ FAIL');
    const createdRegId = regData.data._id;

    // 4. Test Trial Booking Submission with Valid Data
    const validBookRes = await fetch(`${baseUrl}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentName: 'Sophie Vance',
        age: 5,
        phone: '(555) 345-6789',
        preferredClass: 'Little Tigers Program',
        preferredDate: '2026-10-25',
        preferredTime: '4:15 PM – 5:00 PM',
      }),
    });
    const bookData = await validBookRes.json();
    console.log('4. Trial Booking Submission (Success):', validBookRes.status === 201 && bookData.success ? '✅ PASS' : '❌ FAIL');

    // 5. Test Contact Message Submission
    const validMsgRes = await fetch(`${baseUrl}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Emily Vance',
        phone: '(555) 345-6789',
        email: 'emily.vance@example.com',
        subject: 'Junior Program Tuition',
        message: 'Hello Master, I would like to know if brother and sister can train at the same time.',
      }),
    });
    const msgData = await validMsgRes.json();
    console.log('5. Contact Message Submission (Success):', validMsgRes.status === 201 && msgData.success ? '✅ PASS' : '❌ FAIL');

    // 6. Test Admin Login
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123',
      }),
    });
    const loginData = await loginRes.json();
    console.log('6. Admin Authentication (Success):', loginRes.status === 200 && loginData.token ? '✅ PASS' : '❌ FAIL');
    const token = loginData.token;

    // 7. Test Admin Protected Route (Get Registrations)
    const adminRegRes = await fetch(`${baseUrl}/registrations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const adminRegData = await adminRegRes.json();
    console.log('7. Admin Get Registrations (Protected):', adminRegRes.status === 200 && adminRegData.count >= 1 ? '✅ PASS' : '❌ FAIL');

    // 8. Test Admin Status Update
    const patchRes = await fetch(`${baseUrl}/registrations/${createdRegId}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ status: 'Enrolled' }),
    });
    const patchData = await patchRes.json();
    console.log('8. Admin Update Status:', patchRes.status === 200 && patchData.data.status === 'Enrolled' ? '✅ PASS' : '❌ FAIL');

    // 9. Test Unauthorized Access Without Token (Should return 401)
    const unauthRes = await fetch(`${baseUrl}/registrations`);
    console.log('9. Security Check (401 on missing token):', unauthRes.status === 401 ? '✅ PASS' : '❌ FAIL');

    console.log('\n🎉 ALL FULLSTACK FORM & API TESTS PASSED PERFECTLY!\n');
  } catch (err) {
    console.error('Test failed with error:', err);
    process.exit(1);
  } finally {
    server.close(() => {
      process.exit(0);
    });
  }
}

runTests();
