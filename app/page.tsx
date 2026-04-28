"use client";

import { content, REGISTRATION_DEADLINE } from "@/lib/content";
import { trackInitiateCheckout } from "@/lib/track";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { HeroCinematic } from "@/components/sections/HeroCinematic";
import { MentorPedigree } from "@/components/sections/MentorPedigree";
import { Ticker } from "@/components/sections/Ticker";
import { SessionStrip } from "@/components/sections/SessionStrip";
import { Pattern } from "@/components/sections/Pattern";
import { Curriculum } from "@/components/sections/Curriculum";
import { Mentor } from "@/components/sections/Mentor";
import { Audience } from "@/components/sections/Audience";
import { Community } from "@/components/sections/Community";
import { Testimonials } from "@/components/sections/Testimonials";
import { BonusStack } from "@/components/sections/BonusStack";
import { FAQ } from "@/components/sections/FAQ";
import { Finale } from "@/components/sections/Finale";
import { SiteFooter } from "@/components/sections/SiteFooter";

const CHECKOUT_URL =
  process.env.NEXT_PUBLIC_CHECKOUT_URL ||
  "https://tally.so/r/gDQ1Dl";

export default function Home() {
  const onRegister = () => {
    if (typeof window === "undefined") return;
    trackInitiateCheckout();
    window.location.href = CHECKOUT_URL;
  };

  return (
    <main className="cs-root">
      <SiteHeader brand={content.brand} cta={content.hero.headerCta} onRegister={onRegister} />
      <HeroCinematic hero={content.hero} onRegister={onRegister} />
      <Ticker text={content.hero.ticker} />
      <SessionStrip session={content.session} />
      <MentorPedigree pedigree={content.pedigree} />
      <Pattern pattern={content.pattern} />
      <Curriculum curriculum={content.curriculum} onRegister={onRegister} />
      <Mentor mentor={content.mentor} />
      <Audience audience={content.audience} />
      <Community community={content.community} />
      <Testimonials testimonials={content.testimonials} />
      <BonusStack bonus={content.bonus} targetDate={REGISTRATION_DEADLINE} onRegister={onRegister} />
      <FAQ faq={content.faq} />
      <Finale finale={content.finale} onRegister={onRegister} />
      <SiteFooter footer={content.footer} brand={content.brand} />
    </main>
  );
}
