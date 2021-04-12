import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { CrudPluginSetup, CrudPluginStart } from './types';
import { registerRoutes } from './routes/registerRoutes';

export class CrudPlugin implements Plugin<CrudPluginSetup, CrudPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('crud: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    registerRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('crud: Started');
    return {};
  }

  public stop() {}
}
