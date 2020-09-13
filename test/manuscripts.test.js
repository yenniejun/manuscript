import { expect, server, BASE_URL } from './setup';

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
});