import { IRouter } from '../../../../src/core/server';

export function registerGetIndexListRoute(router: IRouter) {
    router.get(
        {
            path: '/api/crud/get_index_list/',
            validate: {
            },
        },
        async (context, request, response) => {

            const client = context.core.elasticsearch.client.asCurrentUser;

            const { body } = await client.cat.indices({
                "format": "json"
            });

            let formattedResponse: { index: string, uuid: string }[];

            formattedResponse = body.map((val: { index: any; uuid: any; }) => ({
                index: val.index
              }));

            console.log(formattedResponse);

            return response.ok({
                body: {
                    formattedResponse,
                },
            });
        }
    );
}