import { Layout } from "@/components/site/Layout";
import { Hero } from "@/components/site/Hero";
import { Facilities } from "@/components/site/Facilities";
import { Partners } from "@/components/site/Partners";
import { StatsBand } from "@/components/site/StatsBand";
import { News } from "@/components/site/News";
import { CTA } from "@/components/site/CTA";

const Index = () => (
  <Layout>
    <Hero />
    <Facilities />
    <Partners />
    <StatsBand />
    <News />
    <CTA />
  </Layout>
);

export default Index;
