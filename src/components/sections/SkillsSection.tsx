import { useState, type ReactNode } from 'react';
import {
  Cloud,
  Code2,
  Database,
  Globe,
  Layout,
  Monitor,
  Server,
  ShieldCheck,
} from 'lucide-react';
import { FaWindows } from 'react-icons/fa';
import {
  SiBootstrap,
  SiCloudinary,
  SiCss,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiReact,
  SiRubyonrails,
  SiTailwindcss,
  SiUbuntu,
  SiVite,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { SKILLS_DATA } from '../../data/portfolioData';
import type { SkillCategory } from '../../types/portfolio';
import LogoLoop, { type LogoLoopItem } from '../common/LogoLoop';

const ROW_ONE_LOGOS: LogoLoopItem[] = [
  {
    node: <SiHtml5 />,
    title: 'HTML5',
    href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    color: '#E34F26',
  },
  {
    node: <SiCss />,
    title: 'CSS3',
    href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    color: '#1572B6',
  },
  {
    node: <SiJavascript />,
    title: 'JavaScript (ES6+)',
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    color: '#F7DF1E',
  },
  {
    node: <SiReact />,
    title: 'React.js',
    href: 'https://react.dev',
    color: '#61DAFB',
  },
  {
    node: <SiVite />,
    title: 'Vite',
    href: 'https://vite.dev',
    color: '#646CFF',
  },
  {
    node: <SiTailwindcss />,
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
    color: '#06B6D4',
  },
  {
    node: <SiBootstrap />,
    title: 'Bootstrap',
    href: 'https://getbootstrap.com',
    color: '#7952B3',
  },
  {
    node: <VscVscode />,
    title: 'VS Code',
    href: 'https://code.visualstudio.com',
    color: '#007ACC',
  },
  {
    node: <SiGithub />,
    title: 'GitHub',
    href: 'https://github.com',
    color: 'var(--text-primary)',
  },
];

const ROW_TWO_LOGOS: LogoLoopItem[] = [
  {
    node: <SiNodedotjs />,
    title: 'Node.js',
    href: 'https://nodejs.org',
    color: '#339933',
  },
  {
    node: <SiExpress />,
    title: 'Express.js',
    href: 'https://expressjs.com',
    color: 'var(--text-primary)',
  },
  {
    node: <SiJsonwebtokens />,
    title: 'JWT Auth',
    href: 'https://jwt.io',
    color: '#AC58E9',
  },
  {
    node: <SiRubyonrails />,
    title: 'Ruby on Rails',
    href: 'https://rubyonrails.org',
    color: '#CC0000',
  },
  {
    node: <SiMongodb />,
    title: 'MongoDB',
    href: 'https://www.mongodb.com',
    color: '#47A248',
  },
  {
    node: <SiMysql />,
    title: 'MySQL',
    href: 'https://www.mysql.com',
    color: '#4479A1',
  },
  {
    node: <SiFirebase />,
    title: 'Firebase',
    href: 'https://firebase.google.com',
    color: '#FFCA28',
  },
  {
    node: <SiCloudinary />,
    title: 'Cloudinary',
    href: 'https://cloudinary.com',
    color: '#3448C5',
  },
  {
    node: <SiGit />,
    title: 'Git',
    href: 'https://git-scm.com',
    color: '#F05032',
  },
  {
    node: <SiUbuntu />,
    title: 'Linux (Ubuntu)',
    href: 'https://ubuntu.com',
    color: '#E95420',
  },
  {
    node: <FaWindows />,
    title: 'Windows',
    href: 'https://www.microsoft.com/windows',
    color: '#0078D6',
  },
];

interface SkillVisualMeta {
  icon: ReactNode;
  color: string;
}

const SKILL_ICON_MAP: Record<string, SkillVisualMeta> = {
  HTML5: { icon: <SiHtml5 />, color: '#E34F26' },
  CSS3: { icon: <SiCss />, color: '#1572B6' },
  'JavaScript (ES6+)': { icon: <SiJavascript />, color: '#EAB308' },
  'Tailwind CSS': { icon: <SiTailwindcss />, color: '#06B6D4' },
  Bootstrap: { icon: <SiBootstrap />, color: '#7952B3' },
  'Vite + React.js': { icon: <SiReact />, color: '#61DAFB' },
  'Node.js': { icon: <SiNodedotjs />, color: '#339933' },
  'Express.js': { icon: <SiExpress />, color: 'var(--text-primary)' },
  'REST APIs': { icon: <Globe size={15} strokeWidth={2} />, color: '#AC58E9' },
  JWT: { icon: <SiJsonwebtokens />, color: '#AC58E9' },
  Bcrypt: {
    icon: <ShieldCheck size={15} strokeWidth={2} />,
    color: '#10B981',
  },
  'Ruby on Rails (MVC)': { icon: <SiRubyonrails />, color: '#CC0000' },
  SQL: { icon: <Database size={15} strokeWidth={2} />, color: '#3B82F6' },
  MongoDB: { icon: <SiMongodb />, color: '#47A248' },
  MySQL: { icon: <SiMysql />, color: '#4479A1' },
  Firebase: { icon: <SiFirebase />, color: '#F59E0B' },
  Cloudinary: { icon: <SiCloudinary />, color: '#3448C5' },
  Git: { icon: <SiGit />, color: '#F05032' },
  GitHub: { icon: <SiGithub />, color: 'var(--text-primary)' },
  'VS Code': { icon: <VscVscode />, color: '#007ACC' },
  'Linux (Ubuntu)': { icon: <SiUbuntu />, color: '#E95420' },
  Windows: { icon: <FaWindows />, color: '#0078D6' },
};

function renderSkillIcon(iconKey: SkillCategory['iconKey']) {
  switch (iconKey) {
    case 'layout':
      return <Layout size={18} strokeWidth={1.8} />;
    case 'server':
      return <Server size={18} strokeWidth={1.8} />;
    case 'database':
      return <Database size={18} strokeWidth={1.8} />;
    case 'cloud':
      return <Cloud size={18} strokeWidth={1.8} />;
    case 'monitor':
      return <Monitor size={18} strokeWidth={1.8} />;
  }
}

export function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="editorial-section skills-section">
      <div className="section-container">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">Technical Skills</p>
            <h2 className="section-display-title">Core stack &amp; tooling</h2>
          </div>
          <p className="section-sub-note">
            Hover or drag any row to inspect technologies.
          </p>
        </div>
      </div>

      <div className="skills-loops-fullbleed">
        <LogoLoop
          logos={ROW_ONE_LOGOS}
          speed={85}
          direction="right"
          logoHeight={46}
          gap={60}
          hoverSpeed={0}
          scaleOnHover
          labels="hover"
          fadeOut
          fadeOutWidth={0.07}
          draggable
          intro
          ariaLabel="Frontend and developer tools flowing left to right"
        />

        <LogoLoop
          logos={ROW_TWO_LOGOS}
          speed={85}
          direction="left"
          logoHeight={46}
          gap={60}
          hoverSpeed={0}
          scaleOnHover
          labels="hover"
          fadeOut
          fadeOutWidth={0.07}
          draggable
          intro
          ariaLabel="Backend, database, cloud, and OS logos flowing right to left"
        />
      </div>

      <div className="section-container">
        <div className="skills-matrix">
          {SKILLS_DATA.map((category) => (
            <div className="skill-group-row skill-row-reveal" key={category.id}>
              <div className="skill-group-label">
                <span className="skill-group-icon" aria-hidden="true">
                  {renderSkillIcon(category.iconKey)}
                </span>
                <h3>{category.title}</h3>
              </div>

              <div className="skill-group-values">
                {category.skills.map((skill) => {
                  const visual = SKILL_ICON_MAP[skill] ?? {
                    icon: <Code2 size={15} strokeWidth={2} />,
                    color: 'var(--accent)',
                  };
                  const isActive = activeSkill === skill;

                  return (
                    <button
                      type="button"
                      key={skill}
                      className={`skill-tech-tag${isActive ? ' is-active' : ''}`}
                      aria-pressed={isActive}
                      onClick={() =>
                        setActiveSkill((prev) => (prev === skill ? null : skill))
                      }
                    >
                      <span
                        className="skill-tech-icon"
                        style={{ color: visual.color }}
                        aria-hidden="true"
                      >
                        {visual.icon}
                      </span>
                      <span className="skill-tech-name">{skill}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
