const { User } = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { bblSort } = require('../test');
require('dotenv').config();
async function createUser(body) {
  try {
    const resp = await User.create(body);
    return resp;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUser(email, password) {
  try {
    let response = await User.findOne({ email });

    const isValidUser = await bcrypt.compare(password, response.password);
    if (isValidUser) {
      const token = jwt.sign(
        {
          name: response.name,
          email: response.email,
          id: response.id,
          role: response.role,
        },
        process.env.TOKEN_KEY,
        { expiresIn: '8h' }
      );
      return { response: true, token };
    } else {
      return { response: false };
    }
  } catch (error) {
    throw error;
  }
}
async function getAllUser() {
  try {
    const response = await User.find({}, { password: 0 }).limit(2);
    return response;
  } catch (error) {
    throw error;
  }
}
async function getByPhoneNo(phoneNo, page, limit) {
  try {
    const stNo = phoneNo.slice(0, 4);
    const midNo = phoneNo.slice(4, 8);
    const endNo = phoneNo.slice(8, 11);

    const page1 = page;
    const limit1 = limit;
    const skip = (page - 1) * limit;
    const response = await User.find(
      {
        $or: [{ phoneNo: stNo }, { phoneNo: midNo }, { phoneNo: endNo }],
      },
      { password: 0, __v: 0 }
    )

      .skip(skip)
      .limit(limit1);
    return response;
  } catch (error) {
    throw error;
  }
}
async function saveCsv() {}
module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.getAllUser = getAllUser;
module.exports.getByPhoneNo = getByPhoneNo;
module.export.saveCsv = saveCsv;
// module.exports.getlimit = getlimit;
