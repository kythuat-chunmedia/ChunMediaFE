'use client';

import { useEffect, useRef, useCallback } from 'react';

// Khai báo global type cho reCAPTCHA
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

interface AntiSpamData {
  website: string;         // honeypot - luôn rỗng
  formLoadedAt: number;    // timestamp khi form render
  recaptchaToken: string;  // reCAPTCHA v3 token
}

export function useAntiSpam() {
  const formLoadedAt = useRef<number>(Date.now());

  // Load reCAPTCHA script
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;

    // Tránh load trùng
    if (document.getElementById('recaptcha-script')) return;

    const script = document.createElement('script');
    script.id = 'recaptcha-script';
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup khi unmount
      const el = document.getElementById('recaptcha-script');
      if (el) el.remove();
    };
  }, []);

  // Reset timestamp (gọi sau khi submit thành công)
  const resetTimestamp = useCallback(() => {
    formLoadedAt.current = Date.now();
  }, []);

  // Lấy reCAPTCHA token
  const getRecaptchaToken = useCallback(async (): Promise<string> => {
    if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) return '';

    try {
      return await new Promise<string>((resolve) => {
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
              action: 'contact_submit',
            });
            resolve(token);
          } catch {
            resolve('');
          }
        });
      });
    } catch {
      return '';
    }
  }, []);

  // Collect tất cả anti-spam data
  const getAntiSpamData = useCallback(async (): Promise<AntiSpamData> => {
    const recaptchaToken = await getRecaptchaToken();

    return {
      website: '',                          // honeypot: luôn rỗng
      formLoadedAt: formLoadedAt.current,   // timestamp
      recaptchaToken,                       // reCAPTCHA token
    };
  }, [getRecaptchaToken]);

  return {
    getAntiSpamData,
    resetTimestamp,
  };
}