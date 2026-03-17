import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OTPInput from '../components/OTPInput';

export default function RegisterOTPScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const { userDetails } = location.state || {};

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyOTP = async () => {
    if (otp.length !== 6) return;

    try {
      setLoading(true);

      const response = await fetch('https://her-solace-api.vercel.app/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          purpose: 'signup',
          otp: otp,
          userId: userDetails.userId,
        }),
      });

      const data = await response.json();

      if (data?.success) {
        localStorage.setItem('tempToken', data.token);
        navigate('/start-journey', {
          state: { userId: userDetails.userId },
        });
      } else {
        alert(data.message || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error('OTP API Error:', error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>🌸</div>

        <h2 style={styles.title}>Enter OTP</h2>

        <p style={styles.subtitle}>Sent to {userDetails?.contact}</p>

        {/* OTP INPUT COMPONENT */}

        <OTPInput length={6} value={otp} onChange={setOtp} />

        {/* VERIFY BUTTON */}

        <button
          style={{
            ...styles.button,
            opacity: otp.length !== 6 ? 0.5 : 1,
          }}
          disabled={otp.length !== 6 || loading}
          onClick={verifyOTP}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
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
    background: 'rgba(255,255,255,0.92)',
    borderRadius: 28,
    padding: 30,
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
  },

  logo: {
    fontSize: 38,
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 800,
    color: '#E8A6C9',
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
    marginBottom: 26,
  },

  button: {
    width: '100%',
    background: '#E8A6C9',
    padding: '15px',
    borderRadius: 16,
    border: 'none',
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: 20,
  },
};
