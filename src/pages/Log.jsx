import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BottomNav from '../components/BottomNav';
import DesktopNavbar from '../components/DesktopNavBar';

const initialState = {
  cycle: {
    flow: 2,
    cramps: 2,
    bloating: false,
    symptoms: [],
  },
  emotional: {
    mood: '',
    energy: 3,
    feelings: [],
  },
  routine: {
    sleep: '',
    activity: [],
    stress: 3,
    water: 4,
  },
};

export default function Log() {
  const navigate = useNavigate();

  const [data, setData] = useState(initialState);
  const [original, setOriginal] = useState(initialState);

  const [openCard, setOpenCard] = useState('cycle');
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const resize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', resize);

    const loadData = async () => {
      try {
        const res = await fetch('https://her-solace-api.vercel.app/api/cycle/daily-log', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json();

        if (result.success && result.data) {
          setData(result.data.log_data);
          setOriginal(result.data.log_data);
        }
      } catch (e) {
        console.log(e);
      }

      setLoading(false);
    };

    loadData();

    return () => window.removeEventListener('resize', resize);
  }, []);

  const saveLog = async () => {
    console.log(data)
    try {
      await fetch('https://her-solace-api.vercel.app/api/cycle/daily-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      setOriginal(data);
    } catch (e) {
      console.log(e);
    }
  };

  const isDirty = JSON.stringify(data) !== JSON.stringify(original);

  const navigateGuard = (route) => {
    if (isDirty) {
      const confirmSave = window.confirm('You have unsaved symptom entries. Do you want to save them before leaving?');

      if (confirmSave) {
        saveLog();
      }
    }

    navigate(route);
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  const content = (
    <div style={styles.container}>
      <h2 style={styles.title} onClick={saveLog}>Log Your Symptoms</h2>

      {/* Cycle */}

      <Card
        title="Cycle Symptoms"
        icon="🩸"
        open={openCard === 'cycle'}
        onClick={() => setOpenCard(openCard === 'cycle' ? null : 'cycle')}
      >
        <Slider
          label="Flow"
          value={data.cycle.flow}
          onChange={(v) => setData({ ...data, cycle: { ...data.cycle, flow: v } })}
        />

        <Slider
          label="Cramps"
          value={data.cycle.cramps}
          onChange={(v) => setData({ ...data, cycle: { ...data.cycle, cramps: v } })}
        />

        <Toggle
          label="Bloating"
          value={data.cycle.bloating}
          onChange={(v) => setData({ ...data, cycle: { ...data.cycle, bloating: v } })}
        />

        <ChipGroup
          label="Symptoms"
          options={['Headache', 'Fatigue', 'Back Pain', 'Breast Tenderness']}
          selected={data.cycle.symptoms}
          onChange={(v) => setData({ ...data, cycle: { ...data.cycle, symptoms: v } })}
        />
      </Card>

      {/* Emotional */}

      <Card
        title="Emotional Symptoms"
        icon="💭"
        open={openCard === 'emotional'}
        onClick={() => setOpenCard(openCard === 'emotional' ? null : 'emotional')}
      >
        <EmojiGroup
          value={data.emotional.mood}
          onChange={(v) => setData({ ...data, emotional: { ...data.emotional, mood: v } })}
        />

        <Slider
          label="Energy"
          value={data.emotional.energy}
          onChange={(v) => setData({ ...data, emotional: { ...data.emotional, energy: v } })}
        />

        <ChipGroup
          label="Feelings"
          options={['Irritable', 'Anxious', 'Calm', 'Brain Fog', 'Motivated']}
          selected={data.emotional.feelings}
          onChange={(v) => setData({ ...data, emotional: { ...data.emotional, feelings: v } })}
        />
      </Card>

      {/* Routine */}

      <Card
        title="Routine Tracking"
        icon="🌙"
        open={openCard === 'routine'}
        onClick={() => setOpenCard(openCard === 'routine' ? null : 'routine')}
      >
        <ButtonGroup
          label="Sleep"
          options={['<5h', '6h', '7h', '8h+']}
          value={data.routine.sleep}
          onChange={(v) => setData({ ...data, routine: { ...data.routine, sleep: v } })}
        />

        <ChipGroup
          label="Activity"
          options={['Walking', 'Yoga', 'Gym', 'Rest']}
          selected={data.routine.activity}
          onChange={(v) => setData({ ...data, routine: { ...data.routine, activity: v } })}
        />

        <Slider
          label="Stress"
          value={data.routine.stress}
          onChange={(v) => setData({ ...data, routine: { ...data.routine, stress: v } })}
        />

        <Counter
          label="Water Glasses"
          value={data.routine.water}
          onChange={(v) => setData({ ...data, routine: { ...data.routine, water: v } })}
        />
      </Card>

       <button style={styles.button} onClick={saveLog}>
          Log Symptoms
        </button>

    </div>
  );

  if (isDesktop) {
    return (
      <div style={desktop.page}>
        <DesktopNavbar />

        <div style={desktop.container}>
          <div style={desktop.left}>{content}</div>

          <div style={desktop.right}>
            <p style={{ color: '#888' }}>Track daily symptoms to improve predictions.</p>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div style={styles.page}>
      {content}

      <BottomNav onNavigate={navigateGuard} active="log" />
    </div>
  );
}

/* COMPONENTS */

const Card = ({ title, icon, open, onClick, children }) => (
  <div style={styles.card}>
    <div style={styles.cardHeader} onClick={onClick}>
      <div>
        {icon} <b>{title}</b>
      </div>
      <span>{open ? '▲' : '▼'}</span>
    </div>
    {open && <div style={styles.cardBody}>{children}</div>}
  </div>
);

// const Slider = ({ label, value, onChange }) => (
//   <div style={styles.q}>
//     <p>{label}</p>
//     <input
//       type="range"
//       min="1"
//       max="5"
//       value={value}
//       onChange={(e) => onChange(Number(e.target.value))}
//       style={{ width: '100%' }}
//     />
//   </div>
// );


const Slider = ({ label, value, onChange, min = 1, max = 5 }) => (
  <div style={styles.q}>
    <p style={{ marginBottom: 6 }}>{label}</p>

    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{
        width: "100%",
        accentColor: "#c08497",
      }}
    />

    {/* VALUE TEXT */}
    <p
      style={{
        textAlign: "center",
        color: "#c08497",
        fontWeight: 600,
        marginTop: 6,
      }}
    >
      {value}/{max}
    </p>
  </div>
);
const Toggle = ({ label, value, onChange }) => (
  <div style={styles.row}>
    <p>{label}</p>

    <div
      style={{
        width: 46,
        height: 24,
        borderRadius: 20,
        background: value ? '#c08497' : '#ddd',
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        cursor: 'pointer',
      }}
      onClick={() => onChange(!value)}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#fff',
          transform: value ? 'translateX(22px)' : 'translateX(0)',
          transition: '0.2s',
        }}
      />
    </div>
  </div>
);

const ChipGroup = ({ label, options, selected, onChange }) => (
  <div style={styles.q}>
    <p>{label}</p>
    <div style={styles.chips}>
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => {
              const updated = active ? selected.filter((x) => x !== opt) : [...selected, opt];
              onChange(updated);
            }}
            style={{
              ...styles.chip,
              background: active ? '#c08497' : 'white',
              color: active ? 'white' : '#c08497',
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

const EmojiGroup = ({ value, onChange }) => {
  const emojis = ['😞', '😐', '🙂', '😄'];
  return (
    <div style={styles.q}>
      <p>Mood</p>
      <div style={styles.emojiRow}>
        {emojis.map((e) => (
          <button
            key={e}
            onClick={() => onChange(e)}
            style={{
              fontSize: 26,
              border: 'none',
              background: value === e ? '#f3e6f0' : 'white',
              borderRadius: 10,
              padding: 8,
            }}
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
};

const ButtonGroup = ({ label, options, value, onChange }) => (
  <div style={styles.q}>
    <p>{label}</p>
    <div style={styles.chips}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            ...styles.chip,
            background: value === opt ? '#c08497' : 'white',
            color: value === opt ? 'white' : '#c08497',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const Counter = ({ label, value, onChange }) => (
  <div style={styles.row}>
    <p>{label}</p>
    <div>
      <button onClick={() => onChange(Math.max(0, value - 1))}>-</button>
      <span style={{ margin: '0 10px' }}>{value}</span>
      <button onClick={() => onChange(value + 1)}>+</button>
    </div>
  </div>
);

/* STYLES */

const styles = {
  page: { background: '#f4f1fa', minHeight: '100vh' },
  container: { maxWidth: 700, margin: 'auto', padding: 20 },
  title: { color: '#5e4b8b' },
  card: { background: '#fff', borderRadius: 20, marginBottom: 16, boxShadow: '0 4px 10px rgba(0,0,0,0.08)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', padding: 18, cursor: 'pointer' },
  cardBody: { padding: 18 },
  q: { marginBottom: 20 },
  row: { display: 'flex', justifyContent: 'space-between', marginBottom: 20 },
  chips: { display: 'flex', flexWrap: 'wrap', gap: 10 },
  chip: { border: '1px solid #c08497', padding: '8px 14px', borderRadius: 12, cursor: 'pointer' },
  emojiRow: { display: 'flex', gap: 10 },
  loading: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  button: {
    width: "min(100%, 300px)",
    background: '#E8A6C9',
    padding: '15px',
    borderRadius: 16,
    border: 'none',
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
  },
};

const desktop = {
  page: { background: '#f5f5f7', minHeight: '100vh' },
  container: { maxWidth: 1100, margin: 'auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40, padding: 40 },
  left: {},
  right: { background: '#fff', padding: 30, borderRadius: 20 },

};
