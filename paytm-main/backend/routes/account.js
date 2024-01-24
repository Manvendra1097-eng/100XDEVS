const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');

const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, async (req, res) => {
  try {
    const balance = await Account.findOne({ userId: req.userId });
    if (!balance) {
      return res.status(400).json({});
    }
    return res.status(200).json({ balance });
  } catch (error) {
    return res.status(500).json({});
  }
});

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
  try {
    const { to, amount } = req.body;

    const account = await Account.findOne({ userId: req.userId });
    if (!account || account.balance < amount) {
      return res.status(400).json({
        message: 'Insufficient balance',
      });
    }
    const toAccount = await Account.findOne({ userId: to });
    if (!toAccount) {
      return res.status(400).json({
        message: 'Invalid account',
      });
    }
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    );
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });
    return res.status(200).json({
      message: 'Transfer successful',
    });
  } catch (error) {
    return res.status(500).json({});
  }
});

module.exports = accountRouter;
