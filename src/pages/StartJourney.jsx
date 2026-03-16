import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StartJourney() {
  const navigate = useNavigate();

  const TOTAL_STEPS = 6;

  const today = new Date();

  const [index, setIndex] = useState(0);

  const [data, setData] = useState({
    name: '',
    dob: today.toISOString().split('T')[0],
    lastPeriod: today.toISOString().split('T')[0],
    cycleLength: 28,
    bleedingDays: 5,
  });

  const getAgeGroup = (dob) => {
    const age = new Date().getFullYear() - new Date(dob).getFullYear();

    if (age <= 24) return '18–24';
    if (age <= 34) return '25–34';
    if (age <= 44) return '35–44';

    return '45+';
  };

  const next = () => {
    if (index === 1 && !data.name.trim()) {
      alert('Please enter your name');
      return;
    }

    if (index < TOTAL_STEPS - 1) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const finish = async () => {
    try {
      const token = localStorage.getItem('token');

      const ageGroup = getAgeGroup(data.dob);

      const body = {
        name: data.name,
        ageGroup: ageGroup,
        dateOfBirth: data.dob,
        lastPeriodDate: data.lastPeriod,
        cycleLengthDays: data.cycleLength,
        bleedingDays: data.bleedingDays,
        symptoms: '',
        healthGoals: '',
        diagnosedConditions: '',
        trackingSymptoms: '',
      };

      const response = await fetch('https://her-solace-api.vercel.app/api/journey/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        navigate('/home');
      } else {
        alert(result.message || 'Something went wrong');
      }
    } catch (err) {
      console.log(err);
      alert('Network error');
    }
  };

  const progress = (index / (TOTAL_STEPS - 1)) * 100;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>

        {/* STEP CONTENT */}

        {index === 0 && (
          <>
            <div style={styles.logo}>🌸</div>

            <h2 style={styles.title}>Her Solace</h2>

            <p style={styles.sub}>Decode Hormones - Discover You</p>

            <button style={styles.primaryBtn} onClick={next}>
              Start Journey
            </button>
          </>
        )}

        {index === 1 && (
          <>
            <p style={styles.step}>Step 1</p>

            <h2 style={styles.title}>What should we call you?</h2>

            <input
              style={styles.input}
              placeholder="Enter your name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </>
        )}

        {index === 2 && (
          <>
            <p style={styles.step}>Step 2</p>

            <h2 style={styles.title}>Date of Birth</h2>

            <input
              type="date"
              style={styles.input}
              value={data.dob}
              onChange={(e) => setData({ ...data, dob: e.target.value })}
            />
          </>
        )}

        {index === 3 && (
          <>
            <p style={styles.step}>Step 3</p>

            <h2 style={styles.title}>Last Period Date</h2>

            <input
              type="date"
              style={styles.input}
              value={data.lastPeriod}
              onChange={(e) => setData({ ...data, lastPeriod: e.target.value })}
            />
          </>
        )}

        {index === 4 && (
          <>
            <p style={styles.step}>Step 4</p>

            <h2 style={styles.title}>Cycle Length</h2>

            <h1 style={styles.big}>
              {data.cycleLength} <span style={{ fontSize: 18 }}>days</span>
            </h1>

            <input
              type="range"
              min="21"
              max="35"
              value={data.cycleLength}
              onChange={(e) => setData({ ...data, cycleLength: Number(e.target.value) })}
              style={{ width: '100%' }}
            />
          </>
        )}

        {index === 5 && (
          <>
            <p style={styles.step}>Final Step</p>

            <h2 style={styles.title}>How many days does your bleeding usually last?</h2>

            <h1 style={styles.big}>
              {data.bleedingDays} <span style={{ fontSize: 18 }}>days</span>
            </h1>

            <input
              type="range"
              min="2"
              max="10"
              value={data.bleedingDays}
              onChange={(e) => setData({ ...data, bleedingDays: Number(e.target.value) })}
              style={{ width: '100%' }}
            />
          </>
        )}

        {/* NAV BUTTONS */}

        <div style={styles.navRow}>
          {index > 0 && (
            <button style={styles.navBtn} onClick={prev}>
              ‹
            </button>
          )}

          {index < TOTAL_STEPS - 1 ? (
            <button style={styles.navBtn} onClick={next}>
              ›
            </button>
          ) : (
            <button style={{ ...styles.navBtn, ...styles.finishBtn }} onClick={finish}>
              ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#efe8f4',
  },

  card: {
    width: '100%',
    maxWidth: 450,
    background: '#fff',
    padding: 30,
    borderRadius: 20,
    textAlign: 'center',
  },

  logo: { fontSize: 45 },

  title: {
    fontSize: 22,
    fontWeight: 700,
    marginTop: 12,
  },

  sub: {
    color: '#6B7280',
  },

  step: {
    color: '#c08497',
    marginBottom: 6,
  },

  primaryBtn: {
    marginTop: 30,
    background: '#c08497',
    padding: 18,
    borderRadius: 30,
    border: 'none',
    color: '#fff',
    fontWeight: 700,
    cursor: 'pointer',
  },

  progressTrack: {
    width: '100%',
    height: 8,
    background: '#e5dce9',
    borderRadius: 20,
    marginBottom: 30,
  },

  progressFill: {
    height: 8,
    background: '#c08497',
    borderRadius: 20,
  },

  big: {
    fontSize: 42,
    fontWeight: 800,
    color: '#c08497',
    margin: '20px 0',
  },

  input: {
    padding: 16,
    border: '1px solid #c08497',
    borderRadius: 20,
    marginTop: 20,
    width: '90%',
  },

  navRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 40,
  },

  navBtn: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    background: '#fff',
    border: 'none',
    fontSize: 28,
    color: '#c08497',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },

  finishBtn: {
    background: '#c08497',
    color: '#fff',
  },
};
