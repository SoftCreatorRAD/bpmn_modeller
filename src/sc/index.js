import ScPaletteProvider from './ScPaletteProvider';
import ScReplaceMenuProvider from './ScReplaceMenuProvider';

export default {
  __init__: ['paletteProvider', 'replaceMenuProvider' ],
  paletteProvider: ['type', ScPaletteProvider],
  replaceMenuProvider: [ 'type', ScReplaceMenuProvider ]
};
// import PopupMenuModule from 'diagram-js/lib/features/popup-menu';
// import ReplaceModule from '../replace';

// import ReplaceMenuProvider from './ReplaceMenuProvider';


// export default {
//   __depends__: [
//     PopupMenuModule,
//     ReplaceModule
//   ],
//   __init__: [ 'replaceMenuProvider' ],
//   replaceMenuProvider: [ 'type', ReplaceMenuProvider ]
// };