const knex = require('../db/knex');
const request = require('supertest');
const expect = require('chai').expect;

const app = require('../app');

const fixtures = require('./fixtures');

// console.log(fixtures);

describe('CRUD Events', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        return knex.seed.run();
      }).then(() => done());
  });

  it('Lists all records', (done) => {
    request(app)
      .get('/api/v1/artists')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        // console.log(response.body);
        expect(response.body).to.be.a('array');
        expect(response.body).to.deep.equal(fixtures.artists);
        done();
      });
  });

  it('Lists one record by id', (done) => {
    request(app)
      .get('/api/v1/artists/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        // console.log(response.body);
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.artists[0]);
        done();
      });
  });

  it('Lists the third record by id', (done) => {
    request(app)
      .get('/api/v1/artists/3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        // console.log(response.body);
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.artists[2]);
        done();
      });
  });

  it('Creates a record', (done) => {
    request(app)
      .post('/api/v1/artists/')
      .send(fixtures.artist)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        fixtures.artist.id = response.body.id;
        expect(response.body).to.deep.equal(fixtures.artist);
        done();
      });
  });

  it('Updates a record', (done) => {
    fixtures.artist.phone = '221312324343434';
    request(app)
      .put('/api/v1/artists/4')
      .send(fixtures.artist)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.artist);
        done();
      });
  });

  it('Deletes a record', (done) => {
    request(app)
      .delete('/api/v1/artists/4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal({
          deleted: true
        });
        done();
      });
  });
});
