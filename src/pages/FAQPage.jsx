import React, { useState } from 'react';
import './FAQPage.css';
import { Link } from "react-router-dom";

// Change this only if your existing download page uses a different route.
const DOWNLOAD_URL = '/download';
const logo_Src = "/heroBanner.jpeg";
const faqs = [
  { id: 1, title: 'Low Battery', question: 'I have things to do, but no energy to do them.', tip: 'Make it smaller.', answer: 'Drink some water, take a short break and start with one small task.' },
  { id: 2, title: 'Brain Fog', question: 'My brain has too many tabs open.', tip: 'Clear one tab.', answer: 'Write down your next step, silence distractions and focus on one thing.' },
  { id: 3, title: 'Mood Waves', question: 'I feel everything a little too much today.', tip: 'Give feelings room.', answer: 'Pause before reacting. Step away for a moment or talk to someone you trust.' },
  { id: 4, title: 'Sleep Debt', question: 'My body is here. My brain is still in bed.', tip: 'Choose gentle.', answer: "Get some daylight, move gently if you feel up to it, and protect tonight's sleep." },
  { id: 5, title: 'Stress Overload', question: 'Everything feels urgent. Everything feels too much.', tip: 'Not everything. Just next.', answer: 'Pick one priority. Let the rest wait until you have more capacity.' },
  { id: 6, title: 'Craving Comfort', question: "I want something comforting, and that's okay.", tip: "Respond, don't judge.", answer: 'Enjoy a satisfying snack or meal, and notice what else your body might need.' },
  { id: 7, title: 'Period Discomfort', question: 'My body needs a little extra care.', tip: 'Soften the day.', answer: 'Try a warm compress, rest and gentle movement if comfortable. Seek care for severe or unusual pain.' },
  { id: 8, title: 'Overthinking', question: 'My mind keeps replaying the same scene.', tip: 'Come back to now.', answer: 'Name one thing you can act on today. Give the rest permission to wait.' },
  { id: 9, title: 'Feeling Disconnected', question: "I don't quite feel like myself today.", tip: 'Reconnect gently.', answer: 'Step outside, listen to a favourite song or reach out to someone who feels safe.' },
  { id: 10, title: 'Full of Energy', question: 'Today, I feel ready to take on the world.', tip: 'Use your spark wisely.', answer: 'Tackle a meaningful priority, enjoy the momentum and remember to take breaks.' },
];

export default function FAQPage({ downloadUrl = DOWNLOAD_URL, logoSrc = logo_Src }) {
  const [openId, setOpenId] = useState(null);

  return (
    <main className="hs-faq-page">
      <div className="hs-faq-orb hs-faq-orb-one" aria-hidden="true" />
      <div className="hs-faq-orb hs-faq-orb-two" aria-hidden="true" />

      <header className="hs-faq-header">
        <a href="/HomePage" className="hs-faq-brand" aria-label="HerSolace home">
          {logoSrc ? <img src={logoSrc} alt="HerSolace" /> : <span>Her<span className="hs-faq-brand-accent">Solace</span></span>}
        </a>
        <a className="hs-faq-header-link" href="/HomePage">Back to Home <span aria-hidden="true">&#8962;</span></a>
      </header>

      <section className="hs-faq-hero" aria-labelledby="hs-faq-title">
        {/* <span className="hs-faq-eyebrow">FEEL IT. FLIP IT. TAKE IT WITH YOU.</span> */}
        <h1 id="hs-faq-title">How are you <em>feeling</em> today?</h1>
        <p>Whatever your day feels like, there's a gentle next step. Explore these little reminders, one feeling at a time.</p>
        <div className="hs-faq-count">✦ &nbsp; 10 gentle wellness reminders</div>
      </section>

      <section className="hs-faq-content" aria-label="Wellness questions and answers">
        <div className="hs-faq-section-heading">
          <div>
            <span className="hs-faq-kicker">YOUR WELLNESS CORNER</span>
            <h2>Find your little moment of calm</h2>
          </div>
          {/* <p>Tap a card to see what might help.</p> */}
        </div>

        <div className="hs-faq-list">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const panelId = `hs-faq-panel-${faq.id}`;
            return (
              
<article
  className={`hs-faq-card hs-faq-flip-card ${isOpen ? "is-open" : ""}`}
  key={faq.id}
>
  <div className="hs-faq-flip-inner">

    {/* FRONT */}
    <div className="hs-faq-flip-front">
      <h3 className="hs-faq-card-heading">
        <button
          type="button"
          className="hs-faq-trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setOpenId(isOpen ? null : faq.id)}
        >
          <span className="hs-faq-number">
            {String(faq.id).padStart(2, "0")}
          </span>

          <span className="hs-faq-trigger-copy">
            <span className="hs-faq-topic">
              {faq.title}
            </span>
            <span className="hs-faq-question">
              {faq.question}
            </span>
          </span>

          <span className="hs-faq-flip-icon" aria-hidden="true">
            ↗
          </span>
        </button>
      </h3>
    </div>

    {/* BACK */}
    <div
      className="hs-faq-flip-back"
      id={panelId}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <div className="hs-faq-flip-back-content">
        <span className="hs-faq-topic">{faq.title}</span>
        <h4>{faq.tip}</h4>
        <p>{faq.answer}</p>

        <div className="hs-faq-flip-actions">
          <a className="hs-faq-download" href={downloadUrl}>
            Download HerSolace <span aria-hidden="true">↗</span>
          </a>

          <button
            type="button"
            className="hs-faq-flip-back-btn"
            onClick={() => setOpenId(null)}
          >
            <span aria-hidden="true">↶</span> Back
          </button>
        </div>
      </div>
    </div>

  </div>
</article>


            );
          })}
        </div>
      </section>

      <footer className="hs-faq-footer">
        <div className="hs-faq-footer-brand">HerSolace</div>
        <p>Decode hormones. Discover you. · Menarche to menopause.</p>
        <small>Gentle wellness prompts, not medical diagnosis or advice.</small>
          <div className="hs-footer-bottom">
          <p>© {new Date().getFullYear()} hersolace. All rights reserved.</p>
          <nav className="hs-footer-legal" aria-label="Legal">
            <Link to="/terms">Terms &amp; Conditions</Link>
            <span aria-hidden="true">·</span>
            <Link to="/privacy">Privacy Policy</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
