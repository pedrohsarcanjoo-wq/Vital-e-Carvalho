import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { Stats } from '../components/Stats';
import { Services } from '../components/Services';
import { Process } from '../components/Process';
import { Differentials } from '../components/Differentials';
import { ServiceCategories } from '../components/ServiceCategories';
import { Testimonials } from '../components/Testimonials';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeaturedProperties />
      <Stats />
      <Services />
      <Process />
      <Differentials />
      <ServiceCategories />
      <Testimonials />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}