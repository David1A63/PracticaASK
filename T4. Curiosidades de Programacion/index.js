/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

//Mensajes a mostrar
const languageFacts = {
    "javascript":[
        "Es un lenguaje usado para el desarrollo web",
        "es un lenguaje dinámico",
        "basado en prototipos"    
    ],
    "java":[
        "Originalmente llamado fue Oak",
        "fue diseñado con el objetivo de ser portátil",
        "La mascota oficial de Java es un personaje animado llamado Duke"
    ],
    "python":[
        "su nombre se inspiró en el programa de televisión británico Monty Python's Flying Circus",
        "es conocido por su legibilidad y su enfoque en la sintaxis clara y concisa",
        "es un lenguaje de programación versátil y ampliamente utilizado en diversos campos, como desarrollo web, análisis de datos, inteligencia artificial y automatización de tareas"
    ],
    "rust":[
        "Se diseñó con el objetivo de ser seguro, concurrente y de alto rendimiento",
        "Uno de los aspectos destacados de Rust es su sistema de préstamos y propiedades. Este sistema permite gestionar de manera segura la memoria y evitar errores de seguridad, como fugas de memoria o accesos inválidos.",
        "Aunque Rust es un lenguaje relativamente nuevo, ha ganado popularidad rápidamente y se utiliza en proyectos importantes."
    ],
    "ruby":[
        "Ruby es un lenguaje de programación interpretado y dinámico que fue creado por Yukihiro Matsumoto en Japón",
        "Ruby es conocido por su enfoque en la elegancia y la legibilidad del código",
        "Ruby es muy utilizado en el desarrollo web, especialmente con el framework Ruby on Rails"
    ],
    "matlab":[
        "MATLAB es un lenguaje de programación y un entorno de desarrollo utilizado principalmente en el campo de las matemáticas y la ingeniería",
        "Una de las características distintivas de MATLAB es su capacidad para realizar operaciones matriciales de manera eficiente",
        "Se utiliza en campos como la física, la biología, la economía y la inteligencia artificial"
    ]
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = `Hola, puedo darte datos curiosos de algún lenguaje de programación,
        solo tienes que mencionarlo, por ejemplo, prueba diciendo "Prueba JavaScript"`;

        return handlerInput.responseBuilder
            //Responder mensaje
            .speak(speakOutput)
            //Esperar respuesta
            .reprompt(speakOutput)
            //Envía la respuesta
            .getResponse();
    }
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

//Metodo de custom language
const CustomLanguageIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CustomLanguageIntent'
    },
    handle(handlerInput){
        const {language} = handlerInput.requestEnvelope.request.intent.slots;
        let response;
        if(language && languageFacts[language.value]){
            response = languageFacts[language.value][Math.floor(Math.random() * languageFacts[language.value].length)]
        }else{
            response = "No tengo la información sobre el lenguaje que has mencionado, prueba con otro"
        }
        return handlerInput.responseBuilder
            .speak(response)
            .reprompt(response)
            .getResponse()
    }
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = `Hola, puedo darte datos curiosos de algún lenguaje de programación,
        solo tienes que mencionarlo, por ejemplo, prueba diciendo "Prueba JavaScript"`;

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
        const speakOutput = 'Adiós!';

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
        //Custom language
        CustomLanguageIntentHandler,
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