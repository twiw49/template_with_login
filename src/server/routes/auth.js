import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.post('/login', async (req, res) => {
  const { id, name, profile_image } = req.body;

  let user = await User.findOne({ id });

  if (!user)
    user = await new User({
      id,
      name,
      profile_image,
      habits: []
    }).save();

  res.cookie('user', user, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/'
  });

  res.send({
    user
  });
});

router.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.send();
});

export default router;
