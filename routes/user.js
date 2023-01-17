const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser');
const verifyToken = require('../middleware/auth');
const auth = require('../middleware/auth');
const { User } = require('../model/user');
const {
  createUser,
  getUser,
  getAllUser,
  getByPhoneNo,
  getlimit,
  saveCsv
} = require('../services/userservices');

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const { body } = req;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    const user = await createUser(body);
    return res.status(201).json({ response: 'Successfully registered' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
userRouter.post('/csv', async (req, res)=>{
try{
  const response = saveCsv()
}
}
)
userRouter.get('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { response, token } = await getUser(email, password);
    if (response) {
      return res
        .status(200)
        .json({ response: 'Successfully logged In..', token });
    } else {
      return res.status(400).json({ response: 'Invalid Credentials' });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});
userRouter.get('/getall', verifyToken, async (req, res) => {
  try {
    const response = await getAllUser();
    console.log(response);
    res.send(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});
userRouter.get('/getByPhoneNo/:phoneNo', async (req, res) => {
  try {
    const { phoneNo } = req.params;
    const { page, limit } = req.query;
    const skip = (page - 1) * 10;
    const response = await getByPhoneNo(phoneNo, page, limit);
    res.send(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

module.exports = userRouter;
