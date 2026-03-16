import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      navigate('/home', { replace: true });
    }
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img src="/well_logo.jpeg" style={styles.logo} alt="logo" />

        <h1 style={styles.title}>Her Solace</h1>

        <p style={styles.subtitle}>Decode Hormones — Discover You</p>

        <p style={styles.smallText}>Hormonal Intelligence for Every Stage of Womanhood</p>

        <button style={styles.primaryButton} onClick={() => navigate('/login')}>
          Login
        </button>

        <button
          style={styles.secondaryButton}
          onClick={() => {
            if (!acceptedTerms) {
              alert('Please accept Terms & Privacy Policy to continue.');
              return;
            }

            navigate('/register');
          }}
        >
          Create Account
        </button>

        <div style={styles.termsRow}>
          <div
            style={{
              ...styles.checkbox,
              ...(acceptedTerms ? styles.checkboxChecked : {}),
            }}
            onClick={() => setAcceptedTerms(!acceptedTerms)}
          >
            {acceptedTerms && <span style={styles.checkmark}>✓</span>}
          </div>

          <p style={styles.termsText}>
            I accept the{' '}
            <span style={styles.link} onClick={() => navigate('/terms')}>
              Terms & Conditions
            </span>{' '}
            and{' '}
            <span style={styles.link} onClick={() => navigate('/privacy')}>
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(180deg,#F9E7F0,#E8A6C9)',
    padding: 20,
  },

  card: {
    width: '100%',
    maxWidth: 420,
    background: 'rgba(255,255,255,0.9)',
    borderRadius: 28,
    padding: 30,
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
  },

  logo: {
    height: 80,
    width: 80,
    marginBottom: 16,
    objectFit: 'contain',
  },

  title: {
    fontSize: 26,
    fontWeight: 800,
    color: '#E8A6C9',
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 14,
    color: '#444',
    marginTop: 6,
  },

  smallText: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    marginBottom: 30,
  },

  primaryButton: {
    width: '100%',
    background: '#E8A6C9',
    padding: '14px',
    borderRadius: 16,
    border: 'none',
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 14,
    cursor: 'pointer',
  },

  secondaryButton: {
    width: '100%',
    border: '1.5px solid #E8A6C9',
    padding: '14px',
    borderRadius: 16,
    background: 'white',
    color: '#E8A6C9',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
  },

  termsRow: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },

  checkbox: {
    width: 22,
    height: 22,
    border: '2px solid #E8A6C9',
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },

  checkboxChecked: {
    background: '#E8A6C9',
  },

  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  termsText: {
    fontSize: 12,
    color: '#555',
  },

  link: {
    color: '#E8A6C9',
    fontWeight: 600,
    cursor: 'pointer',
  },
};
