"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SiteNav from "@/components/SiteNav";

const timeline = [
  {
    title: "The Beginning",
    content: (
      <>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> We met in
          church. I was serving in protocol, and REKs was in the media unit. The
          media equipment was kept around the church office, so he was always
          coming to the back to get a key, pick up something, or help with one
          thing or another. He was just everywhere. My first impression of him
          was basically: This guy is always around. Not because he was
          particularly talkative. He was just very helpful and always seemed to
          be needed somewhere.
        </p>

        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> Meanwhile, I
          had already noticed something else. This is a pretty lady. Very pretty,
          actually.
        </p>

        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> At that
          point, though, we barely spoke. It was just hi, good morning, and that
          was about it. Until one day, REKs came to the office to pick up
          equipment before a service. I was wearing a white dress that day; a
          detail he still remembers and somehow our conversation moved to an
          Ecobank account. Do you have an Ecobank account? And somehow, that
          became one of the beginnings of our story.
        </p>

        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> I eventually
          asked her out and got her number.
        </p>

        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> And I gave
          him my number. But that did not mean I was going on a date with him. I
          don’t go out with someone I’ve never actually had a conversation with.
          I need to talk to you. I need to know you. I need to vibe with you
          first. So, even though he had my number, I wasn’t rushing anywhere.
        </p>

        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> And then
          nothing happened. Months passed. We barely spoke. Until a wedding
          brought us together.
        </p>
      </>
    ),
    images: [{ src: "/story/18.jpg", alt: "Our beginning phase" }],
  },
  {
    title: "From friendship to something more",
    content: (
      <>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> I was
          filming the wedding.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> And I was
          there for the wedding. After everything was over, I wasn’t in a hurry
          to leave, so I stayed back. REKs was packing up his equipment and
          trying to eat before leaving, and somehow that became the day we
          finally had a proper conversation.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> And we
          talked. A lot.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> A lot. It
          was the first time we actually sat down and talked properly, and we
          just clicked.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> I also took
          plenty of pictures of her that day.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> Plenty. And
          then he called me Adora.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> It seemed
          appropriate.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> There was
          also one tiny moment that I remember. I had my phone positioned in a
          way that made it easy for it to slip. REKs was talking to someone else
          and seemed completely distracted. But somehow, he noticed. He turned
          and caught my phone before it fell. I didn’t even know he was paying
          attention. And I remember feeling really good about that. I felt seen.
          But I brushed it off. Because, at the time, we were just friends.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> Or at least,
          that’s what she thought.
        </p>
      </>
    ),
    images: [{ src: "/story/praise.jpg", alt: "Praise looking into Reks" }],
  },
  {
    title: "The friendship that changed everything",
    content: (
      <>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> We kept
          talking. And talking. And talking. Sometimes there wasn’t even
          anything important to say. We could just stay on a call while we both
          went about our day.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> I enjoy my
          own space. But somehow, I really enjoyed having Praise around. Even
          when she wasn’t physically there.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> We
          discovered that we had so much in common our faith, our values, our
          work ethic, our ambitions and the way we looked at life. And then
          there were the exam nights.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> Praise had
          exams to prepare for, so I became her unofficial study partner. I
          would stay awake with her, read with her, wake her up when she fell
          asleep and take screenshots.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> Very
          annoying screenshots.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> Evidence was
          important.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> At the
          time, I was also in another relationship. REKs knew that. But he still
          showed up. He was available. He checked on me. We talked constantly.
          He was there even when there was technically no reason for him to be.
          And I remember talking to one of my friends about him. I called him
          gold. And my friend said: You are sleeping on gold. Looking back Maybe
          I was. Because somewhere along the way, friendship became attachment.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> I started
          getting jealous. Which was funny because I didn’t want to date him.
          But I also didn’t want him dating somebody else.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> I had already
          made my feelings clear. When I was turned down, I stepped back. But I
          couldn’t completely walk away. I still wanted Praise in my life.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> And that
          friendship became a safe place for both of us. We talked about life.
          We prayed together. We studied the Word. We held each other
          accountable. We were becoming important to each other before either of
          us officially gave it a name.
        </p>
      </>
    ),
    images: [{ src: "/story/10.jpg", alt: "Reks and Praise laughing" }],
  },
  {
    title: "The decision to try",
    content: (
      <>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> Eventually,
          my previous relationship came to an end. But I didn’t want to
          immediately jump into another relationship. I needed time. I wanted us
          to just be cool. No relationship pressure. No love talk. Just space to
          breathe and allow things to settle. I didn’t want it to feel like I
          was simply moving from one person to another.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> But from my
          side, I didn’t feel like someone new was entering her life. I felt
          like I’d already been there. I just needed the relationship to catch
          up with what the friendship had already become.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> And then
          came another wedding. REKs was shooting. I was a bridesmaid. I had
          also made the brides wedding dress. After the wedding, we had dinner.
          Our first real date.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> We took
          pictures.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> Beautiful
          pictures. We talked. We laughed. And somehow, we even created our own
          couple’s handshake.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> We also
          talked about the future. And I remember how clearly Praise knew what
          she wanted. She talked about her vision, her plans and what she wanted
          her future to look like. She wasn’t vague about it. She knew what she
          wanted. And I remember thinking: I can build with this person. It
          wasn’t just attraction anymore. It was bigger than that. I knew I
          wanted to marry her.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> And I knew
          I wanted to get married the following year. I hadn’t necessarily
          analyzed it from every possible angle. I just knew. And then REKs
          asked me to be his girlfriend.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> And she said
          yes.
        </p>
        <blockquote className="mt-6 border-l-2 border-[#550303] bg-black/5 py-4 pl-5 text-sm leading-7 text-stone-700 md:text-base md:leading-8">
          <span>
            Classic case of &quot;Don&apos;t let your boyfriend stop you from
            meeting your husband.&quot;🌚
          </span>
        </blockquote>
      </>
    ),
    images: [{ src: "/story/20.jpg", alt: "Our first picnic" }],
  },
  {
    title: "When friendship became partnership",
    content: (
      <>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span>{" "}
          Interestingly, becoming official didn’t change everything. We were
          already friends. We already talked about everything. We already
          laughed together. We already knew each other’s personalities.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> The biggest
          difference was that now the relationship had a name. And a direction.
          We weren’t just seeing where things would go anymore. We were
          intentionally working towards marriage.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> And then
          his friends found out. Suddenly, I started getting messages.
          Congratulations! Welcome to the family! It was so awkward.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> But I loved
          that they embraced her.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> And
          underneath all the jokes, something important was happening. We were
          becoming a team. Not a perfect team. We&apos;re very different people.
          Different personalities. Different reactions. Different ways of
          processing things. We had things to unlearn. Things to improve. Things
          to understand about each other. And we learned that love isn’t simply
          about discovering that you fit. Sometimes, it’s about learning how to
          fit.
        </p>
      </>
    ),
    images: [{ src: "/story/24.jpg", alt: "Both of us at TBC Uyo" }],
  },
  {
    title: "Love gets real",
    content: (
      <>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> Of course, it
          wasn’t always easy. We had disagreements. Some were small. Some were
          definitely not small.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> There was
          one particular season where we really struggled to see things from the
          same perspective. We tried to resolve it ourselves. We couldn’t.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> And
          eventually, we did something that has become important to our
          relationship. We sought counsel.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> Both of us
          have people we trust and submit to. And we believe that’s important.
          Because sometimes you’re so convinced you’re right that you can’t hear
          the other person anymore. We needed someone who could speak to both of
          us. Not just tell one person they were right. But help both of us see
          our blind spots.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> We learned
          about boundaries. Communication. Compromise. Responsibility.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> And we
          learned that being committed doesn’t mean you’ll never disagree. It
          means disagreement doesn’t automatically become departure.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> That season
          changed something for me. Marriage stopped being just about the
          butterflies and the beautiful moments. It became about choosing Praise
          when things are messy.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> And for me,
          it reinforced something I really value about REKs. He listens. He can
          receive correction. He’s willing to grow. And that matters to me.
          Because I don’t want a marriage where we pretend to have everything
          figured out. I want a marriage where we keep growing.
        </p>
      </>
    ),
    images: [{ src: "/story/25.jpg", alt: "lovebirds" }],
  },
  {
    title: "The little things that became everything",
    content: (
      <>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> Our story
          isn’t really defined by one huge romantic moment. It’s the little
          things. The everyday things.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> Late-night
          studying. Praying together. Studying the Word. Holding each other
          accountable. Being available. Showing up.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> Helping
          each other’s families. Checking in when someone wasn’t feeling well.
          Doing things without being asked.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> One thing
          that meant a lot to me was seeing how Praise showed up for the people
          I love.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> And for me,
          it was the way REKs showed up for my family. When my mum had a birthday
          and I couldn’t be there, he went. He prayed for her. There were times
          I would simply say: Please check on my mum. And he would.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> Even before
          we officially became a couple, I was already becoming part of her
          world.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> And that’s
          one of the things I love about him. He’s resourceful. He’s always
          willing to help. He loves doing things for people. Sometimes he helps
          so much that I almost become handicapped. But it’s one of the things I
          know I would really miss if he wasn’t around.
        </p>
      </>
    ),
    images: [{ src: "/story/couples.jpg", alt: "Esther and Jerry through the years" }],
  },
  {
    title: "The proposal she somehow saw coming",
    content: (
      <>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> Then came
          the proposal.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> Well, I
          knew it was coming.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> I wasn’t
          exactly subtle.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> I knew he
          was going to propose on my birthday. I knew. But somehow, knowing
          didn’t make it any less special. Because REKs had prepared something I
          didn’t expect.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> I reached out
          to the people Praise loved. Her mum. My mum. Her siblings. Her
          friends. The people who mattered to her. And I asked them to record
          messages for her. Then I put everything together into a video.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> And that
          was the highlight for me. Seeing all the people I love appear on the
          screen was so special. It wasn’t just REKs asking me to marry him. It
          felt like seeing the people and relationships that had helped shape us
          becoming part of the moment too.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> There were
          pictures. Friends. Laughter. A birthday. A proposal.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> And even
          though I already knew where things were heading It was still
          beautiful. Very beautiful.
        </p>
      </>
    ),
    images: [{ src: "/story/9.jpg", alt: "Esther and Jerry through the years" }],
  },
  {
    title: "And here we are",
    content: (
      <>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> When we look
          back now, we laugh at how ordinary the beginning of our story was—a
          guy in the media unit, a girl in protocol, a few greetings, a church
          office, and an Ecobank account.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> Then came a
          missed first date, a wedding, a camera, a few photographs, and a phone
          that almost fell.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> There were
          late-night calls and exams.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> Friendship
          became feelings.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> A couple’s
          handshake became a dinner. Difficult conversations became lessons. And
          through it all, there was a lot of prayer.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise & REKs:</span> And
          somewhere between all those ordinary moments, something extraordinary
          happened. We found each other.
        </p>
      </>
    ),
    images: [{ src: "/story/1.jpg", alt: "Esther and Jerry through the years" }],
  },
  {
    title: "Why we choose each other",
    content: (
      <>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> I love that
          Praise knows what she wants. She listens. She loves people deeply. And
          she isn’t afraid to challenge me to grow.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> I love that
          REKs is resourceful. Attentive. A people person. And yes, very
          good-looking. Especially when he’s walking around with his camera.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> That part
          made it into the wedding story?
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> Absolutely...
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> I love that
          he listens. That he shows up. That he takes me seriously. That he
          listens to people who matter to him. And that he listens to God.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> And I love
          that she challenges me to become better. Not because she expects
          perfection. But because she believes in who I can become.
        </p>
      </>
    ),
    images: [{ src: "/story/5.jpg", alt: "Esther and Jerry through the years" }],
  },
  {
    title: "Our favourite chapter is just beginning",
    content: (
      <>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> We
          don&apos;t believe we&apos;re perfect, and we certainly don&apos;t
          have all the answers.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> But
          we&apos;ve learned that love isn&apos;t just finding someone you can
          live with.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> It&apos;s
          finding someone you&apos;re willing to keep choosing.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> When
          it&apos;s easy.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> When
          it&apos;s difficult.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> When we
          agree.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> And when we
          don&apos;t.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> We&apos;re
          stepping into marriage with our eyes open.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> And our
          hearts full.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> And our hands
          held together.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> We may not
          have had perfect examples, but we have a reference: God and His Word.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">REKs:</span> We have
          people we trust.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise:</span> And we have
          each other.
        </p>
        <p className="mb-4">
          <span className="font-medium text-[#550303]">Praise & REKs:</span> So,
          this isn&apos;t the end of our love story. It&apos;s the beginning of
          our favorite chapter. We choose to grow together, build together,
          laugh together, pray together, and keep choosing each other by the
          grace of God, forever.
        </p>
      </>
    ),
    images: [{ src: "/story/4.jpg", alt: "Lovers" }],
  },
];

export default function OurStoryPage() {
  const [progress, setProgress] = useState(0);
  const timelineRef = useRef<HTMLElement>(null);

  // 1st, 3rd, 4th, 6th, 8th, 9th, 10th, 11th sections → centered
  const centeredIndexes = new Set([0, 2, 3, 5, 7, 8, 9, 10]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionHeight = timelineRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const start = sectionTop - windowHeight * 0.2;
      const end = sectionTop + sectionHeight - windowHeight * 0.8;

      const raw = (window.scrollY - start) / (end - start);
      const clamped = Math.min(Math.max(raw, 0), 1);

      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#F9F6F1] text-stone-800">
      <SiteNav />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-stone-200/60">
        <div
          className="h-full bg-[#550303] transition-all duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#F9F6F1] py-24 lg:py-24">
        <div className="pointer-events-none absolute left-6 top-24 h-16 w-16 border-l-2 border-t-2 border-[#550303]/25" />
        <div className="pointer-events-none absolute bottom-6 right-6 h-16 w-16 border-b-2 border-r-2 border-[#550303]/25" />

        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
          <div className="relative w-full max-w-sm shrink-0 lg:max-w-md">
            <div className="relative rotate-[-1.5deg] border-[2px] border-[#550303] bg-white p-3">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/story/8.jpg"
                  alt="The proposal"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 28rem"
                />
              </div>
              <div className="mt-2 h-1" />
            </div>
          </div>

          <div className="max-w-xl text-center lg:text-left">
            <p className="sf-pro mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#550303]/80">
              Our Story
            </p>
            <h1 className="cinzel text-3xl leading-tight text-stone-900 sm:text-4xl lg:text-5xl xl:text-6xl">
              How we found our way
              <br />
              to forever
            </h1>
            <p className="sf-pro mt-8 max-w-lg text-base leading-relaxed text-stone-600 sm:text-lg">
              Some love stories begin with a grand introduction. Ours began
              rather quietly with a church office, a few passing greetings, a
              camera, and, of all things, an Ecobank account.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          TIMELINE
      ====================================================== */}
      <section ref={timelineRef} className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-4xl space-y-28 px-4 sm:px-6 lg:space-y-36 lg:px-8">
          {timeline.map((item, idx) => {
            const isCentered = centeredIndexes.has(idx);

            return (
              <article key={idx} className="relative">
                 <div className="relative">
                  {/* Letter body */}
                  <div className="relative overflow-hidden">
                    <Image
                      src="/story/parchment.jpg"
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 56rem"
                      priority={idx < 2}
                    />

                    <div className="absolute inset-0 bg-[#f8f1e3]/50" />

                    {/* Text padding: less right padding when photo is centered */}
                    <div
                      className={`relative z-10 px-6 pb-48 pt-10 sm:px-10 sm:pb-52 sm:pt-12 lg:px-14 lg:pb-56 lg:pt-14 ${
                        isCentered ? "lg:pr-14" : "lg:pr-72"
                      }`}
                    >
                      <h2 className="cinzel mb-8 text-center text-2xl text-[#3d2b1f] sm:text-3xl lg:text-4xl">
                        {item.title}
                      </h2>

                      <div className="sf-pro w-full max-w-2xl mx-auto space-y-1 text-[15px] leading-relaxed text-[#3d2b1f] sm:text-base sm:leading-7 lg:text-left">
                        {item.content}
                      </div>
                    </div>
                  </div>

                  {/* Pinned photo */}
                  <div
                    className={`absolute z-20 w-[180px] sm:w-[200px] lg:w-[220px] ${
                      isCentered
                        ? // Centered + same bottom offset
                          "left-1/2 -translate-x-1/2 -bottom-10 sm:-bottom-12 lg:-bottom-14"
                        : // Right aligned
                          "-bottom-10 -right-6 sm:-bottom-12 sm:-right-8 lg:-bottom-14 lg:-right-10"
                    }`}
                  >
                    {/* Tape */}
                    <div className="absolute -top-3 left-1/2 z-30 h-5 w-12 -translate-x-1/2 rotate-[-6deg] rounded-[2px] bg-[#c9b896]" />

                    <div
                      className="relative rotate-[4deg] border-[3px] border-[#550303] bg-[#f8f1e3] p-1.5"
                      style={{
                        boxShadow:
                          "4px 8px 20px rgba(85, 3, 3, 0.3), 0 2px 6px rgba(0,0,0,0.15)",
                      }}
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <Image
                          src={item.images[0].src}
                          alt={item.images[0].alt}
                          fill
                          className="object-cover"
                          sizes="220px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-stone-200/60 bg-white/50">
        <div className="mx-auto max-w-3xl px-6 py-16 text-left lg:px-8 lg:py-16">
          <p className="cinzel text-2xl italic text-stone-900 sm:text-3xl">
            "We found love in the ordinary, grace in the journey, and forever in each other. 
            Now, with God at the centre, we begin the rest of our story.
          </p>
          <p className="mt-8 text-sm uppercase tracking-[0.2em] text-[#550303]">
            October 24, 2026 · PR Fusion.
          </p>
        </div>
      </section>
    </main>
  );
}