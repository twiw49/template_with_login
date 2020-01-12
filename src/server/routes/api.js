import { Router } from 'express';
import User from '../models/User';

const router = Router();

// Replace the entire diary every time the users modifies it in any way.
// This solution sends more data than necessary, but cuts down on code and
// effectively prevents the db and client from getting out of sync
router.put('/update', async (req, res) => {
  const { user } = req.body;

  // upsert : creates the object if it doesn't exist.
  await User.updateOne({ id: user.id }, { $set: user });

  res.send();
});

export default router;
