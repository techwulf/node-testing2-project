const router = require('express').Router();

const Energies = require('./energies-model');

router.get('/', (req, res, next) => {
  Energies.getAll()
    .then(energies => {
      res.status(200).json(energies);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
