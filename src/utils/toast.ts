import { toast } from 'react-toastify';

export function notifyDownload(label: string): void {
  toast.success(`Opening ${label}...`, {
    toastId: `download-${label}`,
  });
}

export function notifyCopied(label: string, value: string): void {
  toast.success(`${label} copied: ${value}`, {
    toastId: `copy-${label}`,
  });
}

export function notifyUnavailable(label: string): void {
  toast.info(`${label} link will be published soon.`, {
    toastId: `unavailable-${label}`,
  });
}

export function notifyCallInitiated(phoneDisplay: string): void {
  toast.info(`Dialing ${phoneDisplay}...`, {
    toastId: 'call-initiated',
  });
}
