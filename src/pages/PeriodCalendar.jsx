import { useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import BottomNav from '../components/BottomNav';

export default function PeriodCalendar() {
  const [calendarData, setCalendarData] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);

  const periodLength = 5;
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
     const getCalendarData = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('https://her-solace-api.vercel.app/api/cycle/cycle-details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setCalendarData(result);
      }
    } catch (err) {
      console.log(err);
    }
  };
    getCalendarData();
  }, []);

 

  const lastPeriod = useMemo(() => {
    if (!calendarData?.lastPeriodDate) {
      return new Date();
    }
    return new Date(calendarData.lastPeriodDate);
  }, [calendarData]);

  const cycleLength = useMemo(() => {
    return calendarData?.cycleLength ?? 28;
  }, [calendarData]);

  const addDays = (date, days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  const cycleData = useMemo(() => {
    const ovulation = addDays(lastPeriod, cycleLength - 14);
    const fertileStart = subDays(ovulation, 4);
    const fertileEnd = addDays(ovulation, 1);

    const nextPeriod = addDays(lastPeriod, cycleLength);

    const pmsStart = subDays(nextPeriod, 5);
    const pmsEnd = subDays(nextPeriod, 1);

    const periodDays = eachDayOfInterval({
      start: lastPeriod,
      end: addDays(lastPeriod, periodLength - 1),
    });

    return {
      ovulation,
      fertileStart,
      fertileEnd,
      nextPeriod,
      pmsStart,
      pmsEnd,
      periodDays,
    };
  }, [lastPeriod, cycleLength]);

  if (!calendarData) {
    return <div style={styles.center}>Loading Calendar...</div>;
  }

  const savePeriod = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('https://her-solace-api.vercel.app/api/cycle/period-date', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          periodDate: selectedDate.toISOString().split('T')[0],
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowLogModal(false);
         const getCalendarData = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('https://her-solace-api.vercel.app/api/cycle/cycle-details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setCalendarData(result);
      }
    } catch (err) {
      console.log(err);
    }
  };
        getCalendarData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button style={styles.logBtn} onClick={() => setShowLogModal(true)}>
          🩸 Log Period
        </button>

        <Calendar value={selectedDate} onChange={(date) => setSelectedDate(date)} />

        {/* LEGEND */}

        <div style={styles.legend}>
          <div style={styles.legendItem}>
            <div style={{ ...styles.dot, background: '#ff6b6b' }} />
            Period
          </div>

          <div style={styles.legendItem}>
            <div style={{ ...styles.dot, background: '#4dabf7' }} />
            Ovulation
          </div>

          <div style={styles.legendItem}>
            <div style={{ ...styles.dot, background: '#f6c343' }} />
            Fertile Window
          </div>

          <div style={styles.legendItem}>
            <div style={{ ...styles.dot, background: '#b197fc' }} />
            PMS
          </div>
        </div>

        {/* CYCLE TRENDS */}

        <div style={styles.trendCard}>
          <h3>Cycle Trends</h3>

          {trendRow('Next Period', format(cycleData.nextPeriod, 'MMM d'))}

          {trendRow(
            'Ovulation Window',
            `${format(cycleData.fertileStart, 'MMM d')} - ${format(cycleData.fertileEnd, 'MMM d')}`,
          )}

          {trendRow('PMS Alert', `${format(cycleData.pmsStart, 'MMM d')} - ${format(cycleData.pmsEnd, 'MMM d')}`)}
        </div>
      </div>

      {showLogModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3>Last Period Date</h3>

            <Calendar value={selectedDate} onChange={(date) => setSelectedDate(date)} maxDate={new Date()} />

            <div style={styles.modalButtons}>
              <button onClick={() => setShowLogModal(false)} style={styles.cancelBtn}>
                Cancel
              </button>

              <button onClick={savePeriod} style={styles.saveBtn}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="PeriodCalendar" />
    </div>
  );
}

const trendRow = (label, value) => (
  <div style={styles.trendRow}>
    <span>{label}</span>
    <span style={styles.trendBadge}>{value}</span>
  </div>
);

const styles = {
  page: {
    background: '#f3f4f6',
    minHeight: '100vh',
  },

  container: {
    maxWidth: 600,
    margin: 'auto',
    padding: 20,
  },

  center: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  legend: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  logBtn: {
    background: '#ff6b81',
    border: 'none',
    color: '#fff',
    padding: '10px 24px',
    borderRadius: 25,
    cursor: 'pointer',
    marginBottom: 15,
  },

  trendCard: {
    marginTop: 25,
  },

  trendRow: {
    display: 'flex',
    justifyContent: 'space-between',
    background: '#E9E3EC',
    padding: '16px 18px',
    borderRadius: 25,
    marginBottom: 14,
  },

  trendBadge: {
    background: '#D3A7AF',
    padding: '4px 12px',
    borderRadius: 15,
    color: '#fff',
    fontSize: 12,
  },

  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCard: {
    background: '#fff',
    padding: 20,
    borderRadius: 20,
    width: 350,
  },

  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  cancelBtn: {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
  },

  saveBtn: {
    background: '#c08497',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: 10,
    cursor: 'pointer',
  },
};
