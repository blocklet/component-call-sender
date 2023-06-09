const express = require('express');
const bodyParser = require('body-parser');
const { Component } = require('@blocklet/sdk');

const app = express();

const port = process.env.BLOCKLET_PORT || process.env.PORT || 3030;

app.use(bodyParser.json({ limit: '4mb' }));

app.use('/api/call', async (_req, res) => {
  try {
    const { data } = await Component.call({
      name: 'z2qa5KQyqGsQSDkuEW8Do25caboQbAXt4aWS7',
      path: '/api/internal/data',
      data: { data: 'test' },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send(`
<div style="display:flex;flex-direction:column;align-items:center;padding:64px 0;">
<h1 style="margin:48px 0;">
  <span style="display:inline-block;padding:8px 24px;background:#1dc1c7;color:#fff;">Component Call Sender</span>
</h1>
<div style="margin: 24px">
  Component Call Sender should be used with Component Call Receiver.
</div>
<div>
  <a href="api/call">/api/call</a>
</div>
</div>
  `);
});

app.listen(port, () => {
  console.log(`Component Call Sender app listening on port ${port}`);
});
