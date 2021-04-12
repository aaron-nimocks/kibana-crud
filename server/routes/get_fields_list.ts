import { IRouter } from '../../../../src/core/server';
import { schema } from '@kbn/config-schema';

export function registerGetFieldsListRoute(router: IRouter) {
    router.get(
        {
            path: '/api/crud/get_fields_list/{id?}',
            validate: {
                params: schema.object({
                    id: schema.string({ defaultValue: '' }),
                }),
            },
        },
        async (context, request, response) => {

            const client = context.core.elasticsearch.client.asCurrentUser;

            const { body: result } = await client.indices.getMapping({
                "index": request.params.id
            });

            const responseData = result[request.params.id].mappings.properties;

            var formattedResponse = Object.keys(responseData);

            return response.ok({
                body: {
                    responseData,
                },
            });
        }
    );
}