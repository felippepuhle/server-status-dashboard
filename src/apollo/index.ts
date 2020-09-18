import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL || "http://localhost:4000/graphql",
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_SUBSCRIPTIONS_URL || "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
  },
});

export const client = new ApolloClient({
  link: split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  ),
  cache,
});
