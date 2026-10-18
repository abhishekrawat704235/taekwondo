import fs from 'fs';
import path from 'path';

const dirs = [
  'public/images/home',
  'public/images/gallery',
  'public/images/coach',
  'public/images/achievements'
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

function createSvg(title, subtitle, width, height, themeColor, category) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="40%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="${themeColor || '#991b1b'}" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#grad)" />
  <rect width="${width}" height="${height}" fill="url(#grid)" />

  <!-- Martial Arts Silhouette Graphic -->
  <g transform="translate(${width/2 - 100}, ${height/2 - 120}) scale(1.1)" opacity="0.2" fill="#ffffff">
    <circle cx="90" cy="15" r="14" />
    <path d="M70 35 L110 35 L125 70 L105 75 L95 50 L95 90 L135 100 L130 115 L85 100 L70 140 L50 135 L65 85 L60 50 L40 65 L30 55 Z" />
    <path d="M95 50 L140 25 L180 -5 L190 10 L150 35 L105 75 Z" />
  </g>

  <!-- Red Accent Stripe -->
  <rect x="0" y="${height - 12}" width="${width}" height="12" fill="#dc2626" />

  <!-- Badge / Tag -->
  <rect x="${width/2 - 90}" y="${height/2 - 65}" width="180" height="32" rx="16" fill="#dc2626" fill-opacity="0.9" />
  <text x="${width/2}" y="${height/2 - 44}" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="2">
    ${category || 'TAEKWONDO'}
  </text>

  <!-- Title -->
  <text x="${width/2}" y="${height/2 + 5}" font-family="'Montserrat', sans-serif" font-size="26" font-weight="800" fill="#ffffff" text-anchor="middle">
    ${title}
  </text>

  <!-- Subtitle -->
  <text x="${width/2}" y="${height/2 + 38}" font-family="'Inter', sans-serif" font-size="14" fill="#cbd5e1" text-anchor="middle">
    ${subtitle}
  </text>

  <!-- Helper Note -->
  <rect x="${width/2 - 180}" y="${height - 55}" width="360" height="28" rx="6" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.15)" />
  <text x="${width/2}" y="${height - 37}" font-family="'Inter', sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">
    [📷 Replace with your photo in public/images/]
  </text>
</svg>`;
}

// Home images
fs.writeFileSync('public/images/home/hero-bg.svg', createSvg('High Skill Taekwondo Academy', 'Olympic Martial Arts • Discipline • Black Belt Excellence', 1400, 800, '#b91c1c', 'DOJANG HERO'));
fs.writeFileSync('public/images/home/training-feature.svg', createSvg('Junior Champions Training', 'Target kicking, forms & agility drills', 800, 600, '#0369a1', 'TRAINING'));
fs.writeFileSync('public/images/home/poomsae-feature.svg', createSvg('Traditional Poomsae & Sparring', 'Discipline, breath control & dynamic speed', 800, 600, '#b91c1c', 'FORMS & SPARRING'));
fs.writeFileSync('public/images/home/kids-feature.svg', createSvg('Little Tigers (Ages 4-6)', 'Fun motor skills, balance & respect', 800, 600, '#d97706', 'LITTLE TIGERS'));

// Coach images
fs.writeFileSync('public/images/coach/head-coach.svg', createSvg('Master Instructor', '6th Dan Kukkiwon Certified Master', 600, 750, '#b91c1c', 'HEAD COACH'));
fs.writeFileSync('public/images/coach/assistant-coach.svg', createSvg('Senior Instructor', '4th Dan Kukkiwon Certified Coach', 600, 750, '#1e293b', 'SENIOR COACH'));

// Gallery images 1 to 8
const galleryTitles = [
  ['Jump Kicks & Target Drills', 'Dynamic aerial breaking technique', 'TRAINING'],
  ['Olympic Sparring Clinic', 'Electronic chest protector scoring', 'SPARRING'],
  ['Dan Black Belt Graduation', 'Official Kukkiwon promotion ceremony', 'GRADUATION'],
  ['Little Tigers Fun Class', 'Earning their first belt stripes', 'KIDS'],
  ['State Championship Podiums', 'Medals won by High Skill athletes', 'TOURNAMENTS'],
  ['Synchronized Team Poomsae', 'Demonstration team precision', 'TRAINING'],
  ['Protective Gear Sparring', 'Respect and sportsmanship on the mat', 'SPARRING'],
  ['Junior Board Breaking Test', 'Power, accuracy and confidence', 'GRADUATION']
];

galleryTitles.forEach((g, i) => {
  fs.writeFileSync(`public/images/gallery/gallery-${i+1}.svg`, createSvg(g[0], g[1], 800, 600, '#b91c1c', g[2]));
});

// Achievement images
fs.writeFileSync('public/images/achievements/trophy-state.svg', createSvg('State Championship Trophy', 'Overall Team Champions Showcase', 800, 600, '#eab308', 'CHAMPIONSHIP'));
fs.writeFileSync('public/images/achievements/best-academy-award.svg', createSvg('Excellence in Martial Arts', 'National Dojo Recognition Award', 800, 600, '#d97706', 'RECOGNITION'));
fs.writeFileSync('public/images/achievements/black-belt-graduation.svg', createSvg('100+ Black Belts Milestone', 'Guiding students to Dan excellence', 800, 600, '#0f172a', 'BLACK BELT DAN'));
fs.writeFileSync('public/images/achievements/national-championship.svg', createSvg('National Demonstration Champions', 'Synchronized Poomsae 1st Place', 800, 600, '#eab308', 'TOURNAMENT'));

console.log('All placeholder SVGs generated successfully in public/images/');
