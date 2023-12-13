var express = require('express');
var router = express.Router();

router.get('/:petId', (req, res, next) => {
  res.json({
    id: req.params.petId,
    name: 'doggie'
  });
});

module.exports = router;