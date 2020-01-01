import { normalize, schema } from 'normalizr';

// This function takes the tree shaped diaries and returns a flat structure more suitable to a redux store.
const normalizeDiaries = diaries => {
  const answer = new schema.Entity('answersById', {}, { idAttribute: '_id' });
  const card = new schema.Entity('cardsById', { answers: [answer] }, { idAttribute: '_id' });
  const diary = new schema.Entity('diariesById', { cards: [card] }, { idAttribute: '_id' });

  const { entities } = normalize(diaries, [diary]);

  return entities;
};

export default normalizeDiaries;
