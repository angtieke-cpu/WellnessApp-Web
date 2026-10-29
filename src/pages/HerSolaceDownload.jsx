
import { useEffect, useState } from "react";
import "./HerSolaceDownload.css";

const APP_STORE_LINK =
  "https://apps.apple.com/in/app/hersolace/id6767090399";

const GOOGLE_PLAY_LINK =
  "https://play.google.com/store/apps/details?id=com.wellness.hersolace";

const REDIRECT_KEY = "hersolace_download_store_redirected";

function getDeviceType() {
  const userAgent = navigator.userAgent || "";
  const platform =
    navigator.userAgentData?.platform || navigator.platform || "";

  const isAndroid =
    /android/i.test(userAgent) || /android/i.test(platform);

  const isIOS =
    /iphone|ipad|ipod/i.test(userAgent) ||
    (/mac/i.test(platform) && navigator.maxTouchPoints > 1);

  if (isIOS) return "ios";
  if (isAndroid) return "android";
  return "desktop";
}

export default function HerSolaceDownload() {
  const [device, setDevice] = useState("desktop");
  const [alreadyRedirected, setAlreadyRedirected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const detectedDevice = getDeviceType();
  setDevice(detectedDevice);

  // Android: Redirect to Google Play Store
  if (detectedDevice === "android") {
    window.location.replace(GOOGLE_PLAY_LINK);
    return;
  }

  // iPhone / iPad: Redirect to Apple App Store
  if (detectedDevice === "ios") {
    window.location.replace(APP_STORE_LINK);
    return;
  }

  // Desktop: Show the normal download page
  setIsLoading(false);
}, []);

  const isMobile = device === "ios" || device === "android";

  const storeName = "HerSolace";

  const storeNote =
  device === "ios"
    ? "Opening HerSolace in the App Store..."
    : device === "android"
      ? "Opening HerSolace in Google Play..."
      : "Choose your app store";
  
const appleButtonText = "Download on the App Store";
const androidButtonText = "Get it on Google Play";

  // Loading screen shown before device detection completes
if (isLoading) {
  return (
    <main className="hersolace-download hs-loading-page">
      <div className="hs-download-loading">
        <img
          src="/logo.png"
          alt="HerSolace"
          className="hs-loading-logo"
        />

        <h2>Opening HerSolace</h2>

        <p>
          {device === "ios"
            ? "Taking you to the Apple App Store..."
            : device === "android"
              ? "Taking you to Google Play Store..."
              : "Preparing your download options..."}
        </p>

        <div className="hs-download-spinner" />
      </div>
    </main>
  );
}

  return (
    <main className="hersolace-download">
      <p className="eyebrow">Beta launch</p>

      <h1>Be among the first to try HerSolace</h1>

      <section
        className="store-panel"
        aria-label="Download HerSolace"
      >
        <div className="brand-mark">
          <img
            src="/logo.png"
            alt="HerSolace logo"
          />
        </div>

        <p className="store-name">{storeName}</p>

        <p className="store-note">{storeNote}</p>

        <div
          className={`store-buttons ${
            isMobile ? "single" : ""
          }`}
        >
          {device !== "android" && (
            <a
              className="download-link"
              href={APP_STORE_LINK}
              onClick={() => {
                try {
                  sessionStorage.setItem(
                    REDIRECT_KEY,
                    "true"
                  );
                } catch {
                  // Ignore storage errors.
                }
              }}
            >
              {appleButtonText}
            </a>
          )}

          {device !== "ios" && (
            <a
              className="download-link"
              href={GOOGLE_PLAY_LINK}
              onClick={() => {
                try {
                  sessionStorage.setItem(
                    REDIRECT_KEY,
                    "true"
                  );
                } catch {
                  // Ignore storage errors.
                }
              }}
            >
              {androidButtonText}
            </a>
          )}
        </div>
      </section>

      <footer>
        Reach us at{" "}
        <a href="mailto:support@hersolace.care">
          support@hersolace.care
        </a>
      </footer>
    </main>
  );
}
