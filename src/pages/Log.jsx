import { useState, useEffect, useRef } from 'react';
import BottomNav from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';

/* ---------------- TOGGLE ---------------- */

function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 50,
        height: 26,
        borderRadius: 20,
        background: value ? '#c08497' : '#ddd',
        display: 'flex',
        alignItems: 'center',
        padding: 3,
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          background: '#fff',
          marginLeft: value ? 24 : 2,
        }}
      />
    </div>
  );
}

/* ---------------- SLIDER QUESTION ---------------- */

function SliderQuestion({ index, label, value, onChange, min = 1, max = 5 }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <p style={{ fontWeight: 600 }}>
        {index}. {label}
      </p>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%' }}
      />

      <p style={{ textAlign: 'center' }}>
        {value} / {max}
      </p>
    </div>
  );
}

/* ---------------- CHIP GROUP ---------------- */

function ChipGroup({ index, question, options, selected, onChange }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <p style={{ fontWeight: 600 }}>
        {index}. {question}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {options.map((item) => {
          const active = selected.includes(item);

          return (
            <button
              key={item}
              onClick={() => {
                let updated;

                if (active) {
                  updated = selected.filter((x) => x !== item);
                } else {
                  updated = [...selected, item];
                }

                onChange(updated);
              }}
              style={{
                border: '1px solid #c08497',
                padding: '8px 14px',
                borderRadius: 12,
                background: active ? '#c08497' : 'transparent',
                color: active ? '#fff' : '#c08497',
                cursor: 'pointer',
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- CARD ---------------- */

function Card({ title, icon, keyName, openCard, toggleCard, children }) {
  const active = openCard === keyName;

  return (
    <div
      style={{
        borderRadius: 22,
        marginBottom: 18,
        background: active ? '#fff' : '#efe7f1',
      }}
    >
      <div
        onClick={() => toggleCard(keyName)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 18,
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>{icon}</span>
          <span style={{ fontWeight: 600 }}>{title}</span>
        </div>

        <span>{active ? '▲' : '▼'}</span>
      </div>

      {active && <div style={{ padding: 18 }}>{children}</div>}
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function Log() {
  const navigate = useNavigate();

  const [openCard, setOpenCard] = useState('cycle');

  const [data, setData] = useState({
    cycle: { pain: 3, flow: 2, bloating: false, symptoms: [] },
    emotion: { mood: 3, anxiety: 2, irritability: false, emotions: [] },
    routine: { sleep: 6, exercise: false, energy: 3, routine: [] },
    nutrition: { water: 4, sugar: false, cravings: 2, foods: [] },
  });

  const toggleCard = (key) => {
    setOpenCard((prev) => (prev === key ? null : key));
  };

  return (
    <div>
      <Card title="Cycle Symptoms" icon="🩸" keyName="cycle" openCard={openCard} toggleCard={toggleCard}>
        <SliderQuestion
          index={1}
          label="How strong are your cramps?"
          value={data.cycle.pain}
          onChange={(v) => setData({ ...data, cycle: { ...data.cycle, pain: v } })}
        />
      </Card>

      <BottomNav active="/log" />
    </div>
  );
}

/* STYLES */

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

  scroll: {
    paddingBottom: 100,
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#5e4b8b',
    marginBottom: 18,
  },

  card: {
    borderRadius: 22,
    marginBottom: 18,
    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
  },

  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 18,
    cursor: 'pointer',
  },

  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  icon: {
    fontSize: 18,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
  },

  cardBody: {
    padding: 18,
    borderTop: '1px solid #eee',
  },

  question: {
    marginBottom: 24,
  },

  qLabel: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 8,
  },

  slider: {
    width: '100%',
  },

  sliderValue: {
    textAlign: 'center',
    color: '#c08497',
    fontWeight: 600,
    marginTop: 6,
  },

  switch: {
    width: 50,
    height: 26,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    padding: 3,
    cursor: 'pointer',
  },

  knob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    background: '#fff',
    transition: '0.2s',
  },

  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
  },

  chip: {
    border: '1px solid #c08497',
    padding: '8px 14px',
    borderRadius: 12,
    cursor: 'pointer',
  },
};
