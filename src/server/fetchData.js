import User from './models/User';

const fetchData = () => async (req, res, next) => {
  if (req.cookies.user) {
    console.log('FETCH DATA FROM DB');

    let user = await User.findOne({ _id: req.cookies.user._id });

    req.initialState = {
      user
    };
  }

  next();
};

export default fetchData;
