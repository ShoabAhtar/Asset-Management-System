const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser');
const verifyToken = require('../middleware/auth');
const multer = require('multer');
const { User } = require('../model/user');
const csv = require('csv-parser');
const fs = require('fs');
const {
  createUser,
  updateUser,
  getUser,
  getAllUser,
  getByPhoneNo,
  getlimit,
  saveCsv,
  saveuser,
} = require('../services/userservices');

const storage = multer.memoryStorage();
//The memory storage takes some random space in memory when not explicitly specified
const upload = multer({ storage });
const userRouter = express.Router();

const result = [];
const readCSVFile = () => {
  fs.createReadStream('Book1.csv') // this function is used to read a file
    .pipe(csv())
    .on('data', (data) => result.push(data))
    .on('end', () => {
      return result;
      console.log('lets result', result);
    });
};
readCSVFile();
userRouter.post('/savingFile', async (req, res) => {
  try {
    const response = await saveuser(result);
    return res.status(201).json('successfully Created');
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

userRouter.post('/signup', async (req, res) => {
  try {
    const { body } = req;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    const response = await createUser(body);
    return res.status(201).json({ response: 'Successfully registered' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
userRouter.put(
  '/uploads',
  verifyToken,
  upload.single('photo'),
  async (req, res) => {
    try {
      console.log('storage is ', storage);
      const response = await updateUser(req.user.id, req.body, req.file);
      return res.status(201).json(response);
    } catch (error) {}
  }
);
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
    role = req.user.role;
    if (role == 'admin') {
      const response = await getAllUser();
      res.send(response);
    } else res.send('you are not authorized');
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
