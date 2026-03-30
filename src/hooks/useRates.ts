'use client';

import { useState, useEffect, useCallback } from 'react';
import { RateData } from '@/types';

const POLL_INTERVAL = 30_000; // 30 seconds

export function useRates() {
  const [rates, setRates] = useState<RateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchRates = useCallback(async () => {
    try {
      const res = await fetch('/api/rates', { cache: 'no-store' });
      if (!res.ok) throw new Error(`Rate fetch failed: ${res.status}`);
      const data: RateData[] = await res.json();
      setRates(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load rates');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchRates]);

  const getRateForVilla = useCallback(
    (villaId: string): RateData | undefined => rates.find(r => r.villaId === villaId),
    [rates]
  );

  return { rates, loading, error, lastUpdated, getRateForVilla, refetch: fetchRates };
}
