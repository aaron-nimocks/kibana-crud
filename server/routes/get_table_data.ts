import { IRouter } from '../../../../src/core/server';
import { schema } from '@kbn/config-schema';

export function registerGetTableDataRoute(router: IRouter) {
    router.post(
        {
            path: '/api/crud/get_table_data',
            validate: {
                body: schema.object({
                    selectedIndex: schema.string(),
                    selectedFields: schema.string(),
                }),
            },
        },
        async (context, request, response) => {

            const client = context.core.elasticsearch.client.asCurrentUser;

            const { body: result } = await client.search({
                index: request.body.selectedIndex,
                _source_includes: request.body.selectedFields,
                version: true,
                size: 10000
            });

            const reply = result.hits.hits;

            return response.ok({
                body: {
                    reply,
                },
            });
        }
    );
}