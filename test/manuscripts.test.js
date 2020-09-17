import { expect, server, BASE_URL } from './setup';
import { pool } from '../src/models/pool';
import { Model } from '../src/models/model';


describe('Manuscripts', () => {

  it('get manuscripts page', done => {
    server
      .get(`${BASE_URL}/manuscripts`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.manuscripts).to.be.instanceOf(Array);
        res.body.manuscripts.forEach(m => {
          expect(m).to.have.property('title');
          expect(m).to.have.property('genre');
          expect(m).to.have.property('wordcount');
          expect(m).to.have.property('authorid');
        });
        done();
      });
  });

  it('posts (creates) new manuscript', async () => {
    const authordata = { name: 'some name', email: 'new@name.come',
                 writingLevel: 'amateur', 'manuscriptCap': 3 };  
    const author = await server.post(`${BASE_URL}/authors`).send(authordata)
    const authorid = author.body.authors[0].authorid

    const data = { authorid: authorid, title: 'Some title', genre: 'Fantasy', 
                   form: 'Novel', blurb: 'some words about the synopsis', wordcount: 30000 };

    server
      .post(`${BASE_URL}/manuscripts`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.manuscripts).to.be.instanceOf(Array);
        res.body.manuscripts.forEach(m => {
          expect(m).to.have.property('manuscriptid');
          expect(m).to.have.property('authorid', data.authorid);
          expect(m).to.have.property('title', data.title);
          expect(m).to.have.property('genre', data.genre);
          expect(m).to.have.property('form', data.form);
          expect(m).to.have.property('blurb', data.blurb);
          expect(m).to.have.property('wordcount', data.wordcount);
        });
      });
  });

  it('updates manuscript details', async () => {
    // Create an author
    const authordata = { name: 'some name', email: 'new@name.come',
                 writingLevel: 'amateur', 'manuscriptCap': 3 };  
    const author = await server.post(`${BASE_URL}/authors`).send(authordata)
    const authorid = author.body.authors[0].authorid

    // Create a manuscript
    const manuscriptdata = { authorid: authorid, title: 'my book title', genre: 'romance',
                 form: 'novella', 'blurb': 'a vampire and a princess fall in love',
                 wordcount: 40000 };  
    const manuscript = await server.post(`${BASE_URL}/manuscripts`).send(manuscriptdata)
    const manuscriptid = manuscript.body.manuscripts[0].manuscriptid;

    // Test data for patch
    const data = {  title: 'my book title', genre: 'romance',
          form: 'novella', 'blurb': 'a vampire and a princess fall in love',
          wordcount: 40000, manuscriptid:  manuscriptid}; 

    server
      .patch(`${BASE_URL}/manuscripts`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.manuscripts).to.be.instanceOf(Array);
        res.body.manuscripts.forEach(m => {
          expect(m).to.have.property('manuscriptid', manuscriptid);
          expect(m).to.have.property('title', data.title);
          expect(m).to.have.property('genre', data.genre);
          expect(m).to.have.property('form', data.form);
          expect(m).to.have.property('blurb', data.blurb);
          expect(m).to.have.property('wordcount', data.wordcount);
        });
      });
  });
});