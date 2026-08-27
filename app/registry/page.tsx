"use client";

import React from "react";
import SiteNav from "@/components/SiteNav";
// import SiteNav from "../../components/SiteNav";

interface RegistryEntry {
  label: string;
  detail: string;
}

const registryEntries: RegistryEntry[] = [
  { label: "Bank Transfer", detail: "Account name / number go here" },
  { label: "Gift Registry Link", detail: "e.g. Amazon / Jumia wishlist URL" },
  { label: "Mobile Money", detail: "Provider + number go here" },
];

export default function RegistryPage() {
  return (
    <main className="page-shell">

      <SiteNav />

      <section className="page-hero">
        <span className="page-eyebrow">With Love</span>
        <h1 className="page-title">Registry</h1>
        <p className="page-subtitle">
          Your presence is the real gift — but if you'd like to bless us
          further, here's how.
        </p>
      </section>

      <section className="registry-list">
        {registryEntries.map((entry, i) => (
          <div className="registry-card" key={i}>
            <div className="registry-label">{entry.label}</div>
            <div className="registry-detail">{entry.detail}</div>
          </div>
        ))}
      </section>

      <style>{`

        .page-shell {
          position: relative;
          min-height: 100vh;
          width: 100%;
          background: #ffffff;
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

        .registry-list {
          padding: 0 24px 120px;
          max-width: 640px;
          margin: 0 auto;

          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .registry-card {
          padding: 28px;
          border: 1px solid #ece6dd;
          background: #f5f2ee;
        }

        .registry-label {
          font-family: "Cinzel", serif;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #550303;
          margin-bottom: 8px;
        }

        .registry-detail {
          font-family: Georgia, serif;
          font-size: 0.95rem;
          color: #4a4a4a;
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
