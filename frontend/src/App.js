import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

function MetricCard({ name, data }) {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data) return;
    const ctx = canvasRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['SGA', 'PGA', 'Sessions', 'Processes', 'Apply Lag'],
        datasets: [{
          label: name,
          data: [data.sga, data.pga, data.sessions, data.processes, data.applyLag],
          backgroundColor: 'rgba(75, 192, 192, 0.5)'
        }]
      }
    });
  }, [data]);

  return (
    <div>
      <h3>{name}</h3>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default function App() {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/metrics');
      const json = await res.json();
      setMetrics(json);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Oracle Monitor</h1>
      {Object.entries(metrics).map(([name, data]) => (
        <MetricCard key={name} name={name} data={data} />
      ))}
    </div>
  );
}
