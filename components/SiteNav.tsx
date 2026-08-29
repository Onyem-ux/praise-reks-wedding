"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SiteNavProps {
  navLinks?: string[];
  logoSrc?: string;
}

const SF_PRO =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif';

/*
 * Route map — keep in sync with your /app folder
 * names. "Our Story" points at /our-story; make
 * sure that folder + page.tsx exist once you've
 * created it, or this link will 404 the same way
 * the old Squad casing mismatch did.
 *
 * IMPORTANT: the key here must exactly match the
 * label string passed in via navLinks (e.g. from
 * CurveGallery, which sends "Squad", not "The Squad").
 * A mismatched key used to silently fall back to "/",
 * which made that link appear "active" on the homepage.
 */
const ROUTES: Record<string, string> = {
  Invitation: "/invitation",
  "Our Story": "/our-story",
  Squad: "/squad",
  Gallery: "/love-gallery",
  Registry: "/registry",
};

export default function SiteNav({
  navLinks = ["Invitation", "Our Story", "Squad", "Gallery", "Registry"],
  logoSrc = "/PR Fusion Logo.png",
}: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const getRoute = (link: string) => ROUTES[link] ?? "#";

  /*
   * A link is only ever "active" if it has a real,
   * registered route AND that route matches the current
   * path. No fallback to "/" — that was what caused an
   * unmapped label (like a stray "Squad" vs "The Squad")
   * to be treated as the homepage and light up on "/".
   * This also means the homepage itself never matches any
   * nav link, so on "/" only the logo represents "home" —
   * no link shows as active.
   */
  const isActive = (link: string) =>
    Boolean(ROUTES[link]) && pathname === ROUTES[link];

  const toggleMenu = () => setOpen((value) => !value);

  return (
    <>
      <nav className="site-nav">
        <Link href="/" className="site-nav-logo-link" aria-label="Home">
          <img
            src={logoSrc}
            alt="PR Fusion Logo"
            className="site-nav-logo"
            draggable={false}
          />
        </Link>

        <div className="site-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link}
              href={getRoute(link)}
              className={`site-nav-link ${
                isActive(link) ? "site-nav-link-active" : ""
              }`}
            >
              {link}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="site-hamburger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        className={
          open
            ? "site-mobile-backdrop site-mobile-backdrop-open"
            : "site-mobile-backdrop"
        }
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        className={
          open ? "site-mobile-menu site-mobile-menu-open" : "site-mobile-menu"
        }
        aria-hidden={!open}
      >
        <div className="site-mobile-menu-links">
          {navLinks.map((link) => (
            <Link
              key={link}
              href={getRoute(link)}
              className={`site-mobile-link ${
                isActive(link) ? "site-mobile-link-active" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {link}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        /*
         * z-index raised from 60 -> 100. 60 was easy
         * to get buried under other page content (the
         * countdown, or anything else that ends up with
         * a higher stacking value). 100 sits safely
         * above ordinary page content while staying
         * below the mobile drawer (200) and intro gate
         * (1000), so those still correctly cover the
         * nav when they're open.
         */
        .site-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 96px;
          z-index: 300;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 108px;
          pointer-events: auto;
          background-color: #f8f6f1
        }

        .site-nav-logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .site-nav-logo {
          height: 45px;
          width: auto;
          max-width: 180px;
          object-fit: contain;
          user-select: none;
          -webkit-user-drag: none;
        }

        .site-nav-links {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .site-nav-link {
          font-family: ${SF_PRO};
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #1a1a1a;
          text-decoration: none;
          position: relative;
          padding-bottom: 6px;
          transition: opacity 0.35s ease;
          white-space: nowrap;
          mix-blend-mode: none;
        }

        .site-nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          right: 100%;
          bottom: 0;
          height: 1px;
          background: currentColor;
          transition: right 0.35s ease;
        }

        .site-nav-link:hover {
          opacity: 0.65;
        }

        .site-nav-link:hover::after {
          right: 0;
        }

        .site-nav-link-active::after {
          right: 0;
        }

        /* =========================================
           HAMBURGER

           Fix: "position: fixed" was missing entirely
           — "top"/"right" were declared but silently
           doing nothing without a position value. Also
           reverted the background from #f0f0f0 back to
           transparent (a stray gray box behind the icon
           wasn't intentional).
        ========================================= */

        .site-hamburger {
          display: none;
          position: fixed;
          top: 20px;
          right: 20px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          padding: 0;
          border: 0;
          background: #f8f6f1;
          cursor: pointer;
          z-index: 220;
          -webkit-tap-highlight-color: transparent;

        }

        .site-hamburger span {
          display: block;
          width: 20px;
          height: 2px;
          background: #1a1a1a;
          transition: transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1),
            opacity 0.3s ease;
        }

        .site-hamburger[aria-expanded="true"] span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .site-hamburger[aria-expanded="true"] span:nth-child(2) {
          opacity: 0;
        }

        .site-hamburger[aria-expanded="true"] span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .site-mobile-backdrop {
          position: fixed;
          inset: 0;
          z-index: 190;
          background: rgba(0, 0, 0, 0.45);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.45s ease;
        }

        .site-mobile-backdrop-open {
          opacity: 1;
          pointer-events: auto;
        }

        .site-mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          height: 100dvh;
          width: min(78vw, 320px);
          z-index: 200;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 30px;
          padding: 40px;
          background: #f5f2ee;
          box-shadow: -8px 0 30px rgba(0, 0, 0, 0.2);
          transform: translateX(100%);
          transition: transform 0.65s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .site-mobile-menu-open {
          transform: translateX(0);
        }

        .site-mobile-menu-links {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 28px;
          width: 100%;
        }

        .site-mobile-link {
          font-family: ${SF_PRO};
          font-size: 1.05rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #272727;
          text-decoration: none;
        }

        .site-mobile-link-active {
          opacity: 0.55;
        }

        @media (max-width: 900px) {
          .site-nav {
            height: 76px;
            padding: 0 20px;
          }

          .site-nav-logo {
            height: 28px;
          }

          .site-nav-links {
            display: none;
          }

          .site-hamburger {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}