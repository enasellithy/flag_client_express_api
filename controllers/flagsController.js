const { flags } = require('../models/flags');

exports.createFlag = (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Request body is missing or invalid' });
  }

  const { flagName, description, enabledByDefault } = req.body;

  if (!flagName || typeof flagName !== 'string') {
    return res.status(400).json({ error: 'flagName is required and must be a string' });
  }

  if (flags.find(f => f.flagName === flagName)) {
    return res.status(400).json({ error: 'Flag already exists' });
  }

  const flag = { flagName, description, enabledByDefault };
  flags.push(flag);
  res.status(201).json(flag);
};


exports.getFlags = (req, res) => {
  res.json(flags);
};

exports.updateFlag = (req, res) => {
  const flag = flags.find(f => f.flagName === req.params.flagName);
  if (!flag) return res.status(404).json({ error: 'Flag not found' });

  flag.enabledByDefault = req.body.enabledByDefault;
  res.json(flag);
};