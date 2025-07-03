import fs from 'fs';
import express from 'express';
// import oracledb from 'oracledb'; // Uncomment when oracledb is available

const app = express();
const PORT = process.env.PORT || 3001;
const CONFIG_PATH = './instances.json';

let config = JSON.parse(fs.readFileSync(CONFIG_PATH));
let metrics = {};

function generateFakeMetrics(name) {
  return {
    applyLag: Math.random() * 5,
    sessions: Math.floor(Math.random() * 100),
    sga: Math.random() * 4096,
    pga: Math.random() * 2048,
    processes: Math.floor(Math.random() * 500)
  };
}

async function pollInstance(instance) {
  if (!instance.monitor) return;
  // Example using fake metrics instead of real queries
  metrics[instance.name] = generateFakeMetrics(instance.name);
}

async function pollAll() {
  for (const instance of config.instances) {
    try {
      await pollInstance(instance);
    } catch (err) {
      console.error(`Error polling ${instance.name}`, err);
    }
  }
}

setInterval(pollAll, 5000);

app.get('/metrics', (req, res) => {
  res.json(metrics);
});

app.listen(PORT, () => {
  console.log(`Oracle monitor backend listening on ${PORT}`);
});
