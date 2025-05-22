const { clients, clientOverrides } = require('../models/clients');
const { flags } = require('../models/flags');

exports.registerClient = (req, res) => {
  const { clientId, name } = req.body;
  if (clients.find(c => c.clientId === clientId)) {
    return res.status(400).json({ error: 'Client already exists' });
  }
  const client = { clientId, name };
  clients.push(client);
  res.status(201).json(client);
};

exports.overrideFlag = (req, res) => {
  const { clientId } = req.params;
  const { flagName, enabled, environment } = req.body;

  const override = clientOverrides.find(
    o => o.clientId === clientId && o.flagName === flagName && o.environment === environment
  );

  if (override) {
    override.enabled = enabled;
  } else {
    clientOverrides.push({ clientId, flagName, environment, enabled });
  }

  res.status(200).json({ success: true });
};

exports.getClientFlags = (req, res) => {
  const { clientId } = req.params;

  const result = {};

  for (const flag of flags) {
    result[flag.flagName] = {
      default: flag.enabledByDefault,
      overrides: {},
    };

    const overrides = clientOverrides.filter(o => o.clientId === clientId && o.flagName === flag.flagName);
    for (const o of overrides) {
      result[flag.flagName].overrides[o.environment] = o.enabled;
    }
  }

  res.json(result);
};

exports.getEffectiveFlags = (req, res) => {
  const { clientId } = req.params;
  const env = req.query.env;

  const effectiveFlags = {};

  for (const flag of flags) {
    let override = clientOverrides.find(
      o => o.clientId === clientId && o.flagName === flag.flagName && o.environment === env
    );
    effectiveFlags[flag.flagName] = override ? override.enabled : flag.enabledByDefault;
  }

  res.json(effectiveFlags);
};
