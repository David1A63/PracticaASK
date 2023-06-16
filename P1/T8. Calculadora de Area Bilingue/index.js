/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

//Agregando las librerias de idioma
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
    en: {
        translation: {
            WELCOME_MESSAGE: 'Hi, Im the area calculator, try saying: "Calculate the area of a rectangle with a base of 10 and a height of 6"',
            HELLO_MESSAGE: 'Hello World!',
            HELP_MESSAGE: 'You can ask me to calculate the area of a rectangle, triangle or a circle. Try saying: "Find the area of a rectangle with a base of 10 and a height of 6"',
            CANCEL_MESSAGE: 'Goodbye!',
            ERROR_MESSAGE: 'Sorry, I had trouble doing what you asked. Please try again.',
            FALL_MESSAGE: 'Sorry, I don\'t know about that. Please try again.',
            A_RECTANGLE: `The area of the rectangle is {{resultado}} square units`,
            A_TRIANGLE: 'The area of the triangle is {{resultado}} square units',
            A_CIRCLE: 'The area of the circle is {{resultado}} square units',
            A_ERROR_R: 'Im sorry, I couldnt get the dimensions of the rectangle. Please, try again',
            A_ERROR_T: 'Im sorry, I couldnt get the dimensions of the triangle. Please, try again',
            A_ERROR_C: 'Im sorry, I couldnt get the dimensions of the circle. Please, try again'
        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: 'Hola, soy la calculadora de areas, prueba a decir: "Calcula el area de un rectangulo con una base de 10 y una altura de 6"',
            HELLO_MESSAGE: 'Hola Mundo!',
            HELP_MESSAGE: 'Puedes pedirme que calcule el area de un rectangulo, triangulo o un circulo. Intenta decir: "Calcula el area de un rectangulo con una base de 10 y una altura de 6"',
            CANCEL_MESSAGE: 'Adiós',
            ERROR_MESSAGE: 'Lo siento, Tuve problemas tu petición. Por favor intenta de nuevo.',
            FALL_MESSAGE: 'Lo siento, no se nada de eso. Por favor intenta de nuevo',
            A_RECTANGLE: `El área del rectángulo es {{resultado}} unidades cuadradas.`,
            A_TRIANGLE: 'El área del triangulo es {{resultado}} unidades cuadradas.',
            A_CIRCLE: 'El área del circulo es {{resultado}} unidades cuadradas.',
            A_ERROR_R: 'Lo siento, no pude obtener las dimensiones del rectángulo. Por favor, inténtalo de nuevo.',
            A_ERROR_T: 'Lo siento, no pude obtener las dimensiones del triangulo. Por favor, inténtalo de nuevo.',
            A_ERROR_C: 'Lo siento, no pude obtener las dimensiones del circulo. Por favor, inténtalo de nuevo.'
        }
    }
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        //Agregando el interceptor
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        //Agregando el interceptor
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

//Función que calcula el area de un rectangulo
const AreaRectanguloIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AreaRectanguloIntent';
  },
  handle(handlerInput) {
    const { ba, al } = handlerInput.requestEnvelope.request.intent.slots;

    if (ba.value && al.value) {
      const area = Number(ba.value) * Number(al.value);
      //Agregando el interceptor
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      const speakOutput = requestAttributes.t('A_RECTANGLE', { resultado: area.toFixed(2)});

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
    } else {
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      const speakOutput = requestAttributes.t('A_ERROR_R');

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
    }
  }
};

//Función que calcula el area de un triangulo
const AreaTrianguloIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AreaTrianguloIntent';
  },
  handle(handlerInput) {
    const { base, altura } = handlerInput.requestEnvelope.request.intent.slots;

    if (base.value && altura.value) {
      const area = ((Number(base.value)) * (Number(altura.value))) / 2;
      //Agregando el interceptor
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      const speakOutput = requestAttributes.t('A_TRIANGLE', { resultado: area.toFixed(2)});

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
    } else {
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      const speakOutput = requestAttributes.t('A_ERROR_T');

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
    }
  }
};

//Función que calcula el area de un circulo
const AreaCirculoIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AreaCirculoIntent';
  },
  handle(handlerInput) {
    const { radio } = handlerInput.requestEnvelope.request.intent.slots;

    if (radio && radio.value) {
      const area = ((Number(radio.value)) * (Number(radio.value))) * 3.1416;
      //Agregando el interceptor
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      const speakOutput = requestAttributes.t('A_CIRCLE', { resultado: area.toFixed(2)});

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
    } else {
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      const speakOutput = requestAttributes.t('A_ERROR_C');

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
    }
  }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        //Agregando el interceptor
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        //Agregando el interceptor
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('CANCEL_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        //Agregando el interceptor
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALL_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        //Agregando el interceptor
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Este interceptor registrará todas las peticiones entrantes a lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// Este interceptor registrará todas las peticiones salientes a lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

//Este interceptor de peticion enlazará una traducción a la funcion 't' de 'requestAttributes'
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        //Exportando los handler de calculo de area
        AreaRectanguloIntentHandler,
        AreaTrianguloIntentHandler,
        AreaCirculoIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    //Agregando los interceptores
    .addRequestInterceptors(LoggingRequestInterceptor, LocalizationInterceptor)
    .addResponseInterceptors(LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();