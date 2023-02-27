const express = require('express');
const {
  createAsset,
  getExpired,
  expiring,
  getassetbylocation,
  getAssetbystatus,
  stock,
} = require('../services/assetservices');
const assetRouter = express.Router();
assetRouter.post('/create-asset', async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const response = await createAsset(body);
    res.send(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

assetRouter.get('/getassetbylocation/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const response = await getassetbylocation(location);
    res.send(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});
assetRouter.get('/getassetbystatus/:status', async (req, res) => {
  const { status } = req.params;

  const response = await getAssetbystatus(status);
  res.send(response);
});
assetRouter.get('/assets/expired', async (req, res) => {
  const response = await getExpired();
  res.send(response);
});
assetRouter.get('/exprirngsoon', async (req, res) => {
  const response = await expiring();
  res.send(response);
});
assetRouter.get('/stock', async (req, res) => {
  const response = await stock();
  res.send(response);
});
module.exports = assetRouter;
