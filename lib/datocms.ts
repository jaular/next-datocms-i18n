import { GraphQLClient } from "graphql-request";

export const graphqlRequest = async (query: string, variables?: {}) => {
  let endpoint = "https://graphql.datocms.com";

  const datocmsClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
  });

  const data = await datocmsClient.request(query, variables);

  return data;
};
