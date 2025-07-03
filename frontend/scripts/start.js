import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.FRONTEND_PORT || 3000;

app.use(express.static(path.join(__dirname, '../src')));

app.listen(PORT, () => {
  console.log(`Frontend available on http://localhost:${PORT}`);
});
