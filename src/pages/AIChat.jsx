import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function AIChat() {
  const navigate = useNavigate();

  const [insightData, setInsightData] = useState(null);
  const [openChat, setOpenChat] = useState(false);

  // const getData = async()=>{

  // try{

  // const token = localStorage.getItem("token");

  // const response = await fetch(
  // "https://her-solace-api.vercel.app/api/ai/cycle-insights",
  // {
  // method:"GET",
  // headers:{
  // "Content-Type":"application/json",
  // Authorization:`Bearer ${token}`
  // }
  // }
  // );

  // const result = await response.json();

  // if(result.success){
  // setInsightData(result.aiInsights);
  // }

  // }catch(e){
  // console.log(e);
  // }

  // };

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('https://her-solace-api.vercel.app/api/ai/cycle-insights', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (mounted && result.success) {
          setInsightData(result.aiInsights);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  if (!insightData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading AI Insights...</p>
      </div>
    );
  }

  const insights = [
    {
      icon: '🏋️‍♀️',
      title: 'Exercise Optimization',
      text: insightData.exerciseOptimization,
      tag: 'Workout Advice',
      tagColor: '#2E7D32',
    },

    {
      icon: '🥗',
      title: 'Nutrition Guidance',
      text: insightData.nutritionGuidance,
      tag: 'Nutrition',
      tagColor: '#1565C0',
    },

    {
      icon: '😴',
      title: 'Sleep Pattern',
      text: insightData.sleepPattern,
      tag: 'Sleep Health',
      tagColor: '#6A1B9A',
    },

    {
      icon: '💡',
      title: 'Symptom Forecast',
      text: insightData.symptomsForecast,
      tag: 'Prediction',
      tagColor: '#EF6C00',
    },
  ];

  return (
    <div style={styles.container}>
      {/* HEADER */}

      <div style={styles.header}>
        <p style={styles.headerTitle}>Your Digital Twin</p>

        <div style={styles.avatar}>
          <img src="/well_logo.jpeg" alt="logo" style={{ width: 60, height: 60 }} />
        </div>

        <p style={styles.brand}>Her Solace</p>

        <p style={styles.subtitle}>Decode Hormones - Discover You</p>

        <div style={styles.statusPill}>
          <p style={styles.statusText}>✓ Synced & Active</p>
        </div>

        <p style={styles.aiText}>AI model processing your unique hormonal patterns</p>
      </div>

      {/* INSIGHT CARDS */}

      <div style={styles.cardGrid}>
        {insights.map((item, i) => (
          <div key={i} style={styles.aiCard}>
            <div style={styles.aiHeader}>
              <span style={styles.aiIcon}>{item.icon}</span>
              <p style={styles.aiTitle}>{item.title}</p>
            </div>

            <p style={styles.aiTextCard}>{item.text}</p>

            <div style={{ ...styles.aiTag, borderColor: item.tagColor }}>
              <span style={{ color: item.tagColor, fontSize: 12 }}>{item.tag}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CHAT BUTTON */}

      <button style={styles.chatFab} onClick={() => setOpenChat(true)}>
        💬
      </button>

      {/* CHAT WINDOW */}

      {openChat && (
        <div style={styles.chatSheet}>
          <div style={styles.chatHeader}>
            <p>AI Assistant</p>

            <button onClick={() => setOpenChat(false)}>✕</button>
          </div>

          <div style={styles.chatBody}>
            <div style={styles.bubble}>Hi 👋 Ask me anything about your cycle.</div>
          </div>

          <div style={styles.chatInputRow}>
            <input placeholder="Ask your question…" style={styles.chatInput} />

            <button style={styles.sendBtn}>➤</button>
          </div>
        </div>
      )}
        <BottomNav active="ai" />
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    background: '#fff',
    minHeight: '100vh',
  },

  header: {
    background: '#E1B8BE',
    padding: 18,
    borderRadius: 22,
    textAlign: 'center',
    marginBottom: 20,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 16,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '12px auto',
  },

  brand: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  subtitle: {
    color: '#fff',
    marginTop: 6,
  },

  aiText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 8,
  },

  statusPill: {
    background: '#debabc',
    padding: '4px 12px',
    borderRadius: 20,
    marginTop: 10,
    display: 'inline-block',
  },

  statusText: {
    color: '#fff',
    fontSize: 12,
  },

  cardGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  },

  aiCard: {
    background: '#fff',
    borderRadius: 22,
    padding: 16,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },

  aiHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
  },

  aiIcon: {
    fontSize: 22,
    marginRight: 6,
  },

  aiTitle: {
    fontSize: 14,
    fontWeight: '700',
  },

  aiTextCard: {
    fontSize: 12,
    color: '#555',
    lineHeight: '18px',
    marginBottom: 12,
  },

  aiTag: {
    borderWidth: 1,
    padding: '4px 10px',
    borderRadius: 20,
    display: 'inline-block',
    background: '#FFF7F8',
  },

  chatFab: {
    position: 'fixed',
    bottom: 40,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: '#debabc',
    border: 'none',
    fontSize: 22,
    cursor: 'pointer',
  },

  chatSheet: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    background: '#f4f3f9',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
  },

  chatHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  chatBody: {
    flex: 1,
    marginTop: 20,
  },

  bubble: {
    background: '#fff',
    padding: 10,
    borderRadius: 14,
    maxWidth: '80%',
  },

  chatInputRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },

  chatInput: {
    flex: 1,
    padding: 10,
    borderRadius: 14,
    border: '1px solid #ddd',
  },

  sendBtn: {
    background: '#debabc',
    border: 'none',
    padding: '0 14px',
    borderRadius: 14,
    marginLeft: 8,
    cursor: 'pointer',
  },
};
