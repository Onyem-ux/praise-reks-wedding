"use client";

import React from "react";
import SiteNav from "@/components/SiteNav";

/*

* ============================================================
* GALLERY IMAGES
* ============================================================
*
* Add/remove image filenames here.
*
* Every image in this array automatically becomes ONE
* bento card in the gallery.
*
* 28 images = 28 cards
* 40 images = 40 cards
* 100 images = 100 cards
*
* Make sure the filenames match the files inside /public.
* ============================================================
  */

const galleryImages = [
// 01
"/gallery/1.jpg",

// 02
"/gallery/(1).jpg",

// 03
"/gallery/2.jpg",

// 04
"/gallery/2(1).jpg",

// 05
"/gallery/4.jpg",

// 06
"/gallery/6(1).jpg",

// 07
"/gallery/6(2).jpg",

// 08
"/gallery/6(3).jpg",

// 09
"/gallery/6(4).jpg",

// 10
"/gallery/8(1).jpg",

// 11
"/gallery/8(2).jpg",

// 12
"/gallery/8(3).jpg",

// 13
"/gallery/9th.jpg",

// 14
"/gallery/10(1).jpg",

// 15
"/gallery/10(2).jpg",

// 16
"/gallery/10(3).jpg",

// 17
"/gallery/10(4).jpg",

// 18
"/gallery/10(5).jpg",

// 19
"/gallery/10(6).jpg",

// 20
"/gallery/10(7).jpg",

// 21
"/gallery/11.jpg",

// 22
"/gallery/11th.jpg",

// 23
"/gallery/12(1).jpg",

// 24
"/gallery/12(2).jpg",

// 25
"/gallery/12(3).jpg",

// 26
"/gallery/12(4).jpg",

// 27
"/gallery/12(5).jpg",

// 28
"/gallery/12.jpg",
];

export default function LoveGalleryPage() {
return ( <main className="gallery-page"> <SiteNav />

```
  {/* =====================================================
      PAGE HEADER
  ===================================================== */}

  <section className="gallery-header">
    <div className="gallery-header-inner">

      <div className="gallery-heading">

        <span className="gallery-eyebrow">
          PRAISE & REKS / Gallery
        </span>

        <h1 className="gallery-title">
          Our love, in pictures
        </h1>

      </div>

      <div className="gallery-intro">

        <p className="gallery-intro-copy">
          Welcome to our gallery. Let's take through the journey from how it started, and show you how it's going!
        </p>

      </div>

    </div>

    <div className="gallery-header-line" />
  </section>


  {/* =====================================================
      GALLERY WALL
  ===================================================== */}

  <section className="gallery-wall">

    <div className="gallery-wall-inner">

      {/* =================================================
          LEFT EDITORIAL

          This is deliberately separated from the
          gallery grid so sticky positioning works
          reliably.
      ================================================= */}

      <aside className="gallery-editorial">

        <div className="gallery-editorial-sticky">

          <span className="gallery-wall-eyebrow">
            our Wall
          </span>

          <h2 className="gallery-wall-title">
            "A picture is worth a thousand words", so we're saying 28,000
            <br />

          
          </h2>

        </div>

      </aside>


      {/* =================================================
          RIGHT BENTO GALLERY
      ================================================= */}

      <div className="gallery-bento">

        {galleryImages.map((image, index) => (

          <div
            key={`${image}-${index}`}
            className="gallery-item"
          >

            <img
              src={image}
              alt={`Praise and Reks — Frame ${index + 1}`}
              className="gallery-image"
              draggable={false}
            />

            <span className="gallery-caption">
              {String(index + 1).padStart(2, "0")}
            </span>

          </div>

        ))}

      </div>

    </div>

  </section>


  {/* =====================================================
      STYLES
  ===================================================== */}

  <style>{`

    /* =====================================================
       PAGE
    ===================================================== */

    .gallery-page {
      width: 100%;
      min-height: 100vh;

      background: #f8f8f8;

      color: #1a1a1a;
    }


    /* =====================================================
       HEADER
    ===================================================== */

    .gallery-header {
      width: 100%;

      padding:
        170px 96px 0;
    }

    .gallery-header-inner {
      width: 100%;
      max-width: 1100px;

      margin: 0 auto;

      display: grid;

      grid-template-columns:
        0.9fr 1.1fr;

      gap: 120px;

      align-items: end;
    }


    /* =====================================================
       LEFT HEADER
    ===================================================== */

    .gallery-heading {
      display: flex;

      flex-direction: column;

      align-items: flex-start;
    }

    .gallery-eyebrow {
      display: block;

      margin-bottom: 22px;

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

    .gallery-title {
      margin: 0;

      font-family: "Cinzel", serif;

      font-size:
        clamp(
          4.5rem,
          8vw,
          7rem
        );

      line-height: 0.9;

      font-weight: 600;

      letter-spacing: -0.035em;

      color: #1a1a1a;
    }


    /* =====================================================
       HEADER INTRO
    ===================================================== */

    .gallery-intro {
      width: 100%;

      padding-bottom: 8px;
    }

    .gallery-intro-copy {
      max-width: 720px;

      margin: 0 0 28px;

      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "SF Pro Text",
        "SF Pro Display",
        "Helvetica Neue",
        Arial,
        sans-serif;

      font-size: 1rem;

      line-height: 1.7;

      color: #4a4a4a;
    }

    .gallery-meta {
      width: 100%;

      display: grid;

      grid-template-columns:
        repeat(3, 1fr);

      border-top:
        1px solid
        rgba(85, 3, 3, 0.25);

      border-bottom:
        1px solid
        rgba(85, 3, 3, 0.25);
    }

    .gallery-meta span {
      padding:
        17px 0;

      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "SF Pro Text",
        "SF Pro Display",
        "Helvetica Neue",
        Arial,
        sans-serif;

      font-size: 0.67rem;

      font-weight: 500;

      letter-spacing: 0.22em;

      text-transform: uppercase;

      color: #550303;
    }

    .gallery-meta span:nth-child(2) {
      text-align: center;
    }

    .gallery-meta span:nth-child(3) {
      text-align: right;
    }


    /* =====================================================
       HEADER DIVIDER
    ===================================================== */

    .gallery-header-line {
      width: 100%;

      max-width: 1100px;

      margin:
        64px auto 0;

      border-bottom:
        1px solid #550303;
    }


    /* =====================================================
       GALLERY WALL
    ===================================================== */

    .gallery-wall {
      width: 100%;

      padding:
        110px 96px 140px;
    }

    .gallery-wall-inner {
      width: 100%;

      max-width: 1100px;

      margin: 0 auto;

      display: grid;

      grid-template-columns:
        0.72fr 1.8fr;

      gap: 70px;

      align-items: start;
    }


    /* =====================================================
       LEFT EDITORIAL COLUMN

       The ASIDE itself does not scroll independently.

       The inner element is sticky relative to the
       document scroll.

       ONLY this editorial section is sticky.
    ===================================================== */

    .gallery-editorial {
      align-self: stretch;

      min-width: 0;
    }

    .gallery-editorial-sticky {
      position: sticky;

      top: 120px;

      align-self: start;

      padding-top: 4px;
    }

    .gallery-wall-eyebrow {
      display: block;

      margin-bottom: 28px;

      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "SF Pro Text",
        "SF Pro Display",
        "Helvetica Neue",
        Arial,
        sans-serif;

      font-size: 0.72rem;

      font-weight: 600;

      letter-spacing: 0.3em;

      text-transform: uppercase;

      color: #550303;
    }

    .gallery-wall-title {
      margin: 0;

      font-family: "Cinzel", serif;

      font-size:
        clamp(
          2.5rem,
          4.3vw,
          4rem
        );

      line-height: 1.08;

      font-weight: 600;

      letter-spacing: -0.025em;

      color: #1a1a1a;
    }


    /* =====================================================
       BENTO GRID

       Four columns.

       Cards NEVER overlap.

       Each card remains in the normal CSS grid flow.

       Different cards span different numbers of columns
       and rows, creating a genuine bento composition.
    ===================================================== */

    .gallery-bento {
      width: 100%;

      display: grid;

      grid-template-columns:
        repeat(4, minmax(0, 1fr));

      grid-auto-rows:
        105px;

      gap: 20px;

      grid-auto-flow: dense;

      align-items: start;

      overflow: visible;
    }


    /* =====================================================
       BENTO CARD SIZES

       All cards remain portrait.

       Larger cards span more columns AND more rows,
       preserving the portrait proportion.

       Nothing is positioned manually, so nothing
       overlaps.
    ===================================================== */

    .gallery-item {
      position: relative;

      overflow: hidden;

      min-width: 0;
      min-height: 0;

      aspect-ratio: 3 / 4;

      border-radius: 14px;

      border:
        1px solid
        rgba(255, 255, 255, 0.9);

      background: #ddd;

      box-shadow:
        0 8px 20px
        rgba(0, 0, 0, 0.12);

      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
    }


    /* =====================================================
       DESKTOP BENTO PATTERN

       The composition changes throughout the gallery
       instead of repeating identical rows.

       Because the cards are grid items, they cannot
       overlap one another.
    ===================================================== */

    .gallery-item:nth-child(1) {
      grid-column: span 2;
      grid-row: span 2;
    }

    .gallery-item:nth-child(2) {
      grid-column: span 1;
      grid-row: span 1;
    }

    .gallery-item:nth-child(3) {
      grid-column: span 1;
      grid-row: span 2;
    }

    .gallery-item:nth-child(4) {
      grid-column: span 1;
      grid-row: span 1;
    }

    .gallery-item:nth-child(5) {
      grid-column: span 1;
      grid-row: span 2;
    }

    .gallery-item:nth-child(6) {
      grid-column: span 2;
      grid-row: span 2;
    }

    .gallery-item:nth-child(7) {
      grid-column: span 1;
      grid-row: span 1;
    }

    .gallery-item:nth-child(8) {
      grid-column: span 1;
      grid-row: span 2;
    }

    .gallery-item:nth-child(9) {
      grid-column: span 2;
      grid-row: span 2;
    }

    .gallery-item:nth-child(10) {
      grid-column: span 1;
      grid-row: span 1;
    }

    .gallery-item:nth-child(11) {
      grid-column: span 1;
      grid-row: span 2;
    }

    .gallery-item:nth-child(12) {
      grid-column: span 1;
      grid-row: span 1;
    }

    .gallery-item:nth-child(13) {
      grid-column: span 2;
      grid-row: span 2;
    }

    .gallery-item:nth-child(14) {
      grid-column: span 1;
      grid-row: span 1;
    }

    .gallery-item:nth-child(15) {
      grid-column: span 1;
      grid-row: span 2;
    }

    .gallery-item:nth-child(16) {
      grid-column: span 2;
      grid-row: span 2;
    }

    .gallery-item:nth-child(17) {
      grid-column: span 1;
      grid-row: span 1;
    }

    .gallery-item:nth-child(18) {
      grid-column: span 1;
      grid-row: span 2;
    }

    .gallery-item:nth-child(19) {
      grid-column: span 2;
      grid-row: span 2;
    }

    .gallery-item:nth-child(20) {
      grid-column: span 1;
      grid-row: span 1;
    }

    .gallery-item:nth-child(21) {
      grid-column: span 1;
      grid-row: span 2;
    }

    .gallery-item:nth-child(22) {
      grid-column: span 1;
      grid-row: span 1;
    }

    .gallery-item:nth-child(23) {
      grid-column: span 2;
      grid-row: span 2;
    }

    .gallery-item:nth-child(24) {
      grid-column: span 1;
      grid-row: span 1;
    }

    .gallery-item:nth-child(25) {
      grid-column: span 1;
      grid-row: span 2;
    }

    .gallery-item:nth-child(26) {
      grid-column: span 2;
      grid-row: span 2;
    }

    .gallery-item:nth-child(27) {
      grid-column: span 1;
      grid-row: span 1;
    }

    .gallery-item:nth-child(28) {
      grid-column: span 1;
      grid-row: span 2;
    }


    /* =====================================================
       IMAGES
    ===================================================== */

    .gallery-image {
      width: 100%;
      height: 100%;

      display: block;

      object-fit: cover;

      object-position: center;

      user-select: none;

      -webkit-user-drag: none;
    }


    /* =====================================================
       ROTATION
    ===================================================== */

    .gallery-item:nth-child(4n + 1) {
      transform: rotate(-0.55deg);
    }

    .gallery-item:nth-child(4n + 2) {
      transform: rotate(0.4deg);
    }

    .gallery-item:nth-child(4n + 3) {
      transform: rotate(-0.3deg);
    }

    .gallery-item:nth-child(4n) {
      transform: rotate(0.5deg);
    }


    /* =====================================================
       IMAGE OVERLAY
    ===================================================== */

    .gallery-item::before {
      content: "";

      position: absolute;

      inset: 0;

      z-index: 1;

      background:
        linear-gradient(
          to top,
          rgba(0, 0, 0, 0.48),
          transparent 55%
        );

      pointer-events: none;
    }


    /* =====================================================
       FRAME NUMBER
    ===================================================== */

    .gallery-caption {
      position: absolute;

      left: 14px;
      bottom: 14px;

      z-index: 2;

      min-width: 38px;
      height: 28px;

      padding:
        0 10px;

      display: flex;

      align-items: center;
      justify-content: center;

      border-radius: 999px;

      background:
        rgba(255, 255, 255, 0.92);

      color: #550303;

      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "SF Pro Text",
        "SF Pro Display",
        "Helvetica Neue",
        Arial,
        sans-serif;

      font-size: 0.65rem;

      font-weight: 600;

      letter-spacing: 0.12em;
    }


    /* =====================================================
       HOVER
    ===================================================== */

    @media (hover: hover) and (pointer: fine) {

      .gallery-item:hover {
        transform:
          translateY(-4px)
          scale(1.015);

        box-shadow:
          0 0 0 3px #550303,
          0 12px 26px
          rgba(85, 3, 3, 0.35);

        z-index: 5;
      }

    }


    /* =====================================================
       TABLET
    ===================================================== */

    @media (max-width: 1100px) {

      .gallery-header {
        padding:
          150px 56px 0;
      }

      .gallery-wall {
        padding:
          100px 56px 120px;
      }

      .gallery-header-inner {
        gap: 70px;
      }

      .gallery-wall-inner {
        gap: 50px;
      }

      .gallery-bento {
        grid-template-columns:
          repeat(3, minmax(0, 1fr));

        grid-auto-rows:
          110px;

        gap: 18px;
      }


      /* Reset the desktop pattern */

      .gallery-item:nth-child(n) {
        grid-column: span 1;
        grid-row: span 1;
      }


      /* New 3-column bento rhythm */

      .gallery-item:nth-child(1),
      .gallery-item:nth-child(6),
      .gallery-item:nth-child(11),
      .gallery-item:nth-child(16),
      .gallery-item:nth-child(21),
      .gallery-item:nth-child(26) {
        grid-column: span 2;
        grid-row: span 2;
      }

      .gallery-item:nth-child(3),
      .gallery-item:nth-child(8),
      .gallery-item:nth-child(13),
      .gallery-item:nth-child(18),
      .gallery-item:nth-child(23),
      .gallery-item:nth-child(28) {
        grid-row: span 2;
      }

    }


    /* =====================================================
       MOBILE
    ===================================================== */

    @media (max-width: 900px) {

      .gallery-header {
        padding:
          130px 28px 0;
      }

      .gallery-header-inner {
        display: flex;

        flex-direction: column;

        align-items: flex-start;

        gap: 48px;
      }

      .gallery-title {
        font-size:
          clamp(
            4rem,
            18vw,
            6rem
          );
      }

      .gallery-intro {
        padding-bottom: 0;
      }

      .gallery-intro-copy {
        max-width: 500px;
      }

      .gallery-meta {
        grid-template-columns:
          repeat(3, 1fr);
      }

      .gallery-meta span {
        font-size: 0.58rem;

        letter-spacing: 0.14em;
      }

      .gallery-header-line {
        margin-top: 48px;
      }


      /* ===============================================
         MOBILE WALL
      =============================================== */

      .gallery-wall {
        padding:
          80px 28px 100px;
      }

      .gallery-wall-inner {
        display: flex;

        flex-direction: column;

        gap: 48px;
      }


      /* ===============================================
         MOBILE EDITORIAL

         Sticky is intentionally disabled.
      =============================================== */

      .gallery-editorial {
        width: 100%;
      }

      .gallery-editorial-sticky {
        position: relative;

        top: auto;

        padding-top: 0;
      }

      .gallery-wall-eyebrow {
        margin-bottom: 18px;
      }

      .gallery-wall-title {
        font-size:
          clamp(
            2.5rem,
            10vw,
            4rem
          );
      }


      /* ===============================================
         MOBILE BENTO

         Two columns.

         All cards are portrait.

         No overlap.
      =============================================== */

      .gallery-bento {
        width: 100%;

        grid-template-columns:
          repeat(2, minmax(0, 1fr));

        grid-auto-rows:
          auto;

        gap: 14px;

        align-items: start;
      }


      .gallery-item:nth-child(n) {
        grid-column: span 1;

        grid-row: span 1;

        aspect-ratio: 3 / 4;

        transform: none;
      }


      /* Occasional wider portrait card */

      .gallery-item:nth-child(5),
      .gallery-item:nth-child(13),
      .gallery-item:nth-child(21) {
        grid-column: span 2;

        aspect-ratio: 3 / 4;
      }


      .gallery-caption {
        left: 10px;
        bottom: 10px;

        min-width: 34px;
        height: 25px;

        font-size: 0.58rem;
      }

    }


    /* =====================================================
       SMALL PHONES
    ===================================================== */

    @media (max-width: 480px) {

      .gallery-header {
        padding:
          120px 22px 0;
      }

      .gallery-header-inner {
        gap: 40px;
      }

      .gallery-eyebrow {
        font-size: 0.62rem;

        letter-spacing: 0.23em;
      }

      .gallery-title {
        font-size:
          clamp(
            3.8rem,
            19vw,
            5rem
          );
      }

      .gallery-intro-copy {
        font-size: 0.92rem;
      }

      .gallery-meta {
        display: flex;

        justify-content: space-between;

        gap: 10px;
      }

      .gallery-meta span {
        font-size: 0.53rem;

        letter-spacing: 0.1em;
      }

      .gallery-meta span:nth-child(2),
      .gallery-meta span:nth-child(3) {
        text-align: left;
      }

      .gallery-wall {
        padding:
          70px 22px 90px;
      }


      /* ===============================================
         SMALL PHONE BENTO
      =============================================== */

      .gallery-bento {
        grid-template-columns:
          repeat(2, minmax(0, 1fr));

        gap: 12px;
      }


      .gallery-item:nth-child(5),
      .gallery-item:nth-child(13),
      .gallery-item:nth-child(21) {
        grid-column: span 2;
      }


      .gallery-wall-title {
        font-size: 2.4rem;
      }

    }


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    @media (prefers-reduced-motion: reduce) {

      .gallery-item {
        transition: none;
      }

    }

  `}</style>
</main>

);
}
