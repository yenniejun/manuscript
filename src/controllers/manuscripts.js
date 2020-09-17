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

export const addManuscript = async (req, res) => {
  const { authorid, title, genre, form, blurb, wordcount } = req.body;
  const columns = 'authorid, title, genre, form, blurb, wordcount';
  const values = `'${authorid}', '${title}', '${genre}',\
   '${form}', '${blurb}', '${wordcount}'`;
  try {
    const data = await manuscriptModel.insertWithReturn('manuscript', columns, values);
    res.status(200).json({ manuscripts: data.rows });
  } catch (err) {
    res.status(200).json({ manuscripts: err.stack });
  }
};

export const patchManuscript = async (req, res) => {
  const { authorid, title, genre, form, blurb, wordcount, manuscriptMatches } = req.body;
  // TODO 
}