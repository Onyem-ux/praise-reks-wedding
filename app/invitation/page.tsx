"use client";

import React from "react";
import SiteNav from "@/components/SiteNav";
// If the "@/" alias isn't set up in your tsconfig, use a relative import instead:
// import SiteNav from "../../components/SiteNav";

export default function InvitationPage() {
  return (
    <main className="page-shell">

      <SiteNav />

      <section className="page-hero">
        <span className="page-eyebrow">You're Invited</span>
        <h1 className="page-title">Invitation</h1>
        <p className="page-subtitle">
          Ceremony details, venue, timing, and dress code go here.
        </p>
      </section>

      <section className="page-body">
        {/*
          TODO: replace with the real invitation —
          venue name + address, ceremony time,
          reception details, a map embed, dress
          code, RSVP link/form, etc.
        */}
        <p className="page-placeholder">
          Invitation content coming soon.
        </p>
      </section>

      <style>{`

        .page-shell {
          position: relative;
          min-height: 100vh;
          width: 100%;
          background: #f5f2ee;
        }

        .page-hero {
          padding: 160px 24px 60px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .page-eyebrow {
          font-family: "Cinzel", serif;
          font-size: 0.78rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #b79b6b;
          margin-bottom: 16px;
        }

        .page-title {
          font-family: "Cinzel", serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #1a1a1a;
          margin: 0 0 18px;
        }

        .page-subtitle {
          max-width: 520px;
          font-family: Georgia, serif;
          font-size: 1rem;
          line-height: 1.7;
          color: #4a4a4a;
        }

        .page-body {
          padding: 40px 24px 120px;
          display: flex;
          justify-content: center;
        }

        .page-placeholder {
          font-family: Georgia, serif;
          color: #8a8a8a;
          font-style: italic;
        }

        @media (max-width: 900px) {
          .page-hero {
            padding: 120px 20px 44px;
          }
        }

      `}</style>

    </main>
  );
}
