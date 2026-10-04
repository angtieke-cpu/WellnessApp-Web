import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OTPInput from '../components/OTPInput';

export default function OTPScreen() {
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
          purpose: 'login',
          otp: otp,
          userId: userDetails.userId,
        }),
      });

      const data = await response.json();

      if (data?.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);

        navigate('/home');
      } else {
        alert(data.message || 'Failed to verify OTP');
      }
    } catch (err) {
      console.log(err);
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

        {/* OTP INPUT */}

        <OTPInput length={6} value={otp} onChange={setOtp} />

        <button
          onClick={verifyOTP}
          disabled={otp.length !== 6 || loading}
          style={{
            ...styles.button,
            opacity: otp.length !== 6 ? 0.5 : 1,
          }}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
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
    background: 'rgba(255,255,255,0.92)',
    padding: 40,
    borderRadius: 28,
    textAlign: 'center',
    width: '100%',
    maxWidth: 420,
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
  },

  logo: {
    fontSize: 36,
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
    color: '#E8A6C9',
  },

  subtitle: {
    marginTop: 10,
    marginBottom: 20,
    color: '#666',
  },

  button: {
    width: '100%',
    background: '#E8A6C9',
    border: 'none',
    padding: '14px',
    borderRadius: 12,
    color: '#fff',
    fontSize: 16,
    cursor: 'pointer',
    marginTop: 10,
  },
};
