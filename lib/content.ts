export type SessionMetric = {
  id: string;
  icon: string;
  label: string;
  primary: string;
  secondary: string;
};
export type Module = { no: string; tag: string; title: string; body: string; image: string };
export type Stat = { num: string; label: string };
export type DetailItem = { icon: string; label: string; primary: string; secondary: string };
export type BonusItem = { id: string; title: string; body: string; value: string };
export type FAQItem = { q: string; a: string };
export type Quote = { text: string; name: string; role: string };
export type Brand = { name: string; src: string };

export type Content = {
  brand: { name: string; logoSrc: string };
  hero: {
    eyebrow: string;
    title: string;
    sub: string;
    cta: string;
    headerCta: string;
    note: string;
    ticker: string;
  };
  session: {
    feature: { eyebrow: string; title: string };
    metrics: SessionMetric[];
  };
  pattern: {
    section: string;
    title: string;
    sub: string;
    pull: string;
    bullets: string[];
    closer: string;
    bridge: string;
  };
  pedigree: {
    section: string;
    title: string;
    titleEm: string;
    desktopCollage: string;
    mobileCollage: string;
    collageAlt: string;
  };
  curriculum: { section: string; title: string; sub: string; modules: Module[] };
  mentor: {
    section: string;
    title: string;
    role: string;
    portrait: string;
    paras: string[];
    brandsLabel: string;
    brands: Brand[];
  };
  audience: {
    section: string;
    title: string;
    sub: string;
    items: string[];
    notForTitle: string;
    notFor: string;
  };
  community: {
    section: string;
    title: string;
    body: string;
    stats: Stat[];
    collage: string;
    collageCaption: string;
  };
  testimonials: { section: string; title: string; sub: string; quotes: Quote[] };
  details: { section: string; title: string; sub: string; items: DetailItem[] };
  bonus: {
    section: string;
    title: string;
    sub: string;
    countdown: { d: string; h: string; m: string; s: string };
    seats: { taken: number; total: number; remaining: number };
    items: BonusItem[];
  };
  faq: { section: string; title: string; items: FAQItem[] };
  finale: {
    section: string;
    title: string;
    body: string[];
    primary: string;
    note: string;
  };
  footer: { links: string[]; copyright: string };
};

export const content: Content = {
  brand: {
    name: "LevelUp Learning",
    logoSrc: "/assets/levelup-logo.png",
  },
  hero: {
    eyebrow: "— A 2-HOUR MASTERCLASS —",
    title: "How to start your filmmaking career in 2026.",
    sub: "Learn the exact path professional filmmakers are using today, even if you've never picked up a camera.",
    cta: "Enroll Now",
    headerCta: "Reserve seat",
    note: "No prior experience required",
    ticker:
      "LevelUp Learning ✦ India's Largest Filmmaking Community ✦ 3,00,000+ Members ✦ 60,000+ Students Trained ✦ 300+ Short Films ✦",
  },
  session: {
    feature: {
      eyebrow: "Free Live Masterclass",
      title: "Find your way into filmmaking in two hours.",
    },
    metrics: [
      { id: "01", icon: "◷", label: "Date", primary: "Sun, 17 May 2026", secondary: "Sunday afternoon" },
      { id: "02", icon: "▷", label: "Time", primary: "11:00 AM – 1:00 PM IST", secondary: "+ 15 min live Q&A" },
      { id: "03", icon: "◉", label: "Where", primary: "Live on Zoom", secondary: "Link sent day before" },
      { id: "04", icon: "★", label: "Bonus", primary: "₹9,799 value", secondary: "Yours on registration" },
    ],
  },
  pattern: {
    section: "The Pattern",
    title: '100 people say "I want to make a film." Only 1 actually does.',
    sub: "Which one are you?",
    pull: "1 of 100 registrants finish a film within 12 months.",
    bullets: [
      "If you've been watching YouTube tutorials for months but never shot a frame…",
      "If you dreamed of film school but the ₹8–12 lakh price tag killed it…",
      "If you have stories in your head but no one around you takes \"filmmaking\" seriously…",
      "If you've been waiting for the \"right time,\" the \"right camera,\" or the \"right connections\"…",
    ],
    closer:
      "You're not alone. You're in the 99. And the reason you're stuck isn't laziness. It isn't lack of talent — it's a system that was designed to keep you out.",
    bridge:
      "But that system has cracked open. In the next 2 hours, we'll show you exactly how to walk through.",
  },
  // Single collage image — drop the real collage at
  // /public/assets/pedigree-collage.jpg and update the path below.
  pedigree: {
    section: "On Set With",
    title: "Learn from a mentor who has worked with",
    titleEm: "India's biggest filmmaking minds.",
    desktopCollage: "/assets/pedigree-desktop-collage.png",
    mobileCollage: "/assets/pedigree-mobile-collage.png",
    collageAlt:
      "Behind-the-scenes collage — Rahul on set with Lokesh Kanagaraj, Karthik Subbaraj, Ravi Basrur, DRK Kiran, G Venket Ram, Anthony Gonsalvez, and others.",
  },
  curriculum: {
    section: "The Path",
    title: "Here's exactly what we'll cover.",
    sub: "Five modules. One working framework. The exact map for walking through those open gates.",
    // Module images live in /public/assets/curriculum/.
    // Regenerate via: node scripts/gen-curriculum-images.mjs
    modules: [
      {
        no: "Module 1",
        tag: "Landscape",
        title: "The New Filmmaking Landscape",
        body:
          "Understand the shifts of the last 5 years most aspiring filmmakers still don't know about. Why OTT, regional content, and the creator economy have completely changed what it means to \"get into films.\"",
        image: "/assets/curriculum/mod-1.jpg",
      },
      {
        no: "Module 2",
        tag: "Pathways",
        title: "The 5 Doors Into Filmmaking",
        body:
          "Most people think there's only one path: become a director. There are actually five doors into this industry, and most of them don't require you to move to Mumbai or spend 4 years in film school. We walk through each and help you identify which fits your life right now.",
        image: "/assets/curriculum/mod-2.jpg",
      },
      {
        no: "Module 3",
        tag: "Workflow",
        title: "How a Short Film Actually Gets Made",
        body:
          "The end-to-end workflow, broken down using a scene from a film you already love. 7 pre-production documents. The shot list. The schedule. The budget. The truth.",
        image: "/assets/curriculum/mod-3.jpg",
      },
      {
        no: "Module 4",
        tag: "Craft",
        title: "The 5 Craft Layers Every Great Scene Uses",
        body:
          "Writing. Directing. Cinematography. Editing. Sound. We take one 60-second scene and reveal the 30+ creative decisions hidden inside. This is how you stop watching films and start understanding them.",
        image: "/assets/curriculum/mod-4.jpg",
      },
      {
        no: "Module 5",
        tag: "Plan",
        title: "Your Next 30 Days",
        body:
          "You won't leave this session with a to-do list. You'll leave with a plan. A clear, week-by-week action map for the next 30 days to go from \"I want to make a film\" to \"I'm making a film.\"",
        image: "/assets/curriculum/mod-5.jpg",
      },
    ],
  },
  mentor: {
    section: "The Mentor",
    title: "Meet Rahul Srinivas.",
    role: "Founder Of LevelUp Learning | Storyteller | Director | Producer",
    portrait: "/assets/rahul-portrait.png",
    paras: [
      "Rahul started LevelUp Learning with no connections in the film industry and turned it into India's largest filmmaking community, with 3,00,000+ members and 60,000+ students trained.",
      "But before he was building communities, he was a storyteller. That's still the core of how he sees filmmaking — not as a technical exercise, but as the craft of moving people. It's the lens he brings to every script he writes, every project he produces, and every session he teaches.",
      "He has directed masterclasses with some of the most acclaimed names in Indian cinema, including Karthik Subbaraj, Lokesh Kanagaraj, Nelson Dilipkumar, and Ravi Basrur. He's spent years studying how the best in the business actually think, work, and break in.",
      "He knows this world. And in this session, he'll show you how to get started in yours.",
    ],
    brandsLabel: "Worked With",
    brands: [
      { name: "TEDx", src: "/assets/brands/tedx.svg" },
      { name: "Canon", src: "/assets/brands/canon.svg" },
      { name: "Tata", src: "/assets/brands/tata.svg" },
    ],
  },
  audience: {
    section: "Audience",
    title: "Is this masterclass for you?",
    sub:
      "Built for people who are serious about filmmaking, whether you're starting from zero or have been trying on your own for years.",
    items: [
      "You dream of making films but don't know where to start.",
      "You've been watching tutorials for months but haven't made anything yet.",
      "You considered film school but the cost put it out of reach.",
      "You have stories in your head but no crew, no collaborators, no one to make them with.",
      "You're already in a career (engineer, doctor, marketer, student), but filmmaking is the thing you actually want to do.",
      "You've been creating content on Instagram or YouTube and want to take the leap to actual filmmaking.",
    ],
    notForTitle: "This is NOT for you if…",
    notFor:
      "You're looking for a magic shortcut or a \"become a filmmaker in 7 days\" hack. This session respects your time, which means we're going to tell you the truth, and the truth requires work.",
  },
  community: {
    section: "The Community",
    title: "India's Largest Filmmaking Community",
    body:
      "LevelUp Learning is more than a platform, it's a community. Our mission? To make learning simple, affordable, and engaging by working with the finest minds in India to bring their expertise directly to our students.",
    stats: [
      { num: "3,00,000+", label: "Community Members" },
      { num: "60,000+", label: "Students Trained" },
    ],
    collage: "/assets/filmmakers-collage.png",
    collageCaption:
      "Masterclasses hosted with Lokesh Kanagaraj, DRK Kiran, Ravi Basrur, G Venket Ram, Karthik Subbaraj, Anthony Gonsalvez",
  },
  testimonials: {
    section: "Hear What They Say",
    title: "You're not the first to show up here.",
    sub:
      "Over 25,000 aspiring filmmakers have learned from Rahul and the Level Up community. Here's what some of them said.",
    quotes: [
      {
        text:
          "Before this, filmmaking felt too big and out of reach. But the way the concepts were taught made it feel possible, and even exciting. I finally feel confident to start working on my own ideas.",
        name: "Vikram D.",
        role: "Aspiring Filmmaker",
      },
      {
        text:
          "What I loved most was the honesty. No sugar-coating, just real insights from people who've been there. It gave me a clear picture of what it actually takes to be in the industry.",
        name: "Sneha P.",
        role: "Visual Storytelling Enthusiast",
      },
      {
        text:
          "I was about to pursue a 1-year filmmaking diploma, but my parents weren't allowing me to quit my job. That's when I found Level Up. I had a great experience and gained so much knowledge about cinema. At the end of the day I feel complete.",
        name: "Sudhan Maaran",
        role: "Student",
      },
      {
        text:
          "The most valuable thing is the insider, current-day view on how things work in the industry today, something you simply cannot find anywhere else online. The teachers were highly knowledgeable. Great course curation.",
        name: "Neeraj Mohan",
        role: "IT Professional",
      },
    ],
  },
  details: {
    section: "The Masterclass",
    title: "Here's everything you need to know.",
    sub: "The masterclass is completely free. All we need is your commitment to show up live.",
    items: [
      { icon: "◷", label: "When", primary: "Sun · 17 May 2026", secondary: "Sunday · 11:00 AM IST" },
      { icon: "▷", label: "Duration", primary: "2 hours live", secondary: "+ 15 min live Q&A" },
      {
        icon: "◉",
        label: "Where",
        primary: "Live on Zoom",
        secondary: "Link sent to email + WhatsApp the day before.",
      },
      { icon: "₹", label: "Cost", primary: "Free.", secondary: "No credit card. No hidden fees. No trial periods." },
    ],
  },
  bonus: {
    section: "Bonus",
    title: "The bonus stack. Yours the moment you register.",
    sub:
      "Four assets you'll actually use in the next 30 days: worksheets, frameworks and community access. Delivered right after the session.",
    countdown: { d: "19", h: "01", m: "10", s: "00" },
    seats: { taken: 389, total: 500, remaining: 111 },
    items: [
      {
        id: "B / 01",
        title: "Live 2-Hour Masterclass with Rahul Srinivas",
        body: "Industry insights you won't find on YouTube.",
        value: "₹4,999 value · Free today",
      },
      {
        id: "B / 02",
        title: "The 2026 Filmmaker's Action Map (PDF)",
        body: "Your week-by-week plan for the next 30 days, sent right after the session.",
        value: "₹2,900 value",
      },
      {
        id: "B / 03",
        title: 'The "5 Doors" Decision Framework',
        body: "A worksheet to identify which path into filmmaking fits your life, skills and goals.",
        value: "₹1,900 value",
      },
      {
        id: "B / 04",
        title: "Access to the Level Up Community (Lifetime)",
        body: "Join 3,00,000+ aspiring and working filmmakers across India.",
        value: "Priceless",
      },
    ],
  },
  faq: {
    section: "Questions",
    title: "Questions you might have.",
    items: [
      {
        q: "Is this actually free? What's the catch?",
        a:
          "Yes — genuinely free. No card, no trial, no catch. We do run a paid program for people who want to go deeper, and we'll mention it briefly at the end. The 2 hours of teaching are yours, no strings.",
      },
      {
        q: "Do I need any filmmaking experience to join?",
        a:
          "Not at all. This session is designed for people starting from zero. We've deliberately built it so a complete beginner can follow along, and so an intermediate filmmaker can still pick up frameworks they've never seen applied this way.",
      },
      {
        q: "I don't have a camera. Can I still benefit?",
        a:
          "Yes. In fact, a big part of this session is showing you how filmmakers today are making industry-grade work on phones. You don't need to buy anything before, during, or after this masterclass to start making films.",
      },
      {
        q: "Will the session be recorded? Can I watch later?",
        a:
          "Yes. All registered attendees get access to the recording for 72 hours after the session. That said, we strongly recommend attending live. The Q&A segment is where most people get their most valuable questions answered, and that experience simply doesn't translate to a recording.",
      },
      {
        q: "How is this different from free YouTube content?",
        a:
          "YouTube teaches techniques. This teaches a career path — how the Indian industry actually works in 2026, which doors are open, and how real people are walking through them.",
      },
      {
        q: "Who is this NOT for?",
        a:
          'Honestly, this isn\'t for people looking for a "become a filmmaker in 7 days" shortcut. Filmmaking takes real work. What we can give you is a clear map. The rest is up to you.',
      },
      {
        q: "What language will the session be in?",
        a:
          "The masterclass will be conducted in English, with Rahul occasionally using Indian references and regional industry examples. If you understand conversational English, you're fully equipped.",
      },
      {
        q: "I'm not from India, can I still join?",
        a:
          "Yes. The frameworks (5 doors, short film workflow, craft layers) apply universally. We've had participants from 40+ countries.",
      },
      {
        q: "What if I still have questions after registering?",
        a:
          "Once you register, you'll be added to a WhatsApp group where you can ask anything before the session. Our team and community members will be there to help.",
      },
    ],
  },
  finale: {
    section: "The Decision",
    title: "You came here for a reason.",
    body: [
      "Maybe you've been thinking about this for years. Maybe it hit you last week.",
      'Either way, 100 people will read this page today. 99 of them will close it and go back to telling themselves "someday."',
      "1 will register.",
      "Which one are you?",
    ],
    primary: "Reserve My Free Seat",
    note: "Seats are limited · The decision is yours",
  },
  footer: {
    links: ["Privacy", "Terms", "Refund & Cancellation", "Contact"],
    copyright: "© 2026 · All rights reserved",
  },
};

// Target date for live countdown — masterclass start time.
// 11:00 AM IST on 17 May 2026 = 05:30 UTC (IST is UTC+5:30).
export const REGISTRATION_DEADLINE = new Date("2026-05-17T05:30:00.000Z");
