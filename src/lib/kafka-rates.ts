import { RateData, RateMessage } from '@/types';
import { villas } from './villas-data';

const DISCOUNT_PERCENT = 9;

/**
 * Kafka consumer configuration for live rate ingestion.
 * In production, this connects to the Kafka broker and consumes
 * from the 'villa-rates' topic. Rates are cached in-memory
 * with a 60-second TTL and served via the /api/rates endpoint.
 */

// In-memory rate cache (server-side only)
const rateCache = new Map<string, RateData>();
let lastFetchTime = 0;
const CACHE_TTL_MS = 60_000; // 1 minute

// Simulated base rates per villa (used when Kafka is not connected)
const fallbackRackRates: Record<string, number> = {
  'two-bed-ocean-suite-pool': 2850,
  'one-bed-ocean-suite-pool': 1950,
  'oceanfront-pool-villa': 1450,
  'water-villa-whirlpool': 1150,
  'two-bed-beach-villa-pools': 2650,
  'sunset-deluxe-beach-pool': 1350,
  'sunset-beach-pool': 1150,
  'deluxe-beach-pool': 1250,
  'water-villa': 850,
  'beach-villa': 650,
};

function applyDiscount(rackRate: number): { discountedRate: number; discountPercent: number } {
  const discountedRate = Math.round(rackRate * (1 - DISCOUNT_PERCENT / 100));
  return { discountedRate, discountPercent: DISCOUNT_PERCENT };
}

function processKafkaMessage(message: RateMessage): RateData {
  const { villaId, rackRate, currency, mealPlan, availability, effectiveDate, expiryDate } = message.value;
  const { discountedRate, discountPercent } = applyDiscount(rackRate);

  return {
    villaId,
    currency: currency || 'USD',
    baseRate: rackRate,
    discountedRate,
    discountPercent,
    mealPlan: mealPlan || 'Room Only',
    validFrom: effectiveDate,
    validTo: expiryDate,
    availability: (availability as RateData['availability']) || 'available',
    lastUpdated: message.timestamp || new Date().toISOString(),
  };
}

// Generate simulated live rates with slight variation
function generateSimulatedRates(): Map<string, RateData> {
  const rates = new Map<string, RateData>();
  const now = new Date();
  const validTo = new Date(now);
  validTo.setDate(validTo.getDate() + 90);

  // Add small random variation to simulate live rate changes
  const variation = () => Math.floor(Math.random() * 80) - 40;

  for (const villa of villas) {
    const baseRate = (fallbackRackRates[villa.id] || 800) + variation();
    const { discountedRate, discountPercent } = applyDiscount(baseRate);

    rates.set(villa.id, {
      villaId: villa.id,
      currency: 'USD',
      baseRate,
      discountedRate,
      discountPercent,
      mealPlan: 'Bed & Breakfast',
      validFrom: now.toISOString().split('T')[0],
      validTo: validTo.toISOString().split('T')[0],
      availability: Math.random() > 0.15 ? 'available' : 'limited',
      lastUpdated: now.toISOString(),
    });
  }
  return rates;
}

/**
 * Connect to Kafka and start consuming rate messages.
 * Falls back to simulated rates if KAFKA_BROKERS is not configured.
 */
export async function connectKafkaConsumer(): Promise<void> {
  const brokers = process.env.KAFKA_BROKERS;

  if (!brokers) {
    console.log('[Kafka] No KAFKA_BROKERS configured — using simulated rates');
    return;
  }

  try {
    const { Kafka } = await import('kafkajs');
    const kafka = new Kafka({
      clientId: 'vnautica-rates-consumer',
      brokers: brokers.split(','),
      ssl: process.env.KAFKA_SSL === 'true',
      sasl: process.env.KAFKA_SASL_USERNAME ? {
        mechanism: 'plain',
        username: process.env.KAFKA_SASL_USERNAME,
        password: process.env.KAFKA_SASL_PASSWORD || '',
      } : undefined,
    });

    const consumer = kafka.consumer({ groupId: 'vnautica-web-rates' });
    await consumer.connect();
    await consumer.subscribe({
      topic: process.env.KAFKA_RATES_TOPIC || 'villa-rates',
      fromBeginning: false,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const value = JSON.parse(message.value?.toString() || '{}');
          const rateMessage: RateMessage = {
            topic,
            partition,
            offset: message.offset,
            timestamp: message.timestamp,
            value,
          };
          const rate = processKafkaMessage(rateMessage);
          rateCache.set(rate.villaId, rate);
          lastFetchTime = Date.now();
        } catch (err) {
          console.error('[Kafka] Failed to process rate message:', err);
        }
      },
    });

    console.log('[Kafka] Connected and consuming rates');
  } catch (err) {
    console.error('[Kafka] Connection failed, falling back to simulated rates:', err);
  }
}

/**
 * Get current rates for all villas.
 * Returns cached Kafka rates if fresh, otherwise generates simulated rates.
 */
export function getAllRates(): RateData[] {
  const isCacheValid = Date.now() - lastFetchTime < CACHE_TTL_MS && rateCache.size > 0;

  if (!isCacheValid) {
    const simulated = generateSimulatedRates();
    simulated.forEach((rate, id) => rateCache.set(id, rate));
    lastFetchTime = Date.now();
  }

  return Array.from(rateCache.values());
}

/**
 * Get rate for a specific villa
 */
export function getVillaRate(villaId: string): RateData | null {
  const rates = getAllRates();
  return rates.find(r => r.villaId === villaId) || null;
}

export { DISCOUNT_PERCENT, processKafkaMessage };
