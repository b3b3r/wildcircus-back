const { Router } = require('express');

const router = Router();

const bodyParser = require('body-parser');
const connection = require('./conf');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/theme', (req, res) => {
  if (req.query.theme) {
    const { theme } = req.query;

    connection.query('SELECT * FROM theme WHERE name LIKE ?', theme, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de l\'import de données');
      } else {
        res.json(results);
      }
    });
  } else {
    connection.query('SELECT * FROM theme', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de l\'import de données');
      } else {
        res.json(results);
      }
    });
  }
});

router.post('/theme', (req, res) => {
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
