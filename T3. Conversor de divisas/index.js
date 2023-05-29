/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = `Hola, puedo ayudarte a convertir pesos a las divisas: dolar, euro y yuan. Prueba decir: "Convierte 200 pesos a dolares"`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//Conversor MXN a USD
const ConversorUSDIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConversorUSDIntent'
    );
  },
  handle(handlerInput) {
    const { cantidad } = handlerInput.requestEnvelope.request.intent.slots;

    // Verificar si se proporcionó la cantidad de pesos
    if (cantidad && cantidad.value) {
      // Convertir la cantidad de pesos a dólares
      const pesos = parseFloat(cantidad.value);
      const tasaCambio = 0.05; // Establecer la tasa de cambio manualmente (actualízala según corresponda)
      const dolares = pesos * tasaCambio;

      // Construir la respuesta con el resultado de la conversión
      const responseText = `La cantidad de ${cantidad.value} pesos es equivalente a ${dolares.toFixed(2)} dólares.`;

      return handlerInput.responseBuilder.speak(responseText).getResponse();
    } else {
      // Si no se proporcionó la cantidad de pesos, enviar un mensaje de error
      const responseText = 'No se proporcionó una cantidad válida de pesos. Por favor, intenta de nuevo.';
      return handlerInput.responseBuilder.speak(responseText).getResponse();
    }
  },
};



//Conversor MXN a EUR
const ConversorEURIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConversorEURIntent'
    );
  },
  handle(handlerInput) {
    const { cantidad } = handlerInput.requestEnvelope.request.intent.slots;

    // Verificar si se proporcionó la cantidad de pesos
    if (cantidad && cantidad.value) {
      // Convertir la cantidad de pesos a euros (aquí puedes insertar tu lógica específica)
      const pesos = parseFloat(cantidad.value);
      const tasaCambio = 0.053; // Ejemplo: Tasa de cambio fija
      const euros = pesos * tasaCambio;

      // Construir la respuesta con el resultado de la conversión
      const response = `La cantidad de ${cantidad.value} pesos es equivalente a ${euros} euros.`;

      return handlerInput.responseBuilder.speak(response).getResponse();
    } else {
      // Si no se proporcionó la cantidad de pesos, enviar un mensaje de error
      const response = 'No se proporcionó una cantidad válida de pesos. Por favor, intenta de nuevo.';
      return handlerInput.responseBuilder.speak(response).getResponse();
    }
  },
};

//Conversor MXN a YUN
const ConversorYUNIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConversorYUNIntent'
    );
  },
  handle(handlerInput) {
    const { cantidad } = handlerInput.requestEnvelope.request.intent.slots;

    // Verificar si se proporcionó la cantidad de pesos
    if (cantidad && cantidad.value) {
      // Convertir la cantidad de pesos a euros (aquí puedes insertar tu lógica específica)
      const pesos = parseFloat(cantidad.value);
      const tasaCambio = 0.4; // Ejemplo: Tasa de cambio fija
      const yuanes = pesos * tasaCambio;

      // Construir la respuesta con el resultado de la conversión
      const response = `La cantidad de ${cantidad.value} pesos es equivalente a ${yuanes} yuanes.`;

      return handlerInput.responseBuilder.speak(response).getResponse();
    } else {
      // Si no se proporcionó la cantidad de pesos, enviar un mensaje de error
      const response = 'No se proporcionó una cantidad válida de pesos. Por favor, intenta de nuevo.';
      return handlerInput.responseBuilder.speak(response).getResponse();
    }
  },
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola, Bienvenido!';

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
        const speakOutput = `Puedo ayudarte a convertir pesos a las divisas: dolar, euro y yuan. Prueba decir: "Convierte 20 pesos a dolares"`;

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
        const speakOutput = 'Adiós';

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
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

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
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ConversorUSDIntentHandler,
        ConversorEURIntentHandler,
        ConversorYUNIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();