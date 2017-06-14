const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('invalid ID'));
}

function validArtist(artist) {
    const hasFirst = typeof artist.firstName == 'string' && artist.firstName.trim() != '';
    const hasLast = typeof artist.lastName == 'string' && artist.lastName.trim() != '';
    const hasPhone = typeof artist.phone == 'string' && artist.phone.trim() != '';
    const hasURL = typeof artist.url == 'string' && artist.url.trim() != '';
    return hasFirst && hasLast && hasPhone && hasURL;
}

router.get('/', (req, res) => {
    queries.getAll().then(artists => {
      res.json(artists);
    });
});

router.get('/:id', isValidId, (req, res, next) => {
  queries.getOne(req.params.id).then(artist => {
    if(artist){
      res.json(artist);
    } else {
      next();
    }
  });
});

// console.log(validArtist({
//       "firstName": "Bob",
//       "lastName": "Ross",
//       "phone": "(303)0000000",
//       "url":"https://s-media-cache-ak0.pinimg.com/originals/16/e6/eb/16e6ebdf1b5e4e0b02988e1aade0126e.gif"
//  }));

router.post('/', (req, res, next) => {
  if(validArtist(req.body)) {
    queries.create(req.body).then(artists => {
      res.json(artists[0]);
    });
  } else {
    next(new Error('Invalid Artist'));
  }
});

router.put('/:id', isValidId, (req, res, next) => {
  if(validArtist(req.body)) {
    queries.update(req.params.id, req.body).then(artists => {
      res.json(artists[0]);
    });
  } else {
    next(new Error('Invalid Artist'));
  }
});

router.delete('/:id', isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
