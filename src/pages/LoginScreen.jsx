import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginScreen() {
  const navigate = useNavigate();

  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    if (!contact) {
      alert('Please enter phone number');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('https://her-solace-api.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: Number(contact),
        }),
      });

      const data = await response.json();

      if (data?.success) {
        navigate('/otp', {
          state: {
            userDetails: {
              userId: data.userId,
              contact: contact,
            },
          },
        });
      } else if (data.message === 'User not found, please signup') {
        alert('User not found. Please create an account');
        // navigate('/register');
         localStorage.clear();
         navigate("/");
      } else {
        alert(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.log(err);
      alert('Something went wrong');
       localStorage.clear();
         navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.gradient}>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.logo}>🌸</div>

          <h2 style={styles.title}>Welcome Back</h2>

          <p style={styles.subtitle}>Login using your mobile number</p>

          <input
            type="tel"
            placeholder="Enter Phone Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            maxLength={10}
            style={styles.input}
          />

          <button style={styles.button} onClick={sendOTP} disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>

          <button style={styles.registerLink} onClick={() => navigate('/register')}>
            Don't have an account? Register
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  gradient: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg,#F9E7F0,#E8A6C9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    width: '100%',
    maxWidth: 420,
    padding: 20,
  },

  card: {
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

  input: {
    width: '90%',
    border: '1.5px solid #E8A6C9',
    background: '#fff',
    padding: 14,
    borderRadius: 16,
    fontSize: 16,
    marginBottom: 20,
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
  },

  registerLink: {
    marginTop: 18,
    background: 'none',
    border: 'none',
    color: '#E8A6C9',
    fontWeight: 600,
    cursor: 'pointer',
  },
};
