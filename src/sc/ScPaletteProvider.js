import {
  assign
} from 'min-dash';

export default class ScPaletteProvider {
  constructor(
    palette, create, elementFactory,
    spaceTool, lassoTool, handTool,
    globalConnect, translate, bpmnjs) {

    this._palette = palette;
    this._create = create;
    this._elementFactory = elementFactory;
    this._spaceTool = spaceTool;
    this._lassoTool = lassoTool;
    this._handTool = handTool;
    this._globalConnect = globalConnect;
    this._translate = translate;
    this._bpmnjs = bpmnjs;

    palette.registerProvider(this);
  }


  getPaletteEntries(element) {

    var actions = {},
      create = this._create,
      elementFactory = this._elementFactory,
      spaceTool = this._spaceTool,
      lassoTool = this._lassoTool,
      handTool = this._handTool,
      globalConnect = this._globalConnect,
      translate = this._translate,
      config = this._bpmnjs.get('config');

    function createAction(type, group, className, title, options) {

      function createListener(event) {
        var shape = elementFactory.createShape(assign({ type: type }, options));

        if (options) {
          shape.businessObject.di.isExpanded = options.isExpanded;
        }

        create.start(event, shape);
      }

      var shortType = type.replace(/^bpmn:/, '');

      return {
        group: group,
        className: className,
        title: title || translate('Create {type}', { type: shortType }),
        action: {
          dragstart: createListener,
          click: createListener
        }
      };
    }

    function createParticipant(event, collapsed) {
      create.start(event, elementFactory.createParticipantShape(collapsed));
    }

    assign(actions, {
      'hand-tool': {
        group: 'tools',
        className: 'bpmn-icon-hand-tool',
        title: translate('Activate the hand tool'),
        action: {
          click: function (event) {
            handTool.activateHand(event);
          }
        }
      },
      'lasso-tool': {
        group: 'tools',
        className: 'bpmn-icon-lasso-tool',
        title: translate('Activate the lasso tool'),
        action: {
          click: function (event) {
            lassoTool.activateSelection(event);
          }
        }
      },
      'space-tool': {
        group: 'tools',
        className: 'bpmn-icon-space-tool',
        title: translate('Activate the create/remove space tool'),
        action: {
          click: function (event) {
            spaceTool.activateSelection(event);
          }
        }
      },
      'global-connect-tool': {
        group: 'tools',
        className: 'bpmn-icon-connection-multi',
        title: translate('Activate the global connect tool'),
        action: {
          click: function (event) {
            globalConnect.toggle(event);
          }
        }
      },
      'tool-separator': {
        group: 'tools',
        separator: true
      },
      'create.start-event': createAction(
        'bpmn:StartEvent', 'event', 'bpmn-icon-start-event-none'
      ),
      'create.intermediate-event': createAction(
        'bpmn:IntermediateThrowEvent', 'event', 'bpmn-icon-intermediate-event-none',
        translate('Create Intermediate/Boundary Event')
      ),
      'create.end-event': createAction(
        'bpmn:EndEvent', 'event', 'bpmn-icon-end-event-none'
      ),
      'create.exclusive-gateway': createAction(
        'bpmn:ExclusiveGateway', 'gateway', 'bpmn-icon-gateway-none',
        translate('Create Gateway')
      ),
      'create.exclusive-gateway': createAction(
        'bpmn:ExclusiveGateway', 'gateway', 'bpmn-icon-gateway-xor',
        translate('Create Exclusive Gateway')
      ),
      'create.inclusive-gateway': createAction(
        'bpmn:InclusiveGateway', 'gateway', 'bpmn-icon-gateway-or',
        translate('Create Inclusive Gateway')
      ),
      'create.task': createAction(
        'bpmn:Task', 'activity', 'bpmn-icon-task'
      ),
      'create.call-activity': createAction(
        'bpmn:CallActivity', 'activity', 'bpmn-icon-call-activity'
      ),
      'create.script-task': createAction(
        'bpmn:ScriptTask', 'activity', 'bpmn-icon-script-task'
      ),
      'create.user-task': createAction(
        'bpmn:UserTask', 'activity', 'bpmn-icon-user-task'
      ),
      'create.data-object': createAction(
        'bpmn:DataObjectReference', 'data-object', 'bpmn-icon-data-object'
      ),
      'create.data-store': createAction(
        'bpmn:DataStoreReference', 'data-store', 'bpmn-icon-data-store'
      ),
      'create.subprocess-expanded': createAction(
        'bpmn:SubProcess', 'activity', 'bpmn-icon-subprocess-expanded',
        translate('Create expanded SubProcess'),
        { isExpanded: true }
      ),
      'create.participant-expanded': {
        group: 'collaboration',
        className: 'bpmn-icon-participant',
        title: translate('Create Pool/Participant'),
        action: {
          dragstart: createParticipant,
          click: createParticipant
        }
      }
    });

    let filteredActions;
    let actionNames = config && config.scModule && config.scModule.toolbar;
    let alwaysIncluded = [
      'hand-tool',
      'lasso-tool',
      'space-tool',
      'global-connect-tool',
      'tool-separator'
    ];
    if (Array.isArray(actionNames)) {
      filteredActions = {};
      alwaysIncluded.forEach((actionName) => {
        filteredActions[actionName] = actions[actionName];
      })
      actionNames.forEach((actionName) => {
        filteredActions[actionName] = actions[actionName];
      })
    }

    return filteredActions || actions;
  }
}


ScPaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'spaceTool',
  'lassoTool',
  'handTool',
  'globalConnect',
  'translate',
  'bpmnjs'
];
