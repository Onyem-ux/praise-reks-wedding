"use client";

import React, { useState } from "react";
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

export default function RegistryPage() {
const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

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

return ( <main className="page-shell"> <SiteNav />

```
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
        <img
          src="/wedding-logo.png"
          alt=""
          className="registry-logo"
        />
      </div>

      <div className="feature-inner">
        <span className="feature-eyebrow">
          Our marriage Registry
        </span>

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

        <a
          href="https://withjoy.com/praise-and-reks/registry"
          className="registry-cta"
        >
          <span>View Our Gift Registry</span>
          <span className="cta-arrow">↗</span>
        </a>

        <span className="external-note">
          You'll be redirected to our registry
        </span>
      </div>
    </div>
  </section>

  {/* CASH GIFTS */}
  <section className="cash-section">
    <div className="section-heading">
      <span className="section-eyebrow">
        Cash Gifts
      </span>

      <h2>
        If you'd like to bless us this way.
      </h2>

      <p>
        Your generosity means more to us than we can put into words.
      </p>
    </div>

    <div className="registry-list">
      {registryEntries.map((entry, i) => (
        <div className="registry-card" key={i}>

          <div className="card-icon">
            {i === 0 && "₦"}
            {i === 1 && "$"}
          </div>

          <div className="registry-label">
            {entry.label}
          </div>

          <div className="bank-name">
            {entry.bank}
          </div>

          {/* ACCOUNT NAME */}
          <div className="account-name-label">
            Account Name
          </div>

          <div className="account-name">
            {entry.accountName}
          </div>

          <div className="card-divider" />

          <div className="account-label">
            {entry.account}
          </div>

          <div className="account-number-row">
            <div className="account-number">
              {entry.number}
            </div>

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
    <div className="closing-mark">
      ✦
    </div>

    <h2>
      Your love is part of the
      <br />
      story we’re beginning.
    </h2>

    <p>
      Thank you for being part of the beginning of our forever.
    </p>
  </section>

  <Footer />
  
</main>

);
}
