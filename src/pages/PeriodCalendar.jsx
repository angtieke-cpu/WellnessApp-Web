import { useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, subDays, addDays, eachDayOfInterval } from 'date-fns';

import BottomNav from '../components/BottomNav';
import DesktopNavbar from '../components/DesktopNavBar';

export default function PeriodCalendar() {
  const [calendarData, setCalendarData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showLogModal, setShowLogModal] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

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

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lastPeriod = useMemo(() => {
    if (!calendarData?.lastPeriodDate) return new Date();

    return new Date(calendarData.lastPeriodDate);
  }, [calendarData]);

  const cycleLength = calendarData?.cycleLength ?? 28;
  const periodLength = calendarData?.bleedingDays ?? 5;

  const cycleMarks = useMemo(() => {
    const marks = {
      period: new Set(),
      ovulation: new Set(),
      fertile: new Set(),
      pms: new Set(),
    };

    let cycleStart = new Date(lastPeriod);

    const future = addDays(new Date(), 540);

    while (cycleStart < future) {
      const ovulation = addDays(cycleStart, cycleLength - 14);

      const fertileStart = subDays(ovulation, 4);
      const fertileEnd = addDays(ovulation, 1);

      const nextPeriod = addDays(cycleStart, cycleLength);

      const pmsStart = subDays(nextPeriod, 5);
      const pmsEnd = subDays(nextPeriod, 1);

      eachDayOfInterval({
        start: cycleStart,
        end: addDays(cycleStart, periodLength - 1),
      }).forEach((d) => marks.period.add(format(d, 'yyyy-MM-dd')));

      marks.ovulation.add(format(ovulation, 'yyyy-MM-dd'));

      eachDayOfInterval({
        start: fertileStart,
        end: fertileEnd,
      }).forEach((d) => marks.fertile.add(format(d, 'yyyy-MM-dd')));

      eachDayOfInterval({
        start: pmsStart,
        end: pmsEnd,
      }).forEach((d) => marks.pms.add(format(d, 'yyyy-MM-dd')));

      cycleStart = nextPeriod;
    }

    return marks;
  }, [lastPeriod, cycleLength, periodLength]);

  const cycleTrends = useMemo(() => {
    const nextPeriod = addDays(lastPeriod, cycleLength);

    const ovulation = addDays(lastPeriod, cycleLength - 14);

    const fertileStart = subDays(ovulation, 4);
    const fertileEnd = addDays(ovulation, 1);

    const pmsStart = subDays(nextPeriod, 5);
    const pmsEnd = subDays(nextPeriod, 1);

    let predictedMood = 'Stable';

    const today = new Date();

    if (today >= pmsStart && today <= pmsEnd) {
      predictedMood = 'Low energy';
    }

    if (today >= fertileStart && today <= fertileEnd) {
      predictedMood = 'High energy';
    }

    return {
      nextPeriod,
      fertileStart,
      fertileEnd,
      pmsStart,
      pmsEnd,
      cycleRegularity: '92% • Consistent',
      predictedMood,
    };
  }, [lastPeriod, cycleLength]);

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
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!calendarData) {
    return <div style={styles.center}>Loading Calendar...</div>;
  }

  const calendarComponent = (
    <Calendar
      value={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      tileClassName={({ date }) => {
        const d = format(date, 'yyyy-MM-dd');

        if (cycleMarks.period.has(d)) return 'periodDay';
        if (cycleMarks.ovulation.has(d)) return 'ovulationDay';
        if (cycleMarks.fertile.has(d)) return 'fertileDay';
        if (cycleMarks.pms.has(d)) return 'pmsDay';

        return null;
      }}
    />
  );

  if (isDesktop) {
    return (
      <div>
        <DesktopNavbar />

        <div style={desktop.page}>
          <div style={desktop.container}>
            <div style={desktop.left}>
              <h2>Cycle Calendar</h2>

              {calendarComponent}

              <button style={{ ...styles.logBtn, marginTop: 20 }} onClick={() => setShowLogModal(true)}>
                🩸 Log Period
              </button>
            </div>

            <div style={desktop.right}>
              <Legend />

              <TrendCard cycleTrends={cycleTrends} />
            </div>
          </div>
        </div>

        <LogModal
          showLogModal={showLogModal}
          setShowLogModal={setShowLogModal}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          savePeriod={savePeriod}
          lastPeriod={lastPeriod}
        />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button style={styles.logBtn} onClick={() => setShowLogModal(true)}>
          🩸 Log Period
        </button>

        {calendarComponent}

        <Legend />

        <TrendCard cycleTrends={cycleTrends} />
      </div>

      <BottomNav />

      <LogModal
        showLogModal={showLogModal}
        setShowLogModal={setShowLogModal}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        savePeriod={savePeriod}
         lastPeriod={lastPeriod}
      />
    </div>
  );
}

function Legend() {
  return (
    <div style={styles.legend}>
      <div style={styles.legendItem}>
        <div style={{ ...styles.dot, background: '#ff6b6b' }} /> Period
      </div>

      <div style={styles.legendItem}>
        <div style={{ ...styles.dot, background: '#4dabf7' }} /> Ovulation
      </div>

      <div style={styles.legendItem}>
        <div style={{ ...styles.dot, background: '#f6c343' }} /> Fertile
      </div>

      <div style={styles.legendItem}>
        <div style={{ ...styles.dot, background: '#b197fc' }} /> PMS
      </div>
    </div>
  );
}

function TrendCard({ cycleTrends }) {
  return (
    <div style={styles.trendCard}>
      <h3>Cycle Trends</h3>

      {trendRow('Next Period', format(cycleTrends.nextPeriod, 'MMM d'))}

      {trendRow(
        'Ovulation Window',
        `${format(cycleTrends.fertileStart, 'MMM d')} - ${format(cycleTrends.fertileEnd, 'MMM d')}`,
      )}

      {trendRow('Cycle Regularity', cycleTrends.cycleRegularity)}

      {trendRow('Predicted Mood', cycleTrends.predictedMood)}

      {trendRow('PMS Alert', `${format(cycleTrends.pmsStart, 'MMM d')} - ${format(cycleTrends.pmsEnd, 'MMM d')}`)}
    </div>
  );
}

function LogModal({ showLogModal, setShowLogModal, selectedDate, setSelectedDate, savePeriod,lastPeriod }) {
  if (!showLogModal) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalCard}>
        <h3>Last Period Date</h3>

        <Calendar value={selectedDate}   minDate={new Date(lastPeriod)} onChange={(date) => setSelectedDate(date)} maxDate={new Date()} />

        <div style={styles.modalButtons}>
          <button style={styles.cancelBtn} onClick={() => setShowLogModal(false)}>
            Cancel
          </button>

          <button style={styles.saveBtn} onClick={savePeriod}>
            Save
          </button>
        </div>
      </div>
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
  page: { background: '#f3f4f6', minHeight: '100vh' },
  container: { maxWidth: 600, margin: 'auto', padding: 20 },
  center: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  legend: { display: 'flex', justifyContent: 'space-around', marginTop: 20 },
  legendItem: { display: 'flex', alignItems: 'center', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  logBtn: {
    background: '#ff6b81',
    border: 'none',
    color: '#fff',
    padding: '10px 24px',
    borderRadius: 25,
    cursor: 'pointer',
    marginBottom: 15,
  },
  trendCard: { marginTop: 25 },
  trendRow: {
    display: 'flex',
    justifyContent: 'space-between',
    background: '#E9E3EC',
    padding: '16px 18px',
    borderRadius: 25,
    marginBottom: 14,
  },
  trendBadge: { background: '#D3A7AF', padding: '4px 12px', borderRadius: 15, color: '#fff', fontSize: 12 },
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
  modalCard: { background: '#fff', padding: 20, borderRadius: 20, width: 350 },
  modalButtons: { display: 'flex', justifyContent: 'space-between', marginTop: 20 },
  cancelBtn: { border: 'none', background: 'transparent', cursor: 'pointer' },
  saveBtn: {
    background: '#c08497',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: 10,
    cursor: 'pointer',
  },
};

const desktop = {
  page: { background: '#f3f4f6', minHeight: '100vh', padding: 40 },
  container: { maxWidth: 1100, margin: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 },
  left: { background: '#fff', padding: 30, borderRadius: 20 },
  right: { background: '#fff', padding: 30, borderRadius: 20 },
};
