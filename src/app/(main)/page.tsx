import Hero from '@/components/sections/Hero';
import TransferBanner from '@/components/sections/TransferBanner';
import VillaShowcase from '@/components/sections/VillaShowcase';
import ExperiencesSection from '@/components/sections/ExperiencesSection';
import DiningSection from '@/components/sections/DiningSection';
import SpaSection from '@/components/sections/SpaSection';
import CTASection from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TransferBanner />
      <VillaShowcase />
      <ExperiencesSection />
      <DiningSection />
      <SpaSection />
      <CTASection />
    </>
  );
}
