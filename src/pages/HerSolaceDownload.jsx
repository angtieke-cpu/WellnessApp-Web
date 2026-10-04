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

  useEffect(() => {
    const detectedDevice = getDeviceType();
    setDevice(detectedDevice);

    let redirected = false;

    try {
      redirected =
        sessionStorage.getItem(REDIRECT_KEY) === "true";
    } catch (error) {
      console.log("Session storage unavailable");
    }

    setAlreadyRedirected(redirected);

    // Automatically open the correct store only on the first visit
    // from an iOS or Android device.
    if (
      (detectedDevice === "ios" || detectedDevice === "android") &&
      !redirected
    ) {
      try {
        sessionStorage.setItem(REDIRECT_KEY, "true");
      } catch (error) {
        console.log("Unable to save redirect state");
      }

      const storeUrl =
        detectedDevice === "ios"
          ? APP_STORE_LINK
          : GOOGLE_PLAY_LINK;

      window.location.replace(storeUrl);
    }
  }, []);

  const isMobile = device === "ios" || device === "android";

  const storeName = "HerSolace";

  const storeNote =
    device === "ios"
      ? alreadyRedirected
        ? "HerSolace is available on the App Store"
        : "Opening HerSolace in the App Store…"
      : device === "android"
        ? alreadyRedirected
          ? "HerSolace is available on Google Play"
          : "Opening HerSolace in Google Play…"
        : "Choose your app store";

  const appleButtonText =
    device === "ios" && !alreadyRedirected
      ? "Open App Store"
      : device === "ios"
        ? "Continue to App Store"
        : "Download on the App Store";

  const androidButtonText =
    device === "android" && !alreadyRedirected
      ? "Open Google Play"
      : device === "android"
        ? "Continue to Google Play"
        : "Get it on Google Play";

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
            src="logo.png"
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
