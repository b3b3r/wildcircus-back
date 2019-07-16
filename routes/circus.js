const { Router } = require('express');

const router = Router();

const bodyParser = require('body-parser');
const connection = require('./conf');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/api/circus', (req, res) => {
  if (req.query.circus) {
    const { circus } = req.query;

    connection.query('SELECT * FROM circus WHERE name LIKE ?', circus, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de l\'import de données');
      } else {
        res.json(results);
      }
    });
  } else {
    connection.query('SELECT * FROM circus', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de l\'import de données');
      } else {
        res.json(results);
      }
    });
  }
});

router.post('/api/circus', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO circus SET ?', formData, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de l\'ajout d\'un cirque');
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
