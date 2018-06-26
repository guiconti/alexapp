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
  res.status(200).json(
    {
      "version": "string",
      "sessionAttributes": {
        "key": "value"
      },
      "response": {
        "outputSpeech": {
          "type": "PlainText",
          "text": "Plain text string to speak",
          "ssml": "<speak>SSML text string to speak</speak>"
        },
        "card": {
          "type": "Standard",
          "title": "Title of the card",
          "content": "Content of a simple card",
          "text": "Text content for a standard card",
          "image": {
            "smallImageUrl": "https://url-to-small-card-image...",
            "largeImageUrl": "https://url-to-large-card-image..."
          }
        },
        "reprompt": {
          "outputSpeech": {
            "type": "PlainText",
            "text": "Plain text string to speak",
            "ssml": "<speak>SSML text string to speak</speak>"
          }
        },
        "directives": [
          {
            "type": "InterfaceName.Directive"
          }
        ],
        "shouldEndSession": true
      }
    }
  );
})

module.exports = router;
