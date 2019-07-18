const { Router } = require('express');

const router = Router();

const bodyParser = require('body-parser');
const connection = require('./conf');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/theme/circus', (req, res) => {
  connection.query(
    `SELECT circus.name, circus.price, circus.place, circus.url, theme.name AS theme
    FROM circus 
    JOIN theme_circus ON circus.id = theme_circus.id_circus
    JOIN theme ON theme_circus.id_theme= theme.id`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Erreur lors de l\'import de données');
      } else {

        /* const newResults = results;
        const newData = {};
        for (let result = 0; result < results.length; result + 1) {
          newResults.filter(data => data.name === 'Le cirque du soleil');
          console.log(newResults);
          
        } */

        res.json(results);
      }
    }
  );
});

router.post('/theme/circus', (req, res) => {
  const formData = req.body;
  console.log(formData);

  connection.query('INSERT INTO theme_circus SET ?', formData, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de l\'ajout d\'un cirque');
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
