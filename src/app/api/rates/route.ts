import { NextResponse } from 'next/server';
import { getAllRates, connectKafkaConsumer } from '@/lib/kafka-rates';

// Initialize Kafka consumer on first import (server-side)
let kafkaInitialized = false;

async function ensureKafka() {
  if (!kafkaInitialized) {
    kafkaInitialized = true;
    await connectKafkaConsumer();
  }
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
