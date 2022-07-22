import BpmnModeler from 'bpmn-js/lib/Modeler';
import EmbeddedComments from 'bpmn-js-embedded-comments';
import BpmnModdle from 'bpmn-moddle';
import { diff } from 'bpmn-js-differ';

import ScModule from './sc';

//import diagramXML from '../resources/diagram.bpmn';
//import * as options from 'bpmn-js/lib/features/replace/ReplaceOptions.js';

window.bpmn = window.bpmn || {};
window.bpmn.BpmnModeler = BpmnModeler;
window.bpmn.EmbeddedComments = EmbeddedComments;
window.bpmn.BpmnModdle = BpmnModdle;
window.bpmn.diff = diff;
window.bpmn.ScModule = ScModule;

// const containerEl = document.getElementById('container');
// const bpmnModeler = new BpmnModeler({
//     container: containerEl,
//     additionalModules: [
//         ScModule
//     ],
//     scModule: {
//         toolbar: [ 'create.start-event', 'create.end-event', 'create.exclusive-gateway', 'create.inclusive-gateway', 'create.task', 'create.call-activity', 'create.script-task', 'create.user-task'],
//         menu: ['replace-with-none-start']
//     }
// });
// bpmnModeler.importXML(diagramXML, (err) => {
//     if (err) {
//         console.error(err);
//     }
// });
// debugger;

// // let o = options;
// // let res = {};
// // for( let option in o) {
// //     o[option].forEach((item ) => {
// //         res[item.actionName] = item.label;
// //     })
// // }
// // let r = [];
// // for (let key in res) {
// //     r.push({
// //         id: key,
// //         value: res[key]
// //     });
// // }

// let eventBus = bpmnModeler.get('eventBus');
// eventBus.on('element.click', function (e) {    
//     let bo = e.element.businessObject;
// })

