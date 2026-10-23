"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";

interface RegistryEntry {
  label: string;
  bank: string;
  accountName: string;
  account: string;
  number: string;
}

const registryEntries: RegistryEntry[] = [
  {
    label: "Nigerian Naira",
    bank: "Stanbic IBTC",
    accountName: "Rekpene Dickson and Praise Daniels",
    account: "Account Number",
    number: "0084795031",
  },
  {
    label: "US Dollars",
    bank: "ECOBANK",
    accountName: "Praise Daniels",
    account: "Account Number",
    number: "4470235051",
  },
];

const REGISTRY_URL = "https://withjoy.com/praise-and-reks/registry";

const DELIVERY_STATE = "Akwa Ibom";
const DELIVERY_CITY = "Uyo";
const DELIVERY_ADDRESS = "52 Ayaan Street, Afaha Okot Obio Nkan";

/* =====================================================
   DELIVERY MODAL STYLES
   Self-contained: every class starts with "dm-" so it
   never touches (or is touched by) your global CSS.

   To change the size or color of any text in the modal,
   edit the variables in the ".dm-card" block below.
====================================================== */
const modalCss = `
.dm-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(16, 32, 51, 0.55);
  animation: dm-fade 0.25s ease;
}

.dm-card {
  /* ---------- EDIT TEXT SIZES + COLORS HERE ---------- */

  /* "Delivery address" heading */
  --dm-title-size: clamp(1.6rem, 4vw, 2rem);
  --dm-title-color: #102033;

  /* Subheading */
  --dm-subtitle-size: 0.82rem;
  --dm-subtitle-color: #8a8177;

  /* Labels: State / City / Address */
  --dm-label-size: 0.62rem;
  --dm-label-color: #9a9187;

  /* State and City values */
  --dm-value-size: 1rem;
  --dm-value-color: #102033;

  /* The address itself */
  --dm-address-size: 1rem;
  --dm-address-color: #102033;

  /* Note above the Done button */
  --dm-note-size: 0.75rem;
  --dm-note-color: #8a8177;

  /* Copy button text */
  --dm-copy-size: 0.62rem;
  --dm-copy-color: #550303;

  /* Done button text */
  --dm-cta-size: 0.68rem;
  --dm-cta-color: #ffffff;

  /* ---------- END OF EDITABLE VALUES ---------- */

  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 480px;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  padding: 44px 30px 30px;
  border: 1px solid #550303;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 25px 70px rgba(32, 27, 19, 0.18);
  animation: dm-rise 0.3s ease;
}

.dm-close {
  position: absolute;
  top: 14px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  font-family: Arial, sans-serif;
  font-size: 0.8rem;
  color: #550303;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.dm-close:hover {
  opacity: 1;
}

/* Heading + subheading */
.dm-heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.dm-title {
  margin: 0 0 8px;
  font-family: "Cinzel", serif;
  font-size: var(--dm-title-size);
  font-weight: 400;
  line-height: 1.2;
  color: var(--dm-title-color);
}

.dm-subtitle {
  max-width: 340px;
  margin: 0;
  font-family: "SF-pro", sans-serif;
  font-size: var(--dm-subtitle-size);
  line-height: 1.6;
  color: var(--dm-subtitle-color);
}

.dm-divider {
  width: 100%;
  height: 1px;
  margin: 16px 0 22px;
  background: #550303;
}

/* Fields */
.dm-field {
  margin-bottom: 18px;
}

.dm-label {
  margin: 0 0 6px;
  font-family: "SF-pro", sans-serif;
  font-size: var(--dm-label-size);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--dm-label-color);
}

.dm-value {
  margin: 0;
  font-family: "Cinzel", serif;
  font-size: var(--dm-value-size);
  font-weight: 500;
  line-height: 1.4;
  color: var(--dm-value-color);
}

.dm-address-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.dm-address {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-family: "Cinzel", serif;
  font-size: var(--dm-address-size);
  font-weight: 500;
  line-height: 1.4;
  color: var(--dm-address-color);
}

/* Copy button */
.dm-copy {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 14px;
  border: 1px solid #550303;
  border-radius: 12px;
  background: transparent;
  font-family: "Cinzel", serif;
  font-size: var(--dm-copy-size);
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--dm-copy-color);
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;
}

.dm-copy:hover,
.dm-copy.dm-copied {
  background: #550303;
  color: #ffffff;
}

.dm-copy:hover {
  transform: translateY(-1px);
}

.dm-copy-icon {
  font-family: Arial, sans-serif;
  font-size: 0.8rem;
  line-height: 1;
}

/* Note */
.dm-note {
  margin: 0 0 32px;
  text-align: center;
  font-family: "SF-pro", sans-serif;
  font-size: var(--dm-note-size);
  line-height: 1.6;
  color: var(--dm-note-color);
}

/* Done button */
.dm-done {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
  padding: 15px 25px;
  border: 1px solid #550303;
  border-radius: 12px;
  background: #550303;
  font-family: "Cinzel", serif;
  font-size: var(--dm-cta-size);
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--dm-cta-color);
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;
}

.dm-done:not(:disabled):hover {
  background: #131313;
  transform: translateY(-2px);
}

.dm-done:disabled {
  background: #d9d3cb;
  border-color: #d9d3cb;
  cursor: not-allowed;
}

.dm-arrow {
  font-family: Arial, sans-serif;
  font-size: 1rem;
  line-height: 1;
  transition: transform 0.3s ease;
}

.dm-done:not(:disabled):hover .dm-arrow {
  transform: translate(3px, -3px);
}

@keyframes dm-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes dm-rise {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .dm-overlay {
    padding: 17px;
  }

  .dm-card {
    padding: 44px 24px 26px;
  }
}
`;

export default function RegistryPage() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);

  const copyAccountNumber = async (accountNumber: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedAccount(accountNumber);

      setTimeout(() => {
        setCopiedAccount(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy account number:", error);
    }
  };

  const openAddressModal = () => {
    setAddressCopied(false);
    setShowAddressModal(true);
  };

  const closeAddressModal = () => {
    setShowAddressModal(false);
  };

  const copyDeliveryAddress = async () => {
    try {
      await navigator.clipboard.writeText(DELIVERY_ADDRESS);
      setAddressCopied(true);
    } catch (error) {
      console.error("Failed to copy delivery address:", error);
    }
  };

  const handleDone = () => {
    if (!addressCopied) return;
    window.location.href = REGISTRY_URL;
  };

  // Close on Escape + lock background scroll while modal is open
  useEffect(() => {
    if (!showAddressModal) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowAddressModal(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [showAddressModal]);

  return (
    <main className="page-shell">
      <SiteNav />

      {/* HERO */}
      <section className="page-hero">
        <span className="page-eyebrow">Our Registry</span>

        <h1 className="page-title">
          We value your
          <br />
          display of love.
        </h1>

        <p className="page-subtitle">
          Your presence is the greatest gift, and we already feel so loved.
          But every new marriage needs a little capital to get things started.
          If you’d like to invest in our happily ever after, you can do so here.
        </p>
      </section>

      {/* FEATURED EXTERNAL REGISTRY */}
      <section className="registry-feature-section">
        <div className="registry-feature">
          {/* Wedding Logo */}
          <div className="registry-monogram" aria-hidden="true">
            <img src="/wedding-logo.png" alt="" className="registry-logo" />
          </div>

          <div className="feature-inner">
            <span className="feature-eyebrow">Our marriage Registry</span>

            <h2>
              A little something
              <br />
              from the heart.
            </h2>

            <div className="feature-divider">
              <span />
              <i>✦</i>
              <span />
            </div>

            <p>
              We've put together a collection of things we'd love
              to have as we begin this new chapter together.
              If you'd like to gift us something special,
              you'll find our registry below.
            </p>

            <button
              type="button"
              className="registry-cta"
              style={{ cursor: "pointer" }}
              onClick={openAddressModal}
              aria-haspopup="dialog"
            >
              <span>View Our Gift Registry</span>
              <span className="cta-arrow">↗</span>
            </button>

            <span className="external-note">
              You'll be redirected to our registry
            </span>
          </div>
        </div>
      </section>

      {/* CASH GIFTS */}
      <section className="cash-section">
        <div className="section-heading">
          <span className="section-eyebrow">Cash Gifts</span>

          <h2>If you'd like to bless us this way.</h2>

          <p>Your generosity means more to us than we can put into words.</p>
        </div>

        <div className="registry-list">
          {registryEntries.map((entry, i) => (
            <div className="registry-card" key={i}>
              <div className="card-icon">
                {i === 0 && "₦"}
                {i === 1 && "$"}
              </div>

              <div className="registry-label">{entry.label}</div>

              <div className="bank-name">{entry.bank}</div>

              {/* ACCOUNT NAME */}
              <div className="account-name-label">Account Name</div>

              <div className="account-name">{entry.accountName}</div>

              <div className="card-divider" />

              <div className="account-label">{entry.account}</div>

              <div className="account-number-row">
                <div className="account-number">{entry.number}</div>

                <button
                  type="button"
                  className={`copy-button ${
                    copiedAccount === entry.number ? "copied" : ""
                  }`}
                  onClick={() => copyAccountNumber(entry.number)}
                  aria-label={`Copy ${entry.bank} account number`}
                >
                  {copiedAccount === entry.number ? (
                    <>
                      <span className="copy-check">✓</span>
                      Copied
                    </>
                  ) : (
                    <>
                      <span className="copy-icon">⧉</span>
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING */}
      <section className="thank-you">
        <div className="closing-mark">✦</div>

        <h2>
          Your love is part of the
          <br />
          story we’re beginning.
        </h2>

        <p>Thank you for being part of the beginning of our forever.</p>
      </section>

      <Footer />

      {/* DELIVERY ADDRESS MODAL (styles live in modalCss above) */}
      {showAddressModal &&
        createPortal(
          <div
            className="dm-overlay"
            onClick={closeAddressModal}
            role="presentation"
          >
            <style>{modalCss}</style>

            <div
              className="dm-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="delivery-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="dm-close"
                onClick={closeAddressModal}
                aria-label="Close"
              >
                ✕
              </button>

              <div className="dm-heading">
                <h2 id="delivery-modal-title" className="dm-title">
                  Delivery address
                </h2>
                <p className="dm-subtitle">
                  These are the details to fill out in the home delivery option
                  on Jumia
                </p>
              </div>

              <div className="dm-divider" />

              <div className="dm-field">
                <div className="dm-label">State</div>
                <div className="dm-value">{DELIVERY_STATE}</div>
              </div>

              <div className="dm-field">
                <div className="dm-label">City</div>
                <div className="dm-value">{DELIVERY_CITY}</div>
              </div>

              <div className="dm-field">
                <div className="dm-label">Address</div>

                <div className="dm-address-row">
                  <div className="dm-address">{DELIVERY_ADDRESS}</div>

                  <button
                    type="button"
                    className={`dm-copy ${addressCopied ? "dm-copied" : ""}`}
                    onClick={copyDeliveryAddress}
                    aria-label="Copy delivery address"
                  >
                    {addressCopied ? (
                      <>
                        <span className="dm-copy-icon">✓</span>
                        Copied
                      </>
                    ) : (
                      <>
                        <span className="dm-copy-icon">⧉</span>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="dm-divider" />

              <p className="dm-note">
                Copy the address to proceed to the registry, and paste it in the
                address section at the home delivery option.
              </p>

              <button
                type="button"
                className="dm-done"
                onClick={handleDone}
                disabled={!addressCopied}
                aria-disabled={!addressCopied}
              >
                <span>Done</span>
                <span className="dm-arrow">↗</span>
              </button>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}
