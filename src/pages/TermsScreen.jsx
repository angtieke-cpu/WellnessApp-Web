import React from "react";
import { useNavigate } from "react-router-dom";

export default function TermsScreen() {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>Terms & Conditions</h2>

        <button style={styles.close} onClick={() => navigate("/")}>
          ✕
        </button>
      </div>

      {/* Content */}
      <div style={styles.container}>
        <p style={styles.text}>
          Welcome to Her Solace. By using this application you agree to the
          following terms:
          <br />
          <br />
          1. This app provides health insights based on menstrual cycle data.
          <br />
          <br />
          2. The information presented within the application is intended for
          educational and wellness purposes only.
          <br />
          <br />
          3. The application does not provide medical diagnosis or treatment and
          should not replace professional medical advice from qualified
          healthcare providers.
          <br />
          <br />
          4. Your data may be stored securely and used to improve the accuracy of
          insights and user experience.
          <br />
          <br />
          5. Users must be at least 13 years of age to use this application.
          Users under 18 should use the app with parental or guardian supervision
          where required.
          <br />
          <br />
          6. Continued use of the Her Solace application indicates acceptance of
          these terms.
        </p>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <button style={styles.cancelBtn} onClick={() => navigate("/")}>
          Close
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottom: "1px solid #eee",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 700,
  },

  close: {
    fontSize: 20,
    color: "#555",
    background: "none",
    border: "none",
    cursor: "pointer",
  },

  container: {
    flex: 1,
    padding: 20,
    overflowY: "auto",
  },

  text: {
    fontSize: 14,
    lineHeight: "22px",
    color: "#333",
  },

  footer: {
    padding: 16,
  },

  cancelBtn: {
    backgroundColor: "#c08497",
    padding: 14,
    borderRadius: 12,
    border: "none",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    width: "100%",
  },
};