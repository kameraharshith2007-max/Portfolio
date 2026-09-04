export const STUDIO = {
  name: 'Reachlynk',
  email: 'hello@reachlynk.com',
  socials: {
    instagram: '#',
    linkedin: '#',
    x: '#',
  },
};

export type Project = {
  id: string;
  num: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  tech: string[];
  tags: string[];
  services: string[];
};

export const PROJECTS: Project[] = [
  {
    id: 'aether',
    num: '01',
    title: 'Aether',
    category: 'Hospitality / E-commerce',
    year: '2025',
    description: 'A immersive dining experience platform for a luxury restaurant group, blending reservation system, visual storytelling, and seasonal menu curation into one seamless journey.',
    image: 'https://images.pexels.com/photos/34723813/pexels-photo-34723813.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067',
    tech: ['React', 'GSAP', 'Supabase', 'Stripe'],
    tags: ['Website', 'E-commerce'],
    services: ['Web Design', 'Development', 'Art Direction'],
  },
  {
    id: 'nexus',
    num: '02',
    title: 'Nexus',
    category: 'Digital Product / UI-UX',
    year: '2025',
    description: 'A real-time analytics dashboard for a fintech startup, designed to make complex financial data feel intuitive, cinematic, and immediately actionable.',
    image: 'https://images.pexels.com/photos/27141313/pexels-photo-27141313.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067',
    tech: ['React', 'Three.js', 'WebGL', 'TypeScript'],
    tags: ['Digital Product', 'UI/UX'],
    services: ['Product Design', 'Frontend', 'Motion Design'],
  },
  {
    id: 'forma',
    num: '03',
    title: 'Forma',
    category: 'Branding / Website',
    year: '2024',
    description: 'A bold editorial website for a high-fashion label, built around striking typography, immersive lookbook transitions, and a black-and-white visual identity.',
    image: 'https://images.pexels.com/photos/20235870/pexels-photo-20235870.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067',
    tech: ['React', 'Framer Motion', 'Sanity CMS'],
    tags: ['Branding', 'Website'],
    services: ['Brand Identity', 'Web Design', 'Development'],
  },
  {
    id: 'vertex',
    num: '04',
    title: 'Vertex',
    category: 'Website / Experimental',
    year: '2024',
    description: 'An experimental portfolio for an architecture firm, using scroll-driven 3D geometry to walkthrough their built projects in a cinematic digital space.',
    image: 'https://images.pexels.com/photos/29939683/pexels-photo-29939683.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067',
    tech: ['React', 'Three.js', 'GSAP', 'Lenis'],
    tags: ['Website', 'Experimental'],
    services: ['Creative Dev', '3D', 'Web Design'],
  },
];

export const WORK_PAGE_PROJECTS: Project[] = [
  ...PROJECTS,
  {
    id: 'monolith',
    num: '05',
    title: 'Monolith',
    category: 'Website / Industrial',
    year: '2024',
    description: 'A dark, atmospheric website for an industrial design studio, featuring scroll-driven lighting and material studies that reveal their process.',
    image: 'https://images.pexels.com/photos/18145557/pexels-photo-18145557.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067',
    tech: ['React', 'GSAP', 'CSS 3D'],
    tags: ['Website'],
    services: ['Web Design', 'Development'],
  },
  {
    id: 'prism',
    num: '06',
    title: 'Prism',
    category: 'Experimental / 3D',
    year: '2023',
    description: 'A liquid-metal interactive experience for a music label launch, exploring WebGL distortion and audio-reactive visuals.',
    image: 'https://images.pexels.com/photos/11337254/pexels-photo-11337254.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067',
    tech: ['Three.js', 'WebGL', 'Web Audio API'],
    tags: ['Experimental', '3D'],
    services: ['Creative Dev', '3D', 'Interaction Design'],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  company: string;
  projectType: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "They didn't just build us a website. They built us a digital presence that makes people stop scrolling and actually pay attention. Our reservations doubled in three months.",
    name: 'Priya Sharma',
    company: 'Aether Hospitality',
    projectType: 'Restaurant Website',
  },
  {
    quote: "The level of craft is unlike anything we've seen from other studios. Every interaction, every transition, every detail feels deliberate. It elevated our entire brand.",
    name: 'Arjun Mehta',
    company: 'Nexus Finance',
    projectType: 'Product Design',
  },
  {
    quote: "We came in with an idea and a budget. We left with a digital experience that outperforms competitors spending ten times what we did. Worth every rupee.",
    name: 'Kavya Reddy',
    company: 'Forma Studio',
    projectType: 'Brand Website',
  },
];

export const APPROACH_STEPS = [
  { num: '01', title: 'Understand', description: 'We understand your business, audience and goals.' },
  { num: '02', title: 'Design', description: 'We turn strategy into a clear visual experience.' },
  { num: '03', title: 'Build', description: 'We develop the final product with precision.' },
  { num: '04', title: 'Refine', description: 'We obsess over the details that make it feel finished.' },
];

export const BUDGET_OPTIONS = [
  '₹30K – ₹50K',
  '₹50K – ₹1L',
  '₹1L+',
];

export const PROJECT_TYPES = [
  'Website',
  'E-commerce',
  'Branding',
  'Digital Product',
  'UI/UX',
  'Experimental',
];

export const WORK_CATEGORIES = [
  'All',
  'Websites',
  'E-commerce',
  'Branding',
  'Digital Products',
  'UI/UX',
  'Experimental',
];

const CATEGORY_MAP: Record<string, string[]> = {
  All: [],
  Websites: ['Website'],
  'E-commerce': ['E-commerce'],
  Branding: ['Branding'],
  'Digital Products': ['Digital Product'],
  'UI/UX': ['UI/UX'],
  Experimental: ['Experimental', '3D'],
};

export function filterProjects(category: string, projects: Project[]): Project[] {
  if (category === 'All') return projects;
  return projects.filter((p) => p.tags.some((t) => CATEGORY_MAP[category]?.includes(t)));
}
