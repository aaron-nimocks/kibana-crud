import { IRouter } from 'kibana/server';
import { registerGetIndexListRoute } from './get_index_list';
import { registerGetFieldsListRoute } from './get_fields_list'
import { registerGetTableDataRoute } from './get_table_data'

export function registerRoutes(router: IRouter) {
    registerGetIndexListRoute(router);
    registerGetFieldsListRoute(router);
    registerGetTableDataRoute(router);
}