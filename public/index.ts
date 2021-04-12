import './index.scss';

import { CrudPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new CrudPlugin();
}
export { CrudPluginSetup, CrudPluginStart } from './types';
