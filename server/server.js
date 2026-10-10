const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000';

app.use(cors());
app.use(express.json());

// Load catalog
const productsFilePath = path.join(__dirname, '..', 'src', 'products.json');
let products = [];
try {
  products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
} catch (err) {
  console.error('Error loading products.json:', err.message);
}

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Playstate Express Engine',
    nodeVersion: process.version,
    totalProducts: products.length,
    timestamp: new Date().toISOString()
  });
});

// Products listing with search, sport, sort
app.get('/api/products', (req, res) => {
  const { search, sport, sort } = req.query;
  let results = [...products];

  if (sport && sport !== 'All') {
    results = results.filter(p => p.sport.toLowerCase() === sport.toLowerCase());
  }

  if (search && search.trim() !== '') {
    const q = search.toLowerCase().trim();
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sport.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  if (sort === 'price-asc') {
    results.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    results.sort((a, b) => b.price - a.price);
  } else if (sort === 'name-asc') {
    results.sort((a, b) => a.name.localeCompare(b.name));
  }

  res.json({
    total: results.length,
    products: results
  });
});

// Single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Sports list with counts
app.get('/api/sports', (req, res) => {
  const sportCounts = {};
  products.forEach(p => {
    sportCounts[p.sport] = (sportCounts[p.sport] || 0) + 1;
  });

  const sports = Object.entries(sportCounts).map(([name, count]) => ({
    name,
    count
  }));

  res.json(sports);
});

// AI Strategist bridge: connects to Python LangChain/LangGraph service
app.post('/api/ai/strategist', async (req, res) => {
  const { sport = 'Cricket', skill_level = 'Intermediate', playing_surface = 'Outdoor Turf', focus_area = 'All-Round Readiness' } = req.body;

  try {
    const aiResponse = await fetch(`${AI_SERVICE_URL}/api/strategist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sport, skill_level, playing_surface, focus_area })
    });

    if (aiResponse.ok) {
      const data = await aiResponse.json();
      return res.json(data);
    }
  } catch (err) {
    console.warn('Python AI service not responding on port 8000, using built-in Express fallback reasoning...');
  }

  // Graceful fallback matching logic if Python service is still spinning up
  const filteredGear = products.filter(p => p.sport.toLowerCase() === sport.toLowerCase());
  const matched = filteredGear.length > 0 ? filteredGear : products.slice(0, 4);

  res.json({
    success: true,
    sport,
    skill_level,
    playing_surface,
    coach_verdict: `Playstate Performance Audit: For ${skill_level} ${sport}, this kit delivers durable precision for ${playing_surface}.`,
    strategy: {
      pitch_prep: `Inspect ball seam & footing stability on ${playing_surface}.`,
      warmup_routine: '5-minute dynamic joint mobility, 4-minute agility ladders, 3-minute match-pace reps.',
      focus_verdict: `Priority objective: Maximize ${focus_area}.`,
      environmental_tip: 'Outdoor air density and humidity affect ball bounce and swing trajectory.'
    },
    drills: [
      { title: `${sport} Fundamental Execution Drill`, duration: '20 mins', description: `High-repetition drill focusing on stance, grip, and follow-through with standard equipment.` },
      { title: 'Agility & Reaction Sprint Series', duration: '15 mins', description: 'Quick-burst directional shuttle sprints using boundary cones.' },
      { title: 'Target Accuracy Assessment', duration: '15 mins', description: 'Placement testing under game-speed simulation.' }
    ],
    matched_gear: matched,
    starter_preset: matched.map(m => ({
      id: m.id,
      name: m.name,
      price: m.price,
      category: m.category,
      selected_option: m.options ? m.options[0] : 'Standard',
      quantity: 1
    }))
  });
});

// Kit Checklist Export endpoint
app.post('/api/kit/export', (req, res) => {
  const { items = [], kitName = 'Playstate Kit Checklist' } = req.body;
  const date = new Date().toLocaleDateString('en-US', { dateStyle: 'full' });

  let text = `=======================================================\n`;
  text += ` PLAYSTATE OUTDOOR SPORTS — KIT CHECKLIST\n`;
  text += ` ${kitName.toUpperCase()}\n`;
  text += ` Generated: ${date}\n`;
  text += `=======================================================\n\n`;

  let total = 0;
  items.forEach((item, index) => {
    const itemTotal = (item.price || 0) * (item.quantity || 1);
    total += itemTotal;
    text += `${(index + 1).toString().padStart(2, '0')}. [ ] ${item.name}\n`;
    text += `    Option: ${item.selected_option || 'Standard'}\n`;
    text += `    Qty: ${item.quantity || 1}  x  ₹${(item.price || 0).toLocaleString()}  =  ₹${itemTotal.toLocaleString()}\n\n`;
  });

  text += `-------------------------------------------------------\n`;
  text += ` Total Guide Price: ₹${total.toLocaleString()}\n`;
  text += ` Items Count: ${items.length}\n`;
  text += `\n Play hard. Play fair. Leave it all on the field.\n`;
  text += ` PLAYSTATE · OUTDOOR ATHLETIC CULTURE\n`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Disposition', 'attachment; filename="playstate-kit.txt"');
  res.send(text);
});

// Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  res.json({
    success: true,
    message: `Subscribed ${email} to Playstate Field Dispatch!`
  });
});

app.listen(PORT, () => {
  console.log(`[Express] Playstate API running on http://127.0.0.1:${PORT}`);
});
