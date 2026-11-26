const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

const POSTS = ['agents', 'chips', 'quantum'];
const FILE = process.env.DATA_FILE || path.join(__dirname, 'comments.json');
const load = () => { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return []; } };

app.get('/api/comments/:post', (req, res) => {
  if (!POSTS.includes(req.params.post)) return res.status(404).json({ error: 'Unknown post' });
  res.json(load().filter(c => c.post === req.params.post).reverse());
});

app.post('/api/comments/:post', (req, res) => {
  if (!POSTS.includes(req.params.post)) return res.status(404).json({ error: 'Unknown post' });
  const name = String(req.body.name || '').trim().slice(0, 40);
  const text = String(req.body.text || '').trim().slice(0, 500);
  if (!name || !text) return res.status(400).json({ error: 'Add your name and a comment.' });
  const all = load();
  const c = { post: req.params.post, name, text, date: new Date().toISOString() };
  all.push(c);
  fs.writeFileSync(FILE, JSON.stringify(all));
  res.status(201).json(c);
});

app.listen(process.env.PORT || 3000, () => console.log('Running'));
