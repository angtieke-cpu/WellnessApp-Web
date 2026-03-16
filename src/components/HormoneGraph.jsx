import { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, ReferenceLine, Tooltip, CartesianGrid } from 'recharts';

export default function HormoneGraph() {
  const [data, setData] = useState([]);
  const [cycleLength, setCycleLength] = useState(28);
  const [bleedingDays, setBleedingDays] = useState(5);
  const [ovulationDay, setOvulationDay] = useState(14);
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem('token');
        const generateHormones = (cycle, bleed, ov) => {
          let rows = [];

          for (let day = 1; day <= cycle; day++) {
            let ev = 0;
            let pv = 0;

            if (day <= bleed) {
              ev = 0.2;
              pv = 0.2;
            } else if (day < ov) {
              const progress = (day - bleed) / (ov - bleed);

              ev = 0.2 + progress * 0.8;
              pv = 0.2 + progress * 0.2;
            } else if (day === ov) {
              ev = 1;
              pv = 0.3;
            } else {
              const progress = (day - ov) / (cycle - ov);

              ev = 0.8 - progress * 0.6;
              pv = 0.3 + progress * 0.7;
            }

            rows.push({
              day,
              estrogen: ev,
              progesterone: pv,
            });
          }

          setData(rows);
        };

        const cycleRes = await fetch('https://her-solace-api.vercel.app/api/cycle/cycle-details', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const cycle = await cycleRes.json();

        const userRes = await fetch('https://her-solace-api.vercel.app/api/user/user-details', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = await userRes.json();

        const cycleLen = cycle?.cycleLength ?? 28;
        const bleed = user?.data?.bleeding_days ?? 5;
        const ovulation = cycleLen - 14;

        const lastPeriod = new Date(cycle?.lastPeriodDate);
        const today = new Date();

        const diff = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24)) + 1;

        const day = ((diff - 1) % cycleLen) + 1;

        setCycleLength(cycleLen);
        setBleedingDays(bleed);
        setOvulationDay(ovulation);
        setCurrentDay(day);

        generateHormones(cycleLen, bleed, ovulation);
      } catch (e) {
        console.log(e);
      }
    };
    loadData();
  }, []);

  return (
    <div style={{ height: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" />

          <XAxis dataKey="day" ticks={[1, 5, 10, 15, 20, 25, cycleLength]} />

          <Tooltip />

          <Line type="monotone" dataKey="estrogen" stroke="#EC407A" strokeWidth={2} dot={false} />

          <Line type="monotone" dataKey="progesterone" stroke="#7B61FF" strokeWidth={2} dot={false} />

          <ReferenceLine x={currentDay} stroke="#42A5F5" strokeDasharray="4 4" label="Today" />

          <ReferenceLine x={ovulationDay} stroke="#C8A2C8" strokeDasharray="4 4" label="Ovulation" />
        </LineChart>
      </ResponsiveContainer>

      <div style={legendStyle}>
        <div style={legendItem}>
          <div style={{ ...dot, background: '#EC407A' }} />
          Estrogen
        </div>

        <div style={legendItem}>
          <div style={{ ...dot, background: '#7B61FF' }} />
          Progesterone
        </div>

        <div style={legendItem}>
          <div style={{ ...dot, background: '#42A5F5' }} />
          Today
        </div>

        <div style={legendItem}>
          <div style={{ ...dot, background: '#C8A2C8' }} />
          Ovulation
        </div>
      </div>
    </div>
  );
}

const legendStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: 20,
  marginTop: 10,
  fontSize: 12,
};

const legendItem = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
};

const dot = {
  width: 10,
  height: 10,
  borderRadius: 5,
};
