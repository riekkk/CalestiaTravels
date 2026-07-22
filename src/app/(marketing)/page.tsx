import { Hero } from "@/components/sections/hero";
import { FeaturedTours } from "@/components/sections/featured-tours";
import { VisaAssistanceTeaser } from "@/components/sections/visa-assistance-teaser";
import { WhyChooseCalestia } from "@/components/sections/why-choose-calestia";
import { PopularDestinations } from "@/components/sections/popular-destinations";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedTours />
      <VisaAssistanceTeaser />
      <WhyChooseCalestia />
      <PopularDestinations />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
