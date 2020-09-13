import Model from '../models/model';

const manuscriptModel = new Model('manuscripts');

export const manuscriptPage = async (req, res) => {
  try {
    const data = await manuscriptModel.select('title, genre, wordCount, authorId');
    res.status(200).json({ manuscripts: data.rows });
  } catch (err) {
    res.status(200).json({ manuscripts: err.stack });
  }
};
