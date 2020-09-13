import { expect, server, BASE_URL } from './setup';

describe('Authors', () => {
  it('get authors page', done => {
    server
      .get(`${BASE_URL}/authors`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.authors).to.be.instanceOf(Array);
        res.body.authors.forEach(m => {
          expect(m).to.have.property('name');
          expect(m).to.have.property('mymanuscripts');
        });
        done();
      });
  });
});