import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'sdf_pro_status';

export function useProAccess() {
  const [isPro, setIsPro] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'pro';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setIsPro(stored === 'pro');
    } catch {
      setIsPro(false);
    }
  }, []);

  const activatePro = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, 'pro');
    } catch {
      // ignore
    }
    setIsPro(true);
  }, []);

  const deactivatePro = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, 'free');
    } catch {
      // ignore
    }
    setIsPro(false);
  }, []);

  const devToggle = useCallback(() => {
    setIsPro((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'pro' : 'free');
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return { isPro, activatePro, deactivatePro, devToggle };
}
