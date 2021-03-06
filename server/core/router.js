const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const Alexa = require('ask-sdk');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
      const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';

      return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(speechText)
          .withSimpleCard('Hello World', speechText)
          .getResponse();
  }
};

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'GetNewFactIntent';
  },
  handle(handlerInput) {
      const speechText = 'Hey dude it just works, congratulations! SHABLAU';

      return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard('Google it', speechText)
          .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
      const speechText = 'You can say hello to me!';

      return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(speechText)
          .withSimpleCard('Hello World', speechText)
          .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
              || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
      const speechText = 'Goodbye!';

      return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard('Hello World', speechText)
          .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
      //any cleanup logic goes here
      return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Not today, son.')
      .reprompt('Not today, son.')
      .getResponse();
  },
};

//  Placeholder API
router.get('/', (req, res) => {
  res.status(200).json({ msg: 'Hi!' });
});

router.post('*', (req, res) => {
  console.log('Hi');
  let context = {
    succeed: function (result) {
      console.log(result);
      res.json(result);
    },
    fail:function (error) {
      console.log(error);
    }
  };
  // let alexa = Alexa.handler(req.body, context);
  // alexa.registerHandlers(handlers);
  // alexa.execute();

  let skill = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .create();

  skill.invoke(req.body, context)
      .then(function(responseBody) {
        res.json(responseBody);
      })
      .catch(function(error) {
        console.log(error);
        res.status(500).send('Error during the request');
      });
})

module.exports = router;
