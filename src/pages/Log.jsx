import React, { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

export default function Log() {

  const [openCard, setOpenCard] = useState("cycle");

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 900);

  useEffect(() => {
    const resize = () => setIsDesktop(window.innerWidth > 900);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const [data, setData] = useState({
    cycle: { pain: 3, flow: 2, bloating: false, symptoms: [] },
    emotion: { mood: 3, anxiety: 2, irritability: false, emotions: [] },
    routine: { sleep: 6, exercise: false, energy: 3, routine: [] },
    nutrition: { water: 4, sugar: false, cravings: 2, foods: [] },
  });

  const toggleCard = (key) => {
    setOpenCard(openCard === key ? null : key);
  };

  /* Toggle Switch */

  const Toggle = ({ value, onChange }) => (
    <div
      style={{
        width: 50,
        height: 26,
        borderRadius: 20,
        background: value ? "#c08497" : "#ddd",
        display: "flex",
        alignItems: "center",
        padding: 3,
        cursor: "pointer",
      }}
      onClick={() => onChange(!value)}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          background: "#fff",
          marginLeft: value ? "auto" : 0,
        }}
      />
    </div>
  );

  /* Slider */

  const SliderQuestion = ({ index, label, value, onChange, min = 1, max = 5 }) => (
    <div style={{ marginBottom: 24 }}>
      <p style={{ fontWeight: 600 }}>
        {index}. {label}
      </p>

      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(
      to right,
      #c08497 0%,
      #c08497 ${(value - min) / (max - min) * 100}%,
      #e4dbe7 ${(value - min) / (max - min) * 100}%,
      #e4dbe7 100%
    )`,
          width: '100%'
        }}
        className="range-slider"
      />

      <p style={{ color: "#c08497", textAlign: "center" }}>
        {value} / {max}
      </p>
    </div>
  );

  /* Chips */

  const ChipGroup = ({ index, question, options, selected, onChange }) => (
    <div style={{ marginBottom: 24,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'}}>
      <p style={{ fontWeight: 600 }}>
        {index}. {question}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 24, }}>
        {options.map((item) => {
          const active = selected.includes(item);

          return (
            <button
              key={item}
              onClick={() => {
                let updated = active
                  ? selected.filter((x) => x !== item)
                  : [...selected, item];

                onChange(updated);
              }}
              style={{
                border: "1px solid #c08497",
                background: active ? "#c08497" : "white",
                color: active ? "white" : "#c08497",
                padding: "8px 14px",
                borderRadius: 12,
                marginRight: 10,
                marginBottom: 10,
                cursor: "pointer",
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );

  /* Card */

  const Card = ({ title, icon, keyName, children }) => {
    const active = openCard === keyName;

    return (
      <div
        style={{
          background: active ? "white" : "#efe7f1",
          borderRadius: 22,
          marginBottom: 18,
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        <div
          onClick={() => toggleCard(keyName)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 18,
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: 10 }}>{icon}</span>
            <strong>{title}</strong>
          </div>

          <span>{active ? "▲" : "▼"}</span>
        </div>

        {active && <div style={{ padding: 18 }}>{children}</div>}
      </div>
    );
  };

  const Container = ({ children }) => (
    <div
      style={{
        maxWidth: isDesktop ? 900 : "100%",
        margin: "auto",
        padding: 20,
      }}
    >
      {children}
    </div>
  );

  return (
    <div style={{ background: "#f4f1fa", minHeight: "100vh" }}>
      <Container>

        <h2 style={{ color: "#5e4b8b" }}>Log Your Symptoms</h2>

        {/* Cycle Card */}

        <Card title="Cycle Symptoms" icon="🩸" keyName="cycle">

          <SliderQuestion
            index={1}
            label="How strong are your cramps?"
            value={data.cycle.pain}
            onChange={(v) =>
              setData({ ...data, cycle: { ...data.cycle, pain: v } })
            }
          />

          <SliderQuestion
            index={2}
            label="How heavy is your flow?"
            value={data.cycle.flow}
            onChange={(v) =>
              setData({ ...data, cycle: { ...data.cycle, flow: v } })
            }
          />
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <p>3. Are you feeling bloated?</p>

            <Toggle
              value={data.cycle.bloating}
              onChange={(v) =>
                setData({ ...data, cycle: { ...data.cycle, bloating: v } })
              }
            />
          </div>

          <ChipGroup
            index={4}
            question="What symptoms are you experiencing?"
            options={[
              "Cramps",
              "Headache",
              "Fatigue",
              "Back Pain",
              "Breast Pain",
            ]}
            selected={data.cycle.symptoms}
            onChange={(v) =>
              setData({ ...data, cycle: { ...data.cycle, symptoms: v } })
            }
          />
        </Card>

      </Container>

      <BottomNav active="Log" />
    </div >
  );
}
