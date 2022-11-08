import BpmnModeler from 'bpmn-js/lib/Modeler';
import EmbeddedComments from 'bpmn-js-embedded-comments';
import BpmnModdle from 'bpmn-moddle';
import { diff } from 'bpmn-js-differ';
import camundaExtensionModule from './camunda/lib';
import camundaModdle from './camunda/camunda.json';
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import * as minDash from "min-dash";

import ScModule from './sc';

//import diagramXML from '../resources/diagram.bpmn';

window.bpmn = window.bpmn || {};
window.bpmn.BpmnModeler = BpmnModeler;
window.bpmn.EmbeddedComments = EmbeddedComments;
window.bpmn.BpmnModdle = BpmnModdle;
window.bpmn.diff = diff;
window.bpmn.ScModule = ScModule;
window.bpmn.camundaExtensionModule = camundaExtensionModule;
window.bpmn.camundaModdle = camundaModdle;
window.bpmn.BpmnViewer = BpmnViewer;
window.bpmn.minDash = minDash;


// import oldDiagram from '../resources/samples/old.bpmn';
// import newDiagram from '../resources/samples/new.bpmn';

// import './diff/bpmn-diff.js';
// //import './diff/diff-ui.js';

// //window.bpmn.diffui.loadDiagrams("", "");
// // window.bpmn.diffui.loadDiagrams("", newDiagram);
// //window.bpmn.diffui.loadDiagrams(oldDiagram, newDiagram);

// setTimeout(() => {
//     debugger
//     window.bpmn.diffui.loadDiagram("left", newDiagram );
//     window.bpmn.diffui.loadDiagram("right", oldDiagram );
// }, 3000)


// const containerEl = document.getElementById('container');
// let bpmnModeler = window.bpmnModeler = new BpmnModeler({
//     container: containerEl,
//     additionalModules: [
//         camundaExtensionModule,
//         ScModule
//     ],
//     moddleExtensions: {
//         camunda: camundaModdle
//     },
//     scModule: {
//         toolbar: ['create.start-event', 'create.end-event', 'create.exclusive-gateway', 'create.inclusive-gateway', 'create.task', 'create.call-activity', 'create.script-task', 'create.user-task'],
//         //menu: ['replace-with-none-start']
//     }
// });
// bpmnModeler.importXML(diagramXML, (err) => {
//     if (err) {
//         console.error(err);
//     }
// });



// var modeling = bpmnModeler.get('modeling');
// var eventBus = bpmnModeler.get('eventBus');
// const elementRegistry = bpmnModeler.get('elementRegistry');
// const bpmnFactory = bpmnModeler.get("bpmnFactory");
// var moddle = bpmnModeler.get('moddle');
// var canvas = bpmnModeler.get('canvas');

// eventBus.on('element.contextmenu', function (e) {

// });

// function updateInputParameter(element, paramName, paramValue) {
//     if (!(element && paramName)) return;

//     let bo = element.businessObject;
//     if (bo.extensionElements) {
//         let values = bo.extensionElements.values;
//         let valueWithInputParameters = Array.isArray(values) && values.find((item) => {
//             return item.inputParameters;
//         })
//         let inputParameters = valueWithInputParameters && valueWithInputParameters.inputParameters;
//         if (inputParameters) {
//             let paramNode = Array.isArray(inputParameters) && inputParameters.find((paramNode) => {
//                 return paramNode.name === paramName;
//             })

//             if (paramNode) {
//                 paramNode.value = paramValue;
//             } else {
//                 let inputParameter = moddle.create('camunda:InputParameter', {
//                     name: paramName,
//                     value: paramValue
//                 });
//                 inputParameters.push(inputParameter);
//             }

//         } else {
//             let inputParameter = moddle.create('camunda:InputParameter', {
//                 name: paramName,
//                 value: paramValue
//             });
//             let inputOutput = moddle.create('camunda:InputOutput', {
//                 inputParameters: [inputParameter]
//             });
//             values.push(inputOutput);

//         }

//     } else {
//         let inputParameter = moddle.create('camunda:InputParameter', {
//             name: paramName,
//             value: paramValue
//         });
//         let inputOutput = moddle.create('camunda:InputOutput', {
//             inputParameters: [inputParameter]
//         });

//         let extensionElements = moddle.create('bpmn:ExtensionElements', {
//             values: [inputOutput]
//         });
//         bo.extensionElements = extensionElements;
//     }
//     modeling.updateProperties(element, { extensionElements: bo.extensionElements })
// }

// eventBus.on('commandStack.changed', () => {
//     debugger
// })

// eventBus.on('shape.changed', function (event) {
//     debugger
//     let id = event.element.id;
//     let type = event.element.type;

//     if (type === 'label') {
//         return;
//     }
//     let prefix = type.substring(type.indexOf(':') + 1);
//     let name = event.element.businessObject.name;
//     if (name) {
//         name = name.toLowerCase();
//         name = name.replaceAll(/[\W]+/gm, "_");
//     }

//     let counter = 1;
//     let newId = createId(prefix, name, counter);

//     while (elementRegistry.get(newId) && id !== newId) {
//         counter++;
//         newId = createId(prefix, name, counter);
//     }

//     if (id !== newId) {
//         modeling.updateProperties(event.element, { id: newId });
//     }

//     function createId(prefix, name, counter) {
//         let newId = `${prefix}${name ? "_" + name + "_" : "_"}${counter}`;
//         return newId.replaceAll(/[_]+/gm, "_");
//     }
//     return;
// });

// eventBus.on('element.click', function (e) {
//     let element = e.element;
//     var overlays = bpmnModeler.get('overlays');

//     // add overlay to StartEvent_1
//     overlays.add(e.element.id, {
//         html: '<div class="link" data-process-id="123">ID: StartEvent_1</div>',
//         position: {
//             left: 0,
//             bottom: 0
//         }
//     });
// })

