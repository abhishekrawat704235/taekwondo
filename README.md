# High Skill Taekwondo Academy - Fullstack Web Application

A modern, responsive, fullstack web application for **High Skill Taekwondo Academy**, built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**.

---

## 🥋 Key Features

- **Responsive Multi-Page Experience**:
  1. **Home**: Hero section, martial arts tenets, program highlights, dojang advantages, photo showcase, call to action.
  2. **About Us**: Academy heritage, Kukkiwon affiliation, certified master coach profiles, belt progression guide.
  3. **Classes & Schedule**: Complete program catalog (Little Tigers, Juniors, Teens & Adults, Black Belt Sparring) with interactive timetable filter.
  4. **Photo Gallery**: Categorized photo grid with interactive fullscreen Lightbox modal (keyboard & click controls).
  5. **Achievements**: Tournament medals showcase, Dan black belt promotions honor roll, annual awards.
  6. **Contact Us**: Dojo address, operating hours, direct WhatsApp chat button, and interactive FAQ accordion.
- **100% Functional Forms with Server-Side Validation & Persistence**:
  1. **Student Registration Form** (`/register`): Complete registration with student name, age, parent/guardian name (if under 18), phone, email, preferred class, previous experience, and address.
  2. **Trial Class Booking Form** (`/book-trial`): Free trial session booking with date picker, time slot, age, and phone number.
  3. **Contact Form** (`/contact`): Inquiry form with full name, phone, email, subject, and message.
- **Secure Admin Dashboard** (`/admin`):
  - Protected by authentication (JWT token + password).
  - Review student registrations, trial bookings, and contact messages.
  - Update status in real time (e.g. *Pending*, *Contacted*, *Enrolled*, *Confirmed*).
  - Delete records after confirmation.
  - Search and filter records by student name, phone, or class.
- **Customization Ready**:
  - Centralized academy configuration file: `src/data/academyData.ts` (edit phone, email, address, hours, programs in one place!).
  - Clearly named image placeholders in `public/images/` ready for drop-in replacement with your own academy photos.

---

## 📁 Project Folder Structure

```
high-skill-taekwondo-academy/
├── public/
│   ├── images/
│   │   ├── home/           # Home hero & feature images
│   │   ├── gallery/        # Photo gallery images (1 to 8)
│   │   ├── coach/          # Master & Instructor photos
│   │   ├── achievements/   # Tournament & trophy images
│   │   └── README.md       # Image replacement guide
│   ├── favicon.svg         # Taekwondo crest favicon (SVG)
│   └── favicon.ico         # Legacy favicon icon
├── server/
│   ├── models/             # Mongoose schemas (Registration, Booking, ContactMessage, Admin)
│   ├── routes/             # Express API routes (registrations, bookings, contact, auth)
│   ├── middleware/         # JWT authentication middleware
│   ├── db.js               # MongoDB connection setup with resilient fallback
│   ├── dataStore.js        # Unified database adapter
│   └── server.js           # Express API server entry point
├── src/
│   ├── components/
│   │   ├── Navbar.tsx      # Sticky responsive navigation with mobile drawer
│   │   ├── Footer.tsx      # Footer with quick links, hours, WhatsApp button
│   │   ├── Hero.tsx        # Dynamic hero banner with action buttons
│   │   ├── ImageGallery.tsx# Filterable gallery with full Lightbox modal
│   │   └── WhatsAppButton.tsx # Floating WhatsApp quick-action button
│   ├── pages/
│   │   ├── Home.tsx        # Home page
│   │   ├── About.tsx       # About page
│   │   ├── Classes.tsx     # Classes & Weekly schedule page
│   │   ├── Gallery.tsx     # Photo gallery page
│   │   ├── Achievements.tsx# Achievements & Dan honor roll page
│   │   ├── Contact.tsx     # Contact & FAQ page
│   │   ├── Register.tsx    # Complete Student Registration Form page
│   │   ├── BookTrial.tsx   # Trial Class Booking Form page
│   │   └── AdminDashboard.tsx # Protected Staff Admin Dashboard
│   ├── services/
│   │   └── api.ts          # Frontend API service for Express backend
│   ├── styles/
│   │   └── global.css      # Tailwind base and custom theme styles
│   ├── data/
│   │   └── academyData.ts  # Central configuration (Phone, Email, Coaches, Schedule)
│   ├── App.tsx             # React Router configuration
│   └── main.tsx            # React root mount
├── .env                    # Environment variables (configured for local dev)
├── .env.example            # Environment variables template
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build config with /api proxy
├── tailwind.config.js      # Tailwind CSS theme configuration
└── README.md               # Documentation and setup instructions
```

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have **Node.js** (v18 or newer) installed on your system.
Verify in your terminal:
```bash
node -v
npm -v
```

### 1. Install Dependencies
Open terminal inside the `high-skill-taekwondo-academy` directory:
```bash
npm install
```

### 2. Configure Environment Variables
A default `.env` file is already included. You can customize it as needed:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/high_skill_taekwondo
JWT_SECRET=your_jwt_secret_key_change_in_production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### 3. Launch the Application
Run the concurrent dev command to start both the **Express backend API** and the **Vite frontend**:
```bash
npm run dev
```

The terminal will launch:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 🗄️ Database Configuration (MongoDB)

### Option A: Local MongoDB
1. Install and start MongoDB Community Server locally.
2. Ensure your `.env` contains:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/high_skill_taekwondo
   ```

### Option B: Cloud MongoDB (MongoDB Atlas)
1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com).
2. Create a database user and whitelist your IP (or `0.0.0.0/0` for cloud deployment).
3. Copy your connection string into `.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/high_skill_taekwondo?retryWrites=true&w=majority
   ```

> **Note on Resilient Fallback:** If MongoDB is not yet running when you launch the server, the backend automatically operates in an in-memory fallback mode so all form submissions, validations, and the Admin Dashboard work immediately without crashes.

---

## 🛡️ Admin Dashboard Access

The academy owner can manage incoming inquiries and registrations:
1. Open [http://localhost:3000/admin](http://localhost:3000/admin) (or click **"Admin Portal"** in the website header/footer).
2. Log in with the administrator credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
   *(Configurable in `.env` via `ADMIN_USERNAME` and `ADMIN_PASSWORD`)*
3. In the dashboard you can:
   - View all **Student Registrations**, examine previous experience, and update status (*Pending*, *Contacted*, *Enrolled*).
   - View all **Trial Class Bookings**, see preferred dates & times, and update status (*Confirmed*, *Completed*).
   - View all **Contact Messages**, read message bodies, and mark as responded.
   - Delete records when finished.

---

## 📸 Adding Your Real Academy Photos

All photos are organized in `public/images/`:
- `public/images/home/` - Main hero banner and class highlights.
- `public/images/gallery/` - Gallery photos (`gallery-1.svg` to `gallery-8.svg`).
- `public/images/coach/` - Master and assistant coach photos.
- `public/images/achievements/` - Tournament and trophy photos.

Simply replace any placeholder image with your JPG or PNG photo using the same filename, or update the image path in `src/data/academyData.ts`.

---

## 📦 Building for Production

To build the optimized static production bundle:
```bash
npm run build
```

To run the production server:
```bash
npm start
```
The Express server will automatically serve the built client application and API endpoints simultaneously on port 5000.
