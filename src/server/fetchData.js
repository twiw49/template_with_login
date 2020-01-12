import User from './models/User';

const fetchData = () => async (req, res, next) => {
  if (req.cookies.user) {
    console.log('FETCH DATA FROM DB');

    const user = await User.findOne({ id: req.cookies.user.id });

    req.initialState = {
      user
    };
  }

  next();
};

export default fetchData;
