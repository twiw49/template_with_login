const makeId = () => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return [...Array(10).keys()].reduce((id, i) => {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
    return id;
  }, '');
};

export default makeId;
