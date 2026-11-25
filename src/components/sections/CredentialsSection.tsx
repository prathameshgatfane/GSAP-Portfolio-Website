import {
  Award,
  Download,
  ExternalLink,
  GraduationCap,
  Maximize2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  ACHIEVEMENTS_DATA,
  CERTIFICATES_DATA,
  EDUCATION_DATA,
  PERSONAL_ATTRIBUTES,
  TRAINING_SUMMARY,
} from '../../data/portfolioData';
import type { CertificateItem } from '../../types/portfolio';
import { sanitizeUrl } from '../../utils/security';
import { notifyDownload } from '../../utils/toast';
import { FlipCard } from '../common/FlipCard';

interface CredentialsSectionProps {
  onOpenLightbox: (src: string, title: string) => void;
}

function GlobalAiBadgeFront() {
  return (
    <div className="global-ai-badge-front">
      <div className="global-ai-badge-inner">
        <div className="global-ai-badge-emblem" aria-hidden="true">
          <svg viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="44"
              cy="44"
              r="38"
              stroke="url(#gaiRing)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />
            <circle
              cx="44"
              cy="44"
              r="28"
              fill="url(#gaiCore)"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.2"
            />
            <path
              d="M44 24L49.2 38.8L64 44L49.2 49.2L44 64L38.8 49.2L24 44L38.8 38.8L44 24Z"
              fill="#FFFFFF"
              fillOpacity="0.94"
            />
            <defs>
              <linearGradient id="gaiRing" x1="6" y1="6" x2="82" y2="82" gradientUnits="userSpaceOnUse">
                <stop stopColor="#AC58E9" />
                <stop offset="0.5" stopColor="#60A5FA" />
                <stop offset="1" stopColor="#34D399" />
              </linearGradient>
              <radialGradient id="gaiCore" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(36 32) rotate(52) scale(46)">
                <stop stopColor="#4F46E5" />
                <stop offset="1" stopColor="#18181B" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="global-ai-badge-copy">
          <span className="global-ai-badge-org">Global AI Community</span>
          <h4 className="global-ai-badge-recipient">Prathamesh Nitinrao Gatfane</h4>
          <p className="global-ai-badge-role">
            Community Contributor &amp; Editorial Lead
          </p>
          <p className="global-ai-badge-chapter">
            Microsoft Student Club PRPCEM × Global AI
          </p>
          <span className="global-ai-badge-id tabular-nums">
            ID · fe617007-4f60-4868-b6a6-daec799b1200
          </span>
        </div>
      </div>
    </div>
  );
}

function CertificateCardFront({ cert }: { cert: CertificateItem }) {
  if (cert.badgeVariant === 'global-ai') {
    return <GlobalAiBadgeFront />;
  }

  return (
    <div className="cert-front-frame">
      <img
        src={cert.imageSrc}
        alt={cert.imageAlt}
        className="cert-front-img"
        loading="lazy"
        decoding="async"
        draggable={false}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function CertificateCardBack({
  cert,
  onOpenLightbox,
}: {
  cert: CertificateItem;
  onOpenLightbox: (src: string, title: string) => void;
}) {
  return (
    <div className="cert-back-face">
      <div className="cert-back-top">
        <div className="cert-back-meta tabular-nums">
          <span>{cert.issuer}</span>
          <span aria-hidden="true">·</span>
          <span>{cert.issuedDate}</span>
        </div>
        <span className="cert-back-flip-cue" aria-hidden="true">
          <RotateCcw size={13} strokeWidth={2} />
          <span>Flip</span>
        </span>
      </div>

      <div className="cert-back-body">
        <p className="cert-back-track">{cert.track}</p>
        <h4 className="cert-back-title">{cert.title}</h4>
        <p className="cert-back-desc">{cert.description}</p>
        {cert.credentialCode ? (
          <p className="cert-back-code tabular-nums">{cert.credentialCode}</p>
        ) : null}
      </div>

      <div className="cert-back-actions">
        {cert.imageSrc ? (
          <button
            type="button"
            className="cert-action-secondary"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onOpenLightbox(cert.imageSrc, cert.title);
            }}
          >
            <Maximize2 size={14} strokeWidth={2} />
            <span>View Fullscreen</span>
          </button>
        ) : null}

        {cert.pdfHref ? (
          <a
            href={sanitizeUrl(cert.pdfHref)}
            target="_blank"
            rel="noopener noreferrer"
            download={cert.downloadName}
            className="certificate-download-btn"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              notifyDownload(cert.title);
            }}
          >
            <Download size={14} strokeWidth={2} />
            <span>Download PDF</span>
          </a>
        ) : null}

        {cert.verifyUrl ? (
          <a
            href={sanitizeUrl(cert.verifyUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className={
              cert.pdfHref ? 'cert-action-secondary' : 'certificate-download-btn'
            }
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
          >
            <ExternalLink size={14} strokeWidth={2} />
            <span>{cert.badgeVariant === 'global-ai' ? 'Verify Badge' : 'Verify Online'}</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}

export function CredentialsSection({ onOpenLightbox }: CredentialsSectionProps) {
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

        {/* Trainings & Certifications Interactive 3D FlipCards */}
        <div className="trainings-block cred-reveal">
          <div className="trainings-header">
            <div>
              <p className="section-kicker">Trainings &amp; Certifications</p>
              <h3 className="trainings-title">{TRAINING_SUMMARY.provider}</h3>
            </div>
            <p className="trainings-tracks">
              {TRAINING_SUMMARY.tracks} · Hover to shine, click or drag to flip
            </p>
          </div>

          <div className="certificates-grid">
            {CERTIFICATES_DATA.map((cert) => (
              <div className="certificate-flip-slot" key={cert.id}>
                <FlipCard
                  front={<CertificateCardFront cert={cert} />}
                  back={
                    <CertificateCardBack
                      cert={cert}
                      onOpenLightbox={onOpenLightbox}
                    />
                  }
                  axis="y"
                  flipOnClick
                  draggable
                  dragDistance={0}
                  tilt
                  tiltMax={12}
                  glare
                  glareOpacity={0.22}
                  hoverScale={1.03}
                  perspective={1100}
                  stiffness={170}
                  damping={20}
                  radius={16}
                  background="var(--bg-primary)"
                  color="var(--text-primary)"
                  shadow
                  shadowColor="#000000"
                  shadowOpacity={0.32}
                  ariaLabel={`${cert.title} certificate by ${cert.issuer}. Click or drag to flip for details and downloads.`}
                />
              </div>
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
