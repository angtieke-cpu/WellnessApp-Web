import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

// Self-contained FAQ page: JSX + styles in one file.
// Public HerSolace API integration; no login token is sent.
const HOME_URL = "/HomePage";
const DOWNLOAD_URL = "/download";
const BANNER_URL = "/heroBanner.jpeg";
const API_BASE_URL = "https://api.hersolace.care";

const NAV_LINKS = [
  { label: "Home", to: HOME_URL },
  { label: "About", to: `${HOME_URL}#about` },
  { label: "How It Works", to: `${HOME_URL}#tutorial` },
  { label: "Join Beta", to: `${HOME_URL}#beta`, cta: true },
];

const faqs = [
  { id: 1, title: "Low Battery", question: "I have things to do, but no energy to do them.", tip: "Make it smaller.", answer: "Drink some water, take a short break and start with one small task." },
  { id: 2, title: "Brain Fog", question: "My brain has too many tabs open.", tip: "Clear one tab.", answer: "Write down your next step, silence distractions and focus on one thing." },
  { id: 3, title: "Mood Waves", question: "I feel everything a little too much today.", tip: "Give feelings room.", answer: "Pause before reacting. Step away for a moment or talk to someone you trust." },
  { id: 4, title: "Sleep Debt", question: "My body is here. My brain is still in bed.", tip: "Choose gentle.", answer: "Get some daylight, move gently if you feel up to it, and protect tonight's sleep." },
  { id: 5, title: "Stress Overload", question: "Everything feels urgent. Everything feels too much.", tip: "Not everything. Just next.", answer: "Pick one priority. Let the rest wait until you have more capacity." },
  { id: 6, title: "Craving Comfort", question: "I want something comforting, and that's okay.", tip: "Respond, don't judge.", answer: "Enjoy a satisfying snack or meal, and notice what else your body might need." },
  { id: 7, title: "Period Discomfort", question: "My body needs a little extra care.", tip: "Soften the day.", answer: "Try a warm compress, rest and gentle movement if comfortable. Seek care for severe or unusual pain." },
  { id: 8, title: "Overthinking", question: "My mind keeps replaying the same scene.", tip: "Come back to now.", answer: "Name one thing you can act on today. Give the rest permission to wait." },
  { id: 9, title: "Feeling Disconnected", question: "I don't quite feel like myself today.", tip: "Reconnect gently.", answer: "Step outside, listen to a favourite song or reach out to someone who feels safe." },
  { id: 10, title: "Full of Energy", question: "Today, I feel ready to take on the world.", tip: "Use your spark wisely.", answer: "Tackle a meaningful priority, enjoy the momentum and remember to take breaks." },
];

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700;800&display=swap');
.hs-faq-page{--faq-plum:#673c85;--faq-pink:#e84e92;--faq-ink:#382b47;--faq-muted:#756b80;min-height:100vh;background:linear-gradient(160deg,#fffafd,#faf5ff 45%,#fff9fb);color:var(--faq-ink);font-family:Manrope,Arial,sans-serif;line-height:1.55}
.hs-faq-page *{box-sizing:border-box}
.hs-faq-page a{text-decoration:none}
.hs-faq-site-header{position:relative;background:#fff;border-bottom:1px solid #f0e5f0;padding:70px 24px 20px}
.hs-faq-site-nav{position:absolute;right:max(24px,calc((100vw - 1152px)/2));top:18px;display:flex;align-items:center;gap:25px;z-index:5}
.hs-faq-site-nav a{color:#45364f;font-size:13px;font-weight:700}
.hs-faq-site-nav a:hover{color:var(--faq-pink)}
.hs-faq-site-nav .hs-faq-nav-cta{background:linear-gradient(110deg,#794394,#e4549b);padding:9px 18px;border-radius:999px;color:#fff}
.hs-faq-banner{display:block;max-width:1100px;margin:0 auto}
.hs-faq-banner img{display:block;width:100%;height:auto;object-fit:contain}
.hs-faq-menu-toggle{display:none;border:0;background:transparent;cursor:pointer;padding:9px}
.hs-faq-menu-toggle span{display:block;width:24px;height:2px;margin:5px 0;background:var(--faq-plum)}
.hs-faq-hero{max-width:850px;margin:48px auto 42px;padding:0 24px;text-align:center}
.hs-faq-hero h1{font:500 clamp(37px,5vw,65px)/1.13 Fraunces,Georgia,serif;letter-spacing:-1.6px;margin:0 0 18px;color:var(--faq-plum)}
.hs-faq-hero h1 em{color:var(--faq-pink);font-weight:400}
.hs-faq-hero p{max-width:600px;margin:0 auto;color:var(--faq-muted);font-size:16px}
.hs-faq-content{max-width:960px;margin:0 auto 85px;padding:0 24px}
.hs-faq-section-heading{text-align:center;margin:0 0 20px}
.hs-faq-section-heading h2{font:500 clamp(23px,3vw,32px)/1.25 Fraunces,Georgia,serif;color:var(--faq-plum);margin:0}
/* Sticky CTA remains above the questions while the list scrolls below it. */
.hs-faq-floating-bar{position:sticky;top:12px;z-index:15;display:flex;justify-content:center;padding:12px 0 18px;pointer-events:none}
.hs-faq-decode-btn{pointer-events:auto;display:inline-flex;align-items:center;justify-content:center;min-width:155px;padding:12px 27px;border:0;border-radius:999px;background:linear-gradient(105deg,#794394,#e4549b);color:#fff;font:800 14px Manrope,Arial,sans-serif;cursor:pointer;box-shadow:0 12px 26px rgba(181,72,143,.24);animation:hs-faq-float 3s ease-in-out infinite}
.hs-faq-decode-btn:hover{filter:brightness(1.07);animation-play-state:paused}
.hs-faq-decode-btn:focus-visible,.hs-faq-trigger:focus-visible,.hs-faq-close:focus-visible{outline:3px solid #b967ad;outline-offset:3px}
@keyframes hs-faq-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
.hs-faq-list{display:grid;gap:13px}
.hs-faq-card{background:#fff;border:1px solid #eee1f1;border-radius:16px;overflow:hidden;box-shadow:0 4px 18px rgba(84,43,107,.045);transition:border-color .25s,box-shadow .25s}
.hs-faq-card.is-open{border-color:#e6bfdf;box-shadow:0 8px 25px rgba(112,52,130,.07)}
.hs-faq-card-heading{margin:0;font-size:inherit}
.hs-faq-trigger{display:flex;align-items:center;gap:14px;text-align:left;width:100%;min-height:78px;padding:14px 20px;border:0;background:transparent;color:inherit;cursor:pointer;font:inherit}
.hs-faq-number{flex:0 0 38px;width:38px;height:38px;display:grid;place-items:center;border-radius:11px;background:#f7e9f7;color:var(--faq-plum);font-weight:800;font-size:13px}
.hs-faq-card:nth-child(3n+2) .hs-faq-number{background:#e8ecfb}
.hs-faq-card:nth-child(3n) .hs-faq-number{background:#fde8ef}
.hs-faq-trigger-copy{flex:1;min-width:0;display:grid;gap:3px}
.hs-faq-topic{color:var(--faq-plum);font-size:10px;font-weight:800;letter-spacing:1px;text-transform:uppercase}
.hs-faq-question{font-size:15px;font-weight:700;line-height:1.4;color:#45364f}
.hs-faq-chevron{display:grid;place-items:center;flex:0 0 30px;width:30px;height:30px;color:#a881b6;transition:transform .3s ease}
.hs-faq-chevron.rotated{transform:rotate(180deg)}
.hs-faq-accordion{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .35s ease,opacity .25s ease}
.hs-faq-accordion.expanded{grid-template-rows:1fr;opacity:1}
.hs-faq-accordion-inner{min-height:0;overflow:hidden}
.hs-faq-answer{margin:0 20px 18px 72px;padding:16px 0 0;border-top:1px solid #f0e8f0;text-align:left}
.hs-faq-answer {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: left;
}

.hs-faq-answer button {
  align-self: center;
  margin-top: 20px;
}
.hs-faq-answer h4{font-size:19px;margin:0 0 6px;color:var(--faq-plum);text-align:left}
.hs-faq-answer p{font-size:14px;line-height:1.6;color:#5b5062;margin:0 0 16px;text-align:left}
.hs-faq-answer .hs-faq-decode-btn{padding:10px 19px;font-size:12px;min-width:132px;animation:none;box-shadow:0 6px 18px rgba(181,72,143,.18)}
.hs-faq-site-footer{background:#fff;border-top:1px solid #eee5ee}
.hs-faq-footer-top{max-width:1152px;margin:auto;padding:32px 24px 0;display:flex;align-items:center;justify-content:space-between;gap:18px;font-size:12px;color:#756b80}
.hs-faq-footer-logo{font:600 18px Fraunces,Georgia,serif;color:#45364f}
.hs-faq-footer-nav{display:flex;gap:16px;flex-wrap:wrap;justify-content:center}
.hs-faq-footer-nav a,.hs-faq-footer-legal a{font-size:12px;font-weight:600;color:#67586b}
.hs-faq-footer-nav a:hover,.hs-faq-footer-legal a:hover{color:var(--faq-pink)}
.hs-faq-footer-bottom{max-width:1152px;margin:24px auto 0;padding:20px 24px 28px;border-top:1px solid #f0e5f0;display:flex;align-items:center;justify-content:space-between;gap:14px;color:#92859a;font-size:12px}
.hs-faq-footer-bottom p{margin:0}
.hs-faq-footer-legal{display:flex;align-items:center;gap:10px}
.hs-faq-modal-overlay{position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:20px;background:rgba(39,24,51,.5);backdrop-filter:blur(4px)}
.hs-faq-modal{position:relative;width:min(100%,460px);max-height:90vh;overflow:auto;background:#fff;border-radius:22px;padding:30px;box-shadow:0 25px 70px rgba(39,24,51,.25)}
.hs-faq-close{position:absolute;right:16px;top:12px;background:transparent;border:0;font-size:28px;color:#756b80;cursor:pointer}
.hs-faq-modal h2{font:500 28px Fraunces,Georgia,serif;color:var(--faq-plum);margin:0 25px 8px 0}
.hs-faq-modal-intro{font-size:13px;color:#756b80;margin:0 0 20px}
.hs-faq-lead-form{display:grid;gap:13px}
.hs-faq-field{display:grid;gap:5px}
.hs-faq-field label{font-size:12px;font-weight:700;color:#45364f}
.hs-faq-field input{width:100%;border:1px solid #e5d9e8;border-radius:10px;padding:12px;font:14px Manrope,Arial,sans-serif;color:#382b47;background:#fff}
.hs-faq-phone-wrap{display:flex;align-items:stretch;border:1px solid #e5d9e8;border-radius:10px;overflow:hidden;background:#fff}
.hs-faq-phone-prefix{display:flex;align-items:center;gap:7px;padding:0 12px;background:#f8f3fa;border-right:1px solid #e5d9e8;color:#45364f;font:600 14px Manrope,Arial,sans-serif;white-space:nowrap}
.hs-faq-field .hs-faq-phone-input{border:0;border-radius:0;min-width:0;flex:1}
.hs-faq-phone-wrap:focus-within{outline:2px solid #c39bce;outline-offset:1px}
.hs-faq-field .hs-faq-phone-input:focus{outline:none}
.hs-faq-field input:focus{outline:2px solid #c39bce;outline-offset:1px}
.hs-faq-lead-error{font-size:12px;color:#b42346;margin:0}
.hs-faq-submit{width:100%;margin-top:6px;animation:none}
.hs-faq-submit:disabled{opacity:.65;cursor:wait}
.hs-faq-privacy{font-size:11px;color:#86778d;margin:0}
@media(max-width:900px){.hs-faq-footer-top{flex-direction:column;text-align:center}}
@media(max-width:767px){.hs-faq-site-header{padding:64px 12px 16px}.hs-faq-menu-toggle{display:block;position:absolute;top:12px;right:16px;z-index:8}.hs-faq-site-nav{display:none;position:absolute;top:54px;right:14px;left:14px;background:#fff;border:1px solid #eee1f1;border-radius:15px;padding:15px;box-shadow:0 12px 30px rgba(84,43,107,.13);flex-direction:column;gap:15px;align-items:stretch}.hs-faq-site-nav.is-open{display:flex}.hs-faq-site-nav a{text-align:center}.hs-faq-hero{margin:38px auto 32px}.hs-faq-hero p{font-size:15px}.hs-faq-content{padding:0 14px;margin-bottom:55px}.hs-faq-trigger{min-height:70px;padding:12px 14px;gap:11px}.hs-faq-number{flex-basis:34px;width:34px;height:34px}.hs-faq-question{font-size:14px}.hs-faq-chevron{flex-basis:24px;width:24px}.hs-faq-answer{margin:0 14px 16px 59px;padding-top:14px}.hs-faq-answer h4{font-size:17px}.hs-faq-answer p{font-size:13px}.hs-faq-footer-bottom{flex-direction:column;text-align:center}.hs-faq-modal{padding:24px}}
@media(prefers-reduced-motion:reduce){.hs-faq-decode-btn{animation:none}.hs-faq-card,.hs-faq-chevron,.hs-faq-accordion{transition:none}}

.hs-faq-flip-hint{font-size:11px;color:#8f779c;font-weight:600}
.hs-faq-contact-hint{margin:0;font-size:12px;color:#756b80}
.hs-faq-flip-back{cursor:pointer}
.hs-faq-flip-back .hs-faq-decode-btn{cursor:pointer}
/* Compact flip cards: short fronts, left-aligned answers and no large empty area. */
.hs-faq-flip-card{perspective:1200px;overflow:visible;background:transparent;border:0;box-shadow:none!important}
.hs-faq-flip-inner{position:relative;height:96px;transform-style:preserve-3d;transition:transform .5s cubic-bezier(.22,.7,.25,1),height .3s ease}
.hs-faq-flip-card.is-open .hs-faq-flip-inner{height:190px;transform:rotateY(180deg)}
.hs-faq-flip-front,.hs-faq-flip-back{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border:1px solid #eee1f1;border-radius:16px;box-shadow:0 4px 18px rgba(84,43,107,.045);overflow:hidden}
.hs-faq-flip-front{background:#fff}
.hs-faq-flip-front .hs-faq-trigger{height:100%;min-height:0;padding:12px 18px}
.hs-faq-turn-icon{flex:0 0 25px;text-align:center;color:#a881b6;font-size:24px}
.hs-faq-flip-back{transform:rotateY(180deg);background:linear-gradient(115deg,#fff8fc,#f7f0ff);border-color:#e6bfdf;padding:13px 20px;display:flex;flex-direction:column;text-align:left}
.hs-faq-back-top{display:flex;justify-content:space-between;align-items:center;gap:10px}
.hs-faq-turn-back{border:0;background:transparent;color:#794394;font-size:22px;cursor:pointer;padding:0 5px;line-height:1.2}
.hs-faq-flip-back .hs-faq-answer{border:0;padding:0;margin:2px 0 0;min-width:0}
.hs-faq-flip-back .hs-faq-answer h4{font-size:17px;margin:0 0 4px;line-height:1.25}
.hs-faq-flip-back .hs-faq-answer p{font-size:13px;line-height:1.45;margin:0 0 10px}
.hs-faq-flip-back .hs-faq-decode-btn{padding:8px 16px;min-width:115px;font-size:11px}
.hs-faq-flip-back:focus-within,.hs-faq-flip-front:focus-within{outline:2px solid #b967ad;outline-offset:2px}
@media(max-width:640px){.hs-faq-flip-inner{height:90px}.hs-faq-flip-card.is-open .hs-faq-flip-inner{height:215px}.hs-faq-flip-front .hs-faq-trigger{padding:10px 13px}.hs-faq-flip-back{padding:12px 14px}.hs-faq-flip-back .hs-faq-answer p{font-size:12px}}
@media(prefers-reduced-motion:reduce){.hs-faq-flip-inner{transition:none}}

/* Discover buttons: header beside the mobile menu, and below the questions. */
.hs-faq-header-discover{position:absolute;top:15px;left:max(24px,calc((100vw - 1152px)/2));z-index:7;animation:none;padding:9px 17px;font-size:12px;min-width:0}
.hs-faq-bottom-cta{display:flex;justify-content:center;margin-top:30px}
.hs-faq-front-hint{font-size:10px;font-weight:700;color:#a177ad;white-space:nowrap}
.hs-faq-flip-front .hs-faq-trigger{gap:10px}
.hs-faq-flip-front .hs-faq-trigger-copy{min-width:0}
@media(max-width:767px){.hs-faq-header-discover{top:12px;left:auto;right:150px;padding:12px 27px;font-size:11px}.hs-faq-front-hint{font-size:9px;max-width:57px;white-space:normal;text-align:center}}

`;

export default function FAQPage({
  downloadUrl = DOWNLOAD_URL,
  logoSrc = BANNER_URL,
  apiBaseUrl = API_BASE_URL,
}) {
  const [openId, setOpenId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(true);
  const [lead, setLead] = useState({ name: "", contact: "" });
  const [leadId, setLeadId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [actionError, setActionError] = useState("");
  const [trackingDecode, setTrackingDecode] = useState(false);
  const firstQuestionRef = useRef(null);
  const pendingDecodeRef = useRef(undefined);
  const decodeInProgressRef = useRef(false);

  const postApi = async (path, payload) => {
    const response = await fetch(`${apiBaseUrl.replace(/\/$/, "")}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success !== true) {
      throw new Error(result.message || `Request failed (${response.status})`);
    }
    return result;
  };

  // The router shared by the backend exposes /leads and /track.
  // Set the correct mount prefix here (e.g. /api/user or /api/faq).
  const FAQ_ROUTE_PREFIX = "/api/user"; // Change if your app mounts this router elsewhere.
  const faqPost = (endpoint, payload) => postApi(`${FAQ_ROUTE_PREFIX}/${endpoint}`, payload);
  const trackEvent = (id, eventType, questionId = null) =>
    faqPost("track", { leadId: id, eventType, questionId });

  const handleFlip = (faq) => {
    if (openId === faq.id) {
      setOpenId(null);
      return;
    }
    setOpenId(faq.id);
    if (firstQuestionRef.current === null) {
      firstQuestionRef.current = faq.id;
      if (leadId) {
        trackEvent(leadId, "question_opened", faq.id).catch((error) => {
          setActionError(`Unable to record the first question: ${error.message}`);
        });
      }
    }
  };

  const completeDecode = async (id, questionId) => {
    if (decodeInProgressRef.current) return;
    decodeInProgressRef.current = true;
    setTrackingDecode(true);
    // Navigate even when analytics fail. Tracking must not block the download.
    try {
      await trackEvent(id, "decode_more_clicked", questionId);
    } catch (error) {
      console.warn("FAQ discover tracking failed:", error);
    } finally {
      window.location.assign(downloadUrl);
    }
  };

  const handleDecodeMore = (faq = null) => {
    if (trackingDecode) return;
    const questionId = faq?.id ?? null;
    if (!leadId) {
      pendingDecodeRef.current = questionId;
      setFormError("");
      setShowLeadForm(true);
      return;
    }
    void completeDecode(leadId, questionId);
  };

  const closeDecode = () => {
    if (!saving) {
      pendingDecodeRef.current = undefined;
      setShowLeadForm(false);
    }
  };

  const handleLeadSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    const name = lead.name.trim();
    const contact = lead.contact.trim();
    // One field accepts either email or an Indian phone number.
    const email = contact.includes("@") ? contact : "";
    const mobileNumber = email ? "" : contact.replace(/^\+91[\s-]?/, "").replace(/\s/g, "");
    // No frontend format validation; the API remains responsible for validation.
    try {
      setSaving(true);
      const response = await faqPost("leads", { name, mobileNumber, email });
      const id = response.data?.leadId;
      if (!id) throw new Error("Lead ID missing from API response");
      setLeadId(id);
      setShowLeadForm(false);

      // A visitor may have browsed a card before submitting the popup.
      // Save that first click now that the lead has an ID.
      if (firstQuestionRef.current !== null) {
        try {
          await trackEvent(id, "question_opened", firstQuestionRef.current);
        } catch (error) {
          setActionError(`Contact saved, but the first FAQ click was not recorded: ${error.message}`);
        }
      }

      const pendingQuestionId = pendingDecodeRef.current;
      pendingDecodeRef.current = undefined;
      if (pendingQuestionId !== undefined) {
        await completeDecode(id, pendingQuestionId);
      }
    } catch (error) {
      setFormError(error?.message || "Unable to save your details. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="hs-faq-page">
      <style>{styles}</style>

      <header className="hs-faq-site-header">
        <button
          type="button"
          className="hs-faq-menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="hs-faq-main-nav"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span /><span /><span />
        </button>
        <nav
          id="hs-faq-main-nav"
          className={`hs-faq-site-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Main"
        >
          {NAV_LINKS.map(({ label, to, cta }) => (
            <Link
              key={to}
              to={to}
              className={cta ? "hs-faq-nav-cta" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <button type="button" className="hs-faq-header-discover hs-faq-decode-btn" onClick={() => handleDecodeMore()} disabled={trackingDecode}>Decode More</button>
        <Link className="hs-faq-banner" to={HOME_URL} aria-label="HerSolace home">
          <img src={logoSrc} alt="HerSolace — Decode Hormones, Discover You" />
        </Link>
      </header>

      <section className="hs-faq-hero" aria-labelledby="hs-faq-title">
        <h1 id="hs-faq-title">How are you <em>feeling</em> today?</h1>
        <p>Whatever your day feels like, there's a gentle next step. Explore these little reminders, one feeling at a time.</p>
      </section>

      <section className="hs-faq-content" aria-label="Wellness questions and answers">
        <div className="hs-faq-section-heading">
          <h2>Find your little moment of calm</h2>
        </div>

        {actionError && <p className="hs-faq-lead-error" role="alert">{actionError}</p>}

        <div className="hs-faq-list">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const panelId = `hs-faq-panel-${faq.id}`;
            return (
              <article className={`hs-faq-card hs-faq-flip-card ${isOpen ? "is-open" : ""}`} key={faq.id}>
                <div className="hs-faq-flip-inner">
                  <div className="hs-faq-flip-front" aria-hidden={isOpen} inert={isOpen}>
                    <button
                      type="button"
                      className="hs-faq-trigger"
                      aria-label={`Show answer for ${faq.title}`}
                      aria-expanded={isOpen}
                      onClick={() => handleFlip(faq)}
                    >
                      <span className="hs-faq-number">{String(faq.id).padStart(2, "0")}</span>
                      <span className="hs-faq-trigger-copy">
                        <span className="hs-faq-topic">{faq.title}</span>
                        <span className="hs-faq-question">{faq.question}</span>
                      </span>
                      <span className="hs-faq-front-hint">Tap to discover</span>
                    </button>
                  </div>
                  <div className="hs-faq-flip-back" aria-hidden={!isOpen} inert={!isOpen} onClick={(event) => { if (!event.target.closest("button, a")) setOpenId(null); }} onKeyDown={(event) => { if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); setOpenId(null); } }} tabIndex={isOpen ? 0 : -1} aria-label={`Tap to flip ${faq.title} back to question`}>
                    <div className="hs-faq-back-top">
                      {/* <span className="hs-faq-topic">{String(faq.id).padStart(2, "0")} · {faq.title}</span> */}
                      {/* <span className="hs-faq-flip-hint">Tap card to flip back</span> */}
                    </div>
                    <div className="hs-faq-answer">
                      <h4>{faq.tip}</h4>
                      <p>{faq.answer}</p>
                      <button type="button" className="hs-faq-decode-btn" onClick={() => handleDecodeMore(faq)}>Decode More</button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="hs-faq-bottom-cta">
          <button type="button" className="hs-faq-decode-btn" onClick={() => handleDecodeMore()} disabled={trackingDecode}>Decode More</button>
        </div>
      </section>

      <footer className="hs-faq-site-footer">
        <div className="hs-faq-footer-top">
          <Link to={HOME_URL} className="hs-faq-footer-logo">HerSolace</Link>
          <span>Decode hormones. Discover you. · Menarche to menopause.</span>
          <nav className="hs-faq-footer-nav" aria-label="Footer">
            <Link to={HOME_URL}>Home</Link>
            <Link to={`${HOME_URL}#about`}>About</Link>
            <Link to={`${HOME_URL}#tutorial`}>How It Works</Link>
            <Link to={`${HOME_URL}#beta`}>Join Beta</Link>
          </nav>
        </div>
        <div className="hs-faq-footer-bottom">
          <p>© {new Date().getFullYear()} HerSolace. All rights reserved.</p>
          <nav className="hs-faq-footer-legal" aria-label="Legal">
            <Link to="/terms">Terms &amp; Conditions</Link>
            <span aria-hidden="true">·</span>
            <Link to="/privacy">Privacy Policy</Link>
          </nav>
        </div>
      </footer>

      {showLeadForm && (
        <div
          className="hs-faq-modal-overlay"
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) closeDecode(); }}
        >
          <div className="hs-faq-modal" role="dialog" aria-modal="true" aria-labelledby="hs-faq-modal-title">
            <button type="button" className="hs-faq-close" onClick={closeDecode} aria-label="Close form">×</button>
            <h2 id="hs-faq-modal-title">Discover more with HerSolace</h2>
            <form className="hs-faq-lead-form" onSubmit={handleLeadSubmit}>
              <div className="hs-faq-field">
                <input id="hs-lead-name" name="name" autoComplete="name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} placeholder="Your name" />
              </div>
              <div className="hs-faq-field">
                <input id="hs-lead-contact" name="contact" autoComplete="on" value={lead.contact} onChange={(e) => setLead({ ...lead, contact: e.target.value })} placeholder="🇮🇳 +91 Mobile number or email" />
              </div>
              {formError && <p className="hs-faq-lead-error" role="alert">{formError}</p>}
              <button type="submit" className="hs-faq-decode-btn hs-faq-submit" disabled={saving || trackingDecode}>
                {saving ? "Saving..." : "Continue"}
              </button>

            </form>
          </div>
        </div>
      )}
    </main>
  );
}
