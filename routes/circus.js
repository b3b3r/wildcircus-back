const { Router } = require('express');

const router = Router();

const bodyParser = require('body-parser');
const connection = require('./conf');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/circus', (req, res) => {
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

router.post('/circus', (req, res) => {
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

router.put('/circus', (req, res) => {
  const idPeople = req.query.id;
  const formData = req.body;
  connection.query('UPDATE circus SET ? WHERE id = ?', idPeople, [formData, idPeople], (err) => {
    if (err) {
      res.status(500).send('Erreur lors de la modification');
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/circus', (req, res) => {
  const { id } = req.query;
  connection.query('DELETE FROM circus WHERE id=?', [id], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la suppression');
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
