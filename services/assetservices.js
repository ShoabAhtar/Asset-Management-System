const { Asset } = require('../model/asset');
async function createAsset(body) {
  try {
    const response = await Asset.create({ body });
    return response;
  } catch (error) {
    throw error;
  }
}
async function getassetbylocation(location) {
  try {
    const response = await Asset.find({ location: location });
    return response;
  } catch (error) {
    throw error;
  }
}
async function getAssetbystatus(status) {
  try {
    const response = await Asset.find({ status: status });
    return response;
  } catch (error) {
    // console.log('an error in definition');
    throw error;
  }
}
async function getExpired() {
  try {
    const cDate = new Date();
    const response = await Asset.find({ dateOfExpiry: { $lt: cDate } });

    return response;
  } catch (error) {
    throw error;
  }
}
async function expiring() {
  try {
    const cDate = new Date();
    const dateCopy = new Date(cDate.getTime());
    dateCopy.setDate(dateCopy.getDate() + 7);
    const response = await Asset.find({
      $and: [
        { dateOfExpiry: { $gt: cDate } },
        { dateOfExpiry: { $lt: dateCopy } },
      ],
    });
    return response;
  } catch (error) {
    throw error;
  }
}
async function stock(stock) {
  try {
    stock = true;
    const response = await Asset.find({ inStock: stock });
    return response;
  } catch (error) {
    throw error;
  }
}
module.exports.createAsset = createAsset;
module.exports.getExpired = getExpired;
module.exports.expiring = expiring;
module.exports.stock = stock;
module.exports.getAssetbystatus = getAssetbystatus;
module.exports.getassetbylocation = getassetbylocation;
