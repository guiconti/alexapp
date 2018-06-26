const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

//  Placeholder API
router.get('/', (req, res) => {
  res.status(200).json({ msg: 'Hi!' });
});

router.post('*', (req, res) => {
  console.log('Hi');
  res.status(200).json({ msg: 'hi '});
})

module.exports = router;
