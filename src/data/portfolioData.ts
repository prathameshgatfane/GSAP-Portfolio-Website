import type {
  AchievementItem,
  CertificateItem,
  CraftPillarItem,
  EducationItem,
  ExperienceItem,
  NavLinkItem,
  ProjectItem,
  RibbonPhraseItem,
  SkillCategory,
  SocialLinkItem,
} from '../types/portfolio';

const BASE_URL = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const withBase = (path: string): string =>
  `${BASE_URL}${path.replace(/^\/+/, '')}`;

export const PORTFOLIO_PROFILE = {
  brandName: 'By PRATHAMESH GATFANE',
  roleLabel: '(Full Stack Web Developer)',
  heroWordmark: 'PRATHAMESH',
  heroDescription:
    'I help growing brands and startups gain an unfair advantage through premium, results driven websites.',
  heroPhoneHref: 'tel:+917558792533',
  heroPhoneDisplay: '+91-7558792533',
  heroImageSrc: withBase('img/heroImage.jpg'),
  heroImageAlt: 'Prathamesh Gatfane portrait',
  availabilityPrompt: 'Available for freelance work from',
  availabilityDate: 'June ‘25',
  resumePath: withBase('assets/aistudio/PrathameshGatfane_FullStackDeveloper__2__287d3e64.pdf'),
  email: 'prathameshgatfane2019@gmail.com',
  location: 'Amravati, India',
  summaryKicker: 'Profile Summary',
  summaryHeading: 'Engineering fast, accessible, and SEO-driven web products.',
  summaryText:
    'Hands-on Full-Stack Web Developer with experience building responsive UIs and scalable web applications using React, Node.js, Express, and MongoDB. Strong focus on performance optimization, SEO, user experience, REST APIs, and secure JWT-based authentication.',
  copyright: '© 2026 Prathamesh Gatfane',
  credit: 'Made with care by Prathamesh Gatfane',
};

export const NAV_LINKS: NavLinkItem[] = [
  { id: 'craft', label: 'Craft,', href: '#craft' },
  { id: 'works', label: 'Works,', href: '#works' },
  { id: 'experience', label: 'Experience,', href: '#experience' },
  { id: 'skills', label: 'Skills,', href: '#skills' },
  { id: 'credentials', label: 'Credentials,', href: '#credentials' },
  {
    id: 'resume',
    label: 'Resume,',
    href: withBase('assets/aistudio/PrathameshGatfane_FullStackDeveloper__2__287d3e64.pdf'),
    isExternal: true,
    isResume: true,
  },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const CRAFT_PILLARS: CraftPillarItem[] = [
  {
    id: 'head',
    partLabel: 'Head',
    headline: 'I solve it at the architecture layer.',
    metric: '40% faster APIs',
    description:
      'Integrated RESTful APIs with modular controllers, validators, and service layers to reduce server response time by 40%.',
    iconKey: 'brain',
    featured: true,
  },
  {
    id: 'eyes',
    partLabel: 'Eyes',
    headline: 'I optimize experience before scale.',
    metric: '+35% mobile traffic · +30% engagement',
    description:
      'Designed responsive UI components and progressive image loading (lazy loading & blurred placeholders) to boost mobile usability.',
    iconKey: 'eye',
  },
  {
    id: 'buttons',
    partLabel: 'Buttons',
    headline: 'I tighten security and search polish.',
    metric: '+20–25% search visibility',
    description:
      'Implemented JWT protected routes, Bcrypt password hashing, and structured metadata with React Helmet across CMS modules.',
    iconKey: 'sliders',
  },
  {
    id: 'arm',
    partLabel: 'Arm',
    headline: 'I ship end-to-end production code.',
    metric: '4+ shipped web products',
    description:
      'Delivered client-facing apps spanning healthcare, education CMS, and billing software using React, Node.js, Express, and MongoDB.',
    iconKey: 'wrench',
  },
  {
    id: 'heart',
    partLabel: 'Heart',
    headline: 'I stay curious, on and off screen.',
    metric: 'Singing · Content Writing · Tech',
    description:
      'Singing, editorial writing for Microsoft Student Club PRPCEM × Global AI, and learning new tools keep my craft balanced.',
    iconKey: 'heart',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'vyawahare',
    number: '01',
    year: '2026',
    category: 'Full-Stack Healthcare Platform',
    title: 'Vyawahare Netralaya',
    description:
      'Hospital platform with online appointment booking, automated email notifications, admin panel for appointments, consultants & gallery, image optimization, and SEO via React Helmet.',
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Nodemailer'],
    imageSrc: withBase('img/vyawahare.png'),
    imageAlt: 'Vyawahare Netralaya web platform preview',
    aspect: 'portrait',
    highlights: [
      'End-to-end appointment booking flow with automated Nodemailer notifications.',
      'Protected admin dashboard managing appointments, consultants, and clinical gallery.',
      'Lazy loading, progressive images, and React Helmet SEO boosting visibility.',
    ],
    links: [
      {
        label: 'Live Project',
        href: 'https://vyawaharenetralaya.in/',
        type: 'live',
      },
    ],
  },
  {
    id: 'skintotal',
    number: '02',
    year: '2026',
    category: 'Frontend Clinic Experience',
    title: 'Skintotal Clinic',
    description:
      'Developed and deployed a responsive static frontend for a dermatology clinic with modern UI, smooth navigation, and optimized performance.',
    techStack: ['React.js', 'JavaScript', 'Tailwind CSS'],
    imageSrc: withBase('img/skintotal.png'),
    imageAlt: 'Skintotal Clinic web interface preview',
    aspect: 'square',
    highlights: [
      'Mobile-first UI improving mobile traffic by 35% and user engagement by 30%.',
      'Clean service discovery flow tailored for dermatology consultations.',
      'Optimized asset loading and responsive typography across breakpoints.',
    ],
    links: [
      {
        label: 'Live Project',
        href: 'https://www.skintotalclinic.com/',
        type: 'live',
      },
    ],
  },
  {
    id: 'makwid',
    number: '03',
    year: '2026',
    category: 'Healthcare Billing Frontend',
    title: 'Makwid Hospital Billing Software',
    description:
      'Frontend architecture for hospital billing workflows engineered with modular React interfaces, fast data entry, and responsive clinical usability.',
    techStack: ['React.js', 'JavaScript (ES6+)', 'REST APIs', 'Tailwind CSS'],
    imageSrc: '',
    imageAlt: 'Makwid Hospital Billing Software interface showcase',
    aspect: 'landscape',
    artworkVariant: 'makwid-billing',
    highlights: [
      'Built modular frontend screens for inpatient/outpatient billing and receipt workflows.',
      'Integrated RESTful billing endpoints with validation and responsive state handling.',
      'Engineered at ClickInnovate Pvt. Ltd. for daily hospital operations.',
    ],
    links: [],
  },
  {
    id: 'vdcft',
    number: '04',
    year: '2026',
    category: 'Full-Stack Academic Portal & CMS',
    title: 'VDCFT College Website & Admin CMS',
    description:
      'Full-stack college website paired with a role-protected Admin CMS featuring JWT authentication, Bcrypt password hashing, and scalable CRUD modules.',
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Bcrypt'],
    imageSrc: '',
    imageAlt: 'VDCFT College Website & Admin CMS interface showcase',
    aspect: 'landscape',
    artworkVariant: 'vdcft-cms',
    highlights: [
      'JWT-authenticated Admin CMS with Bcrypt hashing and protected administrative routes.',
      'Modular controllers and validators reducing server response time by 40%.',
      'Dynamic notices, academic departments, and gallery CRUD workflows.',
    ],
    links: [],
  },
  {
    id: 'insurekaro',
    number: '05',
    year: '2025',
    category: 'Insurance Frontend Showcase',
    title: 'Insure Karo',
    description:
      'Responsive insurance platform frontend crafted with sleek navigation, clear policy discovery flows, and crisp responsive layouts.',
    techStack: ['React.js', 'Tailwind CSS'],
    imageSrc: withBase('img/insurekaro.png'),
    imageAlt: 'Insure Karo web interface preview',
    aspect: 'portrait',
    highlights: [
      'Clean comparison-ready UI guiding users across health, motor, and life coverage.',
      'Responsive multi-device layout engineered with utility-first precision.',
    ],
    links: [
      {
        label: 'Live Project',
        href: 'https://insure-karo.vercel.app/',
        type: 'live',
      },
    ],
  },
  {
    id: 'aasra',
    number: '06',
    year: '2024',
    category: 'Multi-Role Rescue System (In Progress)',
    title: 'AASRA — Animal Rescue & Adoption System',
    description:
      'Full-stack platform with multi-role authentication (Admin, Shelter, Rescuer) and CRUD operations for rescue and adoption workflows.',
    techStack: ['Ruby on Rails', 'MySQL', 'Bootstrap'],
    imageSrc: withBase('img/aasra_project.png'),
    imageAlt: 'AASRA platform preview',
    aspect: 'square',
    highlights: [
      'Multi-role authorization separating Admin, Shelter, and Rescuer responsibilities.',
      'Relational MySQL schema tracking rescue reports, shelter intake, and adoptions.',
    ],
    links: [{ label: 'GitHub', href: '#', type: 'github' }],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'clickinnovate',
    company: 'ClickInnovate Pvt. Ltd.',
    role: 'MERN Stack Developer',
    period: 'Mar 2026 – June 2026',
    location: 'Amravati, Maharashtra',
    points: [
      {
        id: 'ci-1',
        richPrefix: 'Developed and maintained client-facing web applications including ',
        links: [
          { label: 'Vyawahare Netralaya', href: 'https://vyawaharenetralaya.in/' },
          { label: 'Skintotal Clinic', href: 'https://www.skintotalclinic.com/' },
        ],
        richSuffix:
          ' (frontend), VDCFT College Website & Admin CMS (full-stack), and Makwid hospital billing software (frontend) using the MERN stack.',
      },
      {
        id: 'ci-2',
        text: 'Designed frontend architecture with responsive, interactive UI components — improving mobile usability and increasing mobile traffic by 35% and user engagement by 30%.',
      },
      {
        id: 'ci-3',
        text: 'Integrated RESTful APIs with modular controllers, validators, and service layers; reduced server response time by 40% via performance optimizations.',
      },
      {
        id: 'ci-4',
        text: 'Implemented JWT-based authentication with protected routes, Bcrypt password hashing, and scalable CRUD operations across CMS modules.',
      },
      {
        id: 'ci-5',
        text: 'Optimized image loading using lazy loading, blurred placeholders, and progressive image techniques, improving perceived load speed.',
      },
      {
        id: 'ci-6',
        text: 'Improved SEO performance via structured metadata and React Helmet, increasing search visibility by 20–25%.',
      },
    ],
  },
  {
    id: 'softtronix',
    company: 'Softtronix Solution Pvt. Ltd.',
    role: 'MERN Stack Intern',
    period: 'Jan 2026 – Feb 2026',
    location: 'Amravati, Maharashtra',
    points: [
      {
        id: 'st-1',
        text: 'Contributed to frontend and backend modules in a professional MERN stack environment using React.js, Node.js, Express.js, and MongoDB.',
      },
    ],
  },
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    iconKey: 'layout',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'Bootstrap',
      'Vite + React.js',
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    iconKey: 'server',
    skills: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT',
      'Bcrypt',
      'Ruby on Rails (MVC)',
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    iconKey: 'database',
    skills: ['SQL', 'MongoDB', 'MySQL'],
  },
  {
    id: 'cloud-tools',
    title: 'Cloud & Tools',
    iconKey: 'cloud',
    skills: ['Firebase', 'Cloudinary', 'Git', 'GitHub', 'VS Code'],
  },
  {
    id: 'operating-systems',
    title: 'Operating Systems',
    iconKey: 'monitor',
    skills: ['Linux (Ubuntu)', 'Windows'],
  },
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'msc-lead',
    title: 'Microsoft Student Club PRPCEM × Global AI',
    detail: 'Lead, Documentation / Editorial / Content Department, Amravati.',
  },
  {
    id: 'cyber-cell',
    title: 'Cyber Cell Department — SP Office Rural Amravati',
    detail: 'Selected as a Mukhyamantri Yuva Vikas Kaushal intern.',
  },
];

export const TRAINING_SUMMARY = {
  provider: 'Coding Ninjas · Deloitte · Global AI Community',
  tracks: 'Full Stack Development · Java · Cyber Security · Community Lead',
};

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'js-bootcamp',
    title: 'Bootcamp | Front End | Full Stack Development',
    track: 'Full Stack & JavaScript',
    issuer: 'Coding Ninjas',
    issuedDate: 'June ‘24 – September ‘24',
    description:
      'Certificate of Completion awarded to Prathamesh Nitinrao Gatfane for completing Full Stack Web Development. Mentored by Ankush Singla.',
    imageSrc: withBase('assets/aistudio/image_106e4637.png'),
    imageAlt:
      'Coding Ninjas Certificate of Completion for Bootcamp Front End Full Stack Development awarded to Prathamesh Nitinrao Gatfane',
    pdfHref: withBase('CN_Javascript_Certificate.pdf'),
    downloadName: 'CN_Javascript_Certificate.pdf',
  },
  {
    id: 'java-intro',
    title: 'Bootcamp | Introduction to Java',
    track: 'Top Performer · Certificate of Excellence',
    issuer: 'Coding Ninjas',
    issuedDate: 'October 2023 – November 2023',
    credentialCode: 'Verify ID: 12e15dcd92225a2c',
    verifyUrl: 'https://certificate.codingninjas.com/verify/12e15dcd92225a2c',
    description:
      'Top Performer Certificate of Excellence awarded to Prathamesh Nitinrao Gatfane. Mentored by Manisha Khattar & Ankush Singla.',
    imageSrc: withBase('assets/aistudio/image_b9bf0c17.png'),
    imageAlt:
      'Coding Ninjas Certificate of Excellence Top Performer for Introduction to Java awarded to Prathamesh Nitinrao Gatfane',
    pdfHref: withBase('CN_Java_Certificate.pdf'),
    downloadName: 'CN_Java_Certificate.pdf',
  },
  {
    id: 'deloitte-cyber',
    title: 'Cyber Job Simulation',
    track: 'Cyber Security · Forage',
    issuer: 'Deloitte',
    issuedDate: 'May 30th, 2025',
    credentialCode: 'Code: 9PN5ZMuPFvdxAHpTK',
    description:
      'Certificate of Completion awarded to Prathamesh Gatfane for completing practical Cyber Security tasks. Signed by Tina McCreery, CHRO.',
    imageSrc: withBase('assets/aistudio/image_4bd68340.png'),
    imageAlt:
      'Deloitte Cyber Job Simulation Certificate of Completion awarded to Prathamesh Gatfane',
    pdfHref: withBase(
      'assets/aistudio/deloittes-virtual-cyberSecurity-internship__9f237a0a.pdf',
    ),
    downloadName: 'Deloitte_Cyber_Job_Simulation_Prathamesh_Gatfane.pdf',
  },
  {
    id: 'global-ai-badge',
    title: 'Global AI Community Contributor & MSC Lead',
    track: 'Verified Community Badge',
    issuer: 'Global AI Community × MSC PRPCEM',
    issuedDate: 'Verified Credential',
    credentialCode: 'Badge: fe617007-4f60-4868-b6a6-daec799b1200',
    verifyUrl:
      'https://globalai.community/badges/fe617007-4f60-4868-b6a6-daec799b1200/',
    badgeVariant: 'global-ai',
    imageSrc: '',
    imageAlt:
      'Global AI Community Contributor and Microsoft Student Club Lead badge for Prathamesh Nitinrao Gatfane',
    description:
      'Recognized Global AI Community Contributor and Lead for Documentation, Editorial & Content at Microsoft Student Club PRPCEM, Amravati.',
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'mca',
    degreeShort: 'MCA',
    degreeFull: 'Master of Computer Applications (MCA)',
    institution: 'P. R. Pote College of Engineering and Management, Amravati',
    period: '2024 – 2026',
  },
  {
    id: 'bca',
    degreeShort: 'BCA',
    degreeFull: 'Bachelor of Computer Applications (BCA)',
    institution: 'Shri Shivaji Science College, Amravati',
    period: '2020 – 2023',
  },
];

export const PERSONAL_ATTRIBUTES = {
  softSkills: ['Communication', 'Teamwork', 'Self-learning', 'Time Management'],
  hobbies: ['Learning new technologies', 'Singing', 'Content Writing'],
};

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/prathameshgatfane',
    iconKey: 'github',
    isExternal: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/prathamesh-gatfane-a7aaa7290/',
    iconKey: 'linkedin',
    isExternal: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:prathameshgatfane2019@gmail.com',
    iconKey: 'mail',
    isExternal: false,
  },
];

export const BACK_RIBBON_ITEMS: RibbonPhraseItem[] = [
  { id: 'fullstack', text: 'FULL STACK DEVELOPER' },
  { id: 'mern', text: 'MERN STACK ARCHITECT' },
  { id: 'perf', text: 'Performance optimizer', italic: true },
  { id: 'location', text: 'AMRAVATI · INDIA' },
  { id: 'clean-code', text: 'CLEAN CODE OVER CLUTTER' },
  { id: 'jwt', text: 'JWT & REST APIS' },
];

export const FRONT_RIBBON_ITEMS: RibbonPhraseItem[] = [
  { id: 'react-node', text: 'REACT & NODE.JS BUILDER' },
  { id: 'faster-apis', text: '40% FASTER APIS' },
  { id: 'writer', text: 'Content writer', italic: true },
  { id: 'seo-ui', text: 'SEO & UI CRAFTSMAN' },
  { id: 'msc-lead', text: 'MICROSOFT STUDENT CLUB LEAD' },
  { id: 'quality', text: 'Quality over quantity', italic: true },
];

