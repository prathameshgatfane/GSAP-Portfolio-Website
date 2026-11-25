import { Briefcase } from 'lucide-react';
import { EXPERIENCE_DATA } from '../../data/portfolioData';
import { sanitizeUrl } from '../../utils/security';

export function ExperienceSection() {
  return (
    <section id="experience" className="editorial-section experience-section">
      <div className="section-container">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">Experience</p>
            <h2 className="section-display-title">
              Where I&apos;ve built &amp; shipped
            </h2>
          </div>
        </div>

        <div className="experience-timeline">
          {EXPERIENCE_DATA.map((exp) => (
            <article className="timeline-entry exp-card-reveal" key={exp.id}>
              <div className="timeline-meta">
                <span className="timeline-period tabular-nums">{exp.period}</span>
                <span className="timeline-location">{exp.location}</span>
              </div>

              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-icon" aria-hidden="true">
                    <Briefcase size={18} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <p className="timeline-company">{exp.company}</p>
                  </div>
                </div>

                <ul className="timeline-points">
                  {exp.points.map((point) => (
                    <li key={point.id}>
                      {point.links ? (
                        <>
                          {point.richPrefix}
                          {point.links.map((link, index) => (
                            <span key={link.href}>
                              {index > 0 && ', '}
                              <a
                                href={sanitizeUrl(link.href)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-experience-link"
                              >
                                {link.label}
                              </a>
                            </span>
                          ))}
                          {point.richSuffix}
                        </>
                      ) : (
                        point.text
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
