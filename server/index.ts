import { PluginInitializerContext } from '../../../src/core/server';
import { CrudPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new CrudPlugin(initializerContext);
}

export { CrudPluginSetup, CrudPluginStart } from './types';
