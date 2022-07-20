import BpmnModeler from 'bpmn-js/lib/Modeler';
import EmbeddedComments from 'bpmn-js-embedded-comments';
import BpmnModdle from 'bpmn-moddle';
import { diff } from 'bpmn-js-differ';

import ScModule from './sc';
import diagramXML from '../resources/diagram.bpmn';

window.bpmn = window.bpmn || {};
window.bpmn.BpmnModeler = BpmnModeler;
window.bpmn.EmbeddedComments = EmbeddedComments;
window.bpmn.BpmnModdle = BpmnModdle;
window.bpmn.diff = diff;
window.bpmn.ScModule = ScModule;

const containerEl = document.getElementById('container');
const bpmnModeler = new BpmnModeler({
    container: containerEl,
    additionalModules: [
        ScModule,
    ]
});
bpmnModeler.importXML(diagramXML, (err) => {
    if (err) {
        console.error(err);
    }
});
let eventBus = bpmnModeler.get('eventBus');
eventBus.on('element.click', function (e) {
    debugger
    let bo = e.element.businessObject;
})