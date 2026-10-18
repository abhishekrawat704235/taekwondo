/**
 * High Skill Taekwondo Academy - Central Data & Configuration
 * 
 * NOTE FOR ACADEMY OWNER:
 * You can easily update your phone number, address, email, WhatsApp, 
 * schedule, coaches, and photo paths right here in this file!
 */

export interface AcademyInfo {
  name: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  cityStateZip: string;
  whatsappNumber: string; // international format without + or spaces, e.g., '15550192834'
  whatsappMessage: string;
  affiliation: string;
  operatingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
}

export const ACADEMY_INFO: AcademyInfo = {
  name: "High Skill Taekwondo Academy",
  tagline: "Discipline • Fitness • Excellence",
  phone: "+1 (555) 019-2834",
  phoneDisplay: "(555) 019-2834",
  email: "info@highskilltaekwondo.example",
  address: "123 Martial Arts Boulevard, Suite 200",
  cityStateZip: "Sports City, SC 90210",
  whatsappNumber: "15550192834",
  whatsappMessage: "Hello! I would like to inquire about joining High Skill Taekwondo Academy.",
  affiliation: "Kukkiwon World Taekwondo Headquarters Affiliated",
  operatingHours: {
    weekdays: "Monday – Friday: 4:00 PM – 9:00 PM",
    saturday: "Saturday: 9:00 AM – 3:00 PM",
    sunday: "Sunday: Closed (Private Bookings Only)",
  },
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
};

export interface Program {
  id: string;
  title: string;
  ageGroup: string;
  level: string;
  description: string;
  highlights: string[];
  scheduleSnippet: string;
  image: string;
  badgeColor: string;
}

export const PROGRAMS: Program[] = [
  {
    id: "little-tigers",
    title: "Little Tigers Program",
    ageGroup: "Ages 4 – 6",
    level: "Beginner",
    description: "Designed specifically for young learners to build coordination, balance, motor skills, and essential values like listening, sharing, and respect.",
    highlights: [
      "Motor skills, balance & agility exercises",
      "Stranger awareness & safety fundamentals",
      "Confidence, focus, and positive discipline",
      "Fun, high-energy games with structured etiquette"
    ],
    scheduleSnippet: "Mon, Wed, Fri: 4:15 PM – 5:00 PM",
    image: "/images/home/kids-feature.svg",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
  },
  {
    id: "junior-champions",
    title: "Junior Champions",
    ageGroup: "Ages 7 – 12",
    level: "Beginner to Intermediate",
    description: "Empowers school-age children with powerful anti-bullying confidence, traditional Taekwondo kicking techniques, poomsae forms, and unbreakable perseverance.",
    highlights: [
      "Dynamic kicking, blocking, and striking basics",
      "Anti-bullying strategies and de-escalation",
      "Goal setting through the belt ranking system",
      "Character development and academic discipline"
    ],
    scheduleSnippet: "Mon – Fri: 5:15 PM – 6:15 PM | Sat: 10:00 AM",
    image: "/images/home/training-feature.svg",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
  },
  {
    id: "teens-adults",
    title: "Teens & Adults Taekwondo",
    ageGroup: "Ages 13 & Above",
    level: "All Skill Levels",
    description: "High-intensity martial arts training offering full-body conditioning, stress relief, real-world practical self-defense, and authentic Olympic sparring.",
    highlights: [
      "Cardiovascular fitness, core strength & flexibility",
      "Practical street self-defense & situational awareness",
      "Olympic-style sparring (Kyorugi) & tactical footwork",
      "Traditional Poomsae forms and belt advancement"
    ],
    scheduleSnippet: "Mon, Wed, Thu: 6:30 PM – 7:45 PM | Sat: 11:15 AM",
    image: "/images/home/poomsae-feature.svg",
    badgeColor: "bg-red-100 text-red-800 border-red-300",
  },
  {
    id: "black-belt-sparring",
    title: "Black Belt Excellence & Sparring",
    ageGroup: "Selected Students & Invites",
    level: "Advanced & Black Belt",
    description: "Elite training for athletes preparing for Dan grading, national and regional tournaments, advanced Olympic sparring tactics, and leadership coaching.",
    highlights: [
      "High-speed electronic scoring drills & sparring",
      "Advanced competition Poomsae & demonstration kicks",
      "Kukkiwon Dan certification prep",
      "Junior leadership & assistant instructor pathway"
    ],
    scheduleSnippet: "Tue & Thu: 7:45 PM – 9:00 PM | Sat: 1:00 PM",
    image: "/images/home/hero-bg.svg",
    badgeColor: "bg-neutral-900 text-neutral-100 border-neutral-700",
  },
];

export interface Tenet {
  korean: string;
  english: string;
  description: string;
}

export const TAEKWONDO_TENETS: Tenet[] = [
  {
    korean: "Ye-Ui (예의)",
    english: "Courtesy",
    description: "Showing politeness, treating teachers, parents, peers, and opponents with sincere respect and humility.",
  },
  {
    korean: "Yom-Chi (염치)",
    english: "Integrity",
    description: "Knowing right from wrong, having the moral courage to choose truth and honesty in and out of the dojang.",
  },
  {
    korean: "In-Nae (인내)",
    english: "Perseverance",
    description: "Never giving up when faced with hardship. Pushing past fatigue, frustration, and obstacles until goals are reached.",
  },
  {
    korean: "Guk-Gi (극기)",
    english: "Self-Control",
    description: "Mastering one's emotions, actions, and speech both on the sparring mat and in daily personal life.",
  },
  {
    korean: "Baek-Jul-Bul-Gool (백절불굴)",
    english: "Indomitable Spirit",
    description: "Courage to stand up for justice and face fears without hesitation or defeatist mindset.",
  },
];

export interface Coach {
  name: string;
  role: string;
  rank: string;
  bio: string;
  certifications: string[];
  image: string;
}

export const COACHES: Coach[] = [
  {
    name: "[Head Instructor Name]",
    role: "Founder & Head Master",
    rank: "6th Dan Black Belt (Kukkiwon)",
    bio: "With over 20 years of martial arts dedication, Master Instructor brings passionate leadership, World Taekwondo certification, and an unwavering commitment to mentoring students of every age to achieve their highest physical and mental potential.",
    certifications: [
      "Kukkiwon International Master Instructor License",
      "World Taekwondo (WT) Certified Coach",
      "Certified First Aid & CPR Specialist",
      "Former State Champion & Tournament Coach"
    ],
    image: "/images/coach/head-coach.svg",
  },
  {
    name: "[Senior Instructor Name]",
    role: "Senior Instructor & Sparring Coach",
    rank: "4th Dan Black Belt (Kukkiwon)",
    bio: "Specializing in Olympic sparring tactics, youth development, and athletic agility conditioning. Committed to building unbreakable student self-confidence in a structured, inspiring environment.",
    certifications: [
      "Kukkiwon Certified 4th Dan Black Belt",
      "National Sparring Referee Certification",
      "Youth Athletic Development Coach",
      "Poomsae Technical Specialist"
    ],
    image: "/images/coach/assistant-coach.svg",
  },
];

export interface GalleryItem {
  id: number;
  title: string;
  category: "Training" | "Sparring" | "Graduation" | "Tournaments" | "Kids";
  description: string;
  image: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "High Flying Roundhouse Drill",
    category: "Training",
    description: "Students practicing explosive jump kicks with target pads under instructor guidance.",
    image: "/images/gallery/gallery-1.svg",
  },
  {
    id: 2,
    title: "Olympic Sparring Session",
    category: "Sparring",
    description: "Protective gear sparring session focusing on tactical footwork and scoring combinations.",
    image: "/images/gallery/gallery-2.svg",
  },
  {
    id: 3,
    title: "Black Belt Dan Promotion Ceremony",
    category: "Graduation",
    description: "Celebration of dedicated students who achieved their official Kukkiwon 1st Dan Black Belts.",
    image: "/images/gallery/gallery-3.svg",
  },
  {
    id: 4,
    title: "Little Tigers Graduation Day",
    category: "Kids",
    description: "Our youngest martial artists proudly demonstrating their focus, balance, and new belts.",
    image: "/images/gallery/gallery-4.svg",
  },
  {
    id: 5,
    title: "State Championship Medal Ceremony",
    category: "Tournaments",
    description: "High Skill Academy team members taking the podium at the regional open tournament.",
    image: "/images/gallery/gallery-5.svg",
  },
  {
    id: 6,
    title: "Traditional Poomsae Demonstration",
    category: "Training",
    description: "Precision, balance, and breath control demonstrated during synchronized form practice.",
    image: "/images/gallery/gallery-6.svg",
  },
  {
    id: 7,
    title: "Full Team Sparring Clinic",
    category: "Sparring",
    description: "Visiting master guest seminar covering high-level electronic chest protector scoring.",
    image: "/images/gallery/gallery-7.svg",
  },
  {
    id: 8,
    title: "Junior Belt Promotion Test",
    category: "Graduation",
    description: "Demonstrating board breaking, self-defense escapes, and oral Taekwondo history.",
    image: "/images/gallery/gallery-8.svg",
  },
];

export interface AchievementItem {
  year: string;
  title: string;
  category: "Championship" | "Recognition" | "Community";
  description: string;
  badge: string;
  image: string;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    year: "Recent Season",
    title: "State Championship Overall Team Champions",
    category: "Championship",
    description: "High Skill Taekwondo Academy students secured top honours across junior sparring and poomsae categories at the regional championship.",
    badge: "12 Gold • 8 Silver • 5 Bronze",
    image: "/images/achievements/trophy-state.svg",
  },
  {
    year: "Recent Season",
    title: "National Martial Arts Excellence Award",
    category: "Recognition",
    description: "Recognized for outstanding youth development, anti-bullying education, and community contribution.",
    badge: "Excellence in Martial Arts",
    image: "/images/achievements/best-academy-award.svg",
  },
  {
    year: "Annual Milestone",
    title: "100+ Kukkiwon Dan Black Belts Certified",
    category: "Recognition",
    description: "A proud milestone celebrating over 100 students guided from beginner white belt to official Kukkiwon Black Belt ranks.",
    badge: "100+ Black Belts Produced",
    image: "/images/achievements/black-belt-graduation.svg",
  },
  {
    year: "Annual Tournament",
    title: "Open Invitation Poomsae Grand Champions",
    category: "Championship",
    description: "Our demonstration and poomsae squad earned top scores for synchronization, power, and technical execution.",
    badge: "1st Place Demonstration",
    image: "/images/achievements/national-championship.svg",
  },
];

export interface ScheduleDay {
  day: string;
  classes: {
    time: string;
    program: string;
    ageLevel: string;
  }[];
}

export const WEEKLY_SCHEDULE: ScheduleDay[] = [
  {
    day: "Monday & Wednesday",
    classes: [
      { time: "4:15 PM – 5:00 PM", program: "Little Tigers", ageLevel: "Ages 4–6 (All Belts)" },
      { time: "5:15 PM – 6:15 PM", program: "Junior Champions", ageLevel: "Ages 7–12 (White to Green)" },
      { time: "6:15 PM – 7:15 PM", program: "Junior Advanced", ageLevel: "Ages 7–12 (Blue to Black)" },
      { time: "7:30 PM – 8:45 PM", program: "Teens & Adults", ageLevel: "Ages 13+ (All Levels)" },
    ],
  },
  {
    day: "Tuesday & Thursday",
    classes: [
      { time: "4:15 PM – 5:00 PM", program: "Little Tigers", ageLevel: "Ages 4–6 (All Belts)" },
      { time: "5:15 PM – 6:15 PM", program: "Junior Sparring Fundamentals", ageLevel: "Ages 7–12" },
      { time: "6:15 PM – 7:30 PM", program: "Competition Poomsae Forms", ageLevel: "Intermediate & Advanced" },
      { time: "7:45 PM – 9:00 PM", program: "Olympic Sparring Team", ageLevel: "Sparring Gear Required" },
    ],
  },
  {
    day: "Friday",
    classes: [
      { time: "4:30 PM – 5:30 PM", program: "Family Taekwondo Class", ageLevel: "Parents & Kids Together" },
      { time: "5:45 PM – 6:45 PM", program: "Board Breaking & Agility", ageLevel: "All Junior Belts" },
      { time: "7:00 PM – 8:30 PM", program: "Black Belt Leadership Club", ageLevel: "Dan Holders & Candidates" },
    ],
  },
  {
    day: "Saturday",
    classes: [
      { time: "9:00 AM – 9:45 AM", program: "Little Tigers Weekend", ageLevel: "Ages 4–6" },
      { time: "10:00 AM – 11:00 AM", program: "Junior All Belts", ageLevel: "Ages 7–12" },
      { time: "11:15 AM – 12:30 PM", program: "Teens & Adults Weekend", ageLevel: "Ages 13+" },
      { time: "1:00 PM – 2:30 PM", program: "Belt Grading & Special Seminars", ageLevel: "Scheduled Testing" },
    ],
  },
];

export interface FAQ {
  question: string;
  answer: string;
}

export const FAQS: FAQ[] = [
  {
    question: "Do I or my child need any prior martial arts experience?",
    answer: "Not at all! Our beginner programs are structured specifically for students with zero previous experience. Our certified instructors provide step-by-step guidance in a supportive, non-intimidating environment.",
  },
  {
    question: "At what age can children start training at High Skill Taekwondo?",
    answer: "Our Little Tigers program welcomes children starting from age 4. Classes focus on gross motor skills, listening skills, balance, and fun physical fitness.",
  },
  {
    question: "What should I wear to my first free trial class?",
    answer: "Wear comfortable athletic clothing like a t-shirt and workout pants/joggers. We train barefoot on sanitized martial arts mats. If you decide to enroll, an official uniform (Dobok) and white belt will be provided.",
  },
  {
    question: "Is Taekwondo safe for children?",
    answer: "Safety is our number one priority. All training occurs on high-density shock-absorbing mats under strict master supervision. Contact sparring is strictly monitored with full protective gear (helmet, chest guard, shin & arm guards, mouthguard).",
  },
  {
    question: "How long does it take to earn a Black Belt?",
    answer: "On average, a committed student training 2 to 3 times per week can achieve their 1st Dan Black Belt in approximately 3 to 4 years. Progression is based on consistent attendance, technical skill mastery, and demonstrating martial arts character.",
  },
  {
    question: "Can parents train alongside their children?",
    answer: "Yes! We offer dedicated Family Taekwondo classes every Friday where parents and children can train on the same mat, build fitness, and bond together through martial arts.",
  },
];
