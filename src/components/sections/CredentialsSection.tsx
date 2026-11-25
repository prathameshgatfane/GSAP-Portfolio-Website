import type { KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, GraduationCap, Sparkles } from 'lucide-react';
import {
  ACHIEVEMENTS_DATA,
  CERTIFICATES_DATA,
  EDUCATION_DATA,
  PERSONAL_ATTRIBUTES,
  TRAINING_SUMMARY,
} from '../../data/portfolioData';
import { sanitizeUrl } from '../../utils/security';
import { notifyDownload } from '../../utils/toast';

interface CredentialsSectionProps {
  onOpenLightbox: (src: string, title: string) => void;
}

export function CredentialsSection({ onOpenLightbox }: CredentialsSectionProps) {
  const handleCertImageKeyDown = (
    event: KeyboardEvent<HTMLImageElement>,
    src: string,
    title: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpenLightbox(src, title);
    }
  };

  return (
    <section id="credentials" className="editorial-section credentials-section">
      <div className="section-container">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">Credentials &amp; Background</p>
            <h2 className="section-display-title">
              Achievements, trainings &amp; education
            </h2>
          </div>
        </div>

        {/* Achievements & Education Split */}
        <div className="credentials-two-col">
          <div className="credential-panel cred-reveal">
            <div className="credential-panel-header">
              <Award size={20} strokeWidth={1.8} color="#AC58E9" />
              <h3>Achievements</h3>
            </div>

            <div className="credential-list">
              {ACHIEVEMENTS_DATA.map((item) => (
                <div className="credential-item" key={item.id}>
                  <h4>{item.title}</h4>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="credential-panel cred-reveal">
            <div className="credential-panel-header">
              <GraduationCap size={20} strokeWidth={1.8} color="#AC58E9" />
              <h3>Education</h3>
            </div>

            <div className="credential-list">
              {EDUCATION_DATA.map((edu) => (
                <div className="credential-item" key={edu.id}>
                  <div className="credential-item-top">
                    <h4>{edu.degreeFull}</h4>
                    <span className="credential-period tabular-nums">
                      {edu.period}
                    </span>
                  </div>
                  <p>{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trainings & Downloadable Certificates */}
        <div className="trainings-block cred-reveal">
          <div className="trainings-header">
            <div>
              <p className="section-kicker">Trainings &amp; Certifications</p>
              <h3 className="trainings-title">{TRAINING_SUMMARY.provider}</h3>
            </div>
            <p className="trainings-tracks">{TRAINING_SUMMARY.tracks}</p>
          </div>

          <div className="certificates-grid">
            {CERTIFICATES_DATA.map((cert) => (
              <motion.article
                className="certificate-card-v2"
                key={cert.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={cert.imageSrc}
                  alt={cert.imageAlt}
                  tabIndex={0}
                  referrerPolicy="no-referrer"
                  onClick={() => onOpenLightbox(cert.imageSrc, cert.title)}
                  onKeyDown={(event) =>
                    handleCertImageKeyDown(event, cert.imageSrc, cert.title)
                  }
                />

                <div className="certificate-card-footer">
                  <div>
                    <p className="certificate-track">{cert.track}</p>
                    <h4 className="certificate-name">{cert.title}</h4>
                  </div>

                  <a
                    href={sanitizeUrl(cert.pdfHref)}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={cert.downloadName}
                    className="certificate-download-btn"
                    onClick={() => notifyDownload(cert.title)}
                  >
                    <Download size={15} strokeWidth={2} />
                    <span>PDF</span>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Soft Skills & Hobbies */}
        <div className="personal-strip cred-reveal">
          <div className="personal-strip-item">
            <span className="personal-strip-label">
              <Sparkles size={16} color="#AC58E9" />
              <span>Soft Skills</span>
            </span>
            <p>{PERSONAL_ATTRIBUTES.softSkills.join(' · ')}</p>
          </div>

          <div className="personal-strip-item">
            <span className="personal-strip-label">
              <Sparkles size={16} color="#AC58E9" />
              <span>Hobbies</span>
            </span>
            <p>{PERSONAL_ATTRIBUTES.hobbies.join(' · ')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
