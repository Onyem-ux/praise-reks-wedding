"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SiteNav from "./SiteNav";
import Footer from "@/components/Footer";

interface CurveGalleryProps {
  images?: string[];
  panelCount?: number;
  title?: string;

  radius?: number;
  panelHeight?: number;

  spinSeconds?: number;
  frameWidth?: string;
  perspective?: number;

  gap?: number;
  panelWidthScale?: number;

  edgeWidth?: string;
  // NOTE: edgeBlur is kept for backward-compat with existing call sites,
  // but is no longer applied — backdrop-filter blur was removed entirely
  // (it was crashing constrained in-app WebViews like WhatsApp's browser).
  edgeBlur?: number;

  navLinks?: string[];

  musicSrc?: string;
}

const SF_PRO =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif';

function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const update = () => {
      setIsMobile(mediaQuery.matches);
    };

    update();

    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, [breakpoint]);

  return isMobile;
}

interface SquadRowProps {
  label: string;
  total: number;
  images: string[];
}

function SquadRow({ label, total, images }: SquadRowProps) {
  const isMobile = useIsMobile();
  const visibleCount = isMobile ? 1 : 4;
  const gap = 14; // must match the CSS gap

  const viewportRef = useRef<HTMLDivElement>(null);

  const [canGoLeft, setCanGoLeft] = useState(false);
  const [canGoRight, setCanGoRight] = useState(total > visibleCount);

  /*
   * Reads the viewport's actual scroll position instead of
   * tracking an index in JS. This is what keeps the arrows,
   * the images, and the true scroll position from ever
   * drifting out of sync with each other — the browser's
   * native scrollLeft/scrollWidth are always the source of
   * truth, so there's no percentage/pixel math to get wrong.
   */
  const updateArrows = () => {
    const el = viewportRef.current;

    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;

    setCanGoLeft(el.scrollLeft > 4);
    setCanGoRight(el.scrollLeft < maxScroll - 4);
  };

  useEffect(() => {
    updateArrows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount, total]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = viewportRef.current;

    if (!el) return;

    el.scrollBy({
      left: direction * el.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="squad-row">
      <div className="squad-row-header">
        <h3 className="squad-row-title">{label}</h3>

        <div className="squad-row-nav">
          <button
            type="button"
            className="squad-arrow"
            aria-label={`Previous ${label}`}
            disabled={!canGoLeft}
            onClick={() => scrollByPage(-1)}
          >
            ‹
          </button>

          <button
            type="button"
            className="squad-arrow"
            aria-label={`Next ${label}`}
            disabled={!canGoRight}
            onClick={() => scrollByPage(1)}
          >
            ›
          </button>
        </div>
      </div>

      {/*
        Native horizontal scroll + scroll-snap. This replaces
        the old JS transform carousel: the browser handles
        positioning, so slides can never drift out of
        alignment, the last image always comes fully into
        view, and the row is swipeable/manually scrollable on
        touch devices and trackpads without any extra code.
      */}
      <div
        className="squad-row-viewport"
        ref={viewportRef}
        onScroll={updateArrows}
      >
        <div className="squad-row-track">
          {Array.from({ length: total }, (_, index) => (
            <div
              className="squad-photo"
              key={index}
              style={{
                flex: `0 0 calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})`,
              }}
            >
              <img
                src={images[index] || "/placeholder.jpg"}
                alt={`${label} ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CurveGallery({
  images = [
    "/gallery-1.jpg",
    "/gallery-2.jpg",
    "/gallery-3.jpg",
    "/gallery-4.jpg",
    "/gallery-5.jpg",
    "/gallery-6.jpg",
  ],

  /*
   * 12 panels on ALL devices.
   */
  panelCount = 12,

  title = "PRAISE & REKs",

  radius = 1350,
  panelHeight = 1300,

  spinSeconds = 34,

  frameWidth = "2560px",

  perspective = 1200,

  gap = 6,

  panelWidthScale = 0.75,

  edgeWidth = "70px",
  edgeBlur = 10,

  navLinks = ["Invitation", "Our Story", "Squad", "Gallery", "Registry"],

  musicSrc = "/wedding-song.mp3",
}: CurveGalleryProps) {
  const [introOpen, setIntroOpen] = useState(false);
  const [muted, setMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

    const isMobile = useIsMobile();
  const effectivePanelCount = isMobile ? 6 : panelCount;

  /*
   * Load fonts once.
   */
  useEffect(() => {
    const id = "cg-fonts";

    if (!document.getElementById(id)) {
      const link = document.createElement("link");

      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap";

      document.head.appendChild(link);
    }
  }, []);

  /*
   * Preload the critical intro assets.
   *
   * These are small, above-the-fold assets and are needed
   * immediately when the page opens.
   */
  useEffect(() => {
    const preloadImage = (href: string) => {
      if (document.querySelector(`link[rel="preload"][href="${href}"]`)) {
        return;
      }

      const link = document.createElement("link");

      link.rel = "preload";
      link.as = "image";
      link.href = href;

      document.head.appendChild(link);
    };

    preloadImage("/seal.png");
    preloadImage("/White embross bg.jpg");
  }, []);

    /*
   * Lock page scrolling while opening gate is closed.
   */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    if (!introOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [introOpen]);

  const angleStep = 360 /   effectivePanelCount;

  const availablePanelWidth =
    2 *
    radius *
    Math.tan((angleStep * Math.PI) / 180 / 2);

  const panelWidth =
    Math.max(availablePanelWidth - gap, 1) * panelWidthScale;

  /*
   * Wedding countdown
   */
  const weddingDate = new Date(
    "2026-10-24T10:00:00"
  ).getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const difference = weddingDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      setTimeLeft({
        days: Math.floor(
          difference / (1000 * 60 * 60 * 24)
        ),

        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),

        minutes: Math.floor(
          (difference / (1000 * 60)) % 60
        ),

        seconds: Math.floor(
          (difference / 1000) % 60
        ),
      });
    };

    calculateTime();

    const timer = window.setInterval(
      calculateTime,
      1000
    );

    return () => {
      window.clearInterval(timer);
    };
  }, [weddingDate]);

  /*
   * Opening gate + music
   */
  const handleSealClick = () => {
    setIntroOpen(true);

    const audio = audioRef.current;

    if (audio) {
      audio.volume = 0.25;

      audio.play().catch(() => {
        // Ignore autoplay errors.
      });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  /*
   * Pause the music the instant the tab is hidden — switched
   * away, minimized, or backgrounded — even though the tab
   * and browser stay technically "open". Resume it when the
   * user comes back, but only if they haven't muted it.
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;

      if (!audio) return;

      if (document.hidden) {
        audio.pause();
      } else if (introOpen && !muted) {
        audio.play().catch(() => {
          // Ignore autoplay errors.
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [introOpen, muted]);

  return (
    <>
      <audio
        ref={audioRef}
        src={musicSrc}
        loop
        preload="none"
      />

      <main
        className={
          introOpen
            ? "cg-outer cg-page-open"
            : "cg-outer"
        }
      >
        {/* =====================================================
            INTRO / OPENING GATE
        ===================================================== */}

        <div
          className={
            introOpen
              ? "cg-intro cg-intro-open"
              : "cg-intro"
          }
          aria-hidden={introOpen}
        >
          {/* LEFT PANEL */}
          <div className="cg-intro-panel cg-intro-left">
            <div className="cg-panel-ribbon cg-ribbon-left">
              <div className="cg-stripe stripe-gold" />
            </div>

            <button
              type="button"
              className="cg-intro-seal"
              onClick={handleSealClick}
              aria-label="Open wedding invitation"
            >
              <div className="cg-seal-outer">
                <div className="cg-seal-inner">
                  <img
                    src="/seal.png"
                    alt="Wedding seal"
                    className="cg-seal-image"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
              </div>
            </button>

            <span
              className={
                introOpen
                  ? "cg-intro-hint cg-intro-hint-hidden"
                  : "cg-intro-hint"
              }
              aria-hidden={introOpen}
            >
              Click on the seal to open invitation
            </span>
          </div>

          {/* RIGHT PANEL */}
          <div className="cg-intro-panel cg-intro-right">
            <div className="cg-panel-ribbon cg-ribbon-right" />
          </div>
        </div>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <SiteNav navLinks={navLinks} />

        {/* =====================================================
            HERO TITLE
        ===================================================== */}

        <div className="cg-title">
          {title}
        </div>

        {/* =====================================================
            CYLINDER
        ===================================================== */}

        <div
          className="cg-frame"
          style={
            {
              width: frameWidth,
              "--panel-height": `${panelHeight}px`,
            } as React.CSSProperties
          }
        >
          <div
            className="cg-scene"
            style={{
              perspective: `${perspective}px`,
            }}
          >
            <div
              className="cg-cylinder"
              style={{
                animationDuration: `${spinSeconds}s`,
              }}
            >
              {Array.from({
                length: effectivePanelCount,
              }).map((_, index) => {
                const src =
                  images[index % images.length];

                const angle = index * angleStep;

                return (
                  <div
                    key={index}
                    className="cg-panel"
                    style={{
                      width: `${panelWidth}px`,
                      height: `${panelHeight}px`,
                      transform: `
                        rotateY(${angle}deg)
                        translateZ(${-radius}px)
                      `,
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      draggable={false}
                      className="cg-image"
                      loading={
                        index === 0
                          ? "eager"
                          : "lazy"
                      }
                      decoding="async"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =====================================================
            HERO CTA
        ===================================================== */}

        <Link
          href="/invitation"
          className="cg-invite-btn"
        >
          View Wedding Invitation
        </Link>

        {/* =====================================================
            MUSIC
        ===================================================== */}

        {introOpen && (
          <button
            type="button"
            className="cg-music-toggle"
            onClick={toggleMute}
            aria-label={
              muted
                ? "Unmute music"
                : "Mute music"
            }
          >
            {muted ? "🔇" : "🔊"}
          </button>
        )}
      </main>

      {/* =======================================================
          COUNTDOWN
      ======================================================= */}

            <section
        className={`wc-countdown ${introOpen ? "wc-countdown-visible" : ""}`}
        aria-label="Countdown to the wedding"
        aria-hidden={!introOpen}
      >
        <div
          className="wc-blob"
          aria-hidden="true"
        />

        <div className="wc-top-row">
          <span className="wc-couple">
            Praise &amp; Reks
          </span>

          <span className="wc-date">
            24 OCT 2026
          </span>

          <span className="wc-time">
            10:00 AM
          </span>
        </div>

        <div className="wc-numbers">
          <div className="wc-unit">
            <strong>
              {String(timeLeft.days).padStart(2, "0")}
            </strong>

            <span>Days</span>
          </div>

          <div className="wc-line" />

          <div className="wc-unit">
            <strong>
              {String(timeLeft.hours).padStart(2, "0")}
            </strong>

            <span>Hours</span>
          </div>

          <div className="wc-line" />

          <div className="wc-unit">
            <strong>
              {String(timeLeft.minutes).padStart(2, "0")}
            </strong>

            <span>Minutes</span>
          </div>

          <div className="wc-line" />

          <div className="wc-unit">
            <strong>
              {String(timeLeft.seconds).padStart(2, "0")}
            </strong>

            <span>Seconds</span>
          </div>
        </div>
      </section>

      {/* =======================================================
          OUR STORY
      ======================================================= */}

      <section
        className="site-section"
        style={{ background: "#f8f8f8" }}
      >
        <div className="site-section-inner">
          <div className="site-section-top">
            <div className="site-section-heading">
              <span className="site-section-eyebrow">
                Our story
              </span>

              <h2 className="site-section-title">
                How we found our way to forever
              </h2>
            </div>

            <div className="site-section-copy">
              <p className="site-section-body">
                Some love stories begin with a grand introduction. Ours began rather quietly with a church office, a few passing greetings, a camera, and, of all things, an Ecobank account.
              </p>

              <Link
                href="/our-story"
                className="site-section-cta"
              >
                Read our story

                <span
                  className="cta-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="site-section-top site-section-top-with-line"></div>
          <div className="site-section-media">
            <div className="site-story-image" />
          </div>
        </div>
      </section>

      {/* =======================================================
          SQUAD
      ======================================================= */}

      <section
        className="site-section"
        style={{ background: "#f0f0f0" }}
      >
        <div className="site-section-inner">
          <div className="site-section-top">
            <div className="site-section-heading">
              <span className="site-section-eyebrow">
                The squad
              </span>

              <h2 className="site-section-title">
                We're heavily backed up
              </h2>
            </div>

            <div className="site-section-copy">
              <p className="site-section-body">
                We’re surrounded by so many amazing 
                friends and loved ones, each playing 
                a special part in our journey. On our 
                wedding day, we’re honoured to have a 
                few of them standing by our side as 
                part of our wedding train.  </p>
            </div>
          </div>

          <div className="site-section-top site-section-top-with-line"></div>
          <div className="site-section-media">
            <div className="squad-groups">
              <SquadRow
                label="Bridesmaids"
                total={9}
                images={[
                  "/Flourish.png",
                  "/Miracle.png",
                  "/Lolia.png",
                  "/Osione.png",
                  "/Ofure.png",
                  "/Offiong.png",
                  "/Jophine.png",
                  "/Favour.png",
                  "/Bimbo.png",
                ]}
              />

              <SquadRow
                label="Groomsmen"
                total={8}
                images={[
                  "/Miju.png",
                  "/Maurice.png",
                  "/Godspeed.png",
                  "/Evaristus.png",
                  "/Ghekpezi.png",
                  "/Honour.png",
                  "/Bassey.png",
                  "/Goodness.png",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          LOVE GALLERY
      ======================================================= */}

      <section
        className="site-section wall-section"
        style={{ background: "#f8f8f8" }}
      >
        <div className="site-section-inner">
          <div className="wall-section-top">
            <h2 className="wall-title">
              Our love, 
              <br>
              </br>in pictures
            </h2>

            <div className="wall-copy">
              <p className="wall-tagline">
                Welcome to our gallery. Let's take 
                through the journey from how it 
                started, and show you how it's going!
              </p>

              <Link
                href="/love-gallery"
                className="wall-cta"
              >
                View the Gallery

                <span
                  className="cta-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="wall-grid">
            <div
              className="wall-item wall-item-a"
              style={{
                backgroundImage: `url(${images[0]})`,
              }}
            >
              <span className="wall-caption">
                Frame 01
              </span>
            </div>

            <div
              className="wall-item wall-item-b"
              style={{
                backgroundImage: `url(${images[1]})`,
              }}
            >
              <span className="wall-caption">
                Frame 02
              </span>
            </div>

            <div
              className="wall-item wall-item-c"
              style={{
                backgroundImage: `url(${images[2]})`,
              }}
            >
              <span className="wall-caption">
                Frame 03
              </span>
            </div>

            <div
              className="wall-item wall-item-d"
              style={{
                backgroundImage: `url(${images[3]})`,
              }}
            >
              <span className="wall-caption">
                Frame 04
              </span>
            </div>

            <div
              className="wall-item wall-item-e"
              style={{
                backgroundImage: `url(${images[4]})`,
              }}
            >
              <span className="wall-caption">
                Frame 05
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          REGISTRY
      ======================================================= */}

      <section
        className="site-section"
        style={{ background: "#f0f0f0" }}
      >
        <div className="site-section-inner">
          <div className="site-section-top">
            <div className="site-section-heading">
              <span className="site-section-eyebrow">
                With Love
              </span>

              <h2 className="site-section-title">
                Registry
              </h2>
            </div>

            <div className="site-section-copy">
              <p className="site-section-body">
                Your presence is the real gift — but
                if you&apos;d like to bless us further,
                here&apos;s how.
              </p>

              <Link
                href="/registry"
                className="site-section-cta"
              >
                View the Registry

                <span
                  className="cta-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          STYLES
      ======================================================= */}

      <style>{`

        /* =========================================
           OUTER
        ========================================= */

        .cg-outer {
          position: relative;

          width: 100%;
          height: 100vh;

          overflow: hidden;

          display: flex;
          align-items: center;
          justify-content: center;

          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-color: #e9e9e9;
        }


        /* =========================================
           INTRO

           Fix (item 9): slower, gentler easing
           shared identically by the panels AND the
           seal (same duration, same curve) so they
           read as one continuous, cinematic motion
           instead of the seal racing ahead or
           snapping into place.
        ========================================= */

        .cg-intro {
          position: fixed;
          inset: 0;

          z-index: 1200;

          overflow: hidden;

          pointer-events: none;
        }

        .cg-intro-panel {

          --panel-texture: url('/White embross bg.jpg');

          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;

          background-image: var(--panel-texture);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          background-color: #141414;

          box-shadow:
            inset 1px 1px 1px rgba(255, 255, 255, 0.35),
            inset -1px -1px 1px rgba(0, 0, 0, 0.25),
            0 8px 32px rgba(0, 0, 0, 0.25);

          transition: transform 3.8s cubic-bezier(0.22, 1, 0.36, 1);

          will-change: transform;

          pointer-events: auto;
        }

        .cg-intro-left {
          left: 0;
          transform-origin: left center;
          background-position: left center;
          z-index: 1300;
        }

        .cg-intro-right {
          right: 0;
          transform-origin: right center;
          background-position: right center;
        }

        .cg-intro-open .cg-intro-left {
          transform:
            perspective(1600px)
            rotateY(-4deg)
            translateX(calc(-100% + 65px));
        }

        .cg-intro-open .cg-intro-right {
          transform:
            perspective(1600px)
            rotateY(4deg)
            translateX(calc(100% - 65px));
        }


        /* =====================================================
           RIBBONS
        ===================================================== */

        .cg-panel-ribbon {
          position: absolute;

          top: 0;
          bottom: 0;

          width: 35px;

          display: flex;

          pointer-events: none;

          z-index: 10;
        }

        .cg-ribbon-left {
          right: 0;
        }

        .cg-ribbon-right {
          left: 0;
        }

        .cg-stripe {
          flex: 1;
          height: 100%;
        }

        .stripe-gold {
          background-color: #000000;
        }


        /* =====================================================
           SEAL
        ===================================================== */

        .cg-intro-seal {
          position: absolute;

          /*
           * The seal center is exactly aligned with the
           * center of the 35px ribbon.
           *
           * 130px seal / 2 = 65px
           * ribbon center = 17.5px
           *
           * Therefore:
           * right = -(65 - 17.5) = -47.5px
           */
          top: 50%;
          right: -47.5px;

          transform: translateY(-50%);

          width: 130px;
          height: 130px;

          padding: 0;
          border: 0;

          background: transparent;

          cursor: pointer;

          z-index: 1100;

          display: flex;
          align-items: center;
          justify-content: center;

          pointer-events: auto;

          -webkit-tap-highlight-color: transparent;

          transition:
            filter 0.5s ease;
        }

        .cg-seal-outer,
        .cg-seal-inner {
          width: 100%;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cg-seal-image {
          width: 100%;
          height: 100%;

          object-fit: contain;

          display: block;

          transition: filter 0.5s ease;
        }

        /*
         * IMPORTANT:
         *
         * Do NOT move the seal when the panels open.
         * Because it is positioned relative to the left panel,
         * it naturally moves with the ribbon and remains
         * perfectly centered on it.
         */
        .cg-intro-open .cg-intro-seal {
          transform: translateY(-50%);

          /*
           * Keep the active seal above the intro panels.
           */
          z-index: 1300;

          /*
           * Once opened, the seal should no longer block
           * interaction with the page underneath.
           */
          pointer-events: none;
        }

        .cg-intro-open .cg-seal-image {
          filter:
            drop-shadow(
              2px 0 0 rgba(255, 0, 60, 0.55)
            )
            drop-shadow(
              -2px 0 0 rgba(0, 229, 255, 0.55)
            );
        }


        /* =====================================================
           SEAL HINT TEXT

           Sits below the seal, centered on the same ribbon
           axis. Uses "right: 17.5px" + "translateX(50%)"
           instead of mirroring the seal's own right offset,
           since 17.5px is the ribbon's center distance from
           the panel edge regardless of screen size — this
           keeps the hint aligned with the seal at every
           breakpoint without duplicating values.

           The glow is a STATIC text-shadow (never animated)
           to avoid the repaint/jank issues that animating
           shadow blur can cause on iOS Safari. Only opacity
           and transform (scale) are animated for the pulse,
           since those are cheap, GPU-friendly properties.
        ===================================================== */

        .cg-intro-hint {
          position: absolute;

          top: calc(50% + 85px);
          right: 17.5px;

          transform: translateX(50%);

          z-index: 1150;

          width: max-content;
          max-width: 200px;

          text-align: center;

          font-family: cinzel, serif;

          font-size: 1.5rem;

          font-weight: 600;

          letter-spacing: 0.09em;

          text-transform: uppercase;

          color: #a33418;

          text-shadow:
    -0.4px -0.6px 0 #ffffff;
    
          pointer-events: none;

          opacity: 1;

          animation: cg-hint-pulse 2.2s ease-in-out infinite;

          transition: opacity 0.4s ease;
        }

        .cg-intro-hint-hidden {
          opacity: 0;

          animation: none;
        }

        @keyframes cg-hint-pulse {
          0%, 100% {
            opacity: 0.6;
            transform: translateX(50%) scale(1);
          }

          50% {
            opacity: 1;
            transform: translateX(50%) scale(1.06);
          }
        }


        /* =====================================================
           TITLE
        ===================================================== */

        /*
         * Moved upward.
         *
         * The cylinder sits above this title in the stacking
         * order, so the cylinder can visually pass in front
         * of part of the title.
         */
        .cg-title {
          position: absolute;

          top: 150px;
          left: 50%;

          transform: translateX(-50%);

          z-index: 10;

          max-width: 92vw;

          font-family: "Cinzel", serif;

          font-size:
            clamp(2.6rem, 6.8vw, 5rem);

          line-height: 1;

          letter-spacing: -0.02em;

          font-weight: 600;

          color: #c4c4c4;

          pointer-events: none;

          text-align: center;

          white-space: nowrap;

          text-shadow:
            -1px -1px 1px rgba(255, 255, 255, 0.75),
            1px 1px 1px rgba(0, 0, 0, 0.35);

          mix-blend-mode: multiply;
        }


        /* =====================================================
           CYLINDER FRAME
        ===================================================== */

        /*
         * The frame itself has been moved upward.
         *
         * More importantly, the cylinder is positioned using
         * its own absolute position instead of using a
         * margin-top that fights with the rotation animation.
         */
        .cg-frame {
          position: absolute;

          top: 350px;
          left: 50%;

          transform: translateX(-50%);

          height: 430px;

          overflow: visible;

          flex-shrink: 0;

          z-index: 25;

          pointer-events: none;
        }

        .cg-scene {
          position: relative;

          width: 100%;
          height: 100%;

          display: block;

          transform-style: preserve-3d;
        }

        .cg-cylinder {
          position: absolute;

          top: -405px;
          left: 50%;

          width: 0;
          height: var(--panel-height, 1080px);

          transform-style: preserve-3d;

          animation:
            cg-spin linear infinite;

          transform-origin: center center;
        }

        .cg-panel {
          position: absolute;

          top: 0;
          left: 0;

          overflow: hidden;

          border-radius: 16px;

          transform-style: preserve-3d;

          backface-visibility: hidden;

          background: #111;
        }

        .cg-image {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: cover;
          object-position: center;

          user-select: none;

          -webkit-user-drag: none;
        }


        /* =====================================================
           HERO CTA
        ===================================================== */

        .cg-invite-btn {
          position: absolute;

          z-index: 45;

          bottom: 100px;
          left: 50%;

          transform: translateX(-50%);

          padding: 20px 30px;

          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif;

          font-size: 0.7rem;

          font-weight: 500;

          letter-spacing: 0.14em;

          text-transform: uppercase;

          color: #fff;

          background:
            rgba(20, 20, 20, 0.55);

          border:
            1px solid rgba(255, 255, 255, 0.75);

          text-decoration: none;

          border-radius: 50px;

          white-space: nowrap;

          transition:
            background 0.35s ease,
            color 0.35s ease,
            border-color 0.35s ease,
            transform 0.35s ease;
        }

        .cg-invite-btn:hover {
          background: #fff;

          color: #1a1a1a;

          border-color: #1a1a1a;

          transform:
            translateX(-50%)
            translateY(-2px);
        }


        /* =====================================================
           MUSIC TOGGLE
        ===================================================== */

        .cg-music-toggle {
          position: fixed;

          right: 24px;
          bottom: 24px;

          z-index: 900;

          width: 46px;
          height: 46px;

          border-radius: 50%;

          border:
            1px solid rgba(255, 255, 255, 0.6);

          background:
            rgba(20, 20, 20, 0.55);

          font-size: 1.1rem;

          cursor: pointer;

          display: flex;

          align-items: center;
          justify-content: center;

          transition:
            transform 0.25s ease;
        }

        .cg-music-toggle:hover {
          transform: scale(1.08);
        }


        /* =====================================================
           COUNTDOWN
        ===================================================== */

        .wc-countdown {
          position: relative;

          width:
            min(
              920px,
              calc(100% - 48px)
            );

          margin:
            0 auto;

          padding:
            34px 56px 42px;

          background: transparent;

          border-bottom:
            1px solid #550303;

          overflow: hidden;

          z-index: 0;
        }

                .wc-countdown {
          position: relative;
          z-index: 10;               /* well below seal (1200/1300) */
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.6s ease, visibility 0.6s ease;
        }

        .wc-countdown-visible {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        .wc-blob {
          position: absolute;

          top: -30%;
          right: -10%;

          width: 420px;
          height: 420px;

          border-radius:
            46% 54% 60% 40% /
            50% 45% 55% 50%;

          background:
            radial-gradient(
              circle at 40% 40%,
              rgba(85, 3, 3, 0.05),
              rgba(85, 3, 3, 0) 70%
            );

          pointer-events: none;
        }

        .wc-top-row {
          position: relative;

          z-index: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 100px;

          margin-bottom: 34px;

          font-family: "Cinzel", serif;

          font-size: 0.72rem;

          font-weight: 500;

          letter-spacing: 0.22em;

          text-transform: uppercase;
        }

        .wc-couple,
        .wc-date {
          color: #1a1a1a;
        }

        .wc-time {
          color: #1a1a1a;
        }

        .wc-numbers {
          position: relative;

          z-index: 0;

          display: flex;

          align-items: stretch;
          justify-content: center;

          gap: 36px;
        }

        .wc-unit {
          display: flex;

          flex-direction: column;

          align-items: center;

          min-width: 70px;
        }

        .wc-unit strong {
          font-family: "Cinzel", serif;

          font-size:
            clamp(
              2.4rem,
              5vw,
              3.6rem
            );

          font-weight: 600;

          color: #550303;

          line-height: 1;
        }

        .wc-unit span {
          margin-top: 12px;

          font-family: "Cinzel", serif;

          font-size: 0.72rem;

          letter-spacing: 0.16em;

          text-transform: uppercase;

          color: #1a1a1a;
        }

        .wc-line {
          width: 1px;

          background: #550303;

          opacity: 0.55;
        }


        /* =====================================================
           GENERAL SECTIONS
        ===================================================== */

        .site-section {
          width: 100%;

          padding:
            130px 96px;

          display: flex;

          justify-content: center;
        }

        .site-section-inner {
          width: 100%;

          max-width: 1100px;

          margin: 0 auto;
        }

        .site-section-top {
          display: flex;

          align-items: flex-start;

          justify-content: space-between;

          gap: 250px;

          margin-bottom: 56px;
        }

        /* The line sits under the text block only */
.site-section-top-with-line {
  margin-bottom: 0;
  padding-bottom: 28px;
  border-bottom: 1px solid #550303;
}

/* Space between the line and the images */
.site-section-top-with-line + .site-section-media {
  margin-top: 40px;
}

        .site-section-heading {
          flex: 0 0 360px;

          max-width: 360px;

          text-align: left;
        }

        .site-section-copy {
          flex: 1;

          display: flex;

          flex-direction: column;

          align-items: flex-start;

          text-align: left;

          padding-top: 24px;
        }

        .site-section-eyebrow {
          display: block;

          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif;

          font-size: 0.75rem;

          letter-spacing: 0.3em;

          text-transform: uppercase;

          color: #550303;

          margin-bottom: 16px;
        }

        .site-section-title {
          font-family: "Cinzel", serif;

          font-size:
            clamp(
              2rem,
              4vw,
              3rem
            );

          font-weight: 600;

          letter-spacing: 0.00em;

          color: #1a1a1a;

          margin: 0;
        }

        .site-section-body {
          max-width: 480px;

          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif;

          font-size: 1rem;

          line-height: 1.75;

          color: #4a4a4a;

          margin: 0 0 28px;
        }

        .site-section-cta,
        .wall-cta {
          padding:
            14px 30px;

          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif;

          font-size: 0.75rem;

          font-weight: 500;

          letter-spacing: 0.14em;

          text-transform: uppercase;

          color: #ffffff;

          background: #550303;

          text-decoration: none;

          border-radius: 50px;

          display: inline-flex;

          align-items: center;

          gap: 10px;

          transition:
            background 0.3s ease;
        }

        .site-section-cta:hover,
        .wall-cta:hover {
          background: #1a1a1a;
        }

        .cta-arrow {
          display: inline-block;

          transition:
            transform 0.25s ease;
        }

        .site-section-cta:hover .cta-arrow,
        .wall-cta:hover .cta-arrow {
          transform:
            translateX(4px);
        }

        .site-section-media {
          width: 100%;
        }


        /* =====================================================
           STORY IMAGE
        ===================================================== */

                .site-story-image {
          width: 100%;
          aspect-ratio: 16 / 7;
          background: #ddd;
          background-image: url('/story-image.jpg');
          background-size: cover;
          background-position: center;
          border-radius: 16px;
        }


       /* =====================================================
   SQUAD
===================================================== */

.squad-groups {
  display: flex;
  flex-direction: column;
  gap: 48px;

  
}

.squad-row-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
  

.squad-row-title {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
  font-size: 1.05rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #1a1a1a;
  margin: 0;
  
}

.squad-row-nav {
  display: flex;
  gap: 10px;
  
}

.squad-arrow {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #550303;
  background: transparent;
  color: #550303;
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.25s ease, color 0.25s ease;
}

.squad-arrow:hover:not(:disabled) {
  background: #550303;
  color: #fff;
}

.squad-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

  

/* ===== NEW SLIDING CAROUSEL ===== */

.squad-row-viewport {
  width: 100%;

  overflow-x: auto;
  overflow-y: hidden;

  scroll-snap-type: x mandatory;

  -webkit-overflow-scrolling: touch;

  /* Hide the scrollbar (Firefox) while keeping it scrollable */
  scrollbar-width: none;
}

/* Hide the scrollbar (WebKit/Blink/Safari) */
.squad-row-viewport::-webkit-scrollbar {
  display: none;
}

.squad-row-track {
  display: flex;
  gap: 14px;
}

/*
 * Fixed portrait height — identical on every device.
 * Width still flexes to fill the row (via the inline
 * flex-basis set in SquadRow), but the height itself
 * never changes with screen size, so the photos read as
 * a consistent portrait strip everywhere.
 */
.squad-photo {
  height: 480px;
  border-radius: 16px;
  overflow: hidden;
  background: #e2ded7;
  flex-shrink: 0;

  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.squad-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}



        /* =====================================================
           LOVE GALLERY
        ===================================================== */

        .wall-section-top {
          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          gap: 40px;

          margin-bottom: 36px;

          padding-bottom: 20px;

          border-bottom:
            1px solid #550303;
        }

        .wall-title {
          font-family: "Cinzel", serif;

          font-size:
            clamp(
              2.4rem,
              5.6vw,
              4.2rem
            );

          font-weight: 500;

          line-height: 1.05;

          color: #1a1a1a;

          margin: 0;

          max-width: 600px;
        }

        .wall-copy {
          display: flex;

          flex-direction: column;

          align-items: flex-start;

          text-align: left;

          max-width: 340px;

          flex-shrink: 0;

          padding-bottom: 0;
        }

        .wall-tagline {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif;

          font-size: 1rem;

          line-height: 1.6;

          color: #4a4a4a;

          margin: 0 0 14px;

          margin-bottom: 40px;
        }

        .wall-grid {
          display: grid;

          grid-template-columns:
            0.92fr 1.12fr 1fr;

          grid-template-rows:
            220px 235px;

          gap: 18px;

          overflow: visible;
        }

        .wall-item {
          position: relative;

          overflow: hidden;

          border-radius: 14px;

          border:
            2px solid
            rgba(255, 255, 255, 0.9);

          background-color: #ddd;

          background-size: cover;

          background-position: center;

          box-shadow:
            0 8px 20px
            rgba(0, 0, 0, 0.12);

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .wall-item::before {
          content: "";

          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              to top,
              rgba(0, 0, 0, 0.5),
              transparent 55%
            );
        }

        .wall-item-a {
          grid-column: 1 / 2;
          grid-row: 1 / 3;

          transform: rotate(-0.8deg);
        }

        .wall-item-b {
          grid-column: 2 / 3;
          grid-row: 1 / 2;

          transform: rotate(0.45deg);
        }

        .wall-item-c {
          grid-column: 3 / 4;
          grid-row: 1 / 2;

          transform: rotate(-0.35deg);
        }

        .wall-item-d {
          grid-column: 2 / 3;
          grid-row: 2 / 3;

          transform: rotate(-0.55deg);
        }

        .wall-item-e {
          grid-column: 3 / 4;
          grid-row: 2 / 3;

          transform: rotate(0.7deg);
        }

        .wall-caption {
          position: absolute;

          left: 14px;
          bottom: 14px;

          z-index: 1;

          color: #ffffff;

          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif;

          font-size: 0.7rem;

          font-weight: 600;

          letter-spacing: 0.14em;

          text-transform: uppercase;
        }

        .wall-caption::after {
          content: "";

          display: block;

          width: 26px;

          height: 1px;

          margin-top: 6px;

          background: #ffffff;

          opacity: 0.85;
        }

        @media (hover: hover) and (pointer: fine) {
          .wall-item:hover {
            transform:
              translateY(-3px)
              scale(1.01);

            box-shadow:
              0 0 0 3px #550303,
              0 12px 26px
              rgba(85, 3, 3, 0.35);
          }
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 1100px) {
          .cg-title {
            top: 200px;
          }

          .cg-frame {
            top: 300px;

            height: 2000px;
          }

          .cg-cylinder {
            top: -420px;
          }

          .site-section {
            padding:
              110px 56px;
          }
        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 900px) {

          .cg-outer {
            min-height: 620px;

            /*
             * Prevent unnecessary GPU compositing outside
             * the visible hero area.
             */
          }

                    .site-story-image {
            aspect-ratio: 4 / 5;
            min-height: 320px;
          }

          .site-section-top-with-line {
  padding-bottom: 24px;
}

.site-section-top-with-line + .site-section-media {
  margin-top: 32px;
}


          /* =================================================
             MOBILE INTRO
          ================================================= */

          .cg-intro-panel {
            /*
             * Smaller texture rendering workload.
             */
            background-size: auto 100%;

            box-shadow:
              inset 1px 1px 1px rgba(255, 255, 255, 0.3),
              inset -1px -1px 1px rgba(0, 0, 0, 0.2);
          }


          /*
           * Open panels farther on mobile so navigation is
           * completely accessible.
           */
          .cg-intro-open .cg-intro-left {
            transform:
              perspective(1200px)
              rotateY(-3deg)
              translateX(calc(-100% - 88px));
          }

          .cg-intro-open .cg-intro-right {
            transform:
              perspective(1200px)
              rotateY(3deg)
              translateX(calc(100% + 88px));
          }


          /*
           * Mobile seal.
           *
           * 118px / 2 = 59px.
           * Ribbon = 35px wide.
           * Ribbon center = 17.5px.
           *
           * 59 - 17.5 = 41.5px.
           *
           * This places the center of the seal directly
           * over the center of the ribbon.
           */
          .cg-intro-seal {
            width: 118px;
            height: 118px;

            right: -41.5px;
          }


          /*
           * DO NOT translate the seal independently when
           * opening. It remains locked to the ribbon.
           */
          .cg-intro-open .cg-intro-seal {
            transform: translateY(-50%);

            /*
             * Keep active seal above everything else.
             */
            z-index: 1300;

            /*
             * Do not let the opened seal intercept clicks.
             */
            pointer-events: none;
          }

          .cg-intro-hint {
            top: calc(50% + 77px);

            font-size: 0.64rem;

            max-width: 170px;
          }


          /* =================================================
             MOBILE TITLE
          ================================================= */

          .cg-title {
            top: 120px;

            font-size:
              clamp(
                3.6rem,
                8vw,
                3.6rem
              );

            white-space: normal;

            line-height: 1.15;

            padding:
              0 20px;

            width: 100%;
          }


          /* =================================================
             MOBILE CYLINDER
          ================================================= */

          .cg-frame {
            /*
             * Move the wedding invitation/cylinder upward.
             */
            top: 250px;

            height: 480px;

            width: 100% !important;

            /*
             * Keep only the required compositing layer.
             */
            transform:
              translateX(-50%);
          }

          .cg-cylinder {
            /*
             * Smaller cylinder means less 3D work while
             * retaining the same 12-panel structure.
             */
            top: -315px;

            /*
             * Reduce the visual 3D workload on mobile.
             * The animation remains fully active.
             */
            transform-origin: center center;

            animation:
              cg-spin-mobile linear infinite;

            will-change: transform;
          }

          /*
           * Mobile animation uses a smaller 3D scale.
           * 12 panels are still rendered.
           */
          @keyframes cg-spin-mobile {
            from {
              transform:
                scale(0.52)
                rotateY(0deg);
            }

            to {
              transform:
                scale(0.52)
                rotateY(360deg);
            }
          }

          /*
           * Keep panel compositing as lightweight as possible.
           */
          .cg-panel {
            border-radius: 12px;

            backface-visibility: hidden;

            transform-style: preserve-3d;
          }

          .cg-image {
            /*
             * Avoid unnecessary filtering/resampling work.
             */
            backface-visibility: hidden;
          }


          /* =================================================
             MOBILE HERO CTA
          ================================================= */

          .cg-invite-btn {
            bottom: 220px;

            padding:
              13px 22px;

            font-size: 0.6rem;
          }


          /* =================================================
             MOBILE COUNTDOWN
          ================================================= */

          .wc-countdown {
            /*
             * Pull countdown upward slightly.
             */
            margin-top: -160px;

            width:
              calc(100% - 32px);

            padding:
              24px 16px 28px;
          }

          .wc-top-row {
            flex-wrap: wrap;

            gap: 14px;

            margin-bottom: 24px;

            font-size: 0.6rem;
          }

          .wc-numbers {
            gap: 16px;
          }

          .wc-unit {
            min-width: 54px;
          }

          .wc-unit strong {
            font-size:
              clamp(
                1.6rem,
                8vw,
                2.2rem
              );
          }

          .wc-line {
            height: 40px;
          }


          /* =================================================
             GENERAL SECTIONS
          ================================================= */

          .site-section {
            padding:
              80px 28px;
          }

          .site-section-top {
            flex-direction: column;

            gap: 0;

            margin-bottom: 40px;
          }

          .site-section-copy {
            padding-top: 24px;
          }

          .site-section-heading {
            flex: none;

            max-width: none;
          }


          /* =================================================
             LOVE GALLERY
          ================================================= */

          .wall-section-top {
            flex-direction: column;

            align-items: flex-start;

            gap: 24px;
          }

          .wall-copy {
            align-items: flex-start;

            text-align: left;

            max-width: none;
          }

          .wall-grid {
            grid-template-columns:
              1fr 1fr;

            grid-template-rows:
              180px 150px 150px;

            gap: 14px;
          }

          .wall-item-a,
          .wall-item-b,
          .wall-item-c,
          .wall-item-d,
          .wall-item-e {
            transform: none;
          }

          .wall-item-a {
            grid-column: 1 / 3;
            grid-row: 1 / 2;
          }

          .wall-item-b {
            grid-column: 1 / 2;
            grid-row: 2 / 3;
          }

          .wall-item-c {
            grid-column: 2 / 3;
            grid-row: 2 / 3;
          }

          .wall-item-d {
            grid-column: 1 / 2;
            grid-row: 3 / 4;
          }

          .wall-item-e {
            grid-column: 2 / 3;
            grid-row: 3 / 4;
          }
        }


        /* =====================================================
           SMALL PHONES
        ===================================================== */

        @media (max-width: 420px) {

          .cg-outer {
            min-height: 590px;
          }

          .cg-title {
            top: 120px;

            font-size:
              clamp(
                3.2rem,
                9vw,
                2.0rem
              );
          }


          /* Move cylinder upward further on small phones. */
          .cg-frame {
            top: 150px;

            height: 520px;
          }

          .cg-cylinder {
            top: -290px;
          }


          /*
           * Same 12-panel cylinder, slightly smaller GPU load.
           */
          @keyframes cg-spin-mobile {
            from {
              transform:
                scale(0.47)
                rotateY(0deg);
            }

            to {
              transform:
                scale(0.47)
                rotateY(360deg);
            }
          }


          /* =================================================
             SMALL PHONE SEAL
          ================================================= */

          /*
           * The seal stays mathematically centered on the
           * 35px ribbon.
           */
          .cg-intro-seal {
            width: 108px;
            height: 108px;

            right: -37.5px;
          }

          .cg-intro-open .cg-intro-seal {
            transform: translateY(-50%);

            /*
             * Keep active seal above everything else.
             */
            z-index: 1300;

            /*
             * Do not let the opened seal intercept clicks.
             */
            pointer-events: none;
          }

          .cg-intro-hint {
            top: calc(50% + 70px);

            font-size: 0.6rem;

            max-width: 150px;
          }


          /* =================================================
             SMALL PHONE PANELS
          ================================================= */

          .cg-intro-open .cg-intro-left {
            transform:
              perspective(1100px)
              rotateY(-3deg)
              translateX(calc(-100% - 88px));
          }

          .cg-intro-open .cg-intro-right {
            transform:
              perspective(1100px)
              rotateY(3deg)
              translateX(calc(100% + 88px));
          }


          /* =================================================
             SMALL PHONE COUNTDOWN
          ================================================= */

          .wc-countdown {
            margin-top: -150px;
          }

          .wc-top-row {
            flex-wrap: wrap;
          }

          .wc-numbers {
            gap: 10px;
          }

          .wc-unit {
            min-width: 48px;
          }

          .wc-unit strong {
            font-size: 1.55rem;
          }

          .wc-unit span {
            font-size: 0.58rem;

            letter-spacing: 0.1em;
          }

          .wc-line {
            height: 32px;
          }
        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .cg-cylinder {
            animation: none !important;
          }

          .cg-intro-panel {
            transition: none;
          }

          .cg-intro-hint {
            animation: none;
          }
        }
      `}</style>

      <Footer />
      
    </>
  );
}
