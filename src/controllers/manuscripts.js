import Model from '../models/model';

const manuscriptModel = new Model('manuscripts');

export const getManuscripts = async (req, res) => {
  try {
    const data = await manuscriptModel.select('title, genre, wordCount, manuscriptId, authorId');
    res.status(200).json({ manuscripts: data.rows });
  } catch (err) {
    res.status(200).json({ manuscripts: err.stack });
  }
};

export const getManuscriptById = async (req, res) => {
  try {
    const query = ` WHERE manuscriptid = '${req.params.id}'`;
    const data = await manuscriptModel.select(['title, genre, wordCount, manuscriptId, authorId'], query);
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

export const updateManuscript = async (req, res) => {
  const { manuscriptid } = req.body;
  // TODO 

  var columns = [];
  var values = [];

  ['title', 'genre', 'form', 'blurb', 'wordcount'].forEach((attribute, index) => {
    if (attribute in req.body) {
      columns.push(attribute);
      values.push(req.body[attribute]);
    }
  })

  const update_query = columns.map((col, i) => col + "='" + values[i] + "'").join(", ")
  columns = columns.join(", ");

  try {
    const data = await manuscriptModel.updateWithReturn('manuscript', manuscriptid, update_query, columns);
    res.status(200).json({ manuscripts: data.rows });
  } catch (err) {
    res.status(200).json({ manuscripts: err.stack });
  }
}

export const updateManuscriptMatches = async (req, res) => {
  // TODO
  const { authorid, manuscriptid, manuscriptMatches } = req.body;

}


