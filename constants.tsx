// constants.tsx

export const HERO_DATA = {
  name: "Mohinkhan Malek",
  title: "Full-Stack Developer",
  tagline:
    "Transforming complex requirements into robust, scalable, and user-centric digital solutions.",
  summary:
    "A dedicated software developer with a strong foundation in building efficient web applications. Recently completed an intensive internship focused on backend architecture and API development. I am passionate about writing clean code and am currently seeking opportunities to contribute to innovative teams.",
};

export const ABOUT_DATA = {
  heading: "About Me",
  subHeading: "The Source Code",
  bio:
    "Hello! I am a software developer who loves turning complex logic into clean, readable code. My journey started with a curiosity about how backend systems handle data, which led me to become a Certified Full Stack Developer.",
  bio2:
    "I have recently completed a 3-month intensive internship at Technowire Data Science, where I gained hands-on experience in backend architecture. I am currently actively looking for full-time opportunities where I can apply my skills and grow as an engineer.",
  status: "Open for Work",
  focus: ["Scalability", "Clean Code"],
  currentGoal: "Seeking exciting opportunities 🚀",
};

export const CONTACT_INFO = {
  phone: "8200193049",
  email: ["mohinkhan292061@gmail.com", "mohin.malek1999@gmail.com"],
  address: "Makarba, Ahmedabad, Gujarat, 380051",
};

// 🔥 FIXED: icons are now STRING IDS (safe for localStorage)
export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/mohinkhan13",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mohinkhanmalek",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:mohin.malek1999@gmail.com",
    icon: "mail",
  },
];

export const SKILLS = [
  { name: "Python", level: "Advanced", category: "Languages" },
  { name: "JavaScript", level: "Intermediate", category: "Languages" },
  { name: "React.js", level: "Intermediate", category: "Frontend" },
  { name: "Tailwind CSS", level: "Advanced", category: "Frontend" },
  { name: "Bootstrap", level: "Advanced", category: "Frontend" },
  { name: "HTML5", level: "Advanced", category: "Frontend" },
  { name: "Django", level: "Advanced", category: "Backend" },
  { name: "Django REST Framework", level: "Advanced", category: "Backend" },
  { name: "Node.js", level: "Basic", category: "Backend" },
  { name: "MySQL", level: "Intermediate", category: "Database" },
  { name: "PostgreSQL", level: "Basic", category: "Database" },
];

export const EXPERIENCE = [
  {
    company: "Technowire Data Science Private Limited",
    role: "Python Developer Intern",
    duration: "3 Months Internship",
    location: "Ahmedabad, Gujarat, India",
  },
  {
    company: "TOPS Technologies Pvt. Ltd",
    role: "Full Stack Trainee",
    duration: "Feb 2024 - Present",
    location: "Ahmedabad, Gujarat, India",
  },
];

export const PROJECTS = [
  {
    title: "Full-Fledged E-commerce Website",
    techStack: ["Django", "Python", "MySQL", "HTML/CSS", "Stripe API"],
    type: "Web Application",
    description: [
      "Developed a complete e-commerce platform entirely using Django for both frontend and backend functionality.",
      "Implemented user authentication, product catalog, shopping cart, and wishlist features.",
      "Integrated Stripe payment system for secure transactions with proper error handling.",
      "Created a comprehensive admin dashboard for product management and order tracking.",
    ],
    repoUrl: "https://github.com/mohinkhan13",
    liveUrl: "https://github.com/mohinkhan13",
  },
  {
    title: "Blog Management System",
    techStack: [
      "React",
      "Django REST API",
      "Python",
      "MySQL",
      "Bootstrap",
    ],
    type: "Full Stack App",
    description: [
      "Built a modern blog platform with React frontend consuming data from Django REST API backend.",
      "Developed complete CRUD functionality for blog posts with support for categories, tags, and media uploads.",
      "Implemented user authentication system with role-based access control for authors and administrators.",
      "Designed clean, responsive UI with Bootstrap ensuring accessibility across all device sizes.",
    ],
    repoUrl: "https://github.com/mohinkhan13",
    liveUrl: "https://github.com/mohinkhan13",
  },
];

export const EDUCATION = [
  {
    institution: "TOPS Technologies Pvt. Ltd",
    degree: "Full Stack Python Developer Certification",
    year: "2024",
  },
  {
    institution: "Surendranagar University",
    degree: "Bachelor of Commerce (B.Com)",
    year: "2022 - 2025",
  },
  {
    institution: "Sanskriti School of Thoughts",
    degree: "Secondary & Higher Secondary",
    year: "2016",
  },
];
