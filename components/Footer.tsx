"use client";

import React from "react";
import Link from "next/link";

interface FooterProps {
  navLinks?: string[];
  logoSrc?: string;
}

const SF_PRO =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif';

/*
 * Kept in sync with SiteNav's ROUTES map. If you add or
 * rename a page there, mirror the change here too so the
 * footer nav doesn't drift out of sync with the header nav.
 */
const ROUTES: Record<string, string> = {
  Invitation: "/invitation",
  "Our Story": "/our-story",
  Squad: "/squad",
  Gallery: "/love-gallery",
  Registry: "/registry",
};

export default function Footer({
  navLinks = ["Invitation", "Our Story", "Squad", "Gallery", "Registry"],
  logoSrc = "/PR Fusion Logo.png",
}: FooterProps) {
  const getRoute = (link: string) => ROUTES[link] ?? "#";

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        {/* =================================================
            TOP ROW
        ================================================= */}

        <div className="footer-top">
          <div className="footer-brand">
            <img
              src={logoSrc}
              alt="PR Fusion Logo"
              className="footer-logo"
              draggable={false}
            />

            <p className="footer-tagline">
              Praise &amp; Reks. 24th October, 2026. 10:00 AM.
              <br />
              The journey begins.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <Link key={link} href={getRoute(link)} className="footer-nav-link">
                {link}
              </Link>
            ))}
          </nav>
        </div>

        {/* =================================================
            DIVIDER
        ================================================= */}

        <div className="footer-divider" />

        {/* =================================================
            BOTTOM ROW
        ================================================= */}

        <div className="footer-bottom">
          <p className="footer-credit">
            Built with ❤️ by Onyem. WhatsApp:{" "}
            <a
              href="https://wa.me/2348113343015"
              className="footer-credit-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              +234 811 334 3015
            </a>
          </p>

          <p className="footer-hashtag">#PRFusion</p>
        </div>
      </div>

      <style>{`
        .site-footer {
          position: relative;
          z-index: 1;

          width: 100%;

          background: #141414;

          padding: 72px 96px 32px;
        }

        .site-footer-inner {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }


        /* =====================================================
           TOP ROW
        ===================================================== */

        .footer-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 48px;

          margin-bottom: 48px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-logo {
          height: 40px;
          width: auto;
          max-width: 160px;
          object-fit: contain;

          /*
           * The source logo mark is drawn for a light
           * background (SiteNav sits on #f8f6f1). Inverting
           * it here keeps the same mark legible on the
           * footer's dark background without needing a
           * second logo asset.
           */
          filter: brightness(0) invert(1);

          margin-bottom: 18px;

          user-select: none;
          -webkit-user-drag: none;
        }

        .footer-tagline {
          font-family: "Cinzel", serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          line-height: 1.7;

          color: rgba(255, 255, 255, 0.65);

          margin: 0;
        }

        .footer-nav {
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          gap: 12px 32px;

          padding-top: 4px;
        }

        .footer-nav-link {
          font-family: ${SF_PRO};
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;

          color: #e4e4e4d9;
          text-decoration: none;

          white-space: nowrap;

          transition: color 0.3s ease;
        }

        .footer-nav-link:hover {
          color: #ffffff;
        }


        /* =====================================================
           DIVIDER
        ===================================================== */

        .footer-divider {
          width: 100%;
          height: 1px;

          background: linear-gradient(
          to right,
    transparent,
    #eb2e2e,
    transparent
  );

          margin-bottom: 28px;
        }


        /* =====================================================
           BOTTOM ROW
        ===================================================== */

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;

          flex-wrap: wrap;
        }

        .footer-credit,
        .footer-hashtag {
          font-family: ${SF_PRO};
          font-size: 0.7rem;
          letter-spacing: 0.02em;

          color: rgba(255, 255, 255, 0.45);

          margin: 0;
        }

        .footer-credit-link {
          color: rgba(255, 255, 255, 0.65);
          text-decoration: underline;
          text-underline-offset: 2px;

          transition: color 0.3s ease;
        }

        .footer-credit-link:hover {
          color: #ffffff;
        }

        .footer-hashtag {
          font-family: "Cinzel", serif;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 900px) {
          .site-footer {
            padding: 56px 28px 28px;
          }

          .footer-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 32px;

            margin-bottom: 36px;
          }

          .footer-nav {
            justify-content: flex-start;
            width: 100%;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </footer>
  );
}
