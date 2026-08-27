"use client";

import React from "react";
import SiteNav from "@/components/SiteNav";
// import SiteNav from "../../components/SiteNav";

const galleryImages = [
  "/gallery-1.jpg",
  "/gallery-2.jpg",
  "/gallery-3.jpg",
  "/gallery-4.jpg",
  "/gallery-5.jpg",
];

export default function LoveGalleryPage() {
  return (
    <main className="page-shell">

      <SiteNav />

      <section className="page-hero">
        <span className="page-eyebrow">Our Story, In Pictures</span>
        <h1 className="page-title">Love Gallery</h1>
        <p className="page-subtitle">
          A fuller look at the journey — swap these in for the real set.
        </p>
      </section>

      <section className="gallery-grid">
        {galleryImages.map((src, i) => (
          <div className="gallery-item" key={i}>
            <img src={src} alt="" className="gallery-image" draggable={false} />
          </div>
        ))}
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

        .gallery-grid {
          padding: 0 24px 120px;
          max-width: 1200px;
          margin: 0 auto;

          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .gallery-item {
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: #ddd;
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 900px) {
          .page-hero {
            padding: 120px 20px 44px;
          }

          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }

      `}</style>

    </main>
  );
}
