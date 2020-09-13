import Model from '../models/model';

const authorModel = new Model('authors');

export const authorPage = async (req, res) => {
  try {
    const data = await authorModel.select('name, myManuscripts');
    res.status(200).json({ authors: data.rows });
  } catch (err) {
    res.status(200).json({ authors: err.stack });
  }
};
