import { Building2, FileSpreadsheet, Lock, Receipt, ShieldCheck } from 'lucide-react';

interface ProjectArtworkProps {
  variant: 'vdcft-cms' | 'makwid-billing';
  title: string;
}

export function ProjectArtwork({ variant, title }: ProjectArtworkProps) {
  if (variant === 'vdcft-cms') {
    return (
      <div
        className="project-artwork project-artwork-vdcft"
        role="img"
        aria-label={title}
      >
        <div className="artwork-window">
          <div className="artwork-topbar">
            <span className="artwork-title-bar">VDCFT Academic Portal &amp; CMS</span>
            <span className="artwork-badge-icon" aria-hidden="true">
              <Lock size={13} strokeWidth={2} />
            </span>
          </div>

          <div className="artwork-body-split">
            <div className="artwork-sidebar">
              <div className="artwork-nav-item is-active">
                <Building2 size={13} />
                <span>Departments</span>
              </div>
              <div className="artwork-nav-item">
                <FileSpreadsheet size={13} />
                <span>Notices CRUD</span>
              </div>
              <div className="artwork-nav-item">
                <ShieldCheck size={13} />
                <span>JWT Roles</span>
              </div>
            </div>

            <div className="artwork-main-pane">
              <div className="artwork-stat-pair">
                <div className="artwork-stat-card">
                  <span className="artwork-stat-label">API Latency</span>
                  <strong className="artwork-stat-value tabular-nums">-40%</strong>
                </div>
                <div className="artwork-stat-card">
                  <span className="artwork-stat-label">Auth Layer</span>
                  <strong className="artwork-stat-value">JWT + Bcrypt</strong>
                </div>
              </div>

              <div className="artwork-rows">
                <div className="artwork-line-row">
                  <span className="artwork-line-bar is-wide" />
                  <span className="artwork-line-accent" />
                </div>
                <div className="artwork-line-row">
                  <span className="artwork-line-bar" />
                  <span className="artwork-line-accent" />
                </div>
                <div className="artwork-line-row">
                  <span className="artwork-line-bar is-medium" />
                  <span className="artwork-line-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="project-artwork project-artwork-makwid"
      role="img"
      aria-label={title}
    >
      <div className="artwork-window">
        <div className="artwork-topbar">
          <span className="artwork-title-bar">Makwid Clinical Billing Suite</span>
          <span className="artwork-badge-icon" aria-hidden="true">
            <Receipt size={13} strokeWidth={2} />
          </span>
        </div>

        <div className="artwork-invoice-grid">
          <div className="artwork-invoice-summary">
            <span className="artwork-stat-label">Billing Modules</span>
            <strong className="artwork-stat-value">OPD · IPD · Pharmacy</strong>
            <div className="artwork-progress-track">
              <span className="artwork-progress-fill" />
            </div>
          </div>

          <div className="artwork-rows">
            <div className="artwork-invoice-row">
              <span>Consultation &amp; Diagnostics</span>
              <span className="artwork-amount tabular-nums">REST Synced</span>
            </div>
            <div className="artwork-invoice-row">
              <span>Patient Receipt Generator</span>
              <span className="artwork-amount tabular-nums">Modular UI</span>
            </div>
            <div className="artwork-invoice-row">
              <span>Ward &amp; Procedure Ledger</span>
              <span className="artwork-amount tabular-nums">Validated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
