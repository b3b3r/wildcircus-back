const { Router } = require('express');

const router = Router();

const bodyParser = require('body-parser');
const connection = require('./conf');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));


router.post('/api/theme', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO theme SET ?', formData, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de l\'ajout d\'un theme');
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
