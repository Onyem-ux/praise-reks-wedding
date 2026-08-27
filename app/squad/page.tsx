"use client";

import React from "react";
import SiteNav from "@/components/SiteNav";
// import SiteNav from "../../components/SiteNav";

interface SquadMember {
  name: string;
  role: string;
}

const bridesmaids: SquadMember[] = [
  { name: "Name", role: "Bridesmaid" },
  { name: "Name", role: "Bridesmaid" },
  { name: "Name", role: "Maid of Honor" },
];

const groomsmen: SquadMember[] = [
  { name: "Name", role: "Groomsman" },
  { name: "Name", role: "Groomsman" },
  { name: "Name", role: "Best Man" },
];

export default function SquadPage() {
  return (
    <main className="page-shell">

      <SiteNav />

      <section className="page-hero">
        <span className="page-eyebrow">The Wedding Party</span>
        <h1 className="page-title">Squad</h1>
        <p className="page-subtitle">
          Meet the people standing with us on the day.
        </p>
      </section>

      <section className="squad-grid-section">

        <div className="squad-column">
          <h2 className="squad-column-title">Bridesmaids</h2>
          <div className="squad-grid">
            {bridesmaids.map((person, i) => (
              <div className="squad-card" key={i}>
                <div className="squad-photo-placeholder" />
                <div className="squad-name">{person.name}</div>
                <div className="squad-role">{person.role}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="squad-column">
          <h2 className="squad-column-title">Groomsmen</h2>
          <div className="squad-grid">
            {groomsmen.map((person, i) => (
              <div className="squad-card" key={i}>
                <div className="squad-photo-placeholder" />
                <div className="squad-name">{person.name}</div>
                <div className="squad-role">{person.role}</div>
              </div>
            ))}
          </div>
        </div>

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

        .squad-grid-section {
          padding: 0 24px 120px;
          max-width: 1100px;
          margin: 0 auto;

          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .squad-column-title {
          font-family: "Cinzel", serif;
          font-size: 1.2rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #550303;
          text-align: center;
          margin-bottom: 32px;
        }

        .squad-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 24px;
        }

        .squad-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .squad-photo-placeholder {
          width: 100%;
          aspect-ratio: 3 / 4;
          background: #f0ece6;
          border: 1px dashed #cfc6bc;
          margin-bottom: 12px;
        }

        .squad-name {
          font-family: "Cinzel", serif;
          font-size: 0.95rem;
          color: #1a1a1a;
        }

        .squad-role {
          font-family: Georgia, serif;
          font-size: 0.8rem;
          color: #8a8a8a;
          margin-top: 2px;
        }

        @media (max-width: 900px) {
          .page-hero {
            padding: 120px 20px 44px;
          }

          .squad-grid-section {
            grid-template-columns: 1fr;
            gap: 44px;
          }
        }

      `}</style>

    </main>
  );
}
