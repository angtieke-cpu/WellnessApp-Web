import { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';
import HormoneGraph from '../components/HormoneGraph';
import { useNavigate } from 'react-router-dom';

export default function HomeDashboard() {
  const [homeData, setHomeData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getHomeData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('https://her-solace-api.vercel.app/api/cycle/prediction', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result.success) {
          setHomeData(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getHomeData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* GRAPH */}

        <div style={styles.graphCard}>
          <div style={styles.graphWrapper}>
            <HormoneGraph />
          </div>
        </div>

        {/* WELCOME */}

        <div style={styles.welcomeCard}>
          <h3 style={styles.welcomeTitle}>
            Hi {homeData?.name ?? 'there'}, {getGreeting()} 👋
          </h3>

          <p style={styles.welcomeText}>
            You are in Day {homeData?.currentDay} of your cycle — {homeData?.phase}
          </p>

          <p style={styles.welcomeSub}>
            {homeData?.cycleGuide?.physical_state} • {homeData?.cycleGuide?.mental_state}
          </p>
        </div>

        {/* INFO GRID */}

        <div style={styles.grid}>
          <InfoCard title="Energy ✨" value={homeData?.cycleGuide?.energy} sub={homeData?.cycleGuide?.physical_state} />

          <InfoCard title="Mood 😊" value={homeData?.cycleGuide?.mood} sub={homeData?.cycleGuide?.mental_state} />

          <InfoCard title="Anxiety 🌿" value={homeData?.cycleGuide?.anxiety} sub="Common before period" />

          <InfoCard title="Social 🤝" value={homeData?.cycleGuide?.focus} sub={homeData?.cycleGuide?.social_drive} />
        </div>

        {/* LOG BUTTON */}

        <button style={styles.logButton} onClick={() => navigate('/log')}>
          <span style={styles.plus}>＋</span>
          Log Your Symptoms
        </button>

        {/* SMALL CARDS */}

        <div style={styles.bottomRow}>
          <SmallCard title="Nutrition" desc={homeData?.cycleGuide?.nutrients} />

          <SmallCard title="Movement" desc={homeData?.cycleGuide?.physical_state} />

          <SmallCard title="Mindful Insight" desc={homeData?.cycleGuide?.mental_state} />
        </div>
      </div>

      <BottomNav active="/home" />
    </div>
  );
}

/* INFO CARD */

function InfoCard({ title, value, sub }) {
  return (
    <div style={styles.card}>
      <p style={styles.cardTitle}>{title}</p>

      <p style={styles.cardValue}>{value}</p>

      <p style={styles.cardSub}>{sub}</p>
    </div>
  );
}

/* SMALL CARD */

function SmallCard({ title, desc }) {
  return (
    <div style={styles.smallCard}>
      <p style={styles.smallTitle}>{title}</p>

      <p style={styles.smallDesc}>{desc}</p>
    </div>
  );
}

const styles = {
  page: {
    background: '#f4f1fa',
    minHeight: '100vh',
    paddingBottom: 90,
  },

  container: {
    maxWidth: 900,
    margin: 'auto',
    padding: 16,
  },

  graphCard: {
    background: '#fff',
    borderRadius: 24,
    padding: 18,
    marginBottom: 22,
    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
  },

  graphWrapper: {
    height: 220,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  },

  card: {
    background: '#fff',
    borderRadius: 20,
    padding: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },

  cardTitle: {
    fontSize: 12,
    color: '#a79bc8',
  },

  cardValue: {
    fontSize: 17,
    fontWeight: 700,
    color: '#3f3a56',
  },

  cardSub: {
    fontSize: 12,
    color: '#777',
  },

  logButton: {
    background: '#c27ba0',
    border: 'none',
    padding: '16px 20px',
    borderRadius: 30,
    color: '#fff',
    fontWeight: 600,
    marginTop: 24,
    cursor: 'pointer',
    width: '100%',
  },

  plus: {
    fontSize: 20,
    marginRight: 6,
  },

  bottomRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 12,
    marginTop: 20,
  },

  smallCard: {
    background: '#fff',
    borderRadius: 18,
    padding: 14,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },

  smallTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: '#4b3f72',
  },

  smallDesc: {
    fontSize: 11,
    color: '#777',
  },

  welcomeCard: {
    background: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },

  welcomeTitle: {
    color: '#5e4b8b',
  },

  welcomeText: {
    color: '#444',
  },

  welcomeSub: {
    fontSize: 12,
    color: '#777',
  },
};
