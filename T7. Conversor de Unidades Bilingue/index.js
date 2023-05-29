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
            WELCOME_MESSAGE: 'Hello, I am the unit conversor two, try saying: "convert 100 centimeters to meters"',
            HELLO_MESSAGE: 'Hello World!',
            HELP_MESSAGE: 'You can ask me to convert centimeters to meters, inches, feet or yards. Try saying: "convert 100 centimeters to meters"',
            CANCEL_MESSAGE: 'Goodbye!',
            ERROR_MESSAGE: 'Sorry, I had trouble doing what you asked. Please try again.',
            FALL_MESSAGE: 'Sorry, I don\'t know about that. Please try again.',
            CMINCH: `The amount of {{cantidad}} centimeters is equal to {{resultado}} inches`,
            CMYD: `The amount of {{cantidad}} centimeters is equal to {{resultado}} yards`,
            CMFT: `The amount of {{cantidad}} centimeters is equal to {{resultado}} feets`,
            CMMT: `The amount of {{cantidad}} centimeters is equal to {{resultado}} meters`,
            CM_ERROR: 'You havent entered a valid amount of centimeters. Please, try again'
        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: 'Hola, soy el conversor de unidades dos, prueba a decir: "Convierte 100 cm a metros"',
            HELLO_MESSAGE: 'Hola Mundo!',
            HELP_MESSAGE: 'Puedes pedirme que convierta centimetros a metros, pulgadas, pies o yardas. Intenta decir: "convierte 100 centimetros a metros"',
            CANCEL_MESSAGE: 'Adiós!',
            ERROR_MESSAGE: 'Lo siento, Tuve problemas con lo que has preguntado. Por favor intenta de nuevo.',
            FALL_MESSAGE: 'Lo siento, no se nada de eso. Por favor intenta de nuevo',
            CMINCH: `La cantidad de {{cantidad}} centimetros es equivalente a {{resultado}} pulgadas.`,
            CMYD: `La cantidad de {{cantidad}} centimetros es equivalente a {{resultado}} yardas.`,
            CMFT: `La cantidad de {{cantidad}} centimetros es equivalente a {{resultado}} pies.`,
            CMMT: `La cantidad de {{cantidad}} centimetros es equivalente a {{resultado}} metros.`,
            CM_ERROR: 'No se proporcionó una cantidad válida de centimetros. Por favor, intenta de nuevo.'
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

//Conversor Cm a Inch
const ConversorInchIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConversorInchIntent'
    );
  },
  handle(handlerInput) {
    const { cantidad } = handlerInput.requestEnvelope.request.intent.slots;

    // Verificar si se proporcionó la cantidad de pesos
    if (cantidad && cantidad.value) {
      // Convertir la cantidad de cm a pulgadas
      const centimetros = parseFloat(cantidad.value);
      const conversor = 0.39;
      const resultado = centimetros * conversor;

      // Construir la respuesta con el resultado de la conversión
      //Agregando el interceptor
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      const responseText = requestAttributes.t('CMINCH', { cantidad: cantidad.value, resultado: resultado.toFixed(2) });

      return handlerInput.responseBuilder.speak(responseText).getResponse();
    } else {
      // Si no se proporcionó la cantidad de centimetros, enviar un mensaje de error
      //Agregando el interceptor
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      const responseText = requestAttributes.t('CM_ERROR');
      return handlerInput.responseBuilder.speak(responseText).getResponse();
    }
  },
};

//Conversor Cm a Yd
const ConversorYdIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConversorYdIntent'
    );
  },
  handle(handlerInput) {
    const { cantidad } = handlerInput.requestEnvelope.request.intent.slots;

    // Verificar si se proporcionó la cantidad de pesos
    if (cantidad && cantidad.value) {
      // Convertir la cantidad de cm a pulgadas
      const centimetros = parseFloat(cantidad.value);
      const conversor = 0.0109361;
      const resultado = centimetros * conversor;

      //Agregando el interceptor
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      const responseText = requestAttributes.t('CMYD', { cantidad: cantidad.value, resultado: resultado.toFixed(2) });

      return handlerInput.responseBuilder.speak(responseText).getResponse();
    } else {
      // Si no se proporcionó la cantidad de centimetros, enviar un mensaje de error
      //Agregando el interceptor
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      const responseText = requestAttributes.t('CM_ERROR');
      return handlerInput.responseBuilder.speak(responseText).getResponse();
    }
  },
};

//Conversor Cm a Ft
const ConversorFtIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConversorFtIntent'
    );
  },
  handle(handlerInput) {
    const { cantidad } = handlerInput.requestEnvelope.request.intent.slots;

    // Verificar si se proporcionó la cantidad de pesos
    if (cantidad && cantidad.value) {
      // Convertir la cantidad de cm a pulgadas
      const centimetros = parseFloat(cantidad.value);
      const conversor = 0.0328084;
      const resultado = centimetros * conversor;

      //Agregando el interceptor
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      const responseText = requestAttributes.t('CMFT', { cantidad: cantidad.value, resultado: resultado.toFixed(2) });

      return handlerInput.responseBuilder.speak(responseText).getResponse();
    } else {
      // Si no se proporcionó la cantidad de centimetros, enviar un mensaje de error
      //Agregando el interceptor
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      const responseText = requestAttributes.t('CM_ERROR');
      return handlerInput.responseBuilder.speak(responseText).getResponse();
    }
  },
};

//Conversor Cm a Mt
const ConversorMtIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConversorMtIntent'
    );
  },
  handle(handlerInput) {
    const { cantidad } = handlerInput.requestEnvelope.request.intent.slots;

    // Verificar si se proporcionó la cantidad de pesos
    if (cantidad && cantidad.value) {
      // Convertir la cantidad de cm a pulgadas
      const centimetros = parseFloat(cantidad.value);
      const conversor = 0.01;
      const resultado = centimetros * conversor;

      //Agregando el interceptor
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      const responseText = requestAttributes.t('CMMT', { cantidad: cantidad.value, resultado: resultado.toFixed(2) });

      return handlerInput.responseBuilder.speak(responseText).getResponse();
    } else {
      // Si no se proporcionó la cantidad de centimetros, enviar un mensaje de error
      //Agregando el interceptor
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      const responseText = requestAttributes.t('CM_ERROR');
      return handlerInput.responseBuilder.speak(responseText).getResponse();
    }
  },
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
        ConversorInchIntentHandler,
        ConversorYdIntentHandler,
        ConversorFtIntentHandler,
        ConversorMtIntentHandler,
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