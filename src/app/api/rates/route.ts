import { NextResponse } from 'next/server';
import { getAllRates, connectKafkaConsumer } from '@/lib/kafka-rates';

// Initialize Kafka consumer once using a Promise singleton
let kafkaInitPromise: Promise<void> | null = null;

function ensureKafka() {
  if (!kafkaInitPromise) {
    kafkaInitPromise = connectKafkaConsumer();
  }
  return kafkaInitPromise;
}

export async function GET() {
  await ensureKafka();
  const rates = getAllRates();

  return NextResponse.json(rates, {
    headers: {
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      'X-Rate-Source': process.env.KAFKA_BROKERS ? 'kafka-live' : 'simulated',
    },
  });
}
