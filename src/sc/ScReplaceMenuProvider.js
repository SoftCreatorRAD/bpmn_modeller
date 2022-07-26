import {
    getBusinessObject,
    is
} from 'bpmn-js/lib/util/ModelUtil';

import {
    isEventSubProcess,
    isExpanded
} from 'bpmn-js/lib/util//DiUtil';

import {
    isDifferentType
} from 'bpmn-js/lib/features/popup-menu/util/TypeUtil';

import {
    forEach,
    filter,
    isUndefined
} from 'min-dash';
import * as replaceOptions from './ScReplaceOptions';
import ReplaceMenuProvider from 'bpmn-js/lib/features/popup-menu/ReplaceMenuProvider';

export default class ScReplaceMenuProvider extends ReplaceMenuProvider {
    constructor(bpmnFactory, popupMenu, modeling, moddle,
        bpmnReplace, rules, translate, bpmnjs) {

        super(bpmnFactory, popupMenu, modeling, moddle,
            bpmnReplace, rules, translate);

        this._bpmnjs = bpmnjs;
    }

    /**
 * Get all entries from replaceOptions for the given element and apply filters
 * on them. Get for example only elements, which are different from the current one.
 *
 * @param {djs.model.Base} element
 *
 * @return {Array<Object>} a list of menu entry items
 */
    getEntries(element) {

        var businessObject = element.businessObject;

        var rules = this._rules;

        var entries;

        if (!rules.allowed('shape.replace', { element: element })) {
            return [];
        }

        var differentType = isDifferentType(element);

        if (is(businessObject, 'bpmn:DataObjectReference')) {
            let options = this.filterReplaceOptions(replaceOptions.DATA_OBJECT_REFERENCE);
            return this._createEntries(element, options);
        }

        if (is(businessObject, 'bpmn:DataStoreReference') && !is(element.parent, 'bpmn:Collaboration')) {
            let options = this.filterReplaceOptions(replaceOptions.DATA_STORE_REFERENCE);
            return this._createEntries(element, options);
        }

        // start events outside sub processes
        if (is(businessObject, 'bpmn:StartEvent') && !is(businessObject.$parent, 'bpmn:SubProcess')) {

            entries = filter(replaceOptions.START_EVENT, differentType);
            let options = this.filterReplaceOptions(entries);

            return this._createEntries(element, options);
        }

        // expanded/collapsed pools
        if (is(businessObject, 'bpmn:Participant')) {

            entries = filter(replaceOptions.PARTICIPANT, function (entry) {
                return isExpanded(element) !== entry.target.isExpanded;
            });
            let options = this.filterReplaceOptions(entries);
            return this._createEntries(element, options);
        }

        // start events inside event sub processes
        if (is(businessObject, 'bpmn:StartEvent') && isEventSubProcess(businessObject.$parent)) {
            entries = filter(replaceOptions.EVENT_SUB_PROCESS_START_EVENT, function (entry) {

                var target = entry.target;

                var isInterrupting = target.isInterrupting !== false;

                var isInterruptingEqual = getBusinessObject(element).isInterrupting === isInterrupting;

                // filters elements which types and event definition are equal but have have different interrupting types
                return differentType(entry) || !differentType(entry) && !isInterruptingEqual;

            });
            let options = this.filterReplaceOptions(entries);
            return this._createEntries(element, options);
        }

        // start events inside sub processes
        if (is(businessObject, 'bpmn:StartEvent') && !isEventSubProcess(businessObject.$parent)
            && is(businessObject.$parent, 'bpmn:SubProcess')) {
            entries = filter(replaceOptions.START_EVENT_SUB_PROCESS, differentType);
            let options = this.filterReplaceOptions(entries);
            return this._createEntries(element, options);
        }

        // end events
        if (is(businessObject, 'bpmn:EndEvent')) {

            entries = filter(replaceOptions.END_EVENT, function (entry) {
                var target = entry.target;

                // hide cancel end events outside transactions
                if (target.eventDefinitionType == 'bpmn:CancelEventDefinition' && !is(businessObject.$parent, 'bpmn:Transaction')) {
                    return false;
                }

                return differentType(entry);
            });
            let options = this.filterReplaceOptions(entries);
            return this._createEntries(element, options);
        }

        // boundary events
        if (is(businessObject, 'bpmn:BoundaryEvent')) {

            entries = filter(replaceOptions.BOUNDARY_EVENT, function (entry) {

                var target = entry.target;

                if (target.eventDefinitionType == 'bpmn:CancelEventDefinition' &&
                    !is(businessObject.attachedToRef, 'bpmn:Transaction')) {
                    return false;
                }
                var cancelActivity = target.cancelActivity !== false;

                var isCancelActivityEqual = businessObject.cancelActivity == cancelActivity;

                return differentType(entry) || !differentType(entry) && !isCancelActivityEqual;
            });
            let options = this.filterReplaceOptions(entries);
            return this._createEntries(element, options);
        }

        // intermediate events
        if (is(businessObject, 'bpmn:IntermediateCatchEvent') ||
            is(businessObject, 'bpmn:IntermediateThrowEvent')) {

            entries = filter(replaceOptions.INTERMEDIATE_EVENT, differentType);
            let options = this.filterReplaceOptions(entries);
            return this._createEntries(element, options);
        }

        // gateways
        if (is(businessObject, 'bpmn:Gateway')) {

            entries = filter(replaceOptions.GATEWAY, differentType);
            let options = this.filterReplaceOptions(entries);
            return this._createEntries(element, options);
        }

        // transactions
        if (is(businessObject, 'bpmn:Transaction')) {

            entries = filter(replaceOptions.TRANSACTION, differentType);
            let options = this.filterReplaceOptions(entries);
            return this._createEntries(element, options);
        }

        // expanded event sub processes
        if (isEventSubProcess(businessObject) && isExpanded(element)) {

            entries = filter(replaceOptions.EVENT_SUB_PROCESS, differentType);
            let options = this.filterReplaceOptions(entries);
            return this._createEntries(element, options);
        }

        // expanded sub processes
        if (is(businessObject, 'bpmn:SubProcess') && isExpanded(element)) {

            entries = filter(replaceOptions.SUBPROCESS_EXPANDED, differentType);
            let options = this.filterReplaceOptions(entries);
            return this._createEntries(element, options);
        }

        // collapsed ad hoc sub processes
        if (is(businessObject, 'bpmn:AdHocSubProcess') && !isExpanded(element)) {

            entries = filter(replaceOptions.TASK, function (entry) {

                var target = entry.target;

                var isTargetSubProcess = target.type === 'bpmn:SubProcess';

                var isTargetExpanded = target.isExpanded === true;

                return isDifferentType(element, target) && (!isTargetSubProcess || isTargetExpanded);
            });
            let options = this.filterReplaceOptions(entries);
            return this._createEntries(element, options);
        }

        // sequence flows
        if (is(businessObject, 'bpmn:SequenceFlow')) {
            let options = this.filterReplaceOptions(replaceOptions.SEQUENCE_FLOW);
            return this._createSequenceFlowEntries(element, options);
        }

        // flow nodes
        if (is(businessObject, 'bpmn:FlowNode')) {
            entries = filter(replaceOptions.TASK, differentType);

            // collapsed SubProcess can not be replaced with itself
            if (is(businessObject, 'bpmn:SubProcess') && !isExpanded(element)) {
                entries = filter(entries, function (entry) {
                    return entry.label !== 'Sub Process (collapsed)';
                });
            }
            let options = this.filterReplaceOptions(entries);
            return this._createEntries(element, options);
        }

        return [];
    }

    filterReplaceOptions(sourceOptions) {
        let config = this._bpmnjs.get('config'); 
        let criteriaArray = config && config.scModule && config.scModule.menu;
        if (!Array.isArray(sourceOptions)) return sourceOptions;
        if (!(Array.isArray(criteriaArray)&& criteriaArray.length)) return sourceOptions;

        let filteredOptions = [];         

        filteredOptions = sourceOptions.filter((option) => {
            return criteriaArray.includes(option.actionName);
        });
        return filteredOptions;
    }

}

ScReplaceMenuProvider.$inject = [
    'bpmnFactory',
    'popupMenu',
    'modeling',
    'moddle',
    'bpmnReplace',
    'rules',
    'translate',
    'bpmnjs'
];
