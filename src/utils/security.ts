const ALLOWED_PROTOCOLS = new Set(['https:', 'http:', 'mailto:', 'tel:']);

/**
 * Validates and sanitizes external and internal URLs to prevent unsafe URI schemes.
 */
export function sanitizeUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();

  if (!trimmed || trimmed === '#') {
    return '#';
  }

  if (trimmed.startsWith('#')) {
    return /^#[a-zA-Z0-9_-]+$/.test(trimmed) ? trimmed : '#';
  }

  // Allow safe local relative paths (but disallow protocol-relative "//")
  if (
    (trimmed.startsWith('/') && !trimmed.startsWith('//')) ||
    trimmed.startsWith('./')
  ) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (ALLOWED_PROTOCOLS.has(parsed.protocol)) {
      return parsed.toString();
    }
    return '#';
  } catch {
    return '#';
  }
}

export function isPlaceholderUrl(rawUrl: string): boolean {
  const trimmed = rawUrl.trim();
  return !trimmed || trimmed === '#';
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}
