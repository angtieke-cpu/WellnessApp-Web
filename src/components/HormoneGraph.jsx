import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  ReferenceLine,
  Tooltip,
  CartesianGrid,
  ReferenceArea
} from "recharts";

/* ---------------- Hormone Algorithms ---------------- */

function estrogenAtDay(day, cycleLength) {
  const t = day / cycleLength;
  const ovT = (cycleLength - 14) / cycleLength;

  if (t <= 0.04) return 0.08;

  if (t <= ovT - 0.04) {
    const rise = (t - 0.04) / (ovT - 0.08);
    return 0.08 + 0.72 * Math.pow(Math.sin((rise * Math.PI) / 2), 1.4);
  }

  if (t <= ovT + 0.04) {
    const dip = (t - (ovT - 0.04)) / 0.08;
    return 0.8 - 0.35 * Math.sin(dip * Math.PI);
  }

  const lutT = (t - (ovT + 0.04)) / (1 - (ovT + 0.04));

  const secondary =
    0.28 * Math.exp(-Math.pow((lutT - 0.45) / 0.18, 2));

  const falloff =
    0.45 * Math.pow(1 - lutT, 1.2);

  return 0.08 + secondary + falloff;
}

function progesteroneAtDay(day, cycleLength) {
  const t = day / cycleLength;
  const ovT = (cycleLength - 14) / cycleLength;

  if (t <= ovT + 0.02)
    return 0.04 + 0.03 * (t / ovT);

  const lutT =
    (t - (ovT + 0.02)) / (1 - (ovT + 0.02));

  return (
    0.07 +
    0.83 *
      Math.exp(-Math.pow((lutT - 0.5) / 0.28, 2))
  );
}

/* ---------------- Component ---------------- */

export default function HormoneGraph() {

  const [data, setData] = useState([]);
  const [cycleLength, setCycleLength] = useState(28);
  const [bleedingDays, setBleedingDays] = useState(5);
  const [ovulationDay, setOvulationDay] = useState(14);
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {

    const loadData = async () => {

      try {

        const token = localStorage.getItem("token");

        const cycleRes = await fetch(
          "https://her-solace-api.vercel.app/api/cycle/cycle-details",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const cycle = await cycleRes.json();

        const userRes = await fetch(
          "https://her-solace-api.vercel.app/api/user/user-details",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const user = await userRes.json();

        const cycleLen = cycle?.cycleLength ?? 28;
        const bleed = user?.data?.bleeding_days ?? 5;

        const ovulation = cycleLen - 14;

        const lastPeriod = new Date(cycle?.lastPeriodDate);
        const today = new Date();

        const diff =
          Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24)) + 1;

        const day = ((diff - 1) % cycleLen) + 1;

        setCycleLength(cycleLen);
        setBleedingDays(bleed);
        setOvulationDay(ovulation);
        setCurrentDay(day);

        const rows = [];

        for (let d = 1; d <= cycleLen; d++) {
          rows.push({
            day: d,
            estrogen: Number(estrogenAtDay(d, cycleLen).toFixed(3)),
            progesterone: Number(
              progesteroneAtDay(d, cycleLen).toFixed(3)
            )
          });
        }

        setData(rows);

      } catch (e) {
        console.log(e);
      }

    };

    loadData();

  }, []);

  /* -------- Phase Ranges -------- */

  const flowStart = 1;
  const flowEnd = bleedingDays;

  const seedStart = flowEnd;
  const seedEnd = ovulationDay - 1;

  const bloomStart = ovulationDay - 1;
  const bloomEnd = ovulationDay + 1;

  const moonStart = bloomEnd;
  const moonEnd = cycleLength;

  /* -------- Dynamic X Axis -------- */

  const xTicks = [
    1,
    Math.round(cycleLength * 0.2),
    Math.round(cycleLength * 0.4),
    Math.round(cycleLength * 0.6),
    Math.round(cycleLength * 0.8),
    cycleLength
  ];

  return (

    <div style={{ height: 240 }}>

      <ResponsiveContainer width="100%" height="100%">

        <LineChart
          data={data}
          margin={{ top: 35, right: 10, left: 0, bottom: 0 }}
        >

          <CartesianGrid stroke="#eee" />

          {/* Phase Backgrounds */}

          <ReferenceArea x1={flowStart} x2={flowEnd} fill="#FADADD" />

          <ReferenceArea x1={seedStart} x2={seedEnd} fill="#E8F7E4" />

          <ReferenceArea x1={bloomStart} x2={bloomEnd} fill="#FFF2CC" />

          <ReferenceArea x1={moonStart} x2={moonEnd} fill="#E6E6FA" />

          {/* Phase Labels */}

          <ReferenceLine
            x={Math.round((flowStart + flowEnd) / 2)}
            stroke="transparent"
            label={{ value: "Flow", position: "insideTop", fill: "#666", dy: 6 }}
          />

          <ReferenceLine
            x={Math.round((seedStart + seedEnd) / 2)}
            stroke="transparent"
            label={{ value: "Seed", position: "insideTop", fill: "#666", dy: 6 }}
          />

          <ReferenceLine
            x={Math.round((bloomStart + bloomEnd) / 2)}
            stroke="transparent"
            label={{ value: "Bloom", position: "insideTop", fill: "#666", dy: 6 }}
          />

          <ReferenceLine
            x={Math.round((moonStart + moonEnd) / 2)}
            stroke="transparent"
            label={{ value: "Moon", position: "insideTop", fill: "#666", dy: 6 }}
          />

          {/* Axis */}

          <XAxis
            dataKey="day"
            ticks={xTicks}
            tickMargin={5}
          />

          <Tooltip />

          {/* Hormone Lines */}

          <Line
            type="monotone"
            dataKey="estrogen"
            stroke="#EC407A"
            strokeWidth={2}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="progesterone"
            stroke="#7B61FF"
            strokeWidth={2}
            dot={false}
          />

          {/* Today Marker */}

          <ReferenceLine
            x={currentDay}
            stroke="#42A5F5"
            strokeDasharray="4 4"
            label={{
              value: "Today",
              position: "insideTop",
              fill: "#42A5F5",
              dy: -4,
              fontSize: 12
            }}
          />

          {/* Ovulation Marker */}

          <ReferenceLine
            x={ovulationDay}
            stroke="#C8A2C8"
            strokeDasharray="4 4"
            label={{
              value: "Ovulation",
              position: "insideTop",
              fill: "#C8A2C8",
              dy: -4,
              fontSize: 12
            }}
          />

        </LineChart>

      </ResponsiveContainer>

      {/* Legend */}

      <div style={legendStyle}>
        <LegendItem color="#EC407A" text="Estrogen" />
        <LegendItem color="#7B61FF" text="Progesterone" />
        <LegendItem color="#42A5F5" text="Today" />
        <LegendItem color="#C8A2C8" text="Ovulation" />
      </div>

    </div>

  );
}

/* ---------------- Legend ---------------- */

function LegendItem({ color, text }) {
  return (
    <div style={legendItem}>
      <div style={{ ...dot, background: color }} />
      {text}
    </div>
  );
}

const legendStyle = {
  display: "flex",
  justifyContent: "center",
  gap: 18,
  marginTop: -6,
  fontSize: 12
};

const legendItem = {
  display: "flex",
  alignItems: "center",
  gap: 6
};

const dot = {
  width: 8,
  height: 8,
  borderRadius: 8
};