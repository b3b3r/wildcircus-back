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
        const newResults = results;
        const finalData = [];
        const filter = [...new Set(newResults.map(result => result.name))];


        for (let index = 0; index < filter.length; index++) {
          const newData = [...new Set(newResults.filter(data => data.name === filter[index])
            .map(result => result.theme))];
          const name = filter[index];
          const { price, place, url } = newResults.find(x => x.name === filter[index]);
          finalData.push({
            name,
            price,
            place,
            url,
            theme: newData
          });
        }

        res.json(finalData);
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
