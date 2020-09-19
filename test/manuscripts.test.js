import { expect, server, BASE_URL } from './setup';
import bcrypt from 'bcrypt';


describe('Manuscripts', () => {
  var token = '';
  var authorid = '';
  var manuscriptid = '';

  var postdata = { email: 'testuser_manuscript@email.com', password: 'password' }; 
  var manuscriptdata = {}

  function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }

  before(async () => {
    let res = await server.post(`${BASE_URL}/authors`).send(postdata);
    authorid = res.body.authors[0].authorid;
    token = res.body.token;

    manuscriptdata  = { authorid: authorid, title: 'my book title', genre: 'romance',
        form: 'novella', 'blurb': 'a vampire and a princess fall in love',
        wordcount: 40000 };  
    
    let manuscript = await server.post(`${BASE_URL}/manuscripts`)
        .send(manuscriptdata)
        .set('x-access-token', token)

    manuscriptid = manuscript.body.manuscripts[0].manuscriptid;

  });
  
  it('gets all manuscripts', done => {
    server
      .get(`${BASE_URL}/manuscripts`)
      .set('x-access-token', token)
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

  it('get manuscripts by id', done => {
    server
      .get(`${BASE_URL}/manuscripts/${manuscriptid}`)
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.manuscripts).to.be.instanceOf(Array);
        expect(res.body.manuscripts.length).to.equal(1); // want just one with this id
        res.body.manuscripts.forEach(m => {
          expect(m).to.have.property('manuscriptid', manuscriptid)
          expect(m).to.have.property('title', manuscriptdata.title);
          expect(m).to.have.property('genre', manuscriptdata.genre);
          expect(m).to.have.property('wordcount', manuscriptdata.wordcount);
          expect(m).to.have.property('authorid', manuscriptdata.authorid);
        });
        done();
      });
  });

  it('get manuscripts by author id', done => {
    server
      .get(`${BASE_URL}/authors/${authorid}/manuscripts`)
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.manuscripts).to.be.instanceOf(Array);
        res.body.manuscripts.forEach(m => {
          expect(m).to.have.property('manuscriptid', manuscriptid)
          expect(m).to.have.property('title');
          expect(m).to.have.property('genre');
          expect(m).to.have.property('wordcount');
          expect(m).to.have.property('authorid');
        });
        done();
      });
  });

  it('posts (creates) new manuscript', done => {
    server
      .post(`${BASE_URL}/manuscripts`)
      .send(manuscriptdata)
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.manuscripts).to.be.instanceOf(Array);
        res.body.manuscripts.forEach(m => {
          expect(m).to.have.property('manuscriptid')
          expect(m).to.have.property('authorid', manuscriptdata.authorid);
          expect(m).to.have.property('title', manuscriptdata.title);
          expect(m).to.have.property('genre', manuscriptdata.genre);
          expect(m).to.have.property('form', manuscriptdata.form);
          expect(m).to.have.property('blurb', manuscriptdata.blurb);
          expect(m).to.have.property('wordcount', manuscriptdata.wordcount);
        });
        done();
      });
  });

  it('updates manuscript details', done => {
    // Test data for patch
    const data = {  title: 'my book title', genre: 'romance',
          form: 'novella', 'blurb': 'a vampire and a princess fall in love',
          wordcount: 40000, manuscriptid:  manuscriptid}; 
        
    server
      .patch(`${BASE_URL}/manuscripts`)
      .send(data)
      .set('x-access-token', token)
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.manuscripts).to.be.instanceOf(Array);
        res.body.manuscripts.forEach(m => {
          expect(m).to.have.property('manuscriptid', manuscriptid);
          expect(m).to.have.property('title', data.title);
          expect(m).to.have.property('genre', data.genre);
          expect(m).to.have.property('form', data.form);
          expect(m).to.have.property('blurb', data.blurb);
          expect(m).to.have.property('wordcount', data.wordcount);
        });
        done();
      });
  });
});