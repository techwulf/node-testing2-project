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

router.post('/', (req, res, next) => {
  Energies.insert(req.body)
    .then(newEnergy => {
      res.status(201).json(newEnergy);
    })
    .catch(err => {
      next(err)
    });
});

router.put('/:id', (req, res, next) => {
  Energies.update(req.params.id, req.body.energy)
    .then(updatedEnergy => {
      res.status(200).json(updatedEnergy);
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  Energies.remove(req.params.id)
    .then(removedEnergy => {
      res.status(200).json(removedEnergy);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
