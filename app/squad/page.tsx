"use client";

import React from "react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";

interface SquadMember {
name: string;
role: string;
image: string;
}

const bridesmaids: SquadMember[] = [
{
name: "Flourish",
role: "Bridesmaid",
image: "/Flourish.png",
},
{
name: "Miracle",
role: "Bridesmaid",
image: "/Miracle.png",
},
{
name: "Lolia",
role: "Bridesmaid",
image: "/Lolia.png",
},
{
name: "Osione",
role: "Bridesmaid",
image: "/Osione.png",
},
{
name: "Ofure",
role: "Bridesmaid",
image: "/Ofure.png",
},
{
name: "Offiong",
role: "Bridesmaid",
image: "/Offiong.png",
},
{
name: "Jophine",
role: "Bridesmaid",
image: "/Jophine.png",
},
{
name: "Favour",
role: "Bridesmaid",
image: "/Favour.png",
},
{
name: "Bimbo",
role: "Bridesmaid",
image: "/Bimbo.png",
},
];

const groomsmen: SquadMember[] = [
{
name: "Miju",
role: "Groomsman",
image: "/Miju.png",
},
{
name: "Maurice",
role: "Groomsman",
image: "/Maurice.png",
},
{
name: "Godspeed",
role: "Groomsman",
image: "/Godspeed.png",
},
{
name: "Evaristus",
role: "Groomsman",
image: "/Evaristus.png",
},
{
name: "Ghekpezi",
role: "Groomsman",
image: "/Ghekpezi.png",
},
{
name: "Honour",
role: "Groomsman",
image: "/Honour.png",
},
{
name: "Bassey",
role: "Groomsman",
image: "/Bassey.png",
},
{
name: "Goodness",
role: "Groomsman",
image: "/Goodness.png",
},
];

function SquadCard({ person }: { person: SquadMember }) {
return ( <article className="squad-card"> <div className="squad-photo"> <img
       src={person.image}
       alt={person.name}
       loading="lazy"
       decoding="async"
     />

    <div className="squad-photo-overlay" />
  </div>

  <div className="squad-card-info">
    <h3 className="squad-name">{person.name}</h3>
    <p className="squad-role">{person.role}</p>
  </div>
</article>


);
}

function SquadGroup({
title,
members,
}: {
title: string;
members: SquadMember[];
}) {
return ( <section className="squad-group"> <div className="squad-group-header"> <span className="squad-group-line" />

    <h2 className="squad-group-title">{title}</h2>

    <span className="squad-group-line" />
  </div>

  <div className="squad-grid">
    {members.map((person) => (
      <SquadCard
        key={person.name}
        person={person}
      />
    ))}
  </div>
</section>

);
}

export default function SquadPage() {
return ( <main className="page-shell"> <SiteNav />

```
  {/* =====================================================
      HERO
  ===================================================== */}

  <header className="page-hero">
    <span className="page-eyebrow">
      The squad
    </span>

    <h1 className="page-title">
      Meet our squad
    </h1>

    <p className="page-subtitle">
      We’re surrounded by so many amazing friends 
      and loved ones, each playing a special part in 
      our journey. On our wedding day, we’re honoured 
      to have a few of them standing by our side as 
      part of our wedding train.
    </p>
  </header>

  {/* =====================================================
      SQUAD
  ===================================================== */}

  <section className="squad-section">
    <div className="squad-section-inner">

      <SquadGroup
        title="Bridesmaids"
        members={bridesmaids}
      />

      <div className="squad-divider" />

      <SquadGroup
        title="Groomsmen"
        members={groomsmen}
      />

    </div>
  </section>

  {/* =====================================================
      FOOTER MESSAGE
  ===================================================== */}

  <section className="squad-footer">
    <span className="squad-footer-eyebrow">
      With us, always
    </span>

    <p className="squad-footer-text">
      Some people don't just witness the story.
      They become part of it.
    </p>
  </section>

  <style>{`

    /* =====================================================
       PAGE
    ===================================================== */

    .page-shell {
      position: relative;
      min-height: 100vh;
      width: 100%;

      background: #f8f8f8;

      color: #1a1a1a;
    }


    /* =====================================================
       HERO
    ===================================================== */

    .page-hero {
      width: 100%;

      padding:
        170px 24px 90px;

      display: flex;
      flex-direction: column;
      align-items: center;

      text-align: center;
    }

    .page-eyebrow {
      display: block;

      margin-bottom: 18px;

      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "SF Pro Text",
        "SF Pro Display",
        "Helvetica Neue",
        Arial,
        sans-serif;

      font-size: 0.72rem;

      font-weight: 500;

      letter-spacing: 0.3em;

      text-transform: uppercase;

      color: #550303;
    }

    .page-title {
      margin: 0;

      font-family: "Cinzel", serif;

      font-size:
        clamp(
          3.2rem,
          7vw,
          5.5rem
        );

      line-height: 1;

      font-weight: 400;

      letter-spacing: 0.02em;

      color: #1a1a1a;
    }

    .page-subtitle {
      max-width: 520px;

      margin:
        28px 0 0;

      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "SF Pro Text",
        "SF Pro Display",
        "Helvetica Neue",
        Arial,
        sans-serif;

      font-size: 0.95rem;

      line-height: 1.75;

      color: #5b5b5b;
    }


    /* =====================================================
       SQUAD SECTION
    ===================================================== */

    .squad-section {
      width: 100%;

      padding:
        0 48px 130px;
    }

    .squad-section-inner {
      width: 100%;

      max-width: 1100px;

      margin: 0 auto;
    }


    /* =====================================================
       GROUP
    ===================================================== */

    .squad-group {
      width: 100%;
    }

    .squad-group-header {
      display: flex;

      align-items: center;

      gap: 22px;

      margin-bottom: 42px;
    }

    .squad-group-line {
      flex: 1;

      height: 1px;

      background: #550303;

      opacity: 0.5;
    }

    .squad-group-title {
      margin: 0;

      font-family: "Cinzel", serif;

      font-size: 1rem;

      font-weight: 600;

      letter-spacing: 0.18em;

      text-transform: uppercase;

      color: #550303;

      white-space: nowrap;
    }


    /* =====================================================
       GRID
    ===================================================== */

    /*
     * Desktop deliberately uses THREE cards per row.
     *
     * This is different from the homepage carousel,
     * which is horizontally sliding.
     *
     * The dedicated Squad page is a static editorial grid.
     */

    .squad-grid {
      display: grid;

      grid-template-columns:
        repeat(3, minmax(0, 1fr));

      column-gap: 20px;

      row-gap: 54px;
    }


    /* =====================================================
       CARD
    ===================================================== */

    .squad-card {
      min-width: 0;

      display: flex;

      flex-direction: column;

      align-items: flex-start;

      text-align: left;
    }

    .squad-photo {
      position: relative;

      width: 100%;

      aspect-ratio: 3 / 4;

      overflow: hidden;

      border-radius: 16px;

      background: #e2ded7;

      isolation: isolate;
    }

    .squad-photo img {
      display: block;

      width: 100%;
      height: 100%;

      object-fit: cover;

      object-position: center;

      transition:
        transform 0.65s
        cubic-bezier(0.22, 1, 0.36, 1);
    }

    .squad-photo-overlay {
      position: absolute;

      inset: 0;

      background:
        linear-gradient(
          to top,
          rgba(0, 0, 0, 0.16),
          transparent 45%
        );

      opacity: 0;

      transition:
        opacity 0.4s ease;

      pointer-events: none;
    }


    /* =====================================================
       CARD INFORMATION
    ===================================================== */

    .squad-card-info {
      padding:
        16px 4px 0;
    }

    .squad-name {
      margin: 0;

      font-family: "Cinzel", serif;

      font-size: 1rem;

      font-weight: 600;

      line-height: 1.3;

      letter-spacing: 0.01em;

      color: #1a1a1a;
    }

    .squad-role {
      margin: 5px 0 0;

      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "SF Pro Text",
        "SF Pro Display",
        "Helvetica Neue",
        Arial,
        sans-serif;

      font-size: 0.72rem;

      line-height: 1.4;

      letter-spacing: 0.1em;

      text-transform: uppercase;

      color: #8a8a8a;
    }


    /* =====================================================
       HOVER
    ===================================================== */

    @media (hover: hover) and (pointer: fine) {

      .squad-card:hover .squad-photo img {
        transform: scale(1.035);
      }

      .squad-card:hover .squad-photo-overlay {
        opacity: 1;
      }

    }


    /* =====================================================
       DIVIDER
    ===================================================== */

    .squad-divider {
      width: 100%;

      height: 1px;

      margin:
        100px 0;

      background: #550303;

      opacity: 0.25;
    }


    /* =====================================================
       FOOTER
    ===================================================== */

    .squad-footer {
      width: 100%;

      padding:
        100px 24px 130px;

      border-top:
        1px solid rgba(85, 3, 3, 0.25);

      text-align: center;

      background: #f0f0f0;
    }

    .squad-footer-eyebrow {
      display: block;

      margin-bottom: 20px;

      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "SF Pro Text",
        "SF Pro Display",
        "Helvetica Neue",
        Arial,
        sans-serif;

      font-size: 0.7rem;

      letter-spacing: 0.28em;

      text-transform: uppercase;

      color: #550303;
    }

    .squad-footer-text {
      max-width: 600px;

      margin: 0 auto;

      font-family: "Cinzel", serif;

      font-size:
        clamp(
          1.5rem,
          3vw,
          2.3rem
        );

      line-height: 1.4;

      font-weight: 500;

      color: #1a1a1a;
    }


    /* =====================================================
       TABLET
    ===================================================== */

    @media (max-width: 900px) {

      .page-hero {
        padding:
          140px 24px 70px;
      }

      .squad-section {
        padding:
          0 32px 100px;
      }

      .squad-grid {
        grid-template-columns:
          repeat(3, minmax(0, 1fr));

        column-gap: 14px;

        row-gap: 44px;
      }

      .squad-group-header {
        margin-bottom: 32px;
      }

      .squad-divider {
        margin:
          80px 0;
      }

    }


    /* =====================================================
       MOBILE
    ===================================================== */

    @media (max-width: 600px) {

      .page-hero {
        padding:
          125px 24px 60px;
      }

      .page-eyebrow {
        font-size: 0.65rem;

        letter-spacing: 0.24em;
      }

      .page-title {
        font-size:
          clamp(
            3rem,
            16vw,
            4rem
          );
      }

      .page-subtitle {
        margin-top: 22px;

        font-size: 0.88rem;

        line-height: 1.7;
      }


      .squad-section {
        padding:
          0 20px 80px;
      }


      .squad-group-header {
        gap: 14px;

        margin-bottom: 28px;
      }

      .squad-group-title {
        font-size: 0.75rem;

        letter-spacing: 0.14em;
      }


      /*
       * Two cards per row on mobile.
       *
       * This keeps the page compact while retaining
       * the same portrait proportions as the homepage.
       */

      .squad-grid {
        grid-template-columns:
          repeat(2, minmax(0, 1fr));

        column-gap: 12px;

        row-gap: 34px;
      }


      .squad-photo {
        border-radius: 12px;
      }

      .squad-card-info {
        padding:
          12px 2px 0;
      }

      .squad-name {
        font-size: 0.82rem;
      }

      .squad-role {
        margin-top: 4px;

        font-size: 0.58rem;

        letter-spacing: 0.08em;
      }


      .squad-divider {
        margin:
          64px 0;
      }


      .squad-footer {
        padding:
          80px 24px 100px;
      }

      .squad-footer-text {
        font-size:
          clamp(
            1.25rem,
            6vw,
            1.7rem
          );
      }

    }


    /* =====================================================
       SMALL PHONES
    ===================================================== */

    @media (max-width: 380px) {

      .squad-section {
        padding-left: 16px;
        padding-right: 16px;
      }

      .squad-grid {
        column-gap: 10px;
      }

      .squad-group-title {
        font-size: 0.68rem;
      }

      .squad-name {
        font-size: 0.76rem;
      }

      .squad-role {
        font-size: 0.54rem;
      }

    }


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    @media (prefers-reduced-motion: reduce) {

      .squad-photo img,
      .squad-photo-overlay {
        transition: none;
      }

    }

  `}</style>

  <Footer />
  
</main>

);
}
