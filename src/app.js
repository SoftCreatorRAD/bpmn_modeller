import BpmnModeler from 'bpmn-js/lib/Modeler';
import EmbeddedComments from 'bpmn-js-embedded-comments';
import BpmnModdle from 'bpmn-moddle';
import { diff } from 'bpmn-js-differ';
import camundaExtensionModule from './camunda/lib';
import camundaModdle from './camunda/camunda.json';
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import * as minDash from "min-dash";

import ScModule from './sc';

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
