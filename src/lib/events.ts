/* ═══════════════════════════════════════════════════════════════
   EVENTS: real Zonov.ai events shown on the blog / "Life at Zonov"
   page. Each event has a hero (prime) photo, a gallery, structured
   markdown content, and highlights. Shared by the listing and the
   detail page.
   ═══════════════════════════════════════════════════════════════ */

export type EventPost = {
  slug: string;
  category: "Events" | "Culture" | "Milestone";
  title: string;
  date: string;
  location?: string;
  excerpt: string;
  hero: string;
  gallery: string[];
  content: string;
  highlights: string[];
  seoTitle: string;
  metaDescription: string;
};

export const EVENTS: EventPost[] = [
  {
    slug: "national-conference-egovernance-jaipur",
    category: "Events",
    title:
      "Zonov.ai at the 29th National Conference on e-Governance, Jaipur",
    date: "1 & 2 July 2026",
    location: "Jaipur, Rajasthan",
    excerpt:
      "Zonov.ai showcased its AI-powered solution at India's premier e-Governance conference, and was recognized among the event's top performers.",
    hero: "/events/e1/1.jpeg",
    gallery: [
      "/events/e1/1.jpeg",
      "/events/e1/2.jpeg",
      "/events/e1/3.jpeg",
      "/events/e1/4.jpeg",
      "/events/e1/5.jpeg",
    ],
    content: `Representing Zonov.ai on a national stage is always a proud moment, and the **29th National Conference on e-Governance** in Jaipur, Rajasthan was exactly that. The event brought together government leaders, policymakers, technology experts, startups, and innovators, all circling the same question: what does the future of digital governance in India look like?

The theme, "Viksit Bharat 2047: AI-enabled, Data-driven & Secure Digital Governance," could not have been closer to what we set out to do every day: build intelligent AI that solves real problems.

## Showcasing our AI solution

Our team took to the floor to show how AI can streamline complex workflows, improve efficiency, and enable smarter decisions. Over two days, we:

- Presented our solution to industry experts and government stakeholders
- Walked visitors through real-world use cases and how they actually work
- Traded ideas with policymakers, innovators, and fellow founders
- Soaked up feedback from experienced mentors and professionals

Every conversation helped us pressure-test our vision against the real needs of digital governance.

## Recognized among the top performers

Then came the moment that made the whole team smile: Zonov.ai was recognized among the **Top Performers** at the event.

> Recognition like this isn't about a trophy. It's a signal that the problems we're solving matter, and that we're solving them the right way.

Being acknowledged on a national platform gave us fresh energy to keep pushing what AI can do.

## Beyond the booth

The conference was as much about listening as presenting. We came away with a sharper sense of where the ecosystem is heading, from AI adoption in public services and digital transformation, to healthcare and governance innovation and new opportunities for AI-powered automation. Best of all were the conversations about how startups and government institutions can build together.

## Looking ahead

Days like this remind us why we started. As we keep building the next generation of AI products, we stay focused on solutions that are practical, scalable, and genuinely useful.

A big thank you to the organizers, mentors, and everyone who stopped by to talk with our team. We can't wait for the next chance to innovate, collaborate, and contribute to India's growing AI story.`,
    highlights: [
      "Participated in the 29th National Conference on e-Governance",
      "Showcased Zonov.ai's AI-powered solution",
      "Engaged with government officials, industry experts, and innovators",
      "Recognized among the Top Performers",
      "Represented Zonov.ai on a national innovation platform",
      "Strengthened partnerships and explored future collaborations",
    ],
    seoTitle:
      "Zonov.ai Showcases AI Innovation at the 29th National Conference on e-Governance, Jaipur",
    metaDescription:
      "Zonov.ai proudly showcased its AI-powered solution at the 29th National Conference on e-Governance in Jaipur, Rajasthan, and was recognized among the event's top performers for its innovation and impact.",
  },
  {
    slug: "world-health-expo-2025",
    category: "Events",
    title: "World Health Expo 2025: Showcasing AI Innovation in Healthcare",
    date: "2025",
    location: "World Health Expo",
    excerpt:
      "Zonov.ai showcased its AI-powered healthcare solution at World Health Expo 2025, connecting with healthcare leaders and demonstrating how AI can transform hospital operations.",
    hero: "/events/e4/1.jpg",
    gallery: [
      "/events/e4/1.jpg",
      "/events/e4/2.jpg",
      "/events/e4/3.jpg",
      "/events/e4/4.jpg",
      "/events/e4/5.jpg",
      "/events/e4/6.jpg",
    ],
    content: `There's something energizing about a room full of people who want to change healthcare. That's exactly what the **World Health Expo** felt like, and in 2025, Zonov.ai was proud to be part of it, alongside healthcare professionals, innovators, startups, and industry leaders shaping what comes next.

For us, it was the perfect stage to share a simple belief: AI can make healthcare smarter, faster, and more human.

## Showcasing our AI-powered healthcare solution

At our booth, the team put our AI healthcare solution in front of real users and let it speak for itself. Through live demonstrations, visitors saw first-hand how AI can help hospitals:

- Streamline the patient journey end to end
- Cut down manual, repetitive admin work
- Make decisions from data, not guesswork
- Support clinicians instead of adding to their workload

Watching people experience the product, ask sharp questions, and picture it in their own facilities was easily the highlight of the event.

## Conversations with healthcare leaders

The Expo drew hospital administrators, technologists, investors, and clinicians from across the ecosystem, and the hallway conversations were as valuable as any session. We talked about digital transformation, AI adoption in hospitals, smarter patient management, and where healthcare technology is heading next. Every one of those discussions is quietly shaping our roadmap.

## Learning, networking, and building

Exhibiting was only half of it. The Expo also gave us the chance to understand today's real industry challenges, gather honest product feedback, spot emerging trends early, and start relationships with partners we hope to build alongside for years.

## Our vision for smarter healthcare

We believe AI can genuinely redefine healthcare: less operational chaos, better outcomes, and more time for care.

> World Health Expo 2025 reflects a commitment we take seriously, building AI that makes a real difference for hospitals, providers, and the people they serve.

## Looking ahead

The Expo was an important milestone in our journey, a chance to show our work, meet the people building the future with us, and sharpen our vision. Thank you to everyone who visited our booth and shared their perspective. We'll see you at the next one.`,
    highlights: [
      "Participated in World Health Expo 2025",
      "Showcased Zonov.ai's AI-powered healthcare solution",
      "Demonstrated real-world healthcare use cases",
      "Connected with healthcare leaders and innovators",
      "Explored partnerships and collaboration opportunities",
      "Gathered valuable industry insights and feedback",
    ],
    seoTitle: "Zonov.ai at World Health Expo 2025 | AI-Powered Healthcare Innovation",
    metaDescription:
      "Zonov.ai participated in World Health Expo 2025, showcasing its AI-powered healthcare solution designed to improve hospital operations, streamline patient journeys, and drive digital transformation in healthcare.",
  },
  {
    slug: "team-bonding-retreat-villa",
    category: "Culture",
    title: "Team Bonding Retreat: Building Stronger Connections Beyond Work",
    date: "2026",
    location: "Team Villa Retreat",
    excerpt:
      "A fun-filled villa retreat with games, pickleball, and meaningful conversations that brought our team closer and strengthened the Zonov.ai culture.",
    hero: "/events/e2/1.jpg",
    gallery: [
      "/events/e2/1.jpg",
      "/events/e2/2.jpg",
      "/events/e2/3.jpg",
      "/events/e2/4.jpg",
      "/events/e2/5.jpg",
    ],
    content: `Some of the best ideas at Zonov.ai don't come from a meeting room. They come from a shared laugh over coffee, a competitive pickleball rally, or a late-afternoon conversation that has nothing to do with work. We believe strong products are built by strong teams, so every now and then we step away from our screens and simply spend time together.

This time, we booked a villa for the day, filled it with games and good food, and gave the whole team room to unwind, connect, and make some memories.

## A day full of fun and team spirit

From the moment we arrived, the energy was contagious. The day filled up fast with:

- Fast-paced pickleball matches
- Friendly indoor games and challenges
- Long conversations over coffee and snacks
- Impromptu brainstorming that turned into real ideas

There were plenty of close games, a fair share of friendly trash talk, and a lot of laughter. Every activity, competitive or casual, brought the team a little closer.

## Getting to know each other beyond job titles

The most meaningful part of the day had nothing to do with any activity. Away from the office, titles faded into the background. Seniors and juniors sat together, swapped stories, and got to know each other as people, not just as teammates.

Those relaxed conversations are where trust is quietly built, where communication gets easier, and where a group of individuals slowly starts to feel like one team.

## Why we keep doing this

We're convinced that building great technology starts with building a great team. Days like this let us recharge, spark creativity, strengthen trust, and celebrate how far we've come together.

> A connected team is a more creative, more resilient, and more capable one.

That's exactly why outings like this aren't a one-off for us. They're a regular part of who we are, and we're already looking forward to the next one.

Because at Zonov.ai, we don't just build AI. We build the relationships that power everything we create.`,
    highlights: [
      "Team villa retreat",
      "Pickleball and fun activities",
      "Interactive games and conversations",
      "Team bonding between seniors and juniors",
      "Relaxation, collaboration, and memorable moments",
      "Strengthening the Zonov.ai culture",
    ],
    seoTitle:
      "Team Bonding Retreat at Zonov.ai | Building Stronger Teams Beyond the Workplace",
    metaDescription:
      "The Zonov.ai team came together for a fun-filled villa retreat featuring games, pickleball, team activities, and meaningful conversations that strengthened collaboration, friendships, and our company culture.",
  },
  {
    slug: "official-team-tshirt-launch",
    category: "Milestone",
    title: "A New Identity Begins: Launch of the Official Zonov.ai Team T-Shirts",
    date: "2026",
    location: "Zonov.ai HQ",
    excerpt:
      "We celebrated a proud milestone, the launch of our official team T-shirts, business cards, and branded merchandise, alongside our entire team and investors.",
    hero: "/events/e3/1.jpg",
    gallery: [
      "/events/e3/1.jpg",
      "/events/e3/2.jpg",
    ],
    content: `Every company has a handful of moments that quietly mark a turning point. For Zonov.ai, one of those was the day we launched our very own team merchandise: our branded T-shirts, business cards, and company essentials.

It sounds small on paper. In the room, it felt like the start of something, a shared identity we could all wear, literally.

## A proud moment for the whole team

We celebrated with the entire team in the room, and we were honored to have our **investors** join us too. Their presence said a lot, that the trust and belief behind Zonov.ai runs deep. Together, we weren't just celebrating a T-shirt. We were celebrating the people building the company.

## More than just a T-shirt

The Zonov.ai tee is more than fabric. It stands for a shared vision, a team that moves together, and a quiet pride in what we're creating. Alongside it, we rolled out official business cards and branded materials, so that wherever we show up, at client meetings, conferences, or industry events, we show up as one recognizable team.

## A brand built by people

A brand is never built by a logo alone. It is built by the people who represent it every single day.

> Every member of our team is an ambassador of Zonov.ai.

Whether we're with clients, partners, or the wider startup community, that shared identity reflects our professionalism, our culture, and our commitment to building AI that matters.

## Looking ahead

This milestone is a reminder of how far we've come, and how much further we want to go. With our team, mentors, investors, and partners behind us, we'll keep building products people trust and a brand they recognize.

This was just the beginning. Here's to many more milestones together.`,
    highlights: [
      "Official Zonov.ai T-shirt launch",
      "Launch of branded business cards and company merchandise",
      "Celebration with the entire Zonov.ai team",
      "Presence of our valued investors",
      "Strengthening our company identity and culture",
      "A memorable milestone in Zonov.ai's journey",
    ],
    seoTitle: "Zonov.ai Official Team T-Shirt Launch | Celebrating Our Brand Identity",
    metaDescription:
      "Zonov.ai celebrated the launch of its official team T-shirts, business cards, and branded merchandise alongside the entire team and investors, marking an important milestone in building a strong company identity and culture.",
  },
];

export const categoryStyle: Record<string, { bg: string; color: string }> = {
  Events: { bg: "rgba(27,79,216,0.12)", color: "var(--primary)" },
  Culture: { bg: "rgba(0,180,174,0.12)", color: "var(--secondary)" },
  Milestone: { bg: "rgba(124,58,237,0.12)", color: "var(--purple)" },
};

export function getEvent(slug: string): EventPost | undefined {
  return EVENTS.find((e) => e.slug === slug);
}
