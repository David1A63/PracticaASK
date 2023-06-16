const Alexa = require('ask-sdk-core');

//Dependencias de idioma
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

//Agregando la localización a español de la skill

const languageStrings = require('./localization')

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t(`WELCOME_MSG`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CarreraIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CarreraIntent';
  },
  handle(handlerInput) {
    const carreraSlot = Alexa.getSlot(handlerInput.requestEnvelope, 'carrera');
    const propedeuticoSlot = Alexa.getSlot(handlerInput.requestEnvelope, 'propedeutico');
    
    let carreraCursada = '';
    let propedeutico = '';
    let suggestedCareers = '';
    
    //Listener...
    const {attributesManager} = handlerInput;
    const requestAttributes = attributesManager.getRequestAttributes();
    
    if (carreraSlot && carreraSlot.value) {
      carreraCursada = carreraSlot.value;
        if (propedeuticoSlot && propedeuticoSlot.value) {
            propedeutico = propedeuticoSlot.value;
            if (carreraCursada==='administración' || carreraCursada==='administration') {
                if(propedeutico==='matemático' || propedeutico==='mathematics'){
                    suggestedCareers = requestAttributes.t('ADM_MAT');
                }else if(propedeutico==='biología' || propedeutico==='biology'){
                    suggestedCareers = requestAttributes.t('ADM_BIO');
                }else if(propedeutico==='letras' || propedeutico==='letters'){
                    suggestedCareers = requestAttributes.t('ADM_LET');
                }
            }else if(carreraCursada==='programación' || carreraCursada==='programming'){
                if(propedeutico==='matemático' || propedeutico==='mathematics'){
                    suggestedCareers = requestAttributes.t('PRO_MAT');
                }else if(propedeutico==='biología' || propedeutico==='biology'){
                    suggestedCareers = requestAttributes.t('PRO_BIO');
                }else if(propedeutico==='letras' || propedeutico==='letters'){
                    suggestedCareers = requestAttributes.t('PRO_LET');
                }
            }else if(carreraCursada==='mantenimiento de equipos' || carreraCursada==='equipment maintenance'){
                if(propedeutico==='matemático' || propedeutico==='mathematics'){
                    suggestedCareers = requestAttributes.t('MDE_MAT');
                }else if(propedeutico==='biología' || propedeutico==='biology'){
                    suggestedCareers = requestAttributes.t('MDE_BIO');
                }else if(propedeutico==='letras' || propedeutico==='letters'){
                    suggestedCareers = requestAttributes.t('MDE_LET');
                }
            }else if(carreraCursada==='servicios de hospedaje' || carreraCursada==='hosting services'){
                if(propedeutico==='matemático' || propedeutico==='mathematics'){
                    suggestedCareers = requestAttributes.t('SDH_MAT');
                }else if(propedeutico==='biología' || propedeutico==='biology'){
                    suggestedCareers = requestAttributes.t('SDH_BIO');
                }else if(propedeutico==='letras' || propedeutico==='letters'){
                    suggestedCareers = requestAttributes.t('SDH_LET');
                }
            }else if(carreraCursada==='preparación de alimentos' || carreraCursada==='food preparation'){
                if(propedeutico==='matemático' || propedeutico==='mathematics'){
                    suggestedCareers = requestAttributes.t('PDA_MAT');
                }else if(propedeutico==='biología' || propedeutico==='biology'){
                    suggestedCareers = requestAttributes.t('PDA_BIO');
                }else if(propedeutico==='letras' || propedeutico==='letters'){
                    suggestedCareers = requestAttributes.t('PDA_LET');
                }
            }else if(carreraCursada==='mantenimiento automotriz' || carreraCursada==='automotive maintenance'){
                if(propedeutico==='matemático' || propedeutico==='mathematics'){
                    suggestedCareers = requestAttributes.t('MAA_MAT');
                }else if(propedeutico==='biología' || propedeutico==='biology'){
                    suggestedCareers = requestAttributes.t('MAA_BIO');
                }else if(propedeutico==='letras' || propedeutico==='letters'){
                    suggestedCareers = requestAttributes.t('MAA_LET');
                }
            }
            
            const speakOutput = requestAttributes.t('FINAL_MSG', { carr: carreraCursada, prope: propedeutico, sug_car: suggestedCareers});
            
            return handlerInput.responseBuilder
              .speak(speakOutput)
              .getResponse();
        }else{
            //Si no se ha detectado el propedeutico
            const speakOutput = requestAttributes.t('ERR_PROP');
            return handlerInput.responseBuilder
                  .speak(speakOutput)
                  .getResponse();
        }
    }else{
        //Si no se ha detectado carrera
        const speakOutput = requestAttributes.t('ERR_CARR');
        return handlerInput.responseBuilder
              .speak(speakOutput)
              .getResponse();
    }
  },
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        //Listener...
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MSG');

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
        //Listener...
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('CANCEL_MSG');

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
        //Listener...
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALL_MSG');

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
        const speakOutput = `Has iniciado... ${intentName}`;

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
        //Listener...
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MSG');
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
        HelpIntentHandler,
        CarreraIntentHandler,
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