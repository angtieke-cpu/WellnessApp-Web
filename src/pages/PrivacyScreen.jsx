import { useNavigate } from 'react-router-dom';

export default function PrivacyScreen() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2>Privacy Policy</h2>

        <button style={styles.close} onClick={() => navigate('/')}>
          ✕
        </button>
      </div>

      <div style={styles.content}>
        <p>
          <b>Last Updated: March 16, 2026</b>
        </p>

        <p>
          This Privacy Policy describes how Ikriskshetra Private Limited collects and protects your information when you
          use the Her Solace application.
        </p>

        <h3>1. Information We Collect</h3>

        <p>
          • Name (optional)
          <br />
          • Email address
          <br />
          • Phone number for verification
          <br />• Age or age range
        </p>

        <h3>Health and Wellness Data</h3>

        <p>
          Users may log menstrual cycle information, symptoms, mood patterns, lifestyle habits and other wellness data
          to generate insights.
        </p>

        <h3>2. How We Use Information</h3>

        <p>
          • Provide personalized wellness insights
          <br />
          • Improve the application
          <br />• Maintain security and authentication
        </p>

        <h3>3. AI Generated Insights</h3>

        <p>Insights generated are informational only and not medical advice.</p>

        <h3>4. Data Security</h3>

        <p>We implement reasonable safeguards to protect user data.</p>

        <h3>5. Data Sharing</h3>

        <p>We do not sell personal data. Data may be shared with trusted infrastructure providers.</p>

        <h3>6. Contact</h3>

        <p>
          Ikriskshetra Private Limited
          <br />
          support@ikriskshetra.com
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 800,
    margin: 'auto',
    padding: 20,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  close: {
    border: 'none',
    background: 'none',
    fontSize: 20,
    cursor: 'pointer',
  },

  content: {
    marginTop: 20,
    lineHeight: 1.6,
  },
};
