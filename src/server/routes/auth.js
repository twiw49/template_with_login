import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.post('/login', async (req, res) => {
  const { _id, name, profile_image } = req.body;

  let user = await User.findOne({ _id });

  if (!user) {
    user = await new User({
      _id,
      name,
      profile_image
    }).save();
  }

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

  res.redirect('/');
});

export default router;
