"use client";

import React, { useEffect, useState } from "react";
import SiteNav from "@/components/SiteNav";

export default function InvitationPage() {
const [showInvitation, setShowInvitation] = useState(false);

useEffect(() => {
if (showInvitation) {
document.body.style.overflow = "hidden";
} else {
document.body.style.overflow = "";
}

return () => {
  document.body.style.overflow = "";
};

}, [showInvitation]);

return ( <main className="page-shell">

  {/* =====================================================
      PAGE CONTENT
  ===================================================== */}

  <div
    className={`page-content ${
      showInvitation ? "page-content-blurred" : ""
    }`}
  >
    <SiteNav />

    <section className="page-hero">

      <span className="page-eyebrow">
        You're Invited
      </span>

      <h1 className="page-title">
        Invitation
      </h1>

      <p className="page-subtitle">
        A day of love, laughter, family, and the beginning
        of our forever.
      </p>

      <button
        type="button"
        className="view-invitation-btn"
        onClick={() => setShowInvitation(true)}
      >
        View Invitation

        <span
          className="invitation-arrow"
          aria-hidden="true"
        >
          →
        </span>
      </button>

    </section>


    {/* =====================================================
        DECORATIVE CONTENT
    ===================================================== */}

    <section className="invitation-intro">

      <div className="intro-line" />

      <span className="intro-eyebrow">
        Praise &amp; Reks
      </span>

      <h2 className="intro-title">
        We would love to
        <br />
        celebrate with you.
      </h2>

      <p className="intro-copy">
        Join us as we gather with the people who mean the
        most to us to celebrate love, friendship, family,
        and the beautiful beginning of our forever.
      </p>

      <div className="intro-details">

        <div className="detail">
          <span className="detail-label">
            The Date
          </span>

          <span className="detail-value">
            24 October 2026
          </span>
        </div>

        <div className="detail">
          <span className="detail-label">
            The Time
          </span>

          <span className="detail-value">
            10:00 AM
          </span>
        </div>

        <div className="detail">
          <span className="detail-label">
            The Celebration
          </span>

          <span className="detail-value">
            Abuja, Nigeria
          </span>
        </div>

      </div>

    </section>

  </div>


  {/* =====================================================
      INVITATION VIEWER
  ===================================================== */}

  {showInvitation && (
    <div className="invitation-overlay">

      <div
        className="invitation-backdrop"
        onClick={() => setShowInvitation(false)}
        aria-hidden="true"
      />

      <div className="invitation-viewer">

        <button
          type="button"
          className="close-invitation"
          onClick={() => setShowInvitation(false)}
          aria-label="Close invitation"
        >
          ×
        </button>

        <img
          src="/invitation.png"
          alt="Praise and Reks wedding invitation"
          className="invitation-image"
        />

      </div>

    </div>
  )}


  {/* =====================================================
      STYLES
  ===================================================== */}

  <style>{`

    /* =====================================================
       PAGE
    ===================================================== */

    .page-shell {
      position: relative;

      min-height: 100vh;
      width: 100%;

      overflow: hidden;

      background:
        linear-gradient(
          rgba(248, 245, 240, 0.72),
          rgba(248, 245, 240, 0.72)
        ),
        url("/invitation-bg.jpg");

      background-size: cover;
      background-position: center;
      background-attachment: fixed;
    }


    /*
     * Very subtle texture over the background.
     */

    .page-shell::before {
      content: "";

      position: fixed;

      inset: 0;

      pointer-events: none;

      z-index: 0;

      opacity: 0.14;

      background-image:
        url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");

      background-size: 180px 180px;
    }


    .page-content {
      position: relative;

      z-index: 2;

      min-height: 100vh;

      transition:
        filter 0.6s ease,
        transform 0.6s ease;
    }


    /* =====================================================
       HERO
    ===================================================== */

    .page-hero {
      min-height: 78vh;

      padding:
        160px 24px 100px;

      display: flex;

      flex-direction: column;

      align-items: center;

      justify-content: center;

      text-align: center;
    }


    .page-eyebrow {
      font-family: "Cinzel", serif;

      font-size: 0.72rem;

      letter-spacing: 0.3em;

      text-transform: uppercase;

      color: #550303;

      margin-bottom: 20px;
    }


    .page-title {
      font-family: "Cinzel", serif;

      font-size:
        clamp(
          3rem,
          7vw,
          5.8rem
        );

      font-weight: 600;

      letter-spacing: 0.025em;

      line-height: 1;

      color: #1a1a1a;

      margin: 0 0 24px;
    }


    .page-subtitle {
      max-width: 520px;

      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "SF Pro Text",
        "SF Pro Display",
        "Helvetica Neue",
        Arial,
        sans-serif;

      font-size: 1rem;

      line-height: 1.8;

      color: #4a4a4a;

      margin: 0 0 34px;
    }


    /* =====================================================
       CTA
    ===================================================== */

    .view-invitation-btn {
      display: inline-flex;

      align-items: center;
      justify-content: center;

      gap: 12px;

      padding:
        15px 28px;

      border:
        1px solid #550303;

      border-radius: 50px;

      background: #550303;

      color: #ffffff;

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

      letter-spacing: 0.14em;

      text-transform: uppercase;

      cursor: pointer;

      transition:
        background 0.3s ease,
        color 0.3s ease,
        transform 0.3s ease;
    }


    .view-invitation-btn:hover {
      background: #1a1a1a;

      border-color: #1a1a1a;

      transform: translateY(-2px);
    }


    .invitation-arrow {
      font-size: 1rem;

      transition:
        transform 0.25s ease;
    }


    .view-invitation-btn:hover .invitation-arrow {
      transform: translateX(4px);
    }


    /* =====================================================
       INVITATION INTRO
    ===================================================== */

    .invitation-intro {
      position: relative;

      max-width: 850px;

      margin: 0 auto;

      padding:
        110px 24px 140px;

      text-align: center;
    }


    .intro-line {
      width: 60px;

      height: 1px;

      margin: 0 auto 30px;

      background: #550303;
    }


    .intro-eyebrow {
      display: block;

      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "SF Pro Text",
        "SF Pro Display",
        "Helvetica Neue",
        Arial,
        sans-serif;

      font-size: 0.68rem;

      letter-spacing: 0.28em;

      text-transform: uppercase;

      color: #550303;

      margin-bottom: 20px;
    }


    .intro-title {
      font-family: "Cinzel", serif;

      font-size:
        clamp(
          2rem,
          4.5vw,
          3.4rem
        );

      font-weight: 600;

      line-height: 1.2;

      color: #1a1a1a;

      margin: 0 0 28px;
    }


    .intro-copy {
      max-width: 560px;

      margin: 0 auto;

      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "SF Pro Text",
        "SF Pro Display",
        "Helvetica Neue",
        Arial,
        sans-serif;

      font-size: 0.95rem;

      line-height: 1.8;

      color: #4a4a4a;
    }


    /* =====================================================
       DETAILS
    ===================================================== */

    .intro-details {
      margin-top: 70px;

      display: grid;

      grid-template-columns:
        repeat(3, 1fr);

      border-top:
        1px solid
        rgba(85, 3, 3, 0.3);

      border-bottom:
        1px solid
        rgba(85, 3, 3, 0.3);
    }


    .detail {
      padding:
        28px 20px;

      display: flex;

      flex-direction: column;

      gap: 8px;
    }


    .detail + .detail {
      border-left:
        1px solid
        rgba(85, 3, 3, 0.2);
    }


    .detail-label {
      font-family: "Cinzel", serif;

      font-size: 0.65rem;

      letter-spacing: 0.18em;

      text-transform: uppercase;

      color: #550303;
    }


    .detail-value {
      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "SF Pro Text",
        "SF Pro Display",
        "Helvetica Neue",
        Arial,
        sans-serif;

      font-size: 0.82rem;

      color: #1a1a1a;
    }


    /* =====================================================
       BLUR OVERLAY
    ===================================================== */

    .invitation-overlay {
      position: fixed;

      inset: 0;

      z-index: 1000;

      display: flex;

      align-items: center;

      justify-content: center;

      padding: 40px;
    }


    /*
     * This is what creates the Gaussian-style blur.
     *
     * Everything behind the invitation becomes soft,
     * while the invitation itself remains perfectly sharp.
     */

    .invitation-backdrop {
      position: absolute;

      inset: 0;

      background:
        rgba(20, 20, 20, 0.32);

      backdrop-filter:
        blur(18px);

      -webkit-backdrop-filter:
        blur(18px);

      animation:
        invitation-backdrop-in
        0.55s ease forwards;

      cursor: pointer;
    }


    @keyframes invitation-backdrop-in {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }


    /* =====================================================
       INVITATION IMAGE
    ===================================================== */

    .invitation-viewer {
      position: relative;

      z-index: 2;

      width:
        min(
          760px,
          88vw
        );

      max-height:
        88vh;

      display: flex;

      align-items: center;

      justify-content: center;

      animation:
        invitation-image-in
        0.65s
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        )
        forwards;
    }


    .invitation-image {
      display: block;

      width: 100%;

      height: auto;

      max-height: 88vh;

      object-fit: contain;

      border-radius: 6px;

      box-shadow:
        0 30px 80px
        rgba(0, 0, 0, 0.35);

      background: #ffffff;
    }


    @keyframes invitation-image-in {
      from {
        opacity: 0;

        transform:
          translateY(25px)
          scale(0.94);
      }

      to {
        opacity: 1;

        transform:
          translateY(0)
          scale(1);
      }
    }


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    .close-invitation {
      position: absolute;

      top: -18px;

      right: -18px;

      z-index: 5;

      width: 42px;

      height: 42px;

      display: flex;

      align-items: center;
      justify-content: center;

      border:
        1px solid
        rgba(255, 255, 255, 0.7);

      border-radius: 50%;

      background:
        rgba(20, 20, 20, 0.8);

      color: #ffffff;

      font-size: 1.5rem;

      line-height: 1;

      cursor: pointer;

      transition:
        transform 0.25s ease,
        background 0.25s ease;
    }


    .close-invitation:hover {
      transform: rotate(90deg);

      background: #550303;
    }


    /* =====================================================
       MOBILE
    ===================================================== */

    @media (max-width: 900px) {

      .page-hero {
        min-height: 72vh;

        padding:
          120px 20px 70px;
      }


      .page-title {
        font-size:
          clamp(
            3rem,
            14vw,
            4.4rem
          );
      }


      .page-subtitle {
        font-size: 0.92rem;

        max-width: 330px;
      }


      .invitation-intro {
        padding:
          80px 28px 100px;
      }


      .intro-details {
        grid-template-columns: 1fr;
      }


      .detail + .detail {
        border-left: 0;

        border-top:
          1px solid
          rgba(85, 3, 3, 0.2);
      }


      .invitation-overlay {
        padding: 24px;
      }


      .invitation-viewer {
        width: 92vw;

        max-height: 86vh;
      }


      .invitation-image {
        max-height: 86vh;

        border-radius: 4px;
      }


      .close-invitation {
        top: -14px;

        right: -10px;

        width: 38px;

        height: 38px;
      }
    }


    /* =====================================================
       SMALL PHONES
    ===================================================== */

    @media (max-width: 420px) {

      .page-hero {
        padding:
          110px 20px 60px;
      }


      .page-eyebrow {
        font-size: 0.62rem;
      }


      .view-invitation-btn {
        padding:
          14px 24px;

        font-size: 0.62rem;
      }


      .invitation-overlay {
        padding: 18px;
      }


      .invitation-viewer {
        width: 94vw;
      }
    }


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    @media (prefers-reduced-motion: reduce) {

      .invitation-viewer,
      .invitation-backdrop {
        animation: none;
      }

      .page-content {
        transition: none;
      }
    }

  `}</style>

</main>

);
}
