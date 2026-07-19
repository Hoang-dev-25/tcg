import { Header } from "@/components/v3/header";
import { Hero } from "@/components/v3/hero";
import { Partners } from "@/components/v3/partners";
import { Spotlight } from "@/components/v3/spotlight";
import { MapPreview } from "@/components/v3/map-preview";
import { Journey } from "@/components/v3/journey";
import { Cases } from "@/components/v3/cases";
import { LeadForm } from "@/components/v3/lead-form";
import { CtaBand } from "@/components/v3/cta-band";
import { Footer } from "@/components/v3/footer";

export default function V3Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Partners />
        <Spotlight />
        <MapPreview />
        <Journey />
        <Cases />
        <LeadForm />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
