import { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';
import HormoneGraph from '../components/HormoneGraph';
import { useNavigate } from 'react-router-dom';
import DesktopNavbar from '../components/DesktopNavBar';

export default function HomeDashboard() {
  const [homeData, setHomeData] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    const getHomeData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(
          'https://her-solace-api.vercel.app/api/cycle/prediction',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setHomeData(result.data);
        }
        else{
        //      localStorage.clear();
        //  navigate("/");
        }
      } catch (err) {
        // console.log(err);
        //  localStorage.clear();
         navigate("/");
      }
    };

    getHomeData();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();

   if (hour < 12) return 'Good Morning';
if (hour < 15) return 'Good Afternoon';
if (hour < 19) return 'Good Evening';
return 'Winding down for the night? Here’s how your day looked.';
  };

  if (isDesktop) {
    return (
      <DesktopView
        homeData={homeData}
        navigate={navigate}
        getGreeting={getGreeting}
      />
    );
  }

  return (
    <MobileView
      homeData={homeData}
      navigate={navigate}
      getGreeting={getGreeting}
    />
  );
}

////////////////////////////////////////////////////////////////
//////////////////// MOBILE VIEW (YOUR CURRENT UI) /////////////
////////////////////////////////////////////////////////////////

function MobileView({ homeData, navigate, getGreeting }) {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.graphCard}>
          <div style={styles.graphWrapper}>
            <HormoneGraph />
          </div>
        </div>

        <div style={styles.welcomeCard}>
          <h3 style={styles.welcomeTitle}>
            Hi {homeData?.username ?? 'there'}, {getGreeting()} 👋
          </h3>

          <p style={styles.welcomeText}>
            You are in Day {homeData?.currentDay} of your cycle — {homeData?.phase}
          </p>

          <p style={styles.welcomeSub}>
            {homeData?.cycleGuide?.daily_highlight}
            {/* {homeData?.cycleGuide?.physical_state} • {homeData?.cycleGuide?.mental_state} */}
          </p>
        </div>

        <div style={styles.grid}>
          <InfoCard title="Energy ✨" value={homeData?.cycleGuide?.energy} sub={homeData?.cycleGuide?.physical_state} />
          <InfoCard title="Mood 😊" value={homeData?.cycleGuide?.mood} sub={homeData?.cycleGuide?.mental_state} />
          <InfoCard title="Anxiety 🌿" value={homeData?.cycleGuide?.anxiety} sub={homeData?.cycleGuide?.anxiety_state} />
          <InfoCard title="Social 🤝" value={homeData?.cycleGuide?.focus} sub={homeData?.cycleGuide?.social_drive} />
        </div>

        <button style={styles.logButton} onClick={() => navigate('/log')}>
          ＋ Log Your Symptoms
        </button>

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

////////////////////////////////////////////////////////////////
//////////////////// DESKTOP VIEW //////////////////////////////
////////////////////////////////////////////////////////////////

function DesktopView({ homeData, navigate, getGreeting }) {
  return (
      <div>
           <DesktopNavbar />
    <div style={desktop.page}>
      <div style={desktop.container}>

        <div style={desktop.left}>
          <div style={styles.graphCard}>
            <HormoneGraph />
          </div>

          <div style={styles.welcomeCard}>
            <h3 style={styles.welcomeTitle}>
              Hi {homeData?.name ?? 'there'}, {getGreeting()} 👋
            </h3>

            <p style={styles.welcomeText}>
              Day {homeData?.currentDay} — {homeData?.phase}
            </p>

            <p style={styles.welcomeSub}>
              {homeData?.cycleGuide?.physical_state} • {homeData?.cycleGuide?.mental_state}
            </p>
          </div>

          <button
            style={styles.logButton}
            onClick={() => navigate('/log')}
          >
            ＋ Log Your Symptoms
          </button>
        </div>

        <div style={desktop.right}>
          <div style={desktop.grid}>
            <InfoCard title="Energy ✨" value={homeData?.cycleGuide?.energy} sub={homeData?.cycleGuide?.physical_state} />
            <InfoCard title="Mood 😊" value={homeData?.cycleGuide?.mood} sub={homeData?.cycleGuide?.mental_state} />
            <InfoCard title="Anxiety 🌿" value={homeData?.cycleGuide?.anxiety} sub="Common before period" />
            <InfoCard title="Social 🤝" value={homeData?.cycleGuide?.focus} sub={homeData?.cycleGuide?.social_drive} />
          </div>

          <div style={desktop.bottomRow}>
            <SmallCard title="Nutrition" desc={homeData?.cycleGuide?.nutrients} />
            <SmallCard title="Movement" desc={homeData?.cycleGuide?.physical_state} />
            <SmallCard title="Mindful Insight" desc={homeData?.cycleGuide?.mental_state} />
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}

////////////////////////////////////////////////////////////////
//////////////////// COMPONENTS ////////////////////////////////
////////////////////////////////////////////////////////////////

function InfoCard({ title, value, sub }) {
  return (
    <div style={styles.card}>
      <p style={styles.cardTitle}>{title}</p>
      <p style={styles.cardValue}>{value}</p>
      <p style={styles.cardSub}>{sub}</p>
    </div>
  );
}

function SmallCard({ title, desc }) {
  return (
    <div style={styles.smallCard}>
      <p style={styles.smallTitle}>{title}</p>
      <p style={styles.smallDesc}>{desc}</p>
    </div>
  );
}

////////////////////////////////////////////////////////////////
//////////////////// STYLES ///////////////////////////////////
////////////////////////////////////////////////////////////////

const styles = {
  page: { background: '#f4f1fa', minHeight: '100vh', paddingBottom: 90 },

  container: { maxWidth: 900, margin: 'auto', padding: 16 },

  graphCard: {
    background: '#fff',
    borderRadius: 24,
    padding: 18,
    marginBottom: 22,
    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
  },

  graphWrapper: { height: 220 },

  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },

  card: {
    background: '#fff',
    borderRadius: 20,
    padding: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },

  cardTitle: { fontSize: 12, color: '#a79bc8' },
  cardValue: { fontSize: 17, fontWeight: 700, color: '#3f3a56' },
  cardSub: { fontSize: 12, color: '#777' },

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

  smallTitle: { fontSize: 12, fontWeight: 600, color: '#4b3f72' },
  smallDesc: { fontSize: 11, color: '#777' },

  welcomeCard: {
    background: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },

  welcomeTitle: { color: '#5e4b8b' },
  welcomeText: { color: '#444' },
  welcomeSub: { fontSize: 12, color: '#777' },
};

const desktop = {
  page: {
    background: '#f4f1fa',
    minHeight: '100vh',
    padding: 40,
  },

  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 40,
    maxWidth: 1200,
    margin: 'auto',
  },

  left: {
    display: 'flex',
    flexDirection: 'column',
  },

  right: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
  },

  bottomRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 20,
  },
};